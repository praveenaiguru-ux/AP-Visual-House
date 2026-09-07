import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import multer from 'multer';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import {
  storageProvider,
  SAFE_FILE_ID_REGEX,
  SAFE_REQUEST_ID_REGEX,
  StagedFileRecord,
  StorageServiceError
} from './server/storage';
import {
  generateOAuthStartUrl,
  validateSignedOAuthState,
  exchangeCodeForTokens,
  getDriveStatus,
  isDriveOAuthConfigured,
  getDriveRedirectUri,
  GOOGLE_DRIVE_SCOPE
} from './server/driveAuth';
import {
  transferConfirmedProjectToDrive,
  DriveTransferResult
} from './server/driveTransfer';

/**
 * AP VISUAL HOUSE — CLOUD RUN BACKEND SERVICE
 * PHASE 5.2A: DURABLE PRIVATE GOOGLE CLOUD STORAGE ARCHITECTURE
 * 
 * Storage Architecture:
 * - Temporary Objects:  temporary/{requestId}/{fileId}
 * - Confirmed Objects:  confirmed/{requestId}/{fileId}
 * - Zero Public Access: Private bucket access via Cloud Run Service Account (ADC)
 * - Authoritative Safety Net: Google Cloud Storage Object Lifecycle Policy
 * - Client UX Safeguard: Zero network upload until final "Submit Project Request"
 * - Idempotent Operations: Repeated delete/submit handled gracefully without duplicate artifacts
 */

const PORT = Number(process.env.PORT) || 8080;
const HOST = '0.0.0.0';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB per file
const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // 25 MB total per request
const MAX_FILES = 5;

// Configurable Retention Window (Default: 24 hours)
const DEFAULT_RETENTION_HOURS = 24;
const RETENTION_HOURS = process.env.TEMP_UPLOAD_RETENTION_HOURS
  ? Math.max(0.001, parseFloat(process.env.TEMP_UPLOAD_RETENTION_HOURS))
  : DEFAULT_RETENTION_HOURS;
const RETENTION_MS = Math.round(RETENTION_HOURS * 60 * 60 * 1000);

// Allowed MIME / Content-Types
const ALLOWED_MIME_PREFIXES = [
  'image/',
  'video/mp4',
  'video/quicktime',
  'audio/mpeg',
  'application/pdf',
  'application/zip',
  'application/x-zip-compressed',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/acad',
  'application/x-dwg',
  'image/vnd.dwg'
];

function isMimeAllowed(mimeType: string, filename: string): boolean {
  const lowerMime = (mimeType || '').toLowerCase();
  const lowerName = filename.toLowerCase();

  const mimeMatch = ALLOWED_MIME_PREFIXES.some(prefix => lowerMime.startsWith(prefix));
  if (mimeMatch) return true;

  const allowedExtensions = [
    '.dwg', '.dxf', '.pdf', '.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif',
    '.heic', '.raw', '.cr2', '.nef', '.mp4', '.mov', '.mp3', '.zip', '.txt', '.doc', '.docx'
  ];
  return allowedExtensions.some(ext => lowerName.endsWith(ext));
}

// Filename sanitizer (only for display metadata, never used in storage keys)
function sanitizeFilename(originalName: string): string {
  const basename = path.basename(originalName);
  const cleaned = basename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const ext = path.extname(cleaned);
  const nameWithoutExt = path.basename(cleaned, ext);
  const truncated = nameWithoutExt.substring(0, 60);
  return `${truncated || 'upload'}${ext}`;
}

// Multer memory storage: streaming directly to GCS/StorageProvider
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1 // Upload one file per request to support granular progress & retry
  },
  fileFilter: (_req, file, cb) => {
    if (isMimeAllowed(file.mimetype, file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error(`File format for "${file.originalname}" is not supported.`));
    }
  }
});

// Lightweight IP-based rate limiting (in-memory sliding window)
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const uploadRateLimits = new Map<string, RateLimitRecord>();
const submitRateLimits = new Map<string, RateLimitRecord>();

