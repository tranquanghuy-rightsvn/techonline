# -*- coding: utf-8 -*-
"""ONE-OFF migration: current html/ catalog -> data/ (GAS.md III, III-B, XII).

    python3 scripts/catalog/migrate.py html data

Sources
  - every product page html/<slug>/index.html containing `pdp__title`
  - the category pages and the card data they render client-side:
    html/js/data/*-products.js (category/brand/lock/network layouts) and the inline
    `window.SUBCATEGORY_GROUPS` of subcategory pages; html/js/data/products.js
    (home page sections)
  - the fingerprint locks that only exist in html/js/data/khoa-cua-van-tay-products.js

The product page is the source of truth for a product (name, prices, images, ...).
Card-only data (attrs, "Mẫu mới" badge, home-page selection) comes from the cards.
Every conflict between a card and its product page is printed (card value dropped).
"""
import html as H
import json
import os
import re
import sys
import unicodedata
from collections import Counter, OrderedDict, defaultdict

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import jslit  # noqa: E402

ROOT, OUT = sys.argv[1], sys.argv[2]
NOW = "2026-11-07T00:00:00Z"

DEFAULT_OFFERS = [
    "Cam kết sản phẩm chính hãng",
    "Miễn phí giao hàng toàn quốc",
    "Miễn phí lắp đặt tận nhà tại nội thành Hà Nội và Hồ Chí Minh",
    "Miễn phí hỗ trợ từ xa 24/7",
    "Hỗ trợ cấu hình xem camera qua điện thoại",
    "Bảo hành chính hãng 24 tháng",
    "Nhận hàng, kiểm tra hàng trước khi thanh toán",
    "Lỗi đổi mới trong 30 ngày đầu sử dụng",
]
LOCK_IMG_BASE = "assets/images/khoa-cua-van-tay/products/"
NET_IMG_BASE = "assets/images/thiet-bi-mang/products/"
LAYOUT_BY_SCRIPT = {
    "category-page.js": "category", "brand-category-page.js": "brand",
    "subcategory-page.js": "subcategory", "lock-page.js": "lock", "network-page.js": "network",
}
warnings = []


def warn(msg):
    warnings.append(msg)


def collapse(s):
    return " ".join(s.split())


def text(s):
    return collapse(H.unescape(re.sub(r"<[^>]+>", " ", s)))


def rich(s):
    """Inner HTML of a list item / cell: plain text (entities decoded) when it has
    no markup, otherwise the collapsed HTML (rendered raw by the build)."""
    s = collapse(s)
    return H.unescape(s) if "<" not in s else s


def money(s):
    s = text(s)
    if not s or "liên hệ" in s.lower():
        return None
    digits = re.sub(r"[^\d]", "", s)
    return int(digits) if digits else None


def asset(src):
    """GAS.md XII: repo images are stored as /assets/..., external ones as absolute URLs."""
    return src if src.startswith(("http://", "https://", "/")) else "/" + src


def slugify(s):
    s = s.replace("đ", "d").replace("Đ", "D")
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c)).lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def read(p):
    return open(p, encoding="utf-8").read()


def pages():
    for d in sorted(os.listdir(ROOT)):
        p = os.path.join(ROOT, d, "index.html")
        if os.path.isfile(p):
            yield d, read(p)


# ------------------------------------------------------------------ product pages
BOILER = re.compile(r"\s*<hr[^>]*>\s*<p[^>]*>\s*Cảm ơn bạn đã ghé thăm.*?</p>\s*<p[^>]*>\s*Nếu cần hỗ trợ ngay.*?</p>\s*$", re.S)


