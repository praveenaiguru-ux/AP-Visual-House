import { google } from 'googleapis';
import crypto from 'crypto';
import {
  SECRET_NAMES,
  getSecretValue,
  persistSecretVersion,
  _resetSecretCacheForTesting
} from './secretManager';

/**
 * AP VISUAL HOUSE — OWNER GOOGLE DRIVE OAUTH 2.0 SERVICE (HARDENED)
 *
 * Target Architecture:
 * - Owner-Only Authorization: Authorizes the studio owner's Google account once.
 * - Customer Isolation: Customers NEVER authenticate with Google or see OAuth consent.
 * - Minimum Scope: Strictly 'https://www.googleapis.com/auth/drive.file'.
 *   (Strictly forbids 'https://www.googleapis.com/auth/drive')
 * - Offline Access: Requests access_type=offline and prompt=consent to guarantee refresh token.
 * - Stateless CSRF Protection: Cryptographically signed HMAC-SHA256 state token with timestamp.
 * - Google Cloud Secret Manager Token Persistence:
 *   Owner refresh token is managed strictly via Google Cloud Secret Manager
 *   (`google-drive-refresh-token`) in project `gen-lang-client-0268928491`.
 *   The customer GCS bucket is NEVER used for credential or token storage.
 * - Strict Zero-Leak Security: Client secrets, refresh tokens, access tokens, and authorization
 *   codes are NEVER logged, returned in JSON, or rendered to HTML.
 * - Fail-Closed: If Secret Manager configuration is missing, fails closed with HTTP 503.
 */

export const GOOGLE_DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
export const PRODUCTION_DEFAULT_REDIRECT_URI = 'https://ap-visual-house-w627tfzezq-as.a.run.app/api/drive/oauth/callback';
export const PRODUCTION_DEFAULT_CLIENT_ID = '761522439396-bphkf3ir4agk518k3d4iu3ovf85docqh.apps.googleusercontent.com';
const STATE_MAX_AGE_MS = 15 * 60 * 1000; // 15 minutes

export interface StoredDriveTokens {
  refresh_token: string;
  access_token?: string;
  expiry_date?: number;
  scope?: string;
  updatedAt: number;
}

export interface DriveStatusResponse {
  configured: boolean;
  connected: boolean;
  scope: string;
  storageMethod: 'secret_manager' | 'in_memory' | 'none';
  tokenAvailable: boolean;
  redirectUriConfigured: string;
  clientIdConfigured: boolean;
  clientSecretConfigured: boolean;
  hmacSecretConfigured: boolean;
  secretManagerSecret: string;
  statusMessage?: string;
}

// In-memory cache for fast reuse across requests within the container
let inMemoryCachedTokens: StoredDriveTokens | null = null;

export function getDriveClientId(): string {
  return (process.env.GOOGLE_DRIVE_CLIENT_ID || PRODUCTION_DEFAULT_CLIENT_ID).trim();
}

export function getDriveRedirectUri(): string {
  return (process.env.GOOGLE_DRIVE_REDIRECT_URI || PRODUCTION_DEFAULT_REDIRECT_URI).trim();
}

export async function getDriveClientSecret(): Promise<string> {
  const val = await getSecretValue(SECRET_NAMES.CLIENT_SECRET, 'GOOGLE_DRIVE_CLIENT_SECRET');
  return (val || '').trim();
}

/**
 * Resolves HMAC secret strictly from Google Cloud Secret Manager (drive-oauth-hmac-secret)
 * or explicitly mounted environment variable.
 * 
 * In production:
 * - NO fallback to client secret
 * - NO fallback to temporary runtime key
 * - NO silent substitution
 * - FAILS CLOSED immediately by throwing an error.
 */
