#!/usr/bin/env bash
# Remove everything the scripts in this folder create. Touches only this project's own
# build output and its two Docker images; other containers and images on the machine are left alone.
#   scripts/clean.sh          remove _site/, screenshots/, Jekyll caches
#   scripts/clean.sh --all    also remove the vedicenglish-* Docker images (~3 GB, rebuilt on demand)
set -euo pipefail
cd "$(dirname "$0")/.."

for dir in _site screenshots .jekyll-cache .sass-cache; do
  if [ -d "$dir" ]; then
    rm -r -- "./$dir"
    echo "removed $dir/"
  fi
done

if [ "${1:-}" = --all ]; then
  for image in vedicenglish-jekyll vedicenglish-playwright; do
    if docker image inspect "$image" >/dev/null 2>&1; then
      docker image rm "$image" >/dev/null
      echo "removed image $image"
    fi
  done
  echo "Base images (ruby:3.3, mcr.microsoft.com/playwright) are kept in case other projects use them."
  echo "To remove them too: docker image rm ruby:3.3 mcr.microsoft.com/playwright:v1.49.1-noble"
fi
