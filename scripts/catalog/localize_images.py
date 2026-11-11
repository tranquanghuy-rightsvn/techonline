# -*- coding: utf-8 -*-
"""Download product images hosted on hosts that block hotlinking into the site (GAS.md III.3).

    python3 scripts/catalog/localize_images.py static.tp-link.com [more.host ...]

For every product in data/ whose image URL is on one of the given hosts: download it, shrink it to
at most MAX_PX (macOS `sips`, when available), save it as html/assets/img/products/<slug>/gNN.<ext>
and point data/products/<slug>.json (`images`) + data/products.json (`image`) at the local copy.
Images that fail to download keep their URL (reported). Re-running skips what is already local.
"""
import json
import os
import shutil
import subprocess
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from urllib.error import HTTPError
from urllib.parse import quote, urlparse

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
DATA = os.path.join(REPO, "data")
IMG = os.path.join(REPO, "html", "assets", "img", "products")
MAX_PX = 800
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36"
SIPS = shutil.which("sips")


def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)


def dump(p, v):
    with open(p, "w", encoding="utf-8") as f:
        json.dump(v, f, ensure_ascii=False, indent=2)
        f.write("\n")


def ext_of(url, ctype):
    e = os.path.splitext(urlparse(url).path)[1].lower()
    if e in (".jpg", ".jpeg", ".png", ".webp", ".gif"):
        return ".jpg" if e == ".jpeg" else e
    return {"image/png": ".png", "image/webp": ".webp", "image/gif": ".gif"}.get(ctype, ".jpg")


def fetch(job):
    slug, i, url = job
    try:
        safe = quote(url, safe=":/?&=%#+@,;()~")  # non-ASCII paths ("资源_3@4x", full-width "－")
        req = urllib.request.Request(safe, headers={"User-Agent": UA})  # no Referer: what the hosts allow
        with urllib.request.urlopen(req, timeout=30) as r:
            body, ctype = r.read(), r.headers.get_content_type()
        sniff = {b"\xff\xd8\xff": "image/jpeg", b"\x89PNG": "image/png", b"RIFF": "image/webp", b"GIF8": "image/gif"}
        ctype = next((t for m, t in sniff.items() if body.startswith(m)), ctype)  # octet-stream jpgs
        if not ctype.startswith("image/") or len(body) < 200:
            return job, None, f"not an image ({ctype}, {len(body)} B)"
        rel = f"{slug}/g{i + 1:02d}{ext_of(url, ctype)}"
        path = os.path.join(IMG, rel)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "wb") as f:
            f.write(body)
        if SIPS and not path.endswith(".gif"):
            subprocess.run([SIPS, "-Z", str(MAX_PX), path], capture_output=True)
        return job, f"/assets/img/products/{rel}", None
    except HTTPError as e:
        if e.code in (403, 404, 410):  # gone at the source: drop it (build falls back to the logo)
            return job, "", f"HTTP {e.code}, image removed"
        return job, None, str(e)
    except Exception as e:  # noqa: BLE001 - report and keep the URL
        return job, None, str(e)


def main():
    hosts = set(sys.argv[1:])
    if not hosts:
        sys.exit(__doc__)
    index = load(os.path.join(DATA, "products.json"))
    prods = {r["slug"]: load(os.path.join(DATA, "products", f"{r['slug']}.json")) for r in index}
    jobs = [(s, i, u) for s, p in prods.items() for i, u in enumerate(p.get("images") or [])
            if urlparse(u).hostname in hosts]
    print(f"{len(jobs)} images to download")
    failed, changed = [], set()
    with ThreadPoolExecutor(12) as ex:
        for (slug, i, url), local, err in ex.map(fetch, jobs):
            if local is not None:
                prods[slug]["images"][i] = local
                changed.add(slug)
            if err:
                failed.append((slug, url, err))
    for s in changed:
        prods[s]["images"] = [x for x in prods[s]["images"] if x]
        dump(os.path.join(DATA, "products", f"{s}.json"), prods[s])
    for r in index:
        if r["slug"] in changed:
            r["image"] = (prods[r["slug"]].get("images") or [""])[0]
    dump(os.path.join(DATA, "products.json"), index)
    print(f"done: {len(jobs)} images / {len(changed)} products; problems: {len(failed)}")
    for f in failed:
        print("  !", *f)


if __name__ == "__main__":
    main()
