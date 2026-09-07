import { Storage, Bucket } from '@google-cloud/storage';
import path from 'path';
import fs from 'fs';

/**
 * AP VISUAL HOUSE — PRODUCTION PRIVATE GOOGLE CLOUD STORAGE LAYER
 * 
 * Target Storage Architecture:
 * - Production Storage: Strictly Google Cloud Storage (Private Bucket: "ap-visual-house-uploads-0268928491")
 * - Project:            gen-lang-client-0268928491
 * - Temporary Objects:  temporary/{requestId}/{fileId}
 * - Confirmed Objects:  confirmed/{requestId}/{fileId}
 * - Zero Public Access: Bucket is strictly private; no public URLs.
 * - Least Privilege:    Uses Cloud Run Service Account Identity (Application Default Credentials).
 * - Lifecycle Support:  GCS Object Lifecycle Policy is the authoritative safety net.
 * - Fail-Closed:        Failures in GCS do NOT silently fall back to local disk or memory.
 *                       Any GCS unavailability fails the upload safely and returns a non-sensitive error.
 * - Dev Emulator:       Allowed ONLY in development/test when explicitly requested via STORAGE_USE_EMULATOR=true.
 *                       Strictly prohibited and rejected in production.
 */

export const TARGET_GCS_BUCKET_NAME = 'ap-visual-house-uploads-0268928491';
export const TARGET_GCS_PROJECT_ID = 'gen-lang-client-0268928491';

export type StorageEnvironment = 'production' | 'development' | 'test';

export interface StagedFileRecord {
  requestId: string;
  fileId: string;
  ownerToken: string;
  originalName: string;
  sanitizedName: string;
  size: number;
  mimeType: string;
  createdAt: number;
  expiresAt: number;
  status: 'temporary' | 'confirmed' | 'deleted';
  storageKey: string;
}

export interface SaveFileParams {
  requestId: string;
  fileId: string;
  ownerToken: string;
  originalName: string;
  sanitizedName: string;
  mimeType: string;
  buffer: Buffer;
  size: number;
  createdAt: number;
  expiresAt: number;
}

export class StorageServiceError extends Error {
  public statusCode: number;
  public userSafeMessage: string;

  constructor(message: string, statusCode: number = 503, userSafeMessage?: string) {
    super(message);
    this.name = 'StorageServiceError';
    this.statusCode = statusCode;
    this.userSafeMessage = userSafeMessage || 'Secure cloud storage service is currently unavailable. Please try again.';
  }
}

// Regex validators to prevent path traversal or object namespace injection
export const SAFE_FILE_ID_REGEX = /^up_[a-f0-9]{24}$/;
export const SAFE_REQUEST_ID_REGEX = /^req_[a-zA-Z0-9_-]{4,64}$/;

class StorageProvider {
  private gcsStorage: Storage | null = null;
  private bucketName: string;
  private projectId: string;
  private environment: StorageEnvironment;
  private isEmulatorMode: boolean = false;
  private emulatorDir: string = path.join(process.cwd(), '.storage_data');

