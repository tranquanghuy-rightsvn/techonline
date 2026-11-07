# -*- coding: utf-8 -*-
"""Logo cover for posts that have no cover image.

CMS posts always carry `cover` (required field, usually /assets/img/posts/<slug>/cover.jpg) and
the migrated posts point at their existing /assets/images/news-<slug>.jpg. Only a post with an
empty `cover` whose fallback file html/assets/images/news-<slug>.jpg is missing gets one made
here (the news build uses that fallback path). Run from the project root:
    python3 scripts/news/covers.py html/assets/images
"""
import json
import os
import sys

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
IMG = sys.argv[1]  # html/assets/images
W, H = 1200, 768


def make(out):
    """Plain cover: the site logo centred on white."""
    from PIL import Image  # only needed when a cover is actually missing
    im = Image.new("RGB", (W, H), "white")
    p = Image.open(os.path.join(IMG, "logo.png")).convert("RGBA")
    box = (W - 360, H - 360)
    p.thumbnail(box, Image.LANCZOS)
    if p.width < box[0] and p.height < box[1]:
        r = min(box[0] / p.width, box[1] / p.height)
        p = p.resize((int(p.width * r), int(p.height * r)), Image.LANCZOS)
    im.paste(p, ((W - p.width) // 2, (H - p.height) // 2), p)
    im.save(out, "JPEG", quality=88, optimize=True)


try:
    with open(os.path.join(REPO, "data", "posts.json"), encoding="utf-8") as f:
        posts = json.load(f)
except (OSError, ValueError):
    posts = []

for a in posts:
    if (a.get("cover") or "").strip():
        continue
    out = os.path.join(IMG, f"news-{a['slug']}.jpg")
    if os.path.exists(out):
        continue
    try:
        make(out)
        print("cover", out)
    except Exception as e:  # missing Pillow in CI must not break the build
        print(f"WARN no cover for {a['slug']}: {e}", file=sys.stderr)
