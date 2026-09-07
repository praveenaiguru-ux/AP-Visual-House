import { drive_v3, google } from 'googleapis';
import { Readable } from 'stream';
import {
  storageProvider,
  SAFE_REQUEST_ID_REGEX,
  SAFE_FILE_ID_REGEX,
  StagedFileRecord
} from './storage';
import { getAuthenticatedDriveClient } from './driveAuth';

/**
 * AP VISUAL HOUSE — CONFIRMED GCS → OWNER GOOGLE DRIVE TRANSFER (PHASE 5.3B)
 *
 * Target Architecture:
 * - Authoritative GCS: Files are first secured in GCS confirmed/{requestId}/{fileId}.
 * - Owner Drive Hierarchy:
 *     AP Visual House/
 *       Confirmed Projects/
 *         YYYY/
 *           Project-{requestId}/
 *             <original sanitized filename>
 *             project-metadata.json
 * - Zero Memory Overhead: Streams directly from GCS confirmed object to Google Drive.
 * - Idempotency & Retry Safety:
 *     - Reuses existing Project-{requestId} folder if already present.
 *     - Identifies existing files by sanitized name; skips duplicate uploads.
 *     - Updates project-metadata.json in place rather than creating duplicates.
 * - Strict Zero-Leak Security:
 *     - Uses only 'https://www.googleapis.com/auth/drive.file' scope via existing owner OAuth client.
 *     - Never exposes Drive tokens or secrets in metadata, logs, or API responses.
 *     - Never makes folders/files public or generates public URLs.
 *     - Validates requestId and fileId formats.
 * - Fail-Safe Semantics:
 *     - If Drive transfer fails, confirmed GCS objects are NEVER deleted.
 *     - Returns controlled diagnostic result indicating owner storage transfer is pending.
 */

export interface TransferFileRef {
  fileId: string;
}

export interface TransferConfirmedProjectParams {
  requestId: string;
  service?: string;
  customer: string;
  contact: string;
  email?: string;
  requirement?: string;
  startingQuote?: string;
  submittedAt?: string;
  files: TransferFileRef[];
  driveClientOverride?: drive_v3.Drive;
}

export interface DriveTransferResult {
  success: boolean;
  projectFolderId?: string;
  transferredFiles: number;
  alreadyPresentFiles: number;
  failedFiles: number;
  metadataUpdated: boolean;
  error?: string;
}

export interface StoredProjectMetadata {
  reference: string;
  service: string;
  customerName: string;
  contact: string;
  email?: string;
  requirement?: string;
  startingQuote: string;
  submittedAt: string;
  contentPolicyAccepted: boolean;
  driveTransferStatus: 'completed' | 'pending' | 'failed';
  files: Array<{
    fileId: string;
    originalName: string;
    sanitizedName: string;
    size: number;
    mimeType: string;
  }>;
  transferredAt: string;
}

/**
 * Finds an existing non-trashed folder by name within a parent, or creates it.
 */
export async function findOrCreateFolder(
  drive: drive_v3.Drive,
  folderName: string,
  parentId: string
): Promise<string> {
  const escapedName = folderName.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const q = `mimeType = 'application/vnd.google-apps.folder' and name = '${escapedName}' and trashed = false and '${parentId}' in parents`;

  const listRes = await drive.files.list({
    q,
    spaces: 'drive',
    fields: 'files(id, name)',
    pageSize: 10
  });

  if (listRes.data.files && listRes.data.files.length > 0 && listRes.data.files[0].id) {
    return listRes.data.files[0].id;
  }

  const createRes = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId]
    },
    fields: 'id, name'
  });

  if (!createRes.data.id) {
    throw new Error(`Failed to create Google Drive folder: ${folderName}`);
  }

  return createRes.data.id;
}

/**
 * Finds an existing non-trashed file by name inside a specific folder.
 * (Used for project-metadata.json)
 */
export async function findFileInFolder(
  drive: drive_v3.Drive,
  fileName: string,
  folderId: string
): Promise<string | null> {
  const escapedName = fileName.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const q = `name = '${escapedName}' and trashed = false and '${folderId}' in parents and mimeType != 'application/vnd.google-apps.folder'`;

  const res = await drive.files.list({
    q,
    spaces: 'drive',
    fields: 'files(id, name)',
    pageSize: 10
  });

  if (res.data.files && res.data.files.length > 0 && res.data.files[0].id) {
    return res.data.files[0].id;
  }

  return null;
}

