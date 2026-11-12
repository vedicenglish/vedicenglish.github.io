#!/usr/bin/env bash
# Build the site into _site/ using Docker (no local Ruby needed).
#   scripts/build.sh            build
#   scripts/build.sh serve      build and serve on http://localhost:4000 with live rebuild
set -euo pipefail
cd "$(dirname "$0")/.."

docker build -q -t vedicenglish-jekyll -f scripts/Dockerfile.jekyll . >/dev/null

run=(docker run --rm --user "$(id -u):$(id -g)" -e HOME=/tmp -e BUNDLE_GEMFILE=/gems/Gemfile -v "$PWD":/site)
if [ "${1:-}" = serve ]; then
  "${run[@]}" -p 4000:4000 vedicenglish-jekyll bundle exec jekyll serve --host 0.0.0.0
else
  "${run[@]}" vedicenglish-jekyll bundle exec jekyll build
  scripts/check-urls.sh
fi
