export interface SystemConfig {
  admin_mode: boolean;
}

let configPromise: Promise<SystemConfig> | null = null;
let cachedConfig: SystemConfig | null = null;

// Default config for static deployment (GitHub Pages)
const DEFAULT_CONFIG: SystemConfig = {
  admin_mode: false
};

export function getSystemConfig(): Promise<SystemConfig> {
  if (cachedConfig) {
    return Promise.resolve(cachedConfig);
  }
  if (configPromise) {
    return configPromise;
  }
  configPromise = fetch('/api/config')
    .then((res) => {
      if (!res.ok) {
        // If API is not available (e.g., GitHub Pages), use default config
        console.log('API not available, using default config for static deployment');
        return DEFAULT_CONFIG;
      }
      return res.json();
    })
    .then((data: SystemConfig) => {
      cachedConfig = data;
      return data;
    })
    .catch((error) => {
      // Fallback to default config if fetch fails (network error, CORS, etc.)
      console.log('Config fetch failed, using default config:', error.message);
      cachedConfig = DEFAULT_CONFIG;
      return DEFAULT_CONFIG;
    })
    .finally(() => {
      // Keep cachedConfig for reuse; allow re-fetch via explicit invalidation if added later
    });
  return configPromise;
}


