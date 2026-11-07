#!/usr/bin/env bash
# Regenerate all generated pages, then SEO metadata, robots.txt and sitemap.xml.
# Order matters: the page generators copy existing page shells, so seo.py runs last.
set -euo pipefail
cd "$(dirname "$0")/.."
python3 scripts/news/covers.py html/assets/images
python3 scripts/news/build.py html
python3 scripts/site/build_pages.py html
python3 scripts/site/seo.py html