def parse_product(slug, s):
    g = lambda rx, flags=re.S: re.search(rx, s, flags)  # noqa: E731
    p = OrderedDict(slug=slug)
    p["name"] = text(g(r'<h1 class="pdp__title">(.*?)</h1>').group(1))
    meta = g(r'<div class="pdp__meta">(.*?)</div>').group(1)
    m = re.search(r'Thương hiệu:\s*<a href="([^"]*)"[^>]*>(.*?)</a>', meta, re.S)
    p["brand"] = text(m.group(2)) if m else ""
    p["_brand_href"] = m.group(1).strip("/") if m else ""
    m = re.search(r'Mã sản phẩm:\s*<strong>(.*?)</strong>', meta, re.S)
    p["sku"] = text(m.group(1)) if m else ""
    m = re.search(r'class="pdp__meta-warranty">(.*?)</strong>', meta, re.S)
    p["warranty"] = text(m.group(1)) if m else ""
    m = re.search(r'class="pdp__meta-stock">(.*?)</strong>', meta, re.S)
    p["stock"] = text(m.group(1)) if m else "Còn hàng"

    pg = g(r'<div class="pdp-price-group">(.*?)</div>').group(1)
    p["price"] = money(re.search(r'<span class="pdp-price[^"]*">(.*?)</span>', pg, re.S).group(1))
    m = re.search(r'<del class="pdp-old-price">(.*?)</del>', pg, re.S)
    p["old_price"] = money(m.group(1)) if m else None
    p["vat"] = "pdp-vat" in pg
    m = re.search(r'<span class="pdp-discount">(.*?)</span>', pg, re.S)
    p["_discount_text"] = text(m.group(1)) if m else ""

    thumbs = re.findall(r'class="pdp-gallery__thumb[^"]*"\s+data-src="([^"]*)"', s)
    main_img = g(r'id="js-gallery-main-img"\s+src="([^"]*)"').group(1)
    p["images"] = [asset(x) for x in (thumbs or [main_img])]
    if p["images"][0] != asset(main_img):
        warn(f"{slug}: main image differs from first thumb")

    ul = g(r'<ul class="pdp-summary__list"[^>]*>(.*?)</ul>').group(1)
    p["summary"] = [rich(x) for x in re.findall(r"<li[^>]*>(.*?)</li>", ul, re.S)]
    ol = g(r'<ol class="pdp-offer__list">(.*?)</ol>').group(1)
    offers = [rich(x) for x in re.findall(r"<li[^>]*>(.*?)</li>", ol, re.S)]
    p["offers"] = [] if offers == DEFAULT_OFFERS else offers

    tb = g(r'id="js-specs-table">(.*?)</table>').group(1)
    p["specs"] = [[rich(a), rich(b)] for a, b in
                  re.findall(r"<tr[^>]*>\s*<th>(.*?)</th>\s*<td>(.*?)</td>\s*</tr>", tb, re.S)]

    body = g(r'id="js-desc-body">(.*?)</div>\s*<button\s+type="button"\s+class="pdp-description__toggle"').group(1)
    if not BOILER.search(body):
        warn(f"{slug}: description boilerplate not found")
    body = BOILER.sub("", body)
    blocks = re.findall(r"<p[^>]*>.*?</p>|<hr[^>]*>|<h[2-4][^>]*>.*?</h[2-4]>|<ul[^>]*>.*?</ul>", body, re.S)
    blocks = [collapse(re.sub(r'\s*class="pdp-description__hidden"', "", b)) for b in blocks]
    blocks = [re.sub(r"<(p|h\d|li)>\s+", r"<\1>", re.sub(r"\s+</(p|h\d|li)>", r"</\1>", b)) for b in blocks]
    p["description_html"] = "".join(blocks)

    p["seo_description"] = H.unescape(collapse(g(r'<meta\s+name="description"\s+content="([^"]*)"').group(1)))

    ol = g(r'<ol class="global-breadcrumb__list">(.*?)</ol>').group(1)
    crumbs = [[text(t), h] for h, t in re.findall(r'<a class="global-breadcrumb__link" href="([^"]*)"\s*>(.*?)</a', ol, re.S)]
    p["breadcrumb"] = crumbs[1:]  # without "Trang chủ"

    # extras found only on the hand-made DDL609 page
    sw = re.findall(r'class="pdp-color__swatch[^"]*"\s+style="background:\s*([^"]*)"\s+data-color="([^"]*)"\s+data-img="([^"]*)"', s)
    if sw:
        p["colors"] = [{"name": H.unescape(n), "hex": hx.strip(), "image": asset(im)} for hx, n, im in sw]
    reviews = []
    for it in re.findall(r'<div class="pdp-reviews__item">(.*?)</div>', s, re.S):
        nm = text(re.search(r'pdp-reviews__name">(.*?)</p>', it, re.S).group(1))
        dt = text(re.search(r'pdp-reviews__date">(.*?)</p>', it, re.S).group(1))
        st = text(re.search(r'pdp-reviews__stars">(.*?)</p>', it, re.S).group(1)).count("★")
        tx = text(re.search(r'pdp-reviews__text">(.*?)</p>', it, re.S).group(1))
        m = re.match(r"Ngày (\d\d)-(\d\d)-(\d{4}), (\d\d):(\d\d) (am|pm)", dt)
        hh = int(m.group(4)) % 12 + (12 if m.group(6) == "pm" else 0)
        reviews.append({"name": nm, "time": f"{m.group(3)}-{m.group(2)}-{m.group(1)}T{hh:02d}:{m.group(5)}",
                        "stars": st, "text": tx})
    if reviews:
        p["reviews"] = reviews

    sim = re.search(r'data-panel="similar"[^>]*>(.*?)<button type="button" class="pdp-tabs__arrow', s, re.S)
    p["_similar"] = re.findall(r'<a href="([^"]*)" class="product-card__img"', sim.group(1)) if sim else []
    p["_sim_attrs"] = {}
    for href, attrs in re.findall(r'<a href="([^"]*)" class="product-card__img">.*?<div class="product-card__attrs">(.*?)</div>', sim.group(1) if sim else "", re.S):
        p["_sim_attrs"][href] = [text(a) for a in re.findall(r'<span class="product-card__attr">(.*?)</span>', attrs, re.S)]
    return p


