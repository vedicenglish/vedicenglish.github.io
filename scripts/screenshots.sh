#!/usr/bin/env bash
# Screenshot key pages at phone and desktop widths using Docker (no local Node/Playwright needed).
#   scripts/screenshots.sh                        local build in _site/  -> screenshots/
#   scripts/screenshots.sh https://vedicenglish.com live                 -> screenshots/live/
#   scripts/screenshots.sh _site after            local build            -> screenshots/after/
set -euo pipefail
cd "$(dirname "$0")/.."

target="${1:-_site}"
out="screenshots/${2:-}"
mkdir -p "$out"

docker build -q -t vedicenglish-playwright -f scripts/Dockerfile.playwright scripts >/dev/null
docker run --rm --ipc=host --user "$(id -u):$(id -g)" -e HOME=/tmp -v "$PWD":/site \
  vedicenglish-playwright node scripts/screenshots.js "$target" "$out"