/**
 * Finds an existing non-trashed file by its authoritative AP Visual House identity
 * using Drive appProperties: { apvhRequestId: '<requestId>', apvhFileId: '<fileId>' }
 */
export async function findFileByAppProperties(
  drive: drive_v3.Drive,
  requestId: string,
  fileId: string,
  folderId: string
): Promise<string | null> {
  const escapedRequestId = requestId.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const escapedFileId = fileId.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const q = `appProperties has { key='apvhRequestId' and value='${escapedRequestId}' } and appProperties has { key='apvhFileId' and value='${escapedFileId}' } and trashed = false and '${folderId}' in parents and mimeType != 'application/vnd.google-apps.folder'`;

  const res = await drive.files.list({
    q,
    spaces: 'drive',
    fields: 'files(id, name, appProperties)',
    pageSize: 10
  });

  if (res.data.files && res.data.files.length > 0 && res.data.files[0].id) {
    return res.data.files[0].id;
  }

  return null;
}

/**
 * Transfers all confirmed files for a project into the owner's Google Drive hierarchy.
 * Idempotent, retryable, streams directly from GCS without reading to local disk.
 */
export async function transferConfirmedProjectToDrive(
  params: TransferConfirmedProjectParams
): Promise<DriveTransferResult> {
  const {
    requestId,
    service = 'Custom Visual Commission',
    customer,
    contact,
    email,
    requirement,
    startingQuote = 'Quote on discussion',
    submittedAt = new Date().toISOString(),
    files = [],
    driveClientOverride
  } = params;

  // 1. Validate requestId format to prevent path injection
  if (!requestId || !SAFE_REQUEST_ID_REGEX.test(requestId)) {
    throw new Error(`Invalid requestId format for Drive transfer: ${requestId}`);
  }

  // 2. Validate all fileId formats before any Drive operations
  for (const f of files) {
    if (!f.fileId || !SAFE_FILE_ID_REGEX.test(f.fileId)) {
      throw new Error(`Invalid fileId format for Drive transfer: ${f.fileId}`);
    }
  }

  console.log(`[DRIVE] Starting transfer for request ${requestId}`);

  let drive: drive_v3.Drive;
  try {
    drive = driveClientOverride || (await getAuthenticatedDriveClient());
  } catch (authErr: any) {
    console.error(`[DRIVE] Transfer failed for request ${requestId}:`, authErr?.message || authErr);
    return {
      success: false,
      transferredFiles: 0,
      alreadyPresentFiles: 0,
      failedFiles: files.length,
      metadataUpdated: false,
      error: authErr?.message || 'Google Drive client not authenticated'
    };
  }

  let projectFolderId: string;
  try {
    // 3. Find or create root folder: "AP Visual House" inside Drive root
    const rootFolderId = await findOrCreateFolder(drive, 'AP Visual House', 'root');

    // 4. Find or create Level 2 folder: "Confirmed Projects" inside "AP Visual House"
    const confirmedProjectsFolderId = await findOrCreateFolder(drive, 'Confirmed Projects', rootFolderId);

    // 5. Find or create Level 3 folder: "YYYY" inside "Confirmed Projects"
    const parsedDate = new Date(submittedAt);
    const yearStr = (!isNaN(parsedDate.getTime()) ? parsedDate.getFullYear() : new Date().getFullYear()).toString();
    const yearFolderId = await findOrCreateFolder(drive, yearStr, confirmedProjectsFolderId);

    // 6. Find or create Level 4 folder: "Project-{requestId}" inside "YYYY"
    const projectFolderName = `Project-${requestId}`;
    projectFolderId = await findOrCreateFolder(drive, projectFolderName, yearFolderId);

    console.log(`[DRIVE] Project folder ready for request ${requestId}`);
  } catch (folderErr: any) {
    console.error(`[DRIVE] Transfer failed for request ${requestId} during folder setup:`, folderErr?.message || folderErr);
    return {
      success: false,
      transferredFiles: 0,
      alreadyPresentFiles: 0,
      failedFiles: files.length,
      metadataUpdated: false,
      error: `Failed to prepare Google Drive folder hierarchy: ${folderErr?.message || 'Folder error'}`
    };
  }

  let transferredFiles = 0;
  let alreadyPresentFiles = 0;
  let failedFiles = 0;
  const transferredRecords: StoredProjectMetadata['files'] = [];

  // 7. Stream each confirmed file from GCS to Google Drive
  for (const fileRef of files) {
    try {
      const streamObj = await storageProvider.getConfirmedFileStream(fileRef.fileId, requestId);
      if (!streamObj) {
        console.error(`[DRIVE] Confirmed object not found in storage for request ${requestId}: ${fileRef.fileId}`);
        failedFiles++;
        continue;
      }

      const { stream, record } = streamObj;
      const targetFileName = record.sanitizedName || `${record.fileId}`;

      // Check if file already exists in project folder (authoritative idempotency by apvhRequestId + apvhFileId)
      const existingFileId = await findFileByAppProperties(drive, requestId, fileRef.fileId, projectFolderId);
      if (existingFileId) {
        console.log(`[DRIVE] File already present for request ${requestId}`);
        alreadyPresentFiles++;
      } else {
        // Stream directly into Google Drive with authoritative APVH appProperties
        await drive.files.create({
          requestBody: {
            name: targetFileName,
            parents: [projectFolderId],
            appProperties: {
              apvhRequestId: requestId,
              apvhFileId: fileRef.fileId
            }
          },
          media: {
            mimeType: record.mimeType,
            body: stream
          },
          fields: 'id, name, mimeType, size, appProperties'
        });
        console.log(`[DRIVE] File transferred for request ${requestId}: ${targetFileName}`);
        transferredFiles++;
      }

      transferredRecords.push({
        fileId: record.fileId,
        originalName: record.originalName,
        sanitizedName: targetFileName,
        size: record.size,
        mimeType: record.mimeType
      });
    } catch (fileErr: any) {
      console.error(`[DRIVE] Failed transferring file ${fileRef.fileId} for request ${requestId}:`, fileErr?.message || fileErr);
      failedFiles++;
    }
  }

  // 8. Create or update project-metadata.json in project folder
  let metadataUpdated = false;
  try {
    const metadataPayload: StoredProjectMetadata = {
      reference: requestId,
      service,
      customerName: customer,
      contact,
      email: email || undefined,
      requirement: requirement || undefined,
      startingQuote,
      submittedAt,
      contentPolicyAccepted: true,
      driveTransferStatus: failedFiles === 0 ? 'completed' : 'pending',
      files: transferredRecords,
      transferredAt: new Date().toISOString()
    };

    const metadataBuffer = Buffer.from(JSON.stringify(metadataPayload, null, 2), 'utf-8');
    const existingMetaId = await findFileInFolder(drive, 'project-metadata.json', projectFolderId);

    if (existingMetaId) {
      await drive.files.update({
        fileId: existingMetaId,
        media: {
          mimeType: 'application/json',
          body: Readable.from([metadataBuffer])
        },
        fields: 'id, name'
      });
    } else {
      await drive.files.create({
        requestBody: {
          name: 'project-metadata.json',
          parents: [projectFolderId]
        },
        media: {
          mimeType: 'application/json',
          body: Readable.from([metadataBuffer])
        },
        fields: 'id, name'
      });
    }

    metadataUpdated = true;
    console.log(`[DRIVE] Metadata updated for request ${requestId}`);
  } catch (metaErr: any) {
    console.error(`[DRIVE] Failed creating/updating project metadata for request ${requestId}:`, metaErr?.message || metaErr);
  }

  const isSuccess = failedFiles === 0 && metadataUpdated;
  if (isSuccess) {
    console.log(`[DRIVE] Transfer completed for request ${requestId}`);
  } else {
    console.warn(`[DRIVE] Transfer failed for request ${requestId}: ${failedFiles} file(s) failed or metadata not saved.`);
  }

  return {
    success: isSuccess,
    projectFolderId,
    transferredFiles,
    alreadyPresentFiles,
    failedFiles,
    metadataUpdated
  };
}