export async function getDriveHmacSecret(): Promise<string> {
  const secretFromSM = await getSecretValue(SECRET_NAMES.HMAC_SECRET, 'DRIVE_OAUTH_HMAC_SECRET');
  if (secretFromSM && secretFromSM.trim()) {
    return secretFromSM.trim();
  }

  // Development/test behavior ONLY when explicitly running automated tests (NODE_ENV === 'test' or STORAGE_ENV === 'test')
  // and NOT running in production mode.
  const isExplicitTest = (process.env.NODE_ENV === 'test' || process.env.STORAGE_ENV === 'test') &&
    process.env.NODE_ENV !== 'production' &&
    process.env.STORAGE_ENV !== 'production';

  if (isExplicitTest) {
    return 'test_only_hmac_secret_for_local_test_suite_execution_not_prod';
  }

  // Production: FAIL CLOSED immediately.
  // DO NOT use the client secret.
  // DO NOT generate a temporary runtime key.
  // DO NOT silently substitute another value.
  // DO NOT continue OAuth.
  throw new Error('DRIVE_OAUTH_HMAC_SECRET could not be resolved from Secret Manager. Failing closed.');
}

export async function isDriveOAuthConfigured(): Promise<boolean> {
  const clientId = getDriveClientId();
  const clientSecret = await getDriveClientSecret();
  const redirectUri = getDriveRedirectUri();
  let hmacSecret: string | null = null;
  try {
    hmacSecret = await getDriveHmacSecret();
  } catch {
    hmacSecret = null;
  }
  return Boolean(clientId && clientSecret && redirectUri && hmacSecret);
}

/**
 * Creates an OAuth2 client with configured credentials from Secret Manager
 */
export async function createOAuth2Client(customRedirectUri?: string) {
  const clientId = getDriveClientId();
  const clientSecret = await getDriveClientSecret();
  const redirectUri = customRedirectUri || getDriveRedirectUri();

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

/**
 * Generates a cryptographically secure, signed state parameter to protect against CSRF.
 * Format: base64url(payload) + "." + base64url(signature)
 */
export async function generateSignedOAuthState(): Promise<{ state: string; nonce: string }> {
  const nonce = crypto.randomBytes(24).toString('hex');
  const timestamp = Date.now();
  const payload = JSON.stringify({ nonce, ts: timestamp });
  const payloadB64 = Buffer.from(payload, 'utf-8').toString('base64url');

  const hmacKey = await getDriveHmacSecret();
  const hmac = crypto.createHmac('sha256', hmacKey);
  hmac.update(payloadB64);
  const signatureB64 = hmac.digest('base64url');

  const state = `${payloadB64}.${signatureB64}`;
  return { state, nonce };
}

/**
 * Validates the OAuth state parameter against HMAC signature, expiration time, and cookie nonce.
 */
export async function validateSignedOAuthState(
  stateString?: string,
  cookieNonce?: string
): Promise<{ valid: boolean; reason?: string }> {
  if (!stateString || typeof stateString !== 'string') {
    return { valid: false, reason: 'Missing state parameter' };
  }

  const parts = stateString.split('.');
  if (parts.length !== 2) {
    return { valid: false, reason: 'Malformed state token format' };
  }

  const [payloadB64, providedSigB64] = parts;

  // 1. Verify HMAC signature with timing-safe comparison
  const hmacKey = await getDriveHmacSecret();
  const hmac = crypto.createHmac('sha256', hmacKey);
  hmac.update(payloadB64);
  const expectedSigB64 = hmac.digest('base64url');

  const providedSigBuf = Buffer.from(providedSigB64, 'utf-8');
  const expectedSigBuf = Buffer.from(expectedSigB64, 'utf-8');

  if (providedSigBuf.length !== expectedSigBuf.length || !crypto.timingSafeEqual(providedSigBuf, expectedSigBuf)) {
    return { valid: false, reason: 'Invalid state signature' };
  }

  // 2. Parse payload and verify expiration
  try {
    const rawPayload = Buffer.from(payloadB64, 'base64url').toString('utf-8');
    const parsed = JSON.parse(rawPayload);

    if (!parsed.nonce || !parsed.ts) {
      return { valid: false, reason: 'State payload missing required fields' };
    }

    const now = Date.now();
    if (now - parsed.ts > STATE_MAX_AGE_MS) {
      return { valid: false, reason: 'State token has expired (exceeded 15 minutes)' };
    }

    if (parsed.ts > now + 60 * 1000) {
      return { valid: false, reason: 'State token timestamp is in the future' };
    }

    // 3. Optional cookie verification if cookie was provided
    if (cookieNonce && cookieNonce !== parsed.nonce) {
      return { valid: false, reason: 'State nonce does not match session cookie' };
    }

    return { valid: true };
  } catch (err) {
    return { valid: false, reason: 'Failed to decode state payload' };
  }
}

/**
 * Generates the Google OAuth authorization URL for the owner.
 * Requests offline access and forces consent screen to guarantee refresh_token generation.
 */
export async function generateOAuthStartUrl(customRedirectUri?: string): Promise<{ url: string; state: string; nonce: string }> {
  const configured = await isDriveOAuthConfigured();
  if (!configured) {
    throw new Error('Google Drive OAuth credentials are not fully configured in Secret Manager / environment variables.');
  }

  const oauth2Client = await createOAuth2Client(customRedirectUri);
  const { state, nonce } = await generateSignedOAuthState();

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // Guarantees a refresh token is issued even on re-authorization
    scope: [GOOGLE_DRIVE_SCOPE],
    state,
    include_granted_scopes: false
  });

  return { url, state, nonce };
}

