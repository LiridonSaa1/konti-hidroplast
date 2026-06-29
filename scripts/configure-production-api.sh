#!/bin/sh
# Apply nginx API proxy directives for urban-rohr.com (Plesk).
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
SNIPPET_FILE="$ROOT_DIR/deploy/nginx-api-proxy.conf"
DOMAINS="urban-rohr.com www.urban-rohr.com urban-rohr.de www.urban-rohr.de"

if [ ! -f "$SNIPPET_FILE" ]; then
  echo "Missing nginx snippet: $SNIPPET_FILE" >&2
  exit 1
fi

if ! command -v plesk >/dev/null 2>&1; then
  echo "Plesk CLI not available; skip nginx API proxy configuration." >&2
  exit 0
fi

SNIPPET="$(tr '\n' ' ' < "$SNIPPET_FILE" | sed 's/  */ /g')"

for domain in $DOMAINS; do
  if plesk bin site --info "$domain" >/dev/null 2>&1; then
    echo "Applying nginx API proxy to $domain..."
    plesk bin site --update "$domain" -nginx-additional "$SNIPPET"
  fi
done

if plesk bin httpdm --help >/dev/null 2>&1; then
  for domain in urban-rohr.com urban-rohr.de; do
    plesk bin httpdm --reconfigure-domain "$domain" 2>/dev/null || true
  done
fi

echo "nginx API proxy configuration finished."
