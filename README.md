# VedicEnglish.com

Source of [vedicenglish.com](https://vedicenglish.com): free English word-power lessons for
school children, plus Odia poetry and vocabulary. Built with Jekyll and published by GitHub Pages.

**The `gh-pages` branch is the live site.** Anything committed there is published within a minute.

## Adding a lesson (no tools needed)

1. On GitHub, open the `_posts` folder and choose **Add file → Create new file**.
2. Name it `YYYY-MM-DD-Title-Words.md`, for example `2026-03-01-Musical-Words-Ness.md`.
   The part after the date becomes the web address (`/posts/Musical-Words-Ness.html`) and the
   title, so choose it carefully and do not rename it later — the old address would stop working.
3. Paste the lesson text and choose **Commit changes**.

## Changing the site itself

Make changes on a branch and open a pull request. The "Build check" runs automatically and fails
if the site does not build or if any existing lesson address would disappear.

### Working locally

Only Docker is needed. The first run downloads images and takes a few minutes.

| Command | What it does |
|---|---|
| `scripts/build.sh` | Builds the site into `_site/` and runs the address check. |
| `scripts/build.sh serve` | Builds and serves at http://localhost:4000, rebuilding on changes. |
| `scripts/check-urls.sh` | Checks every address in `scripts/url-baseline.txt` exists in `_site/`. |
| `scripts/screenshots.sh` | Screenshots four key pages of `_site/` at phone and desktop size into `screenshots/`. |
| `scripts/screenshots.sh https://vedicenglish.com live` | Same, for the live site, into `screenshots/live/`. |
| `scripts/clean.sh` | Deletes `_site/`, `screenshots/` and Jekyll caches. |
| `scripts/clean.sh --all` | Also deletes this project's two Docker images (about 3 GB). |

When a lesson is added, add its address to `scripts/url-baseline.txt` so it is protected too.

## Content

All lesson text belongs to its author; see `LICENSE`.
