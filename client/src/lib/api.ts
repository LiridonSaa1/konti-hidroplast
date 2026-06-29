const STATIC_ONLY_HOSTS = new Set([
  "urban-rohr.com",
  "www.urban-rohr.com",
  "urban-rohr.de",
  "www.urban-rohr.de",
]);

const DEFAULT_NODE_API_ORIGIN =
  "https://upbeat-chandrasekhar.84-46-246-41.plesk.page";

/**
 * Resolves relative API paths for domains that serve static files only.
 * Falls back to the Node/Passenger deployment origin when same-origin /api
 * is unavailable (e.g. urban-rohr.com document root is dist/public).
 */
export function resolveApiUrl(url: string): string {
  if (!url.startsWith("/api/")) {
    return url;
  }

  const configuredOrigin = import.meta.env.VITE_API_ORIGIN as string | undefined;
  if (configuredOrigin) {
    return `${configuredOrigin.replace(/\/$/, "")}${url}`;
  }

  if (typeof window === "undefined") {
    return url;
  }

  if (!import.meta.env.PROD || !STATIC_ONLY_HOSTS.has(window.location.hostname)) {
    return url;
  }

  return `${DEFAULT_NODE_API_ORIGIN}${url}`;
}

export const apiUrl = resolveApiUrl;