/**
 * Loads the stored tokens from:
 * 1. In-memory cache
 * 2. Google Cloud Secret Manager (google-drive-refresh-token / GOOGLE_DRIVE_REFRESH_TOKEN)
 *
 * NOTE: GCS is STRICTLY NOT USED for credential storage.
 */
export async function getStoredDriveTokens(): Promise<StoredDriveTokens | null> {
  // 1. Check in-memory cache
  if (inMemoryCachedTokens && inMemoryCachedTokens.refresh_token) {
    return inMemoryCachedTokens;
  }

  // 2. Query Google Cloud Secret Manager (or mounted environment variable)
  const smRefreshToken = await getSecretValue(SECRET_NAMES.REFRESH_TOKEN, 'GOOGLE_DRIVE_REFRESH_TOKEN');
  if (smRefreshToken) {
    inMemoryCachedTokens = {
      refresh_token: smRefreshToken,
      scope: GOOGLE_DRIVE_SCOPE,
      updatedAt: Date.now()
    };
    return inMemoryCachedTokens;
  }

  return null;
}

/**
 * Persists the owner's refresh token into:
 * 1. In-memory cache
 * 2. Google Cloud Secret Manager (`google-drive-refresh-token`)
 *
 * Under NO circumstances is the refresh token written to the customer GCS bucket.
 */
export async function saveDriveTokens(tokens: {
  refresh_token?: string | null;
  access_token?: string | null;
  expiry_date?: number | null;
  scope?: string | null;
}): Promise<{ record: StoredDriveTokens; savedToSecretManager: boolean }> {
  const existing = await getStoredDriveTokens();
  const refreshToken = tokens.refresh_token || existing?.refresh_token;

  if (!refreshToken) {
    throw new Error('No refresh token provided and no existing refresh token found.');
  }

  const tokenRecord: StoredDriveTokens = {
    refresh_token: refreshToken,
    access_token: tokens.access_token || existing?.access_token,
    expiry_date: tokens.expiry_date || existing?.expiry_date,
    scope: tokens.scope || existing?.scope || GOOGLE_DRIVE_SCOPE,
    updatedAt: Date.now()
  };

  // Update in-memory cache for container
  inMemoryCachedTokens = tokenRecord;

  // Persist to Google Cloud Secret Manager
  const { savedToSecretManager, error } = await persistSecretVersion(
    SECRET_NAMES.REFRESH_TOKEN,
    refreshToken
  );

  if (savedToSecretManager) {
    console.log('[OAUTH] Successfully persisted Google Drive refresh token to Secret Manager.');
  } else {
    console.warn(`[OAUTH] Notice: Token cached in memory. (Secret Manager update status: ${error || 'manual revision required'})`);
  }

  return { record: tokenRecord, savedToSecretManager };
}