  constructor() {
    // 1. Determine explicit environment
    if (process.env.NODE_ENV === 'production' || process.env.STORAGE_ENV === 'production') {
      this.environment = 'production';
    } else if (process.env.NODE_ENV === 'test' || process.env.STORAGE_ENV === 'test') {
      this.environment = 'test';
    } else {
      this.environment = 'development';
    }

    this.bucketName = process.env.GCS_BUCKET_NAME || TARGET_GCS_BUCKET_NAME;
    this.projectId = process.env.GCS_PROJECT_ID || TARGET_GCS_PROJECT_ID;

    // 2. Determine emulator mode:
    // A local emulator exists ONLY when explicitly enabled via STORAGE_USE_EMULATOR=true in non-production.
    // Production MUST NEVER enable that emulator automatically and MUST REJECT it if requested.
    const explicitEmulatorRequested =
      process.env.STORAGE_USE_EMULATOR === 'true' ||
      process.env.ENABLE_DEV_STORAGE_EMULATOR === 'true';

    if (this.environment === 'production') {
      if (explicitEmulatorRequested) {
        throw new Error(
          'FATAL CONFIGURATION ERROR: Storage emulator is strictly forbidden in production. Production uploads must use real Google Cloud Storage.'
        );
      }
      this.isEmulatorMode = false;
    } else {
      // In development or test, only enable emulator if explicitly requested by environment variable.
      // Otherwise, dev/test also attempts real Google Cloud Storage.
      this.isEmulatorMode = explicitEmulatorRequested;
    }

    if (this.isEmulatorMode) {
      console.log(`[STORAGE] Development emulator EXPLICITLY enabled for environment: ${this.environment}. Storage path: ${this.emulatorDir}`);
      if (!fs.existsSync(this.emulatorDir)) {
        fs.mkdirSync(this.emulatorDir, { recursive: true });
      }
    } else {
      console.log(
        `[STORAGE] Initialized with REAL Google Cloud Storage (Bucket: "${this.bucketName}", Project: "${this.projectId}", Env: ${this.environment}). Fail-closed enforced.`
      );
      this.gcsStorage = new Storage({
        projectId: this.projectId
      });
    }
  }

  public isUsingGCS(): boolean {
    return !this.isEmulatorMode;
  }

  public isEmulator(): boolean {
    return this.isEmulatorMode;
  }

  public getEnvironment(): StorageEnvironment {
    return this.environment;
  }

  public getBucketName(): string {
    return this.bucketName;
  }

  public getProjectId(): string {
    return this.projectId;
  }

  private getBucket(): Bucket {
    if (this.isEmulatorMode || !this.gcsStorage) {
      throw new StorageServiceError('Google Cloud Storage is not active or initialized.', 500);
    }
    return this.gcsStorage.bucket(this.bucketName);
  }

  // --- SAVE TEMPORARY FILE ---
  public async saveTemporaryFile(params: SaveFileParams): Promise<StagedFileRecord> {
    const { requestId, fileId, ownerToken, originalName, sanitizedName, mimeType, buffer, size, createdAt, expiresAt } = params;
    const storageKey = `temporary/${requestId}/${fileId}`;

    // 1. Explicit Development/Test Emulator (ONLY when STORAGE_USE_EMULATOR=true in dev/test)
    if (this.isEmulatorMode) {
      const targetDir = path.join(this.emulatorDir, 'temporary', requestId);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      const dataPath = path.join(targetDir, `${fileId}.data`);
      const metaPath = path.join(targetDir, `${fileId}.meta.json`);

      fs.writeFileSync(dataPath, buffer);

      const record: StagedFileRecord = {
        requestId,
        fileId,
        ownerToken,
        originalName,
        sanitizedName,
        size,
        mimeType,
        createdAt,
        expiresAt,
        status: 'temporary',
        storageKey
      };

      fs.writeFileSync(metaPath, JSON.stringify(record, null, 2), 'utf-8');
      return record;
    }

    // 2. Production / Real Google Cloud Storage (Fail-Closed)
    try {
      const bucket = this.getBucket();
      const file = bucket.file(storageKey);

      await file.save(buffer, {
        resumable: false,
        validation: 'crc32c',
        metadata: {
          contentType: mimeType,
          metadata: {
            requestId,
            fileId,
            ownerToken,
            originalName: encodeURIComponent(originalName),
            sanitizedName,
            size: size.toString(),
            mimeType,
            createdAt: createdAt.toString(),
            expiresAt: expiresAt.toString(),
            status: 'temporary'
          }
        }
      });

      return {
        requestId,
        fileId,
        ownerToken,
        originalName,
        sanitizedName,
        size,
        mimeType,
        createdAt,
        expiresAt,
        status: 'temporary',
        storageKey
      };
    } catch (err: any) {
      console.error(`[STORAGE FAIL-CLOSED] Failed to persist temporary object in Google Cloud Storage (${storageKey}):`, err);
      throw new StorageServiceError(
        `Failed to persist file in Google Cloud Storage: ${err?.message || 'Storage write failed'}`,
        503,
        'Secure cloud storage service is currently unavailable. Your file was not saved. Please try again later.'
      );
    }
  }

