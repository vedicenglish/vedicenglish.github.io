#!/usr/bin/env bash
# Fail if any URL in scripts/url-baseline.txt is missing from the built site.
# Post URLs are permanent: they are shared and indexed, so a build must never lose one.
set -euo pipefail
cd "$(dirname "$0")/.."

site="${1:-_site}"
missing=0
while IFS= read -r path; do
  [ -z "$path" ] && continue
  if [ ! -f "$site$path" ]; then
    echo "MISSING: $path"
    missing=$((missing + 1))
  fi
done < scripts/url-baseline.txt

total=$(grep -c . scripts/url-baseline.txt)
if [ "$missing" -gt 0 ]; then
  echo "$missing of $total baseline URLs are missing from $site"
  exit 1
fi
echo "All $total baseline URLs present in $site"