products = OrderedDict()
cat_pages = OrderedDict()   # slug -> (layout, html)
for d, s in pages():
    if 'class="pdp__title"' in s:
        products[d] = parse_product(d, s)
        continue
    for js, layout in LAYOUT_BY_SCRIPT.items():
        if f"js/components/{js}" in s:
            cat_pages[d] = (layout, s)
print(f"product pages: {len(products)}, category pages: {len(cat_pages)}")

# ------------------------------------------------------------------ card sources
def card_key(c):
    """Identity of a card: its product page, or (for page-less locks) name+image file."""
    h = c.get("href") or c.get("link") or "#"
    if h != "#":
        return h.strip("/")
    return "#" + collapse(c["name"]).lower() + "|" + os.path.basename(c["image"])


groups = []  # dicts: page, idx, title, viewAll, cards, kind
data_file_of = {}
for page, (layout, s) in cat_pages.items():
    if layout == "subcategory":
        m = re.search(r"window\.SUBCATEGORY_GROUPS\s*=\s*(.*?);?\s*</script>", s, re.S)
        gl = json.loads(m.group(1))
        strip = None
    else:
        src = re.search(r'<script src="js/data/([^"]+-products\.js)"', s).group(1)
        data_file_of[page] = src
        c = jslit.consts(read(os.path.join(ROOT, "js", "data", src)))
        gl = next(v for k, v in c.items() if k.endswith("_GROUPS"))
        strip = next(v for k, v in c.items() if k.endswith("_ICON_STRIP"))
        if layout in ("lock", "network"):
            base = LOCK_IMG_BASE if layout == "lock" else NET_IMG_BASE
            for g_ in gl:
                for c_ in g_["products"]:
                    c_["image"] = base + c_["image"]
    cat_pages[page] = (layout, s, gl, strip)
    for i, g_ in enumerate(gl):
        groups.append({"page": page, "layout": layout, "idx": i, "title": g_["title"],
                       "viewAll": g_.get("viewAllHref"), "cards": g_["products"]})

home = jslit.consts(read(os.path.join(ROOT, "js", "data", "products.js")))["PRODUCT_SECTIONS"]

# ------------------------------------------------------------------ lock-only products
known_names = {}
for p in products.values():
    known_names[p["name"].lower()] = p["slug"]
    # the hand-made DDL609 page title carries a colour suffix
    known_names[re.sub(r"\s*-\s*\(.*\)$", "", p["name"]).lower()] = p["slug"]