  // --- GET TEMPORARY FILE METADATA ---
  public async getTemporaryFile(fileId: string, requestId?: string): Promise<StagedFileRecord | null> {
    if (!SAFE_FILE_ID_REGEX.test(fileId)) return null;

    // 1. Explicit Development/Test Emulator
    if (this.isEmulatorMode) {
      if (requestId && SAFE_REQUEST_ID_REGEX.test(requestId)) {
        const metaPath = path.join(this.emulatorDir, 'temporary', requestId, `${fileId}.meta.json`);
        if (!fs.existsSync(metaPath)) return null;
        try {
          const raw = fs.readFileSync(metaPath, 'utf-8');
          return JSON.parse(raw) as StagedFileRecord;
        } catch {
          return null;
        }
      }

      const tempBase = path.join(this.emulatorDir, 'temporary');
      if (!fs.existsSync(tempBase)) return null;
      const requestDirs = fs.readdirSync(tempBase);

      for (const rDir of requestDirs) {
        const metaPath = path.join(tempBase, rDir, `${fileId}.meta.json`);
        if (fs.existsSync(metaPath)) {
          try {
            const raw = fs.readFileSync(metaPath, 'utf-8');
            return JSON.parse(raw) as StagedFileRecord;
          } catch {}
        }
      }
      return null;
    }

    // 2. Production / Real Google Cloud Storage (Fail-Closed)
    try {
      const bucket = this.getBucket();

      if (requestId && SAFE_REQUEST_ID_REGEX.test(requestId)) {
        const file = bucket.file(`temporary/${requestId}/${fileId}`);
        const [exists] = await file.exists().catch((e) => {
          if (e?.code === 403 || e?.code === 401) {
            throw e;
          }
          return [false];
        });
        if (!exists) return null;

        const [meta] = await file.getMetadata();
        return this.parseGcsMetadata(file.name, meta);
      }

      // If requestId is not provided, locate file under temporary/ prefix
      const [files] = await bucket.getFiles({
        prefix: 'temporary/',
        autoPaginate: false,
        maxResults: 100
      });

      const matched = files.find(f => f.name.endsWith(`/${fileId}`));
      if (!matched) return null;

      const [meta] = await matched.getMetadata();
      return this.parseGcsMetadata(matched.name, meta);
    } catch (err: any) {
      console.error(`[STORAGE FAIL-CLOSED] Failed to query object from Google Cloud Storage (${fileId}):`, err);
      throw new StorageServiceError(
        `Failed to query cloud storage: ${err?.message || 'Storage query failed'}`,
        503,
        'Secure cloud storage service is currently unavailable. Please try again later.'
      );
    }
  }

  // --- DELETE TEMPORARY FILE (IDEMPOTENT) ---
  public async deleteTemporaryFile(fileId: string, requestId?: string): Promise<{ success: boolean; alreadyDeleted: boolean }> {
    if (!SAFE_FILE_ID_REGEX.test(fileId)) {
      return { success: false, alreadyDeleted: false };
    }

    // 1. Explicit Development/Test Emulator
    if (this.isEmulatorMode) {
      const record = await this.getTemporaryFile(fileId, requestId);
      if (!record) {
        return { success: true, alreadyDeleted: true };
      }

      const reqId = record.requestId;
      const dataPath = path.join(this.emulatorDir, 'temporary', reqId, `${fileId}.data`);
      const metaPath = path.join(this.emulatorDir, 'temporary', reqId, `${fileId}.meta.json`);

      if (fs.existsSync(dataPath)) {
        try { fs.unlinkSync(dataPath); } catch {}
      }
      if (fs.existsSync(metaPath)) {
        try { fs.unlinkSync(metaPath); } catch {}
      }

      return { success: true, alreadyDeleted: false };
    }

    // 2. Production / Real Google Cloud Storage (Fail-Closed)
    try {
      const bucket = this.getBucket();
      let file = requestId && SAFE_REQUEST_ID_REGEX.test(requestId)
        ? bucket.file(`temporary/${requestId}/${fileId}`)
        : null;

      if (!file) {
        const [files] = await bucket.getFiles({ prefix: 'temporary/', maxResults: 100 });
        const matched = files.find(f => f.name.endsWith(`/${fileId}`));
        if (!matched) {
          return { success: true, alreadyDeleted: true };
        }
        file = matched;
      }

      const [exists] = await file.exists().catch((e) => {
        if (e?.code === 403 || e?.code === 401) {
          throw e;
        }
        return [false];
      });
      if (!exists) {
        return { success: true, alreadyDeleted: true };
      }

      await file.delete({ ignoreNotFound: true });
      return { success: true, alreadyDeleted: false };
    } catch (err: any) {
      console.error(`[STORAGE FAIL-CLOSED] Failed to delete temporary object from Google Cloud Storage (${fileId}):`, err);
      throw new StorageServiceError(
        `Failed to delete from cloud storage: ${err?.message || 'Storage delete failed'}`,
        503,
        'Unable to remove file from secure cloud storage. Please try again later.'
      );
    }
  }