function checkRateLimit(map: Map<string, RateLimitRecord>, ip: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const record = map.get(ip);
  if (!record || now > record.resetAt) {
    map.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (record.count >= maxRequests) {
    return false;
  }
  record.count++;
  return true;
}

// Run periodic application-level sweeper every 5 minutes (optimization layer)
const cleanupInterval = setInterval(async () => {
  try {
    await storageProvider.cleanupExpiredTemporary();
  } catch (err) {
    console.error('[STORAGE-SWEEP] Background sweep error:', err);
  }
}, 5 * 60 * 1000);
cleanupInterval.unref();

async function startServer() {
  const app = express();

  // Security Headers Middleware
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  });

  // CORS Middleware: Restricted to AP Visual House origins and local development
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowedPatterns = [
      /^http:\/\/localhost(:\d+)?$/,
      /^http:\/\/127\.0\.0\.1(:\d+)?$/,
      /^https:\/\/ais-[a-z0-9-]+\.run\.app$/,
      /^https:\/\/.*\.apvisualhouse\.com$/
    ];

    if (process.env.APP_URL) {
      try {
        const appUrlOrigin = new URL(process.env.APP_URL).origin;
        if (origin === appUrlOrigin) {
          res.setHeader('Access-Control-Allow-Origin', origin);
        }
      } catch {}
    }

    if (origin && allowedPatterns.some(pat => pat.test(origin))) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-upload-token, x-request-id');

    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
      return;
    }
    next();
  });

  // Body parsers
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // API Request Logger
  app.use((req, _res, next) => {
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.path}`);
    }
    next();
  });

  // Health check & contract endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'AP Visual House Cloud Run Backend',
      storageBackend: storageProvider.isUsingGCS()
        ? 'Google Cloud Storage (Private Bucket)'
        : 'Development Storage Emulator',
      storageEnvironment: storageProvider.getEnvironment(),
      bucketConfigured: storageProvider.getBucketName(),
      projectIdConfigured: storageProvider.getProjectId(),
      failClosedEnforced: true,
      emulatorAllowedInProduction: false,
      uploadContract: {
        maxFiles: MAX_FILES,
        maxFileSize: MAX_FILE_SIZE,
        maxTotalSize: MAX_TOTAL_SIZE,
        retentionHours: RETENTION_HOURS,
        allowedMimes: ALLOWED_MIME_PREFIXES,
        objectStructure: {
          temporaryPrefix: 'temporary/{requestId}/{fileId}',
          confirmedPrefix: 'confirmed/{requestId}/{fileId}'
        }
      }
    });
  });

  // ==============================================================================
  // GOOGLE DRIVE OWNER OAUTH 2.0 INFRASTRUCTURE (PHASE 5.3A)
  // Backend Owner-Only Authorization — Zero Customer Auth
  // ==============================================================================

  // Safe Google Drive Integration Status
  app.get(['/api/drive/status', '/api/drive/oauth/status'], async (_req: Request, res: Response) => {
    try {
      const status = await getDriveStatus();
      res.json(status);
    } catch (err: any) {
      res.status(500).json({
        configured: false,
        connected: false,
        error: 'Failed to retrieve Google Drive status.'
      });
    }
  });

  // Initiates Google Drive OAuth 2.0 Authorization for the Studio Owner
  app.get('/api/drive/oauth/start', async (req: Request, res: Response) => {
    try {
      const configured = await isDriveOAuthConfigured();
      if (!configured) {
        res.status(503).json({
          error: 'Google Drive OAuth is not configured on this server.',
          message: 'Please configure google-drive-client-secret and drive-oauth-hmac-secret in Secret Manager, and GOOGLE_DRIVE_CLIENT_ID.',
          redirectUriConfigured: getDriveRedirectUri()
        });
        return;
      }

      const { url, state, nonce } = await generateOAuthStartUrl();

      // Set secure HTTP-only cookie with nonce for CSRF validation
      const isProd = process.env.NODE_ENV === 'production';
      res.cookie('drive_oauth_nonce', nonce, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/api/drive/oauth',
        maxAge: 15 * 60 * 1000 // 15 minutes
      });

      console.log('[OAUTH] Initiated Google Drive owner authorization flow.');

      if (req.query.format === 'json') {
        res.json({
          authUrl: url,
          state,
          scope: GOOGLE_DRIVE_SCOPE
        });
        return;
      }

      res.redirect(url);
    } catch (err: any) {
      console.error('[OAUTH] Error generating OAuth start URL:', err?.message || err);
      res.status(500).json({
        error: 'Failed to initiate Google Drive authorization flow.'
      });
    }
  });

  // Google OAuth 2.0 Callback Handler
  app.get('/api/drive/oauth/callback', async (req: Request, res: Response) => {
    const { code, state, error } = req.query;

    // 1. Check for error returned by Google or owner cancellation
    if (error) {
      const sanitizedError = String(error).replace(/[^\w-]/g, '');
      console.warn(`[OAUTH] Google Drive OAuth authorization failed or user declined: ${sanitizedError}`);
      res.status(400).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Google Drive Authorization Failed</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0c0d0e; color: #f0f0f0; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
    .card { background: #16181b; border: 1px solid #2a2e35; border-radius: 12px; padding: 32px; max-width: 500px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    h1 { color: #f87171; font-size: 20px; margin-top: 0; }
    p { color: #a1a1aa; font-size: 14px; line-height: 1.6; }
    .btn { display: inline-block; background: #2563eb; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Authorization Cancelled or Denied</h1>
    <p>Google returned an authorization error (<code>${sanitizedError}</code>).</p>
    <p>The owner's Google account was not linked to the backend service.</p>
    <a class="btn" href="/api/drive/oauth/start">Try Again</a>
  </div>
</body>
</html>`);
      return;
    }

    // 2. Validate cryptographic CSRF state parameter
    const cookieHeader = req.headers.cookie;
    let cookieNonce: string | undefined;
    if (cookieHeader) {
      for (const piece of cookieHeader.split(';')) {
        const [k, ...v] = piece.trim().split('=');
        if (k === 'drive_oauth_nonce') {
          cookieNonce = decodeURIComponent(v.join('='));
          break;
        }
      }
    }

    const validation = await validateSignedOAuthState(state as string, cookieNonce);
    if (!validation.valid) {
      console.warn(`[OAUTH] OAuth callback rejected: ${validation.reason}`);
      res.status(400).json({
        error: 'Invalid or expired OAuth state parameter. Request rejected to protect against CSRF.',
        details: validation.reason
      });
      return;
    }

    // 3. Validate authorization code
    if (!code || typeof code !== 'string') {
      res.status(400).json({ error: 'Authorization code is missing from Google OAuth callback.' });
      return;
    }

    // 4. Exchange authorization code for tokens & persist securely in Secret Manager
    try {
      const result = await exchangeCodeForTokens(code);
      console.log('[OAUTH] Google Drive owner authorization completed successfully.');

      // Clear the nonce cookie
      res.clearCookie('drive_oauth_nonce', { path: '/api/drive/oauth' });

      if (req.query.format === 'json' || req.headers.accept?.includes('application/json')) {
        res.json({
          success: true,
          message: 'Google Drive owner authorization completed successfully.',
          scope: GOOGLE_DRIVE_SCOPE,
          hasRefreshToken: result.hasRefreshToken,
          savedToSecretManager: result.savedToSecretManager
        });
        return;
      }

      res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Google Drive Authorized — AP Visual House</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0c0d0e; color: #f0f0f0; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
    .card { background: #16181b; border: 1px solid #2a2e35; border-radius: 12px; padding: 36px; max-width: 520px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .badge { display: inline-block; background: #064e3b; color: #34d399; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 9999px; margin-bottom: 16px; letter-spacing: 0.05em; text-transform: uppercase; }
    h1 { color: #ffffff; font-size: 22px; margin: 0 0 12px 0; }
    p { color: #a1a1aa; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0; }
    .detail-box { background: #1f2329; border-radius: 8px; padding: 14px; margin: 18px 0; font-size: 13px; font-family: monospace; color: #d4d4d8; }
    .detail-row { display: flex; justify-content: space-between; padding: 4px 0; }
    .detail-label { color: #71717a; }
    .btn { display: inline-block; background: #2563eb; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Connected</span>
    <h1>Google Drive Authorized</h1>
    <p>The AP Visual House backend has been successfully linked to the studio owner's Google account. The refresh token is securely managed via Google Cloud Secret Manager.</p>
    <div class="detail-box">
      <div class="detail-row"><span class="detail-label">Authorized Scope:</span><span>drive.file</span></div>
      <div class="detail-row"><span class="detail-label">Access Type:</span><span>Offline (Refresh Token)</span></div>
      <div class="detail-row"><span class="detail-label">Storage Target:</span><span>Google Cloud Secret Manager</span></div>
    </div>
    <p style="font-size: 12px; color: #71717a;">Customer uploads remain strictly isolated in private GCS temporary staging. The customer GCS bucket is not used for credential storage.</p>
    <a class="btn" href="/api/drive/status">View Integration Status</a>
  </div>
</body>
</html>`);
    } catch (err: any) {
      console.error('[OAUTH] Failed to exchange authorization code for tokens:', err?.message || err);
      res.status(500).json({
        error: 'Failed to complete Google Drive authorization.',
        details: 'Unable to exchange authorization code with Google. Please verify your client secret and redirect URI.'
      });
    }
  });

  // 1. UPLOAD SINGLE FILE (Streams directly to Private GCS temporary prefix)
  app.post('/api/upload/file', (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    // Rate limit: Max 40 uploads per 5 minutes per IP
    if (!checkRateLimit(uploadRateLimits, ip, 40, 5 * 60 * 1000)) {
      res.status(429).json({ error: 'Upload rate limit exceeded. Please wait a moment before trying again.' });
      return;
    }
    next();
  }, upload.single('file'), async (req: Request, res: Response) => {
    try {
      const file = req.file;
      if (!file) {
        res.status(400).json({ error: 'No file provided or file rejected.' });
        return;
      }

      // Backend size limit check
      if (file.size > MAX_FILE_SIZE) {
        res.status(400).json({
          error: `File "${file.originalname}" exceeds the maximum allowed limit of 10 MB.`
        });
        return;
      }

      // Request ID: Validate incoming or generate safe ID
      let requestId = req.body?.requestId;
      if (!requestId || !SAFE_REQUEST_ID_REGEX.test(requestId)) {
        requestId = 'req_' + crypto.randomBytes(8).toString('hex');
      }

      // Generate cryptographically unique file ID & ownership token
      const fileId = 'up_' + crypto.randomBytes(12).toString('hex');
      const ownerToken = crypto.randomBytes(24).toString('hex');
      const sanitized = sanitizeFilename(file.originalname);
      const now = Date.now();
      const expiresAt = now + RETENTION_MS;

      // Stream directly to durable private storage
      const record = await storageProvider.saveTemporaryFile({
        requestId,
        fileId,
        ownerToken,
        originalName: file.originalname,
        sanitizedName: sanitized,
        mimeType: file.mimetype,
        buffer: file.buffer,
        size: file.size,
        createdAt: now,
        expiresAt
      });

      res.status(201).json({
        success: true,
        requestId: record.requestId,
        fileId: record.fileId,
        ownerToken: record.ownerToken,
        originalName: record.originalName,
        sanitizedName: record.sanitizedName,
        size: record.size,
        mimeType: record.mimeType,
        status: 'uploaded',
        expiresAt: record.expiresAt,
        storageKey: record.storageKey,
        storageBackend: storageProvider.isUsingGCS() ? 'gcs' : 'emulated',
        message: 'File successfully received into durable private temporary staging.'
      });
    } catch (err: any) {
      console.error('[UPLOAD ERROR]', err);
      const statusCode = err instanceof StorageServiceError ? err.statusCode : (err?.statusCode || 500);
      const userMessage = err instanceof StorageServiceError
        ? err.userSafeMessage
        : 'Failed to process file upload. Please try again.';
      res.status(statusCode).json({
        success: false,
        error: userMessage
      });
    }
  });

  // 2. DELETE TEMPORARY FILE BEFORE FINAL SUBMISSION (Requires owner token; Idempotent)
  app.delete(['/api/upload/:fileId', '/api/upload/file/:fileId'], async (req: Request, res: Response) => {
    try {
      const { fileId } = req.params;

      if (!fileId || !SAFE_FILE_ID_REGEX.test(fileId)) {
        res.status(400).json({ error: 'Invalid temporary file identifier format.' });
        return;
      }

      const providedToken =
        (req.headers['x-upload-token'] as string) ||
        (req.query.token as string) ||
        req.body?.ownerToken;

      const requestId =
        (req.headers['x-request-id'] as string) ||
        (req.query.requestId as string) ||
        req.body?.requestId;

      // Retrieve metadata from durable storage
      const record = await storageProvider.getTemporaryFile(fileId, requestId);

      // Idempotency: If object is already removed, return safe 200 response
      if (!record) {
        res.status(200).json({
          success: true,
          fileId,
          message: 'Temporary upload already removed or expired.',
          status: 'already_deleted'
        });
        return;
      }

      // Security check: Verify cryptographic ownership token
      if (!providedToken || providedToken !== record.ownerToken) {
        res.status(403).json({
          error: 'Forbidden: Invalid or missing ownership token for this temporary upload.'
        });
        return;
      }

      // Authorized deletion from durable storage
      await storageProvider.deleteTemporaryFile(fileId, record.requestId);

      res.status(200).json({
        success: true,
        fileId,
        message: 'Temporary upload purged successfully from storage.',
        status: 'deleted'
      });
    } catch (err: any) {
      console.error('[DELETE ERROR]', err);
      const statusCode = err instanceof StorageServiceError ? err.statusCode : 500;
      const userMessage = err instanceof StorageServiceError
        ? err.userSafeMessage
        : 'Failed to delete temporary file.';
      res.status(statusCode).json({
        success: false,
        error: userMessage
      });
    }
  });

  // 3. APPLICATION-LEVEL SWEEPER TRIGGER (For testing & scheduled worker execution)
  app.post('/api/upload/cleanup', async (_req: Request, res: Response) => {
    try {
      const result = await storageProvider.cleanupExpiredTemporary();
      res.json({
        success: true,
        ...result,
        retentionHours: RETENTION_HOURS,
        storageBackend: storageProvider.isUsingGCS() ? 'gcs' : 'emulated',
        message: `Cleaned up ${result.expired} expired upload(s) from storage.`
      });
    } catch (err: any) {
      console.error('[CLEANUP ERROR]', err);
      res.status(500).json({ error: 'Failed to run temporary cleanup.' });
    }
  });

  // 4. FINAL PROJECT REQUEST SUBMISSION & PROMOTION TO CONFIRMED STORAGE
  app.post('/api/projects/submit', async (req: Request, res: Response) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    // Rate limit: Max 15 project submissions per 10 minutes per IP
    if (!checkRateLimit(submitRateLimits, ip, 15, 10 * 60 * 1000)) {
      res.status(429).json({ error: 'Submission rate limit exceeded. Please wait a moment.' });
      return;
    }

    try {
      const {
        requestId: incomingRequestId,
        name,
        whatsapp,
        email,
        requirements,
        serviceName,
        startingPrice,
        currency,
        files = [],
        fileIds = [],
        hasConfirmedPolicy,
        contentPolicyAccepted
      } = req.body;

      // Authoritative backend validation
      if (!name || typeof name !== 'string' || !name.trim()) {
        res.status(400).json({ error: 'Customer name is required.' });
        return;
      }
      if (!whatsapp || typeof whatsapp !== 'string' || !whatsapp.trim()) {
        res.status(400).json({ error: 'WhatsApp contact number is required.' });
        return;
      }
      // Content policy validation
      const policyConfirmed = Boolean(hasConfirmedPolicy || contentPolicyAccepted);
      if (!policyConfirmed) {
        res.status(400).json({ error: 'Content policy compliance confirmation is required.' });
        return;
      }

      // Collect target file references
      interface TargetRef {
        fileId: string;
        requestId?: string;
        ownerToken?: string;
      }
      const targetMap = new Map<string, TargetRef>();

      if (Array.isArray(files)) {
        for (const item of files) {
          if (item && typeof item.fileId === 'string' && SAFE_FILE_ID_REGEX.test(item.fileId)) {
            targetMap.set(item.fileId, {
              fileId: item.fileId,
              requestId: item.requestId,
              ownerToken: item.ownerToken
            });
          }
        }
      }

      if (Array.isArray(fileIds)) {
        for (const id of fileIds) {
          if (typeof id === 'string' && SAFE_FILE_ID_REGEX.test(id)) {
            if (!targetMap.has(id)) {
              targetMap.set(id, { fileId: id });
            }
          }
        }
      }

      // Enforce file count ceiling
      if (targetMap.size > MAX_FILES) {
        res.status(400).json({ error: `Cannot submit more than ${MAX_FILES} files per request.` });
        return;
      }

      let combinedSize = 0;
      const validRecords: StagedFileRecord[] = [];
      const now = Date.now();

      // Validate all files against durable storage
      for (const [id, ref] of targetMap.entries()) {
        const record = await storageProvider.getTemporaryFile(id, ref.requestId || incomingRequestId);
        if (!record) {
          res.status(400).json({
            error: `Temporary file "${id}" not found or has already expired. Please re-upload your files.`
          });
          return;
        }

        // Validate ownerToken if provided
        if (ref.ownerToken && ref.ownerToken !== record.ownerToken) {
          res.status(403).json({
            error: `Forbidden: Unauthorized file ownership token for file "${id}".`
          });
          return;
        }

        // Validate status
        if (record.status !== 'temporary') {
          res.status(400).json({
            error: `File "${record.sanitizedName}" is not in a valid temporary state.`
          });
          return;
        }

        // Validate expiration
        if (record.expiresAt <= now) {
          res.status(400).json({
            error: `File "${record.sanitizedName}" has expired. Please re-upload.`
          });
          return;
        }

        combinedSize += record.size;
        validRecords.push(record);
      }

      // Enforce total request size ceiling
      if (combinedSize > MAX_TOTAL_SIZE) {
        res.status(400).json({
          error: `Total combined upload size (${(combinedSize / (1024 * 1024)).toFixed(1)} MB) exceeds the 25 MB limit.`
        });
        return;
      }

      // PROMOTION: Files are promoted from temporary/ to confirmed/ ONLY AFTER ALL VALIDATIONS PASS
      const confirmedFiles: { fileId: string; storageKey: string; sanitizedName: string }[] = [];
      for (const record of validRecords) {
        const confirmed = await storageProvider.promoteToConfirmed(record.fileId, record.requestId);
        confirmedFiles.push({
          fileId: confirmed.fileId,
          storageKey: confirmed.storageKey,
          sanitizedName: confirmed.sanitizedName
        });
      }

      const projectId = 'APV-' + Date.now().toString(36).toUpperCase();
      const submittedAt = new Date().toISOString();

      let finalRequestId = incomingRequestId;
      if (!finalRequestId || !SAFE_REQUEST_ID_REGEX.test(finalRequestId)) {
        finalRequestId = validRecords[0]?.requestId || ('req_' + crypto.randomBytes(8).toString('hex'));
      }

      console.log(`[PROJECT CONFIRMED] ${projectId} for ${serviceName} by ${name} (${whatsapp}) with ${confirmedFiles.length} file(s) in confirmed storage.`);

      // PHASE 5.3B: CONFIRMED GCS -> OWNER GOOGLE DRIVE TRANSFER
      // GCS confirmation remains authoritative: if Drive transfer is pending or fails,
      // confirmed GCS files are NEVER deleted and a controlled safe response is returned.
      let driveTransferResult: DriveTransferResult | null = null;
      try {
        driveTransferResult = await transferConfirmedProjectToDrive({
          requestId: finalRequestId,
          service: serviceName,
          customer: name,
          contact: whatsapp,
          email: email || undefined,
          requirement: requirements || undefined,
          startingQuote: startingPrice ? `${currency || ''}${startingPrice}` : undefined,
          submittedAt,
          files: confirmedFiles.map(cf => ({ fileId: cf.fileId }))
        });
      } catch (driveErr: any) {
        console.error(`[DRIVE] Transfer failed for request ${finalRequestId}:`, driveErr?.message || driveErr);
        driveTransferResult = {
          success: false,
          transferredFiles: 0,
          alreadyPresentFiles: 0,
          failedFiles: confirmedFiles.length,
          metadataUpdated: false,
          error: driveErr?.message || 'Drive transfer temporarily unavailable'
        };
      }

      const isDriveSuccess = driveTransferResult?.success === true;

      res.status(200).json({
        success: true,
        projectId,
        serviceName,
        name,
        whatsapp,
        email: email || undefined,
        requirements: requirements || undefined,
        startingPrice,
        currency,
        filesAttached: confirmedFiles.length,
        confirmedFiles,
        driveTransfer: {
          status: isDriveSuccess ? 'completed' : 'pending',
          transferredFiles: driveTransferResult?.transferredFiles || 0,
          alreadyPresentFiles: driveTransferResult?.alreadyPresentFiles || 0
        },
        message: isDriveSuccess
          ? 'Project request received and secured in confirmed storage and owner Google Drive.'
          : 'Project request received and secured in private confirmed storage. Owner storage transfer is pending.'
      });
    } catch (err: any) {
      console.error('[SUBMISSION ERROR]', err);
      // NOTE: If submission fails, files remain in temporary/ prefix and expire cleanly via retention policy
      const statusCode = err instanceof StorageServiceError ? err.statusCode : 500;
      const userMessage = err instanceof StorageServiceError
        ? err.userSafeMessage
        : 'Server error while submitting project request. Temporary files remain preserved for retry.';
      res.status(statusCode).json({
        success: false,
        error: userMessage
      });
    }
  });

  // Express & Multer Error Handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({ error: 'File exceeds the maximum allowed 10 MB limit.' });
        return;
      }
      res.status(400).json({ error: err.message });
      return;
    }
    if (err) {
      res.status(400).json({ error: err.message || 'An error occurred during file processing.' });
      return;
    }
  });

  // Vite middleware in dev or static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`AP Visual House server running on http://${HOST}:${PORT}`);
    console.log(`Storage Mode: ${storageProvider.isUsingGCS() ? 'Google Cloud Storage' : 'Durable Emulation'} (Retention: ${RETENTION_HOURS}h)`);
  });
}

startServer();
