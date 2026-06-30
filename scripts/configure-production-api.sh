#!/bin/sh
# Append nginx API proxy directives for urban-rohr.com (Plesk).
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
SNIPPET_FILE="$ROOT_DIR/deploy/nginx-api-proxy.conf"
MARKER="# konti-hidroplast-api-proxy"
DOMAINS="urban-rohr.com www.urban-rohr.com urban-rohr.de www.urban-rohr.de"

if [ ! -f "$SNIPPET_FILE" ]; then
  echo "Missing nginx snippet: $SNIPPET_FILE" >&2
  exit 1
fi

append_snippet() {
  conf_path="$1"
  if [ ! -f "$conf_path" ]; then
    echo "Skip missing config: $conf_path"
    return 0
  fi

  if grep -q "$MARKER" "$conf_path" 2>/dev/null; then
    echo "Already configured: $conf_path"
    return 0
  fi

  {
    printf '\n%s\n' "$MARKER"
    cat "$SNIPPET_FILE"
  } >> "$conf_path"
  echo "Appended API proxy to $conf_path"
}

for domain in $DOMAINS; do
  append_snippet "/var/www/vhosts/system/${domain}/conf/vhost_nginx.conf"
done

if command -v plesk >/dev/null 2>&1; then
  for domain in urban-rohr.com urban-rohr.de; do
    if plesk sbin httpdmng --reconfigure-domain "$domain" 2>/dev/null; then
      echo "Reconfigured web server for $domain"
    fi
  done
fi

echo "nginx API proxy configuration finished."