  // --- PROMOTE TEMPORARY FILE TO CONFIRMED ---
  public async promoteToConfirmed(fileId: string, requestId: string): Promise<StagedFileRecord> {
    const tempKey = `temporary/${requestId}/${fileId}`;
    const confirmedKey = `confirmed/${requestId}/${fileId}`;

    // 1. Explicit Development/Test Emulator
    if (this.isEmulatorMode) {
      const tempDir = path.join(this.emulatorDir, 'temporary', requestId);
      const confDir = path.join(this.emulatorDir, 'confirmed', requestId);

      if (!fs.existsSync(confDir)) {
        fs.mkdirSync(confDir, { recursive: true });
      }

      const tempData = path.join(tempDir, `${fileId}.data`);
      const tempMeta = path.join(tempDir, `${fileId}.meta.json`);
      const confData = path.join(confDir, `${fileId}.data`);
      const confMeta = path.join(confDir, `${fileId}.meta.json`);

      if (!fs.existsSync(tempData) || !fs.existsSync(tempMeta)) {
        throw new StorageServiceError(`Temporary file ${fileId} does not exist.`, 404, 'Temporary file not found.');
      }

      fs.copyFileSync(tempData, confData);
      const raw = fs.readFileSync(tempMeta, 'utf-8');
      const record: StagedFileRecord = JSON.parse(raw);
      record.status = 'confirmed';
      record.storageKey = confirmedKey;

      fs.writeFileSync(confMeta, JSON.stringify(record, null, 2), 'utf-8');

      try { fs.unlinkSync(tempData); } catch {}
      try { fs.unlinkSync(tempMeta); } catch {}

      return record;
    }

    // 2. Production / Real Google Cloud Storage (Fail-Closed)
    try {
      const bucket = this.getBucket();
      const sourceFile = bucket.file(tempKey);
      const destFile = bucket.file(confirmedKey);

      const [exists] = await sourceFile.exists();
      if (!exists) {
        throw new StorageServiceError(`Temporary object ${tempKey} does not exist in bucket.`, 404, 'Temporary file not found or expired.');
      }

      const [sourceMeta] = await sourceFile.getMetadata();
      const custom = sourceMeta.metadata || {};

      // Server-side atomic copy to confirmed/ prefix
      await sourceFile.copy(destFile);

      // Update confirmed metadata
      await destFile.setMetadata({
        contentType: sourceMeta.contentType,
        metadata: {
          ...custom,
          status: 'confirmed',
          confirmedAt: Date.now().toString()
        }
      });

      // Purge temporary object
      await sourceFile.delete({ ignoreNotFound: true });

      const [finalMeta] = await destFile.getMetadata();
      return this.parseGcsMetadata(confirmedKey, finalMeta);
    } catch (err: any) {
      console.error(`[STORAGE FAIL-CLOSED] Failed to promote object in Google Cloud Storage (${tempKey} -> ${confirmedKey}):`, err);
      if (err instanceof StorageServiceError) throw err;
      throw new StorageServiceError(
        `Failed to promote file in Google Cloud Storage: ${err?.message || 'Storage promotion failed'}`,
        503,
        'Unable to secure your files in confirmed cloud storage. Your project was not submitted.'
      );
    }
  }

