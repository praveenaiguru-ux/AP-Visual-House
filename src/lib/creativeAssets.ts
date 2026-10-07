export interface CreativeManifestEntry {
  active: string;
  creativeId?: string;
  version?: number;
}

export type CreativeManifest = Record<string, CreativeManifestEntry>;

let manifestPromise: Promise<CreativeManifest | null> | null = null;

const DEFAULT_MANIFEST_PATH = '/config/service-creatives.json';

const getManifestUrl = (): string => {
  const configured = import.meta.env.VITE_CREATIVE_MANIFEST_URL?.trim();
  return configured || DEFAULT_MANIFEST_PATH;
};

export const loadCreativeManifest = async (): Promise<CreativeManifest | null> => {
  if (!manifestPromise) {
    manifestPromise = fetch(getManifestUrl(), {
      headers: { Accept: 'application/json' },
      cache: 'no-cache'
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Creative manifest request failed: ${response.status}`);
        }
        return (await response.json()) as CreativeManifest;
      })
      .catch((error) => {
        console.warn('[CREATIVE ASSETS] Manifest unavailable; using service fallback.', error);
        return null;
      });
  }

  return manifestPromise;
};

export const resolveServiceImage = (
  serviceId: string,
  fallbackImage: string,
  manifest: CreativeManifest | null
): string => {
  const activeAsset = manifest?.[serviceId]?.active?.trim();
  return activeAsset || fallbackImage;
};