taken = set(d for d, _ in pages()) | set(products)
key_to_slug = {k: k for k in products}
lock_only = OrderedDict()
for g_ in groups:
    for c in g_["cards"]:
        k = card_key(c)
        if not k.startswith("#") or k in key_to_slug:
            continue
        nm = collapse(c["name"])
        if nm.lower() in known_names:
            key_to_slug[k] = known_names[nm.lower()]
            continue
        base = slugify(nm)
        slug, n = base, 2
        while slug in taken:
            slug, n = f"{base}-{n}", n + 1
        taken.add(slug)
        key_to_slug[k] = slug
        known_names[nm.lower()] = slug
        lock_only[slug] = OrderedDict(
            slug=slug, name=nm, brand="", sku="", warranty="", stock="Còn hàng",
            price=money(c.get("price", "")), old_price=money(c.get("oldPrice") or ""), vat=False,
            images=[asset(c["image"])], summary=[], offers=[], specs=[], description_html="",
            seo_description="", breadcrumb=None, _similar=None, _sim_attrs={},
            _discount_text=c.get("discount", ""))
print(f"lock-only products (no page yet): {len(lock_only)}")
products.update(lock_only)

# ------------------------------------------------------------------ categories
cats = OrderedDict()


def add_cat(slug, name, parent, layout, image="", description=""):
    if slug in cats:
        return cats[slug]
    cats[slug] = OrderedDict(slug=slug, name=name, parent=parent, layout=layout, image=image,
                             description=description, order=0, _members=[])
    return cats[slug]


def page_name(s):
    ol = re.search(r'<ol class="global-breadcrumb__list">(.*?)</ol>', s, re.S).group(1)
    last = re.findall(r'class="global-breadcrumb__link"[^>]*>(.*?)</(?:a|span)', ol, re.S)[-1]
    return text(last)


def page_desc(s):
    m = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', s, re.S)
    return H.unescape(collapse(m.group(1))) if m else ""


# roots and every page-backed category first (page order), parents fixed below
for page, (layout, s, gl, strip) in cat_pages.items():
    add_cat(page, page_name(s), "", layout, description=page_desc(s))

for page, (layout, s, gl, strip) in cat_pages.items():
    images = {x["label"]: x["image"] for x in (strip or [])}
    if layout == "subcategory":
        if len(gl) == 1 and not gl[0].get("viewAllHref"):
            cats[page]["_members"].append([card_key(c) for c in gl[0]["products"]])
            continue
        children = []
        for g_ in gl:
            child = g_["viewAllHref"].strip("/")
            children.append(child)
        for i, child in enumerate(children):
            cats[child]["parent"] = page
            cats[child]["order"] = i + 1
        continue
    # category / brand / lock / network pages: groups == children, strip == children icons
    labels = [x["label"] for x in strip]
    order = 0
    for label in labels:
        g_ = next((x for x in gl if x["title"] == label), None)
        href = (g_ or {}).get("viewAllHref") or "#"
        if href != "#":
            child = href.strip("/")
        else:
            child = slugify(label)
            child = child if child.startswith(page + "-") else f"{page}-{child}"
            if child in taken:
                warn(f"category slug collision {child}")
            add_cat(child, label, page, "subcategory")
            if g_:
                cats[child]["_members"].append([card_key(c) for c in g_["products"]])
        order += 1
        cats[child]["parent"] = page
        cats[child]["order"] = order
        cats[child]["image"] = asset(images[label]) if images.get(label) else ""
    for g_ in gl:
        if g_["title"] not in labels:
            warn(f"{page}: group {g_['title']} has no icon")

# sanity: children groups shown on a parent page equal the child page's own list
for page, (layout, s, gl, strip) in cat_pages.items():
    for g_ in gl:
        href = g_.get("viewAllHref") or "#"
        if href == "#" or (layout == "subcategory" and len(gl) == 1):
            continue
        child = href.strip("/")
        mine = [card_key(c) for c in g_["products"]]
        if cats[child]["_members"] and cats[child]["_members"][0] != mine:
            warn(f"{page} group {g_['title']} differs from /{child}/ list")
        elif not cats[child]["_members"]:
            cats[child]["_members"].append(mine)

roots = [c for c in cats.values() if not c["parent"]]
for i, c in enumerate(roots, 1):
    c["order"] = i

