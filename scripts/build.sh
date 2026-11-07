#!/usr/bin/env bash
# Regenerate html/ from data/ (GAS.md VIII): settings, news, info pages, catalog, SEO.
# Runs locally and in CI (.github/workflows/build.yml). Needs python3 (stdlib) + node.
# Order matters:
#   1. apply_settings first — the generators copy existing pages as shells, so the shells must
#      already carry the current brand/hotline/footer;
#   2. page generators;
#   3. media index (reads the built pages), then seo.py last (canonical/OG/JSON-LD, sitemap).
set -euo pipefail
cd "$(dirname "$0")/.."
python3 scripts/site/apply_settings.py html
python3 scripts/news/covers.py html/assets/images
python3 scripts/news/build.py html
python3 scripts/site/build_pages.py html
python3 scripts/site/contact_page.py html
if [ -f scripts/catalog/build.py ]; then python3 scripts/catalog/build.py html; fi
python3 scripts/site/media_index.py html
python3 scripts/site/seo.py html
