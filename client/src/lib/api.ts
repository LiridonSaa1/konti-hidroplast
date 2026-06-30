/**
 * Public marketing domains (urban-rohr.com / .de) serve static files only.
 * The Node/Passenger API runs on the Plesk deployment subdomain.
 * When the app is opened on a public domain, /api/* is routed there.
 *
 * On the deployment subdomain itself (or in local dev), /api/* stays same-origin.
 *
 * Override the API host with VITE_API_ORIGIN at build time if needed.
 */
const PUBLIC_SITE_HOSTS = new Set([
  "urban-rohr.com",
  "www.urban-rohr.com",
  "urban-rohr.de",
  "www.urban-rohr.de",
]);

const DEFAULT_NODE_API_ORIGIN =
  "https://upbeat-chandrasekhar.84-46-246-41.plesk.page";

function getNodeApiOrigin(): string {
  const configured = import.meta.env.VITE_API_ORIGIN as string | undefined;
  return (configured || DEFAULT_NODE_API_ORIGIN).replace(/\/$/, "");
}

export function resolveApiUrl(url: string): string {
  if (!url.startsWith("/api/")) {
    return url;
  }

  if (typeof window === "undefined") {
    return url;
  }

  // Local dev and the Node deployment host use same-origin API routes.
  if (!import.meta.env.PROD || !PUBLIC_SITE_HOSTS.has(window.location.hostname)) {
    return url;
  }

  return `${getNodeApiOrigin()}${url}`;
}

export const apiUrl = resolveApiUrl;
