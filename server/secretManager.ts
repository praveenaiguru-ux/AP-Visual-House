import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

/**
 * AP VISUAL HOUSE — GOOGLE CLOUD SECRET MANAGER SERVICE
 *
 * Provides least-privilege, production-grade access to Secret Manager credentials:
 * - google-drive-client-secret: OAuth 2.0 Web Client Secret
 * - google-drive-refresh-token: Owner Google Drive OAuth Refresh Token
 * - drive-oauth-hmac-secret: OAuth state HMAC signing secret
 *
 * Target Service Account:
 * ap-visual-cloudrun-sa@gen-lang-client-0268928491.iam.gserviceaccount.com
 *
 * IAM Role Required:
 * roles/secretmanager.secretAccessor (bound strictly to individual secrets)
 *
 * Security Guarantee:
 * - Customer GCS bucket is NEVER used for secret or token storage.
 * - If Secret Manager configuration is missing, fails closed with HTTP 503.
 * - Secrets are NEVER logged, returned in API responses, or exposed to the client.
 */

export const SECRET_NAMES = {
  CLIENT_SECRET: 'google-drive-client-secret',
  REFRESH_TOKEN: 'google-drive-refresh-token',
  HMAC_SECRET: 'drive-oauth-hmac-secret'
} as const;

export const TARGET_GCP_PROJECT_ID =
  process.env.GCP_PROJECT_ID ||
  process.env.GCS_PROJECT_ID ||
  'gen-lang-client-0268928491';

let secretManagerClient: SecretManagerServiceClient | null = null;

function getClient(): SecretManagerServiceClient {
  if (!secretManagerClient) {
    secretManagerClient = new SecretManagerServiceClient();
  }
  return secretManagerClient;
}

/**
 * In-memory cache for accessed secrets within this container lifecycle
 */
const secretCache = new Map<string, string>();

function isPlaceholder(val?: string | null): boolean {
  if (!val) return true;
  const lower = val.trim().toLowerCase();
  return lower === '' || lower === 'unauthorized' || lower === 'placeholder' || lower === 'pending' || lower === 'none';
}

/**
 * Retrieves a secret value:
 * - For dynamic secrets (like REFRESH_TOKEN): Queries Secret Manager API directly
 *   to ensure the latest version is fetched without requiring a Cloud Run redeployment.
 * - For static secrets (CLIENT_SECRET, HMAC_SECRET): Checks container cache, env vars,
 *   then Secret Manager API.
 * - Filters out empty and placeholder values ('unauthorized', 'placeholder', etc.).
 *
 * Never throws; returns null if unavailable.
 */
export async function getSecretValue(
  secretName: string,
  envVarName?: string
): Promise<string | null> {
  // 1. Check in-memory cache
  if (secretCache.has(secretName)) {
    const cached = secretCache.get(secretName);
    if (!isPlaceholder(cached)) return cached!;
  }

  // 2. For the dynamic refresh token, query Secret Manager API first to get real-time latest version
  const isDynamicSecret = secretName === SECRET_NAMES.REFRESH_TOKEN;

  if (isDynamicSecret) {
    try {
      const client = getClient();
      const name = `projects/${TARGET_GCP_PROJECT_ID}/secrets/${secretName}/versions/latest`;
      const [version] = await client.accessSecretVersion({ name });
      const payload = version.payload?.data?.toString();
      if (!isPlaceholder(payload)) {
        const trimmed = payload!.trim();
        secretCache.set(secretName, trimmed);
        return trimmed;
      }
    } catch (err: any) {
      // Expected when unconfigured, no version added yet, or in test/mock environment
      const code = err?.code || err?.status;
      if (code !== 5 && code !== 7 && !err?.message?.includes('NOT_FOUND') && !err?.message?.includes('Permission denied')) {
        console.warn(`[SECRET-MANAGER] Notice: Could not query latest version for "${secretName}": ${err?.message || 'unknown'}`);
      }
    }

    // Fallback to environment variable if provided and valid
    if (envVarName && process.env[envVarName]) {
      const val = (process.env[envVarName] || '').trim();
      if (!isPlaceholder(val)) {
        secretCache.set(secretName, val);
        return val;
      }
    }

    return null;
  }

  // 3. For static secrets: Check environment variable (e.g. mounted via --set-secrets)
  if (envVarName && process.env[envVarName]) {
    const val = (process.env[envVarName] || '').trim();
    if (!isPlaceholder(val)) {
      secretCache.set(secretName, val);
      return val;
    }
  }

  // 4. Query Google Cloud Secret Manager API for static secrets
  try {
    const client = getClient();
    const name = `projects/${TARGET_GCP_PROJECT_ID}/secrets/${secretName}/versions/latest`;
    const [version] = await client.accessSecretVersion({ name });
    const payload = version.payload?.data?.toString();
    if (!isPlaceholder(payload)) {
      const trimmed = payload!.trim();
      secretCache.set(secretName, trimmed);
      return trimmed;
    }
  } catch (err: any) {
    const code = err?.code || err?.status;
    if (code !== 5 && code !== 7 && !err?.message?.includes('NOT_FOUND') && !err?.message?.includes('Permission denied')) {
      console.warn(`[SECRET-MANAGER] Notice: Secret "${secretName}" not accessible via API (${err?.message || 'unknown error'}).`);
    }
  }

  return null;
}

/**
 * Attempts to persist or update a secret version in Google Cloud Secret Manager.
 * Returns true if successfully written to Secret Manager, false otherwise.
 */
export async function persistSecretVersion(
  secretName: string,
  secretData: string
): Promise<{ savedToSecretManager: boolean; error?: string }> {
  const trimmed = secretData.trim();
  secretCache.set(secretName, trimmed);

  try {
    const client = getClient();
    const parent = `projects/${TARGET_GCP_PROJECT_ID}/secrets/${secretName}`;
    await client.addSecretVersion({
      parent,
      payload: {
        data: Buffer.from(trimmed, 'utf-8')
      }
    });
    console.log(`[SECRET-MANAGER] Successfully added new version for secret: ${secretName}`);
    return { savedToSecretManager: true };
  } catch (err: any) {
    const errMsg = err?.message || 'Unknown error';
    console.warn(`[SECRET-MANAGER] Notice: Could not add secret version for "${secretName}": ${errMsg}`);
    return { savedToSecretManager: false, error: errMsg };
  }
}

/**
 * Clears the in-memory secret cache (used by unit tests)
 */
export function _resetSecretCacheForTesting() {
  secretCache.clear();
}
