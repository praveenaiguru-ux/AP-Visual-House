import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';
import {
  transferConfirmedProjectToDrive,
  findOrCreateFolder,
  findFileInFolder,
  findFileByAppProperties,
  StoredProjectMetadata
} from './driveTransfer';
import { storageProvider, StagedFileRecord } from './storage';
import { _resetTokenCacheForTesting } from './driveAuth';

// Mock in-memory Drive structure for deterministic unit tests
interface MockDriveItem {
  id: string;
  name: string;
  mimeType: string;
  parents: string[];
  appProperties?: Record<string, string>;
  content?: string;
}

function createMockDriveClient() {
  const items: MockDriveItem[] = [];
  let idCounter = 1;

  const mockDrive: any = {
    _items: items,
    files: {
      list: async ({ q }: { q: string }) => {
        // Parse simple Drive queries used in driveTransfer
        const isFolder = q.includes("mimeType = 'application/vnd.google-apps.folder'");
        const isNotFolder = q.includes("mimeType != 'application/vnd.google-apps.folder'");

        // Match name: name = '...'
        const nameMatch = q.match(/name = '([^']+)'/);
        const targetName = nameMatch ? nameMatch[1].replace(/\\'/g, "'").replace(/\\\\/g, '\\') : null;

        // Match parent: '...' in parents
        const parentMatch = q.match(/'([^']+)' in parents/);
        const targetParent = parentMatch ? parentMatch[1] : null;

        // Match appProperties: key='apvhRequestId' and key='apvhFileId'
        const reqIdMatch = q.match(/appProperties\s+has\s+\{\s*key\s*=\s*'apvhRequestId'\s+and\s+value\s*=\s*'([^']+)'\s*\}/);
        const targetReqId = reqIdMatch ? reqIdMatch[1].replace(/\\'/g, "'").replace(/\\\\/g, '\\') : null;

        const fileIdMatch = q.match(/appProperties\s+has\s+\{\s*key\s*=\s*'apvhFileId'\s+and\s+value\s*=\s*'([^']+)'\s*\}/);
        const targetFileId = fileIdMatch ? fileIdMatch[1].replace(/\\'/g, "'").replace(/\\\\/g, '\\') : null;

        const matched = items.filter(item => {
          if (isFolder && item.mimeType !== 'application/vnd.google-apps.folder') return false;
          if (isNotFolder && item.mimeType === 'application/vnd.google-apps.folder') return false;
          if (targetName && item.name !== targetName) return false;
          if (targetParent && !item.parents.includes(targetParent)) return false;
          if (targetReqId && item.appProperties?.apvhRequestId !== targetReqId) return false;
          if (targetFileId && item.appProperties?.apvhFileId !== targetFileId) return false;
          return true;
        });

        return {
          data: {
            files: matched.map(m => ({
              id: m.id,
              name: m.name,
              appProperties: m.appProperties
            }))
          }
        };
      },
      create: async ({ requestBody, media }: any) => {
        const id = 'mock_drive_id_' + idCounter++;
        let contentStr = '';
        if (media && media.body) {
          if (Buffer.isBuffer(media.body)) {
            contentStr = media.body.toString('utf-8');
          } else if (typeof media.body.read === 'function') {
            // Read stream
            const chunks: Buffer[] = [];
            for await (const chunk of media.body) {
              chunks.push(Buffer.from(chunk));
            }
            contentStr = Buffer.concat(chunks).toString('utf-8');
          }
        }

        const newItem: MockDriveItem = {
          id,
          name: requestBody.name,
          mimeType: requestBody.mimeType || media?.mimeType || 'application/octet-stream',
          parents: requestBody.parents || [],
          appProperties: requestBody.appProperties ? { ...requestBody.appProperties } : undefined,
          content: contentStr
        };
        items.push(newItem);
        return { data: { id, name: newItem.name } };
      },
      update: async ({ fileId, media }: any) => {
        const existing = items.find(i => i.id === fileId);
        if (!existing) throw new Error(`Mock Drive file not found: ${fileId}`);

        let contentStr = '';
        if (media && media.body) {
          if (typeof media.body.read === 'function') {
            const chunks: Buffer[] = [];
            for await (const chunk of media.body) {
              chunks.push(Buffer.from(chunk));
            }
            contentStr = Buffer.concat(chunks).toString('utf-8');
          }
        }
        existing.content = contentStr;
        return { data: { id: existing.id, name: existing.name } };
      }
    }
  };

  return mockDrive;
}

// Setup a staged & confirmed file in storageProvider
async function stageAndConfirmTestFile(requestId: string, filename: string, content: string) {
  const fileId = 'up_' + crypto.randomBytes(12).toString('hex');
  const ownerToken = crypto.randomBytes(24).toString('hex');
  const buf = Buffer.from(content, 'utf-8');

  await storageProvider.saveTemporaryFile({
    requestId,
    fileId,
    ownerToken,
    originalName: filename,
    sanitizedName: filename,
    mimeType: 'text/plain',
    buffer: buf,
    size: buf.length,
    createdAt: Date.now(),
    expiresAt: Date.now() + 3600000
  });

  return await storageProvider.promoteToConfirmed(fileId, requestId);
}

describe('PHASE 5.3B — CONFIRMED GCS → OWNER GOOGLE DRIVE TRANSFER TEST SUITE', () => {
  beforeEach(() => {
    _resetTokenCacheForTesting();
  });

  // 1. Drive OAuth unavailable -> controlled failure
  it('1. Drive OAuth unavailable -> controlled failure without crash', async () => {
    const requestId = 'req_test_no_auth_' + Date.now();
    // Default call without override will attempt to get credentials and fail safely
    const result = await transferConfirmedProjectToDrive({
      requestId,
      customer: 'Praveen',
      contact: '+919999999999',
      files: []
    });

    assert.equal(result.success, false);
    assert.equal(typeof result.error, 'string');
    assert.match(result.error || '', /Google Drive/i);
    assert.equal(result.transferredFiles, 0);
  });

  // 2. Root folder creation
  it('2. Root folder creation ("AP Visual House")', async () => {
    const mockDrive = createMockDriveClient();
    const folderId = await findOrCreateFolder(mockDrive, 'AP Visual House', 'root');

    assert.ok(folderId);
    const created = mockDrive._items.find((i: MockDriveItem) => i.id === folderId);
    assert.ok(created);
    assert.equal(created.name, 'AP Visual House');
    assert.deepEqual(created.parents, ['root']);
  });

  // 3. Existing root folder reuse
  it('3. Existing root folder reuse (idempotency, no duplicate folder)', async () => {
    const mockDrive = createMockDriveClient();
    const firstId = await findOrCreateFolder(mockDrive, 'AP Visual House', 'root');
    const secondId = await findOrCreateFolder(mockDrive, 'AP Visual House', 'root');

    assert.equal(firstId, secondId);
    const roots = mockDrive._items.filter((i: MockDriveItem) => i.name === 'AP Visual House');
    assert.equal(roots.length, 1);
  });

  // 4. Confirmed Projects folder reuse
  it('4. Confirmed Projects folder reuse under AP Visual House', async () => {
    const mockDrive = createMockDriveClient();
    const rootId = await findOrCreateFolder(mockDrive, 'AP Visual House', 'root');
    const cp1 = await findOrCreateFolder(mockDrive, 'Confirmed Projects', rootId);
    const cp2 = await findOrCreateFolder(mockDrive, 'Confirmed Projects', rootId);

    assert.equal(cp1, cp2);
    const cps = mockDrive._items.filter((i: MockDriveItem) => i.name === 'Confirmed Projects');
    assert.equal(cps.length, 1);
    assert.deepEqual(cps[0].parents, [rootId]);
  });

  // 5. Year folder creation/reuse
  it('5. Year folder creation and reuse (YYYY)', async () => {
    const mockDrive = createMockDriveClient();
    const rootId = await findOrCreateFolder(mockDrive, 'AP Visual House', 'root');
    const cpId = await findOrCreateFolder(mockDrive, 'Confirmed Projects', rootId);

    const yearId1 = await findOrCreateFolder(mockDrive, '2026', cpId);
    const yearId2 = await findOrCreateFolder(mockDrive, '2026', cpId);

    assert.equal(yearId1, yearId2);
    const years = mockDrive._items.filter((i: MockDriveItem) => i.name === '2026');
    assert.equal(years.length, 1);
    assert.deepEqual(years[0].parents, [cpId]);
  });

  // 6. Project folder creation/reuse
  it('6. Project folder creation/reuse (Project-{requestId})', async () => {
    const mockDrive = createMockDriveClient();
    const requestId = 'req_folder_reuse_' + Date.now();
    const p1 = await findOrCreateFolder(mockDrive, `Project-${requestId}`, 'year_123');
    const p2 = await findOrCreateFolder(mockDrive, `Project-${requestId}`, 'year_123');

    assert.equal(p1, p2);
    const projects = mockDrive._items.filter((i: MockDriveItem) => i.name === `Project-${requestId}`);
    assert.equal(projects.length, 1);
  });

  // 7. Successful GCS -> Drive file transfer
  it('7. Successful GCS -> Drive file transfer with stream', async () => {
    const mockDrive = createMockDriveClient();
    const requestId = 'req_transfer_test_' + Date.now();
    const confirmed = await stageAndConfirmTestFile(requestId, 'architectural_render.png', 'render-data-bytes');

    const result = await transferConfirmedProjectToDrive({
      requestId,
      service: '3D Architectural Rendering',
      customer: 'Praveen',
      contact: '+919999999999',
      submittedAt: '2026-09-07T12:00:00Z',
      files: [{ fileId: confirmed.fileId }],
      driveClientOverride: mockDrive
    });

    assert.equal(result.success, true);
    assert.equal(result.transferredFiles, 1);
    assert.equal(result.alreadyPresentFiles, 0);
    assert.equal(result.failedFiles, 0);
    assert.equal(result.metadataUpdated, true);

    // Verify file exists in mock Drive
    const transferred = mockDrive._items.find((i: MockDriveItem) => i.name === 'architectural_render.png');
    assert.ok(transferred);
    assert.equal(transferred.content, 'render-data-bytes');
  });

  // 8. Existing Drive file is not duplicated
  it('8. Existing Drive file is not duplicated on retry', async () => {
    const mockDrive = createMockDriveClient();
    const requestId = 'req_dedup_test_' + Date.now();
    const confirmed = await stageAndConfirmTestFile(requestId, 'floor_plan.pdf', 'pdf-content-bytes');

    // First transfer
    const res1 = await transferConfirmedProjectToDrive({
      requestId,
      customer: 'Praveen',
      contact: '+919999999999',
      submittedAt: '2026-09-07T12:00:00Z',
      files: [{ fileId: confirmed.fileId }],
      driveClientOverride: mockDrive
    });
    assert.equal(res1.transferredFiles, 1);
    assert.equal(res1.alreadyPresentFiles, 0);

    // Second transfer (exact same request)
    const res2 = await transferConfirmedProjectToDrive({
      requestId,
      customer: 'Praveen',
      contact: '+919999999999',
      submittedAt: '2026-09-07T12:00:00Z',
      files: [{ fileId: confirmed.fileId }],
      driveClientOverride: mockDrive
    });
    assert.equal(res2.transferredFiles, 0);
    assert.equal(res2.alreadyPresentFiles, 1);
    assert.equal(res2.failedFiles, 0);

    // Verify only ONE copy of the file exists in the folder
    const fileCopies = mockDrive._items.filter((i: MockDriveItem) => i.name === 'floor_plan.pdf');
    assert.equal(fileCopies.length, 1);
  });

  // 9. Metadata JSON creation
  it('9. Metadata JSON creation contains all required non-sensitive fields', async () => {
    const mockDrive = createMockDriveClient();
    const requestId = 'req_meta_test_' + Date.now();
    const confirmed = await stageAndConfirmTestFile(requestId, 'elevation.jpg', 'img-data');

    await transferConfirmedProjectToDrive({
      requestId,
      service: 'Façade Design',
      customer: 'Praveen Guuru',
      contact: '+919876543210',
      email: 'praveen.guuru@gmail.com',
      requirement: 'Ultra-modern glass elevation',
      startingQuote: '₹4,999',
      submittedAt: '2026-09-07T10:00:00Z',
      files: [{ fileId: confirmed.fileId }],
      driveClientOverride: mockDrive
    });

    const metaItem = mockDrive._items.find((i: MockDriveItem) => i.name === 'project-metadata.json');
    assert.ok(metaItem);
    assert.ok(metaItem.content);

    const parsed: StoredProjectMetadata = JSON.parse(metaItem.content);
    assert.equal(parsed.reference, requestId);
    assert.equal(parsed.service, 'Façade Design');
    assert.equal(parsed.customerName, 'Praveen Guuru');
    assert.equal(parsed.contact, '+919876543210');
    assert.equal(parsed.email, 'praveen.guuru@gmail.com');
    assert.equal(parsed.requirement, 'Ultra-modern glass elevation');
    assert.equal(parsed.startingQuote, '₹4,999');
    assert.equal(parsed.contentPolicyAccepted, true);
    assert.equal(parsed.driveTransferStatus, 'completed');
    assert.equal(parsed.files.length, 1);
    assert.equal(parsed.files[0].sanitizedName, 'elevation.jpg');
  });

  // 10. Metadata JSON update/reuse
  it('10. Metadata JSON update/reuse (no duplicate metadata files)', async () => {
    const mockDrive = createMockDriveClient();
    const requestId = 'req_meta_update_' + Date.now();
    const confirmed = await stageAndConfirmTestFile(requestId, 'sample.txt', 'sample-text');

    await transferConfirmedProjectToDrive({
      requestId,
      customer: 'Initial Customer',
      contact: '+1111111111',
      files: [{ fileId: confirmed.fileId }],
      driveClientOverride: mockDrive
    });

    // Update with new customer info
    await transferConfirmedProjectToDrive({
      requestId,
      customer: 'Updated Customer',
      contact: '+2222222222',
      files: [{ fileId: confirmed.fileId }],
      driveClientOverride: mockDrive
    });

    const metaFiles = mockDrive._items.filter((i: MockDriveItem) => i.name === 'project-metadata.json');
    assert.equal(metaFiles.length, 1);

    const updated = JSON.parse(metaFiles[0].content!);
    assert.equal(updated.customerName, 'Updated Customer');
    assert.equal(updated.contact, '+2222222222');
  });

  // 11. Multiple files
  it('11. Transfers multiple files cleanly', async () => {
    const mockDrive = createMockDriveClient();
    const requestId = 'req_multi_' + Date.now();
    const f1 = await stageAndConfirmTestFile(requestId, 'cam1.jpg', 'img1');
    const f2 = await stageAndConfirmTestFile(requestId, 'cam2.jpg', 'img2');
    const f3 = await stageAndConfirmTestFile(requestId, 'cam3.jpg', 'img3');

    const result = await transferConfirmedProjectToDrive({
      requestId,
      customer: 'Multi File Client',
      contact: '+919999999999',
      files: [{ fileId: f1.fileId }, { fileId: f2.fileId }, { fileId: f3.fileId }],
      driveClientOverride: mockDrive
    });

    assert.equal(result.success, true);
    assert.equal(result.transferredFiles, 3);
    assert.equal(result.failedFiles, 0);

    const transferred = mockDrive._items.filter((i: MockDriveItem) =>
      ['cam1.jpg', 'cam2.jpg', 'cam3.jpg'].includes(i.name)
    );
    assert.equal(transferred.length, 3);
  });

  // 12. Drive failure does not delete confirmed GCS files
  it('12. Drive failure does NOT delete confirmed GCS files', async () => {
    const mockDrive = createMockDriveClient();
    // Simulate Drive API failure on file upload
    mockDrive.files.create = async ({ requestBody }: any) => {
      if (requestBody.mimeType === 'application/vnd.google-apps.folder') {
        return { data: { id: 'folder_' + Date.now() } };
      }
      throw new Error('Simulated Google Drive API quota limit reached');
    };

    const requestId = 'req_fail_preserve_' + Date.now();
    const confirmed = await stageAndConfirmTestFile(requestId, 'critical_asset.dwg', 'dwg-binary-bytes');

    const result = await transferConfirmedProjectToDrive({
      requestId,
      customer: 'Preserve Test',
      contact: '+919999999999',
      files: [{ fileId: confirmed.fileId }],
      driveClientOverride: mockDrive
    });

    assert.equal(result.success, false);
    assert.equal(result.failedFiles, 1);

    // Assert that the confirmed object still exists in storageProvider!
    const fileInStorage = await storageProvider.getConfirmedFile(confirmed.fileId, requestId);
    assert.ok(fileInStorage);
    assert.equal(fileInStorage.fileId, confirmed.fileId);
    assert.equal(fileInStorage.status, 'confirmed');
  });

  // 13. Invalid requestId rejected
  it('13. Invalid requestId rejected immediately', async () => {
    await assert.rejects(
      async () => {
        await transferConfirmedProjectToDrive({
          requestId: '../../bad_path_injection',
          customer: 'Test',
          contact: '123',
          files: []
        });
      },
      /Invalid requestId format/
    );
  });

  // 14. Invalid fileId rejected
  it('14. Invalid fileId rejected immediately', async () => {
    await assert.rejects(
      async () => {
        await transferConfirmedProjectToDrive({
          requestId: 'req_valid_1234',
          customer: 'Test',
          contact: '123',
          files: [{ fileId: 'bad_id_not_matching_regex' }]
        });
      },
      /Invalid fileId format/
    );
  });

  // 15. No secrets appear in logs/responses
  it('15. No secrets or tokens appear in metadata or transfer result', async () => {
    const mockDrive = createMockDriveClient();
    const requestId = 'req_secret_check_' + Date.now();
    const confirmed = await stageAndConfirmTestFile(requestId, 'doc.txt', 'clean');

    const result = await transferConfirmedProjectToDrive({
      requestId,
      customer: 'Security Auditor',
      contact: '+919999999999',
      files: [{ fileId: confirmed.fileId }],
      driveClientOverride: mockDrive
    });

    const resultStr = JSON.stringify(result);
    assert.ok(!resultStr.includes('refresh_token'));
    assert.ok(!resultStr.includes('access_token'));
    assert.ok(!resultStr.includes('client_secret'));

    const metaItem = mockDrive._items.find((i: MockDriveItem) => i.name === 'project-metadata.json');
    assert.ok(metaItem);
    const metaStr = metaItem.content || '';
    assert.ok(!metaStr.includes('refresh_token'));
    assert.ok(!metaStr.includes('access_token'));
    assert.ok(!metaStr.includes('client_secret'));
    assert.ok(!metaStr.includes('ownerToken'));
  });

  // 16. Existing upload flow remains functional
  it('16. End-to-end staged upload -> promotion -> drive transfer works seamlessly', async () => {
    const mockDrive = createMockDriveClient();
    const requestId = 'req_e2e_' + Date.now();
    const fileId = 'up_' + crypto.randomBytes(12).toString('hex');
    const ownerToken = crypto.randomBytes(24).toString('hex');
    const buf = Buffer.from('photo-stream-test', 'utf-8');

    // 1. Stage in temporary/
    const staged = await storageProvider.saveTemporaryFile({
      requestId,
      fileId,
      ownerToken,
      originalName: 'photo.jpg',
      sanitizedName: 'photo.jpg',
      mimeType: 'image/jpeg',
      buffer: buf,
      size: buf.length,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000
    });
    assert.equal(staged.status, 'temporary');

    // 2. Promote to confirmed/
    const confirmed = await storageProvider.promoteToConfirmed(fileId, requestId);
    assert.equal(confirmed.status, 'confirmed');

    // 3. Transfer to Drive
    const driveResult = await transferConfirmedProjectToDrive({
      requestId,
      service: 'Photo Retouching',
      customer: 'Praveen',
      contact: '+919999999999',
      submittedAt: '2026-09-07T12:00:00Z',
      files: [{ fileId: confirmed.fileId }],
      driveClientOverride: mockDrive
    });

    assert.equal(driveResult.success, true);
    assert.equal(driveResult.transferredFiles, 1);
  });

  // 17. Two different fileIds with the same filename both transfer successfully
  it('17. Two different fileIds with the same filename both transfer successfully', async () => {
    const mockDrive = createMockDriveClient();
    const requestId = 'req_same_name_' + Date.now();
    const f1 = await stageAndConfirmTestFile(requestId, 'photo.jpg', 'photo-1-bytes');
    const f2 = await stageAndConfirmTestFile(requestId, 'photo.jpg', 'photo-2-bytes');

    assert.notEqual(f1.fileId, f2.fileId);

    const result = await transferConfirmedProjectToDrive({
      requestId,
      customer: 'Praveen',
      contact: '+919999999999',
      submittedAt: '2026-09-07T12:00:00Z',
      files: [{ fileId: f1.fileId }, { fileId: f2.fileId }],
      driveClientOverride: mockDrive
    });

    assert.equal(result.success, true);
    assert.equal(result.transferredFiles, 2);
    assert.equal(result.alreadyPresentFiles, 0);
    assert.equal(result.failedFiles, 0);

    // Both files must exist in mock Drive with name "photo.jpg"
    const photoFiles = mockDrive._items.filter((i: MockDriveItem) => i.name === 'photo.jpg');
    assert.equal(photoFiles.length, 2);

    // Verify distinct fileIds in appProperties
    const f1Drive = photoFiles.find((i: MockDriveItem) => i.appProperties?.apvhFileId === f1.fileId);
    const f2Drive = photoFiles.find((i: MockDriveItem) => i.appProperties?.apvhFileId === f2.fileId);
    assert.ok(f1Drive, 'First photo.jpg must exist with f1 fileId in appProperties');
    assert.ok(f2Drive, 'Second photo.jpg must exist with f2 fileId in appProperties');
    assert.equal(f1Drive.content, 'photo-1-bytes');
    assert.equal(f2Drive.content, 'photo-2-bytes');
  });

  // 18. Retrying the same requestId + fileId does not create a duplicate
  it('18. Retrying the same requestId + fileId does not create a duplicate', async () => {
    const mockDrive = createMockDriveClient();
    const requestId = 'req_retry_idempotent_' + Date.now();
    const f1 = await stageAndConfirmTestFile(requestId, 'render.png', 'render-data');

    // Run 1: initial transfer
    const res1 = await transferConfirmedProjectToDrive({
      requestId,
      customer: 'Praveen',
      contact: '+919999999999',
      files: [{ fileId: f1.fileId }],
      driveClientOverride: mockDrive
    });
    assert.equal(res1.transferredFiles, 1);
    assert.equal(res1.alreadyPresentFiles, 0);

    // Run 2: retry same requestId + fileId
    const res2 = await transferConfirmedProjectToDrive({
      requestId,
      customer: 'Praveen',
      contact: '+919999999999',
      files: [{ fileId: f1.fileId }],
      driveClientOverride: mockDrive
    });
    assert.equal(res2.transferredFiles, 0);
    assert.equal(res2.alreadyPresentFiles, 1);
    assert.equal(res2.failedFiles, 0);

    const items = mockDrive._items.filter((i: MockDriveItem) => i.appProperties?.apvhFileId === f1.fileId);
    assert.equal(items.length, 1);
  });

  // 19. A different fileId with the same filename is NOT treated as a duplicate
  it('19. A different fileId with the same filename is NOT treated as a duplicate', async () => {
    const mockDrive = createMockDriveClient();
    const requestId = 'req_distinct_fileids_' + Date.now();
    const f1 = await stageAndConfirmTestFile(requestId, 'drawing.dwg', 'drawing-v1');
    const f2 = await stageAndConfirmTestFile(requestId, 'drawing.dwg', 'drawing-v2');

    // Upload f1 first
    const res1 = await transferConfirmedProjectToDrive({
      requestId,
      customer: 'Praveen',
      contact: '+919999999999',
      files: [{ fileId: f1.fileId }],
      driveClientOverride: mockDrive
    });
    assert.equal(res1.transferredFiles, 1);
    assert.equal(res1.alreadyPresentFiles, 0);

    // Upload f2 later (same filename "drawing.dwg", different fileId)
    const res2 = await transferConfirmedProjectToDrive({
      requestId,
      customer: 'Praveen',
      contact: '+919999999999',
      files: [{ fileId: f2.fileId }],
      driveClientOverride: mockDrive
    });
    assert.equal(res2.transferredFiles, 1);
    assert.equal(res2.alreadyPresentFiles, 0);

    const drawingFiles = mockDrive._items.filter((i: MockDriveItem) => i.name === 'drawing.dwg');
    assert.equal(drawingFiles.length, 2);
  });

  // 20. appProperties contain requestId and fileId without secrets
  it('20. appProperties contain requestId and fileId without secrets', async () => {
    const mockDrive = createMockDriveClient();
    const requestId = 'req_appprop_check_' + Date.now();
    const f1 = await stageAndConfirmTestFile(requestId, 'contract.pdf', 'contract-content');

    await transferConfirmedProjectToDrive({
      requestId,
      customer: 'Praveen',
      contact: '+919999999999',
      files: [{ fileId: f1.fileId }],
      driveClientOverride: mockDrive
    });

    const fileItem = mockDrive._items.find((i: MockDriveItem) => i.appProperties?.apvhFileId === f1.fileId);
    assert.ok(fileItem);
    assert.deepEqual(fileItem.appProperties, {
      apvhRequestId: requestId,
      apvhFileId: f1.fileId
    });

    // Ensure no secrets or tokens exist in appProperties
    const propStr = JSON.stringify(fileItem.appProperties);
    assert.ok(!propStr.includes('refresh_token'));
    assert.ok(!propStr.includes('client_secret'));
    assert.ok(!propStr.includes('access_token'));
  });

  // 21. findFileByAppProperties accurately matches and rejects non-matches
  it('21. findFileByAppProperties accurately matches and rejects non-matches', async () => {
    const mockDrive = createMockDriveClient();
    const requestId = 'req_find_test_' + Date.now();
    const f1 = await stageAndConfirmTestFile(requestId, 'sketch.png', 'sketch-data');

    const result = await transferConfirmedProjectToDrive({
      requestId,
      customer: 'Praveen',
      contact: '+919999999999',
      files: [{ fileId: f1.fileId }],
      driveClientOverride: mockDrive
    });

    const folderId = result.projectFolderId!;
    assert.ok(folderId);

    // Exact match
    const foundId = await findFileByAppProperties(mockDrive, requestId, f1.fileId, folderId);
    assert.ok(foundId);

    // Different fileId
    const notFoundFile = await findFileByAppProperties(mockDrive, requestId, 'up_different_file_id', folderId);
    assert.equal(notFoundFile, null);

    // Different requestId
    const notFoundReq = await findFileByAppProperties(mockDrive, 'req_other_request', f1.fileId, folderId);
    assert.equal(notFoundReq, null);
  });
});