  // --- APPLICATION SWEEP OF EXPIRED TEMPORARY OBJECTS (OPTIMIZATION LAYER) ---
  public async cleanupExpiredTemporary(): Promise<{ scanned: number; expired: number }> {
    let scanned = 0;
    let expired = 0;
    const now = Date.now();

    // 1. Explicit Development/Test Emulator
    if (this.isEmulatorMode) {
      try {
        const tempBase = path.join(this.emulatorDir, 'temporary');
        if (!fs.existsSync(tempBase)) return { scanned, expired };
        const requestDirs = fs.readdirSync(tempBase);

        for (const rDir of requestDirs) {
          const rPath = path.join(tempBase, rDir);
          const metaFiles = fs.readdirSync(rPath).filter(f => f.endsWith('.meta.json'));

          for (const mFile of metaFiles) {
            scanned++;
            const metaPath = path.join(rPath, mFile);
            try {
              const record: StagedFileRecord = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
              if (record.status === 'temporary' && record.expiresAt <= now) {
                const dataPath = path.join(rPath, `${record.fileId}.data`);
                if (fs.existsSync(dataPath)) fs.unlinkSync(dataPath);
                fs.unlinkSync(metaPath);
                expired++;
                console.log(`[STORAGE-CLEANUP] Deleted expired local object: ${record.fileId}`);
              }
            } catch {}
          }

          const remaining = fs.readdirSync(rPath);
          if (remaining.length === 0) {
            try { fs.rmdirSync(rPath); } catch {}
          }
        }
      } catch (err) {
        console.error('[STORAGE-CLEANUP] Error scanning local temporary directory:', err);
      }
      return { scanned, expired };
    }

    // 2. Production / Real Google Cloud Storage (Lifecycle is primary authority)
    try {
      const bucket = this.getBucket();
      const [files] = await bucket.getFiles({ prefix: 'temporary/' });

      for (const file of files) {
        scanned++;
        try {
          const [meta] = await file.getMetadata();
          const expiresAtVal = meta.metadata?.expiresAt;
          if (expiresAtVal !== undefined && expiresAtVal !== null) {
            const expiresAt = parseInt(String(expiresAtVal), 10);
            if (!isNaN(expiresAt) && expiresAt <= now) {
              await file.delete({ ignoreNotFound: true });
              expired++;
              console.log(`[STORAGE-CLEANUP] Deleted expired GCS object: ${file.name}`);
            }
          }
        } catch (e) {
          console.error(`Error checking GCS object ${file.name}:`, e);
        }
      }
    } catch (err) {
      console.error('[STORAGE-CLEANUP] GCS sweep encountered error (non-fatal background sweep):', err);
    }

    return { scanned, expired };
  }

  private parseGcsMetadata(objectName: string, meta: any): StagedFileRecord {
    const custom = meta.metadata || {};
    return {
      requestId: custom.requestId || objectName.split('/')[1] || 'unknown',
      fileId: custom.fileId || path.basename(objectName),
      ownerToken: custom.ownerToken || '',
      originalName: custom.originalName ? decodeURIComponent(custom.originalName) : 'upload',
      sanitizedName: custom.sanitizedName || 'upload',
      size: parseInt(String(custom.size || meta.size || '0'), 10),
      mimeType: String(custom.mimeType || meta.contentType || 'application/octet-stream'),
      createdAt: parseInt(String(custom.createdAt || '0'), 10),
      expiresAt: parseInt(String(custom.expiresAt || '0'), 10),
      status: (custom.status as any) || 'temporary',
      storageKey: objectName
    };
  }
}

// Export singleton instance
export const storageProvider = new StorageProvider();