/**
 * Exchanges the Google authorization code for OAuth tokens and stores them in Secret Manager.
 */
export async function exchangeCodeForTokens(
  code: string,
  customRedirectUri?: string
): Promise<{ success: boolean; hasRefreshToken: boolean; savedToSecretManager: boolean }> {
  const oauth2Client = await createOAuth2Client(customRedirectUri);
  const { tokens } = await oauth2Client.getToken(code);

  const hasRefreshToken = Boolean(tokens.refresh_token);
  const { savedToSecretManager } = await saveDriveTokens(tokens);

  return {
    success: true,
    hasRefreshToken,
    savedToSecretManager
  };
}

/**
 * Returns a configured Google Drive v3 client authenticated with the owner's refresh token.
 */
export async function getAuthenticatedDriveClient() {
  const tokens = await getStoredDriveTokens();
  if (!tokens || !tokens.refresh_token) {
    throw new Error('Google Drive is not authorized by the owner. Please initiate authorization at /api/drive/oauth/start.');
  }

  const oauth2Client = await createOAuth2Client();
  oauth2Client.setCredentials({
    refresh_token: tokens.refresh_token,
    access_token: tokens.access_token,
    expiry_date: tokens.expiry_date
  });

  return google.drive({
    version: 'v3',
    auth: oauth2Client
  });
}

/**
 * Safe status information about the Drive OAuth integration.
 * NEVER returns secrets, access tokens, or refresh tokens.
 */
export async function getDriveStatus(): Promise<DriveStatusResponse> {
  const configured = await isDriveOAuthConfigured();
  const tokens = await getStoredDriveTokens();
  const connected = Boolean(tokens && tokens.refresh_token);
  const clientId = getDriveClientId();
  const clientSecret = await getDriveClientSecret();
  let hmacConfigured = false;
  try {
    const hmac = await getDriveHmacSecret();
    hmacConfigured = Boolean(hmac);
  } catch {
    hmacConfigured = false;
  }

  let storageMethod: DriveStatusResponse['storageMethod'] = 'none';
  if (connected) {
    storageMethod = 'secret_manager';
  }

  let statusMessage = 'Google Drive OAuth is not configured.';
  if (!clientId) {
    statusMessage = 'Missing GOOGLE_DRIVE_CLIENT_ID configuration.';
  } else if (!clientSecret) {
    statusMessage = 'Missing google-drive-client-secret in Secret Manager.';
  } else if (!hmacConfigured) {
    statusMessage = 'Missing drive-oauth-hmac-secret in Secret Manager. Failing closed.';
  } else if (!connected) {
    statusMessage = 'Google Drive is configured with Secret Manager, but has not been authorized by the owner. Visit /api/drive/oauth/start.';
  } else {
    statusMessage = 'Google Drive is authorized and connected via Secret Manager.';
  }

  return {
    configured,
    connected,
    scope: GOOGLE_DRIVE_SCOPE,
    storageMethod,
    tokenAvailable: connected,
    redirectUriConfigured: getDriveRedirectUri(),
    clientIdConfigured: Boolean(clientId),
    clientSecretConfigured: Boolean(clientSecret),
    hmacSecretConfigured: hmacConfigured,
    secretManagerSecret: SECRET_NAMES.REFRESH_TOKEN,
    statusMessage
  };
}

/**
 * Helper to clear in-memory caches (used during test suites)
 */
export function _resetTokenCacheForTesting() {
  inMemoryCachedTokens = null;
  _resetSecretCacheForTesting();
}