# ------------------------------------------------------------------ membership + global order
seqs = []
membership = defaultdict(list)
for c in cats.values():
    for seq in c["_members"]:
        seq = [key_to_slug.get(k, k) for k in seq]
        seqs.append(seq)
        for sl in seq:
            if sl not in products:
                warn(f"category {c['slug']} references unknown product {sl}")
                continue
            if c["slug"] not in membership[sl]:
                membership[sl].append(c["slug"])


def topo(seqs, universe):
    import heapq
    pos = {n: i for i, n in enumerate(universe)}
    succ, indeg = defaultdict(set), Counter()
    for s in seqs:
        for a, b in zip(s, s[1:]):
            if b not in succ[a]:
                succ[a].add(b)
                indeg[b] += 1
    heap = [(pos[n], n) for n in universe if indeg[n] == 0]
    heapq.heapify(heap)
    out = []
    while heap:
        _, n = heapq.heappop(heap)
        out.append(n)
        for m in succ[n]:
            indeg[m] -= 1
            if indeg[m] == 0:
                heapq.heappush(heap, (pos[m], m))
    assert len(out) == len(universe), "category orders are inconsistent"
    return out


universe = []
for s in seqs:
    for n in s:
        if n in products and n not in universe:
            universe.append(n)
for n in products:
    if n not in universe:
        universe.append(n)
order = topo([[n for n in s if n in products] for s in seqs], universe)

# products that are in no category grid at all: place them next to their breadcrumb siblings
orphans = [sl for sl in order if not membership[sl]]
print("products in no category grid:", orphans)
ORPHAN_HOME = {  # decided from their breadcrumbs (Chấm công - Kiểm soát cửa > ... > Dahua/Kabevision)
    "may-cham-cong-khuon-mat-dahua-dhi-asi3214a-w": "cham-cong-kiem-soat-ra-vao-dahua",
    "may-cham-cong-khuon-mat-dahua-dhi-asi3213a-w-e1": "cham-cong-kiem-soat-ra-vao-dahua",
    "may-kiem-soat-ra-vao-dahua-dhi-asi7213k-w": "cham-cong-kiem-soat-ra-vao-dahua",
    "may-kiem-soat-ra-vao-kabevision-kx-fr04ac-fw": "cham-cong-kiem-soat-ra-vao-kabevision",
    "bo-mo-rong-wifi-tplink-re235be": "tp-link-thiet-bi-mo-rong-mang",
    "modem-4g-tplink-tl-mr6400": "tp-link-modem-gateway",
}
for sl in orphans:
    if sl in ORPHAN_HOME:
        membership[sl].append(ORPHAN_HOME[sl])
    else:
        warn(f"{sl}: no category")

# primary category: the one whose first products reproduce the page's "similar" list
pos = {sl: i for i, sl in enumerate(order)}
for sl, p in products.items():
    cs = membership[sl]
    want = [h.strip("/") for h in (p["_similar"] or [])]
    best = None
    # several categories may reproduce the list; prefer the one under the brand page the
    # product's brand link pointed to (the build links the brand to the primary root)
    root_of = lambda c: root_of(cats[c]["parent"]) if cats[c]["parent"] else c  # noqa: E731
    for c in sorted(cs, key=lambda c: root_of(c) != p.get("_brand_href")):
        members = sorted((x for x in products if c in membership[x] and x != sl), key=pos.get)
        if members[:len(want)] == want and len(want) == min(4, len(members)):
            best = c
            break
    if best:
        cs.remove(best)
        cs.insert(0, best)
    elif p["_similar"] is not None and cs:
        warn(f"{sl}: similar list not reproducible from a category (hand-picked) -> {cs[0]}")
    p["categories"] = cs

# ------------------------------------------------------------------ card-only fields
def fmt(n):
    return "Liên hệ" if n is None else f"{n:,}".replace(",", ".") + " đ"


attrs_src = defaultdict(list)   # slug -> [(priority, attrs, where)]
badge_src = defaultdict(list)
for sl, p in products.items():
    for href, at in (p.get("_sim_attrs") or {}).items():
        attrs_src[href.strip("/")].append((3, at, f"similar@{sl}"))
