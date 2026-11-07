# -*- coding: utf-8 -*-
"""data/media-index.json — the CMS image library (GAS.md II.6, XII): [[src, caption, used_in], ...]

Every /assets/... image used by posts, products (data/) and the built pages (html/), one row per
image: caption = figcaption/alt (first one found), used_in = up to 3 post/product/page titles
joined by " · " (+N more). Posts first (newest first), then products, then the remaining pages.
Run after the page generators:
    python3 scripts/site/media_index.py html
"""
import glob
import html as H
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from settings import load as load_settings  # noqa: E402

ROOT = sys.argv[1]
BRAND = load_settings()["brand"]
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA = os.path.join(REPO, "data")
IMG_RX = re.compile(r"^/assets/[^\"'<>\s]+\.(?:jpe?g|png|gif|webp|svg|avif)$", re.I)

by = {}  # src -> [caption, owners]


def text(s):
    return " ".join(H.unescape(re.sub(r"<[^>]+>", " ", s or "")).split())


def add(src, caption, owner):
    src = (src or "").strip()
    if src.startswith("assets/"):
        src = "/" + src
    if not IMG_RX.match(src):
        return
    it = by.setdefault(src, ["", []])
    if not it[0] and caption:
        it[0] = caption
    if owner and owner not in it[1]:
        it[1].append(owner)


def attr(tag, name):
    m = re.search(r'\s' + name + r'="([^"]*)"', tag, re.I)
    return text(m.group(1)) if m else ""


def from_html(s, owner):
    s = s or ""

    def fig(m):
        cap = re.search(r"<figcaption\b[^>]*>(.*?)</figcaption>", m.group(1), re.S | re.I)
        for img in re.findall(r"<img\b[^>]*>", m.group(1), re.I):
            add(attr(img, "src"), (cap and text(cap.group(1))) or attr(img, "alt"), owner)
        return ""
    rest = re.sub(r"<figure\b[^>]*>(.*?)</figure>", fig, s, flags=re.S | re.I)
    for img in re.findall(r"<img\b[^>]*>", rest, re.I):
        add(attr(img, "src"), attr(img, "alt"), owner)


def read(path, default):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return default


for p in sorted(read(os.path.join(DATA, "posts.json"), []), key=lambda p: p.get("date", ""), reverse=True):
    d = read(os.path.join(DATA, "posts", p.get("slug", "") + ".json"), {}) or {}
    title = p.get("title", "")
    add(p.get("cover") or f"/assets/images/news-{p.get('slug')}.jpg", "", title)
    from_html(d.get("content_html"), title)
    if isinstance(d.get("smart"), dict):
        from_html(d["smart"].get("html"), title)

for p in read(os.path.join(DATA, "products.json"), []):
    d = read(os.path.join(DATA, "products", p.get("slug", "") + ".json"), {}) or {}
    name = p.get("name", "")
    for img in d.get("images") or [p.get("image")]:
        add(img, "", name)
    from_html(d.get("description_html"), name)
    if isinstance(d.get("smart"), dict):
        from_html(d["smart"].get("html"), name)

# Built pages: content between the header and the footer (not the logo/social icons on every page).
pages = [os.path.join(ROOT, "index.html")] + sorted(glob.glob(os.path.join(ROOT, "*", "index.html")))
for path in pages:
    s = open(path, encoding="utf-8").read()
    i, j = s.find("</header>"), s.find("<footer")
    if i == -1 or j == -1:
        continue
    t = re.search(r"<title>(.*?)</title>", s, re.S)
    owner = re.split(r"\s+[-|]\s+" + re.escape(BRAND), text(t.group(1)) if t else "")[0] or "Trang chủ"
    if path == pages[0]:
        owner = "Trang chủ"
    from_html(s[i:j], owner)

rows = []
for src, (caption, owners) in by.items():
    more = f" (+{len(owners) - 3})" if len(owners) > 3 else ""
    rows.append([src, caption, " · ".join(owners[:3]) + more])

with open(os.path.join(DATA, "media-index.json"), "w", encoding="utf-8") as f:
    f.write("[\n" + ",\n".join(json.dumps(r, ensure_ascii=False) for r in rows) + "\n]\n")
print(f"media-index.json: {len(rows)} images")