for g_ in groups:
    prio = 0 if g_["layout"] == "subcategory" else 1
    for c in g_["cards"]:
        sl = key_to_slug.get(card_key(c), card_key(c))
        attrs_src[sl].append((prio, c.get("attrs") or [], f"{g_['page']}"))
        badge_src[sl].append("Mẫu mới" if c.get("isNew") else (c.get("badge") or ""))
        p = products.get(sl)
        if p is None:
            continue
        if collapse(c["name"]) != p["name"]:
            warn(f"card name differs [{g_['page']}] {c['name']!r} -> page {p['name']!r}")
        if c.get("price") and c["price"] != fmt(p["price"]):
            warn(f"card price differs [{g_['page']}] {sl}: card {c['price']!r} / page {fmt(p['price'])!r}")
featured = []
for si, sec in enumerate(home):
    for c in sec["products"]:
        sl = c["link"].strip("/")
        attrs_src[sl].append((2, c.get("attrs") or [], "home"))
        badge_src[sl].append(c.get("badge") or "")
        featured.append(sl)

for sl, p in products.items():
    src = sorted(attrs_src.get(sl, []), key=lambda x: x[0])
    p["attrs"] = src[0][1] if src else []
    if len({tuple(a) for _, a, _ in src}) > 1:
        warn(f"{sl}: attrs differ between cards, kept {p['attrs']} from {src[0][2]}")
    bs = [b for b in badge_src.get(sl, []) if b]
    p["badge"] = bs[0] if bs else ""
    if len(set(badge_src.get(sl, []))) > 1:
        warn(f"{sl}: badge differs between cards {set(badge_src[sl])}, kept {p['badge']!r}")
    p["featured"] = sl in featured

# discount check: the build computes round((old - price) / old * 100)
for sl, p in products.items():
    if p["price"] and p["old_price"]:
        calc = f"-{round((p['old_price'] - p['price']) * 100 / p['old_price'])}%"
        if p["_discount_text"] and p["_discount_text"] != calc:
            warn(f"{sl}: discount {p['_discount_text']} -> computed {calc}")

# ------------------------------------------------------------------ write
os.makedirs(os.path.join(OUT, "products"), exist_ok=True)
DETAIL = ["slug", "name", "categories", "brand", "sku", "warranty", "stock", "price", "old_price", "vat",
          "images", "summary", "offers", "specs", "description_html", "attrs", "badge", "featured",
          "seo_description", "keywords", "focus_keyword", "breadcrumb", "colors", "reviews",
          "created_at", "updated_at"]
index = []
for sl in order:
    p = products[sl]
    p.setdefault("keywords", "")
    p.setdefault("focus_keyword", "")
    p["created_at"] = p["updated_at"] = NOW
    if not p.get("breadcrumb"):
        p.pop("breadcrumb", None)
    detail = OrderedDict((k, p[k]) for k in DETAIL if k in p)
    with open(os.path.join(OUT, "products", f"{sl}.json"), "w", encoding="utf-8") as f:
        json.dump(detail, f, ensure_ascii=False, indent=2)
        f.write("\n")
    index.append(OrderedDict(slug=sl, name=p["name"], categories=p["categories"], brand=p["brand"],
                             image=p["images"][0], price=p["price"], old_price=p["old_price"],
                             attrs=p["attrs"], badge=p["badge"], stock=p["stock"],
                             featured=p["featured"], updated_at=NOW))
with open(os.path.join(OUT, "products.json"), "w", encoding="utf-8") as f:
    json.dump(index, f, ensure_ascii=False, indent=1)
    f.write("\n")
catlist = [OrderedDict((k, c[k]) for k in ("slug", "name", "parent", "layout", "image", "description", "order"))
           for c in cats.values()]
with open(os.path.join(OUT, "product-categories.json"), "w", encoding="utf-8") as f:
    json.dump(catlist, f, ensure_ascii=False, indent=1)
    f.write("\n")

print(f"wrote {len(index)} products, {len(catlist)} categories "
      f"({sum(1 for c in cats.values() if c['slug'] not in cat_pages)} without a page yet)")
print(f"{len(warnings)} warnings:")
for w in warnings:
    print("  -", w)
