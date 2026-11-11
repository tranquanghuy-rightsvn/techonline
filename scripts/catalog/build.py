# -*- coding: utf-8 -*-
"""Build the product catalog from data/ (GAS.md III, III-B, XII).

    python3 scripts/catalog/build.py html

Reads data/products.json, data/products/<slug>.json, data/product-categories.json
(and data/posts.json + data/settings.json when present) and regenerates:
  - every product page html/<slug>/index.html (shell = an existing product page; the
    constant blocks — header, footer, perks, trust box — are kept from the shell; reviews and Q&A
    are stripped from it)
  - the product grids the category pages render client-side: the inline
    `window.SUBCATEGORY_GROUPS` of subcategory pages and html/js/data/<x>-products.js for the
    category / brand / lock / network layouts; a page is created for a new category
  - html/js/data/products.js (home page sections: products with `featured` > 0, by that rank)
  - html/js/data/search-index.js (products + posts)
  - deletes orphan product pages (product removed from data) and orphan category pages
Derived here: % discount, similar products (first 4 of the primary category), card fields.
JSON-LD Product / BreadcrumbList / OG are added afterwards by scripts/site/seo.py (it reads
the generated page), so this script must run before seo.py.
"""
import html as H
import json
import os
import re
import shutil
import sys
from html.parser import HTMLParser

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
DATA = os.path.join(REPO, "data")
ROOT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(REPO, "html")
sys.path.insert(0, HERE)
sys.path.insert(0, os.path.join(REPO, "scripts", "site"))

import smart  # noqa: E402  scripts/site/smart.py (node + html/js/smart-scope.js)
from settings import load as load_settings, rel  # noqa: E402  scripts/site/settings.py

S = load_settings()
BRAND = S["brand"]
DEFAULT_OFFERS = S["default_offers"]

# How many rows are shown before "Xem thêm" (the rest get the collapsed class).
SUMMARY_VISIBLE, DESC_VISIBLE, SPECS_VISIBLE = 6, 6, 4
SIMILAR_COUNT = 4
# Overview pages (category / brand / lock / network layouts) show at most this many cards per band;
# the band's "Xem tất cả" opens the subcategory page with all of them.
BAND_LIMIT = 20
HOME_LIMIT = 10
SHELL_PREF = "camera-analog-dahua-dh-hac-b2a21p-u-il-a"

# Home page sections (layout/labels are not CMS-managed). A featured product goes to the
# first section (in `claim` order) whose category trees contain one of its categories.
HOME_SECTIONS = [
    {"id": "cat1", "type": "category", "title": "Camera giám sát",
     "tabs": [{"label": "Camera Imou", "href": "#"}, {"label": "Camera Dahua", "href": "#"},
              {"label": "Camera KBVision", "href": "#"}],
     "viewAllText": "Xem tất cả ›", "viewAllHref": "/camera-giam-sat/",
     "roots": ["camera-giam-sat", "dahua", "imou", "kbvision", "kabe-vision", "hikvision"], "claim": 4},
    {"id": "cat2", "type": "category", "title": "Thiết bị mạng",
     "tabs": [{"label": "Router TP-Link", "href": "#"}, {"label": "Mesh Wi-Fi", "href": "#"},
              {"label": "Modem – Gateway", "href": "#"}],
     "viewAllText": "Xem tất cả ›", "viewAllHref": "/tp-link/",
     "roots": ["thiet-bi-mang", "tp-link"], "claim": 3},
    {"id": "cat5", "type": "category", "title": "Chấm công - Kiểm soát cửa",
     "tabs": [{"label": "Kiểm soát cửa Dahua", "href": "#"}, {"label": "Kiểm soát cửa Kabevision", "href": "#"},
              {"label": "Module vân tay", "href": "#"}],
     "viewAllText": "Xem tất cả ›", "viewAllHref": "/dahua/",
     "roots": ["cham-cong-kiem-soat-cua", "phu-kien-khoa-van-tay"], "claim": 1},
    {"id": "cat6", "type": "category", "title": "Thiết bị lưu trữ",
     "tabs": [{"label": "Ổ cứng", "href": "#"}, {"label": "Thẻ nhớ", "href": "#"}, {"label": "Ổ SSD", "href": "#"}],
     "viewAllText": "Xem tất cả ›", "viewAllHref": "/sandisk/",
     "roots": ["thiet-bi-luu-tru", "seagate", "sandisk"], "claim": 2},
]

LAYOUT_JS = {"category": "category-page.js", "brand": "brand-category-page.js",
             "subcategory": "subcategory-page.js", "lock": "lock-page.js", "network": "network-page.js"}
LAYOUT_VAR = {"category": "CAMERA", "brand": "BRAND", "lock": "LOCK", "network": "NETWORK"}

esc = H.escape


def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()


def write(p, s):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    try:
        if read(p) == s:
            return False
    except OSError:
        pass
    with open(p, "w", encoding="utf-8") as f:
        f.write(s)
    return True


def load_json(p, default=None):
    try:
        return json.loads(read(p))
    except (OSError, ValueError):
        return default


def txt(v):
    """A list item / cell value: plain text is escaped, values with markup are trusted HTML."""
    v = str(v or "")
    return v if re.search(r"<[a-zA-Z/]", v) else esc(v, quote=False)


def money(n):
    return "Liên hệ" if n is None else f"{int(n):,}".replace(",", ".") + " đ"


def discount(p):
    pr, old = p.get("price"), p.get("old_price")
    if pr and old and old > pr:
        return f"-{round((old - pr) * 100 / old)}%"
    return ""


# ------------------------------------------------------------------ data
cats = load_json(os.path.join(DATA, "product-categories.json"), [])
index = load_json(os.path.join(DATA, "products.json"), [])
CAT = {c["slug"]: c for c in cats}
PROD = {}
for row in index:
    d = load_json(os.path.join(DATA, "products", f"{row['slug']}.json"))
    if d is None:
        print(f"! missing data/products/{row['slug']}.json, skipped")
        continue
    PROD[row["slug"]] = d
ORDER = [r["slug"] for r in index if r["slug"] in PROD]
POS = {s: i for i, s in enumerate(ORDER)}


def children(slug):
    return sorted((c for c in cats if c.get("parent") == slug), key=lambda c: (c.get("order") or 0))


def members(slug):
    return [s for s in ORDER if slug in (PROD[s].get("categories") or [])]


def chain(slug):
    out, seen = [], set()
    while slug and slug in CAT and slug not in seen:
        seen.add(slug)
        out.insert(0, CAT[slug])
        slug = CAT[slug].get("parent")
    return out


def subtree(slug):
    out, todo = set(), [slug]
    while todo:
        s = todo.pop()
        if s not in out:
            out.add(s)
            todo += [c["slug"] for c in cats if c.get("parent") == s]
    return out


# ------------------------------------------------------------------ product page shell
def pages():
    for d in sorted(os.listdir(ROOT)):
        p = os.path.join(ROOT, d, "index.html")
        if os.path.isfile(p):
            yield d, p


def find_shell():
    cand = [SHELL_PREF] + [d for d, _ in pages()]
    for d in cand:
        p = os.path.join(ROOT, d, "index.html")
        if not os.path.isfile(p):
            continue
        s = read(p)
        if all(k in s for k in ('class="pdp__title"', 'id="js-summary-list"', 'id="js-specs-table"',
                                'class="pdp-tabs__track"><article')) and "pdp-color" not in s:
            return s
    sys.exit("no product page left to use as shell")


SHELL = re.sub(r"\s*<!-- seo:start -->.*?<!-- seo:end -->", "", find_shell(), flags=re.S)
# Trang sản phẩm KHÔNG có "Đánh giá sản phẩm" + "Hỏi và đáp" (khách chốt 07/11/2026) - gỡ khỏi vỏ.
SHELL = re.sub(r'\s*<section class="pdp-(?:reviews|qa)".*?</section>', "", SHELL, flags=re.S)
CART_BTN = re.search(r'<div class="product-card__actions">(.*?</button>)', SHELL, re.S).group(1)
SUMMARY_TOGGLE = re.search(r'</ul>\s*(<button type="button" class="pdp-summary__toggle".*?</button>)', SHELL, re.S).group(1)
SPECS_TOGGLE = re.search(r'</table>\s*(<button type="button" class="pdp-specs__toggle".*?</button>)', SHELL, re.S).group(1)


def sub1(rx, repl, s):
    out, n = re.subn(rx, lambda m: repl, s, count=1, flags=re.S)
    if n != 1:
        raise RuntimeError(f"shell pattern not found: {rx[:60]}")
    return out


# ------------------------------------------------------------------ product page blocks
def similar_card(q):
    href = f"/{q['slug']}/"
    name = esc(q["name"])
    img = esc(rel((q.get("images") or [""])[0]))
    dc = discount(q)
    badge = f'\n              <span class="product-card__badge">{dc}</span>' if dc else ""
    if q.get("price") is None:
        price = '<div class="product-card__price-row"><p class="product-card__price product-card__price--contact">Liên hệ</p></div>'
    else:
        rows = []
        if q.get("old_price"):
            rows.append(f'<span class="product-card__old-price">{money(q["old_price"])}</span>')
        rows.append(f'<span class="product-card__price">{money(q["price"])}</span>')
        if dc:
            rows.append(f'<span class="product-card__discount">{dc}</span>')
        price = ('<div class="product-card__price-row">\n                  ' + "\n                  ".join(rows) +
                 "\n        </div>")
    attrs = "".join(f'<span class="product-card__attr">{esc(a)}</span>' for a in (q.get("attrs") or []))
    return f'''<article class="product-card">{badge}
              <a href="{href}" class="product-card__img"><img src="{img}" alt="{name}" loading="lazy" /></a>
              <div class="product-card__body">
                <a href="{href}" class="product-card__name"><h3>{name}</h3></a>
                {price}
                <div class="product-card__attrs">{attrs}</div>
                <div class="product-card__actions">{CART_BTN}
        </div>
        </div>
            </article>'''


def similar(p):
    cs = p.get("categories") or []
    if not cs:
        return []
    return [PROD[s] for s in members(cs[0]) if s != p["slug"]][:SIMILAR_COUNT]


def primary_root(p):
    cs = p.get("categories") or []
    ch = chain(cs[0]) if cs else []
    return ch[0] if ch else None


# Alt texts of the two sidebar banners, by the root of the product's primary category.
ADS_ALT = {"camera-giam-sat": ("Flash sale camera giám sát", "Camera giám sát bảo hành 24 tháng"),
           "cham-cong-kiem-soat-cua": ("Flash sale camera giám sát", "Camera giám sát bảo hành 24 tháng"),
           "thiet-bi-mang": ("Flash sale thiết bị mạng", "Thiết bị mạng bảo hành 24 tháng")}


def ads_block(p):
    root = primary_root(p)
    a1, a2 = ADS_ALT.get(root["slug"] if root else "", ("Flash sale", "Bảo hành 24 tháng"))
    return f'''<div class="pdp-ads">
            <a href="#"><img src="assets/images/pdp-sidebar-banner-1.png" alt="{a1}" loading="lazy" /></a>
            <a href="#"><img src="assets/images/pdp-sidebar-banner-2.png" alt="{a2}" loading="lazy" /></a>
          </div>'''


def meta_block(p):
    items = []
    if p.get("brand"):
        root = primary_root(p)
        href = f"/{root['slug']}/" if root and root.get("layout") == "brand" else "#"
        items.append(f'<span class="pdp__meta-item">Thương hiệu: <a href="{href}" class="pdp__meta-link">{esc(p["brand"])}</a></span>')
    if p.get("sku"):
        items.append(f'<span class="pdp__meta-item">Mã sản phẩm: <strong>{esc(p["sku"])}</strong></span>')
    if p.get("warranty"):
        items.append(f'<span class="pdp__meta-item">Bảo hành: <strong class="pdp__meta-warranty">{esc(p["warranty"])}</strong></span>')
    items.append(f'<span class="pdp__meta-item">Tình trạng: <strong class="pdp__meta-stock">{esc(p.get("stock") or "Còn hàng")}</strong></span>')
    return '<div class="pdp__meta">\n        ' + "\n        ".join(items) + "\n      </div>"


def gallery(p):
    name = esc(p["name"])
    imgs = [rel(x) for x in (p.get("images") or [])] or ["assets/images/logo.png"]
    main = f'<img class="pdp-gallery__main-img" id="js-gallery-main-img" src="{esc(imgs[0])}" alt="{name}" />'
    thumbs = "".join(f'''
              <button type="button" class="pdp-gallery__thumb{' is-active' if i == 0 else ''}" data-src="{esc(src)}">
                <img src="{esc(src)}" alt="{name} - ảnh {i + 1}" />
              </button>''' for i, src in enumerate(imgs))
    return main, f'<div class="pdp-gallery__thumbs" id="js-gallery-thumbs">{thumbs}\n        </div>'


def price_group(p):
    if p.get("price") is None:
        inner = '<span class="pdp-price">Liên hệ</span>'
    else:
        rows = [f'<span class="pdp-price js-variant-price">{money(p["price"])}</span>']
        if p.get("old_price"):
            rows.append(f'<del class="pdp-old-price">{money(p["old_price"])}</del>')
        if discount(p):
            rows.append(f'<span class="pdp-discount">{discount(p)}</span>')
        if p.get("vat"):
            rows.append('<span class="pdp-vat">( Đã bao gồm VAT )</span>')
        inner = "\n            ".join(rows)
    return f'<div class="pdp-price-group">\n            {inner}\n          </div>'


def summary_block(p):
    items = p.get("summary") or []
    if not items:
        return ""
    extra = ' class="pdp-summary__extra"'
    lis = "".join(f"<li{extra if i >= SUMMARY_VISIBLE else ''}>{txt(x)}</li>" for i, x in enumerate(items))
    return f'''<div class="pdp-summary">
            <h2 class="pdp-summary__title">Mô tả tóm tắt sản phẩm</h2>
            <ul class="pdp-summary__list" id="js-summary-list">{lis}</ul>
            {SUMMARY_TOGGLE}
          </div>'''


def color_block(p):
    colors = p.get("colors") or []
    if not colors:
        return ""
    sw = "".join(f'''
              <button type="button" class="pdp-color__swatch{' is-active' if i == 0 else ''}" style="background: {esc(c.get('hex', ''))}" data-color="{esc(c['name'])}" data-img="{esc(rel(c.get('image', '')))}" aria-label="Màu {esc(c['name'])}"></button>'''
                 for i, c in enumerate(colors))
    return f'''

          <div class="pdp-color">
            <div class="pdp-color__text">
              <span class="pdp-color__label">Màu sắc</span>
              <span class="pdp-color__value" id="js-color-value">{esc(colors[0]['name'])}</span>
            </div>
            <div class="pdp-color__swatches">{sw}
            </div>
          </div>'''


class _TopLevel(HTMLParser):
    """Split an HTML fragment into its top-level nodes (keeps the source text)."""
    VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}

    def __init__(self, src):
        super().__init__(convert_charrefs=False)
        self.src, self.depth, self.start, self.parts = src, 0, None, []
        self.lines = [0]
        for line in src.splitlines(keepends=True):
            self.lines.append(self.lines[-1] + len(line))
        self.feed(src)
        self.close()

    def _off(self):
        ln, col = self.getpos()
        return self.lines[ln - 1] + col

    def handle_starttag(self, tag, attrs):
        if self.depth == 0:
            self.start = self._off()
        if tag in self.VOID:
            if self.depth == 0:
                self._end(self._off() + len(self.get_starttag_text()))
        else:
            self.depth += 1

    def handle_startendtag(self, tag, attrs):
        if self.depth == 0:
            self.start = self._off()
            self._end(self._off() + len(self.get_starttag_text()))

    def handle_endtag(self, tag):
        if tag in self.VOID:
            return
        self.depth = max(0, self.depth - 1)
        if self.depth == 0 and self.start is not None:
            end = self.src.index(">", self._off()) + 1
            self._end(end)

    def handle_data(self, data):
        if self.depth == 0 and data.strip():
            self.parts.append(("text", data.strip()))

    def _end(self, end):
        self.parts.append(("el", self.src[self.start:end]))
        self.start = None


def add_class(el, cls):
    m = re.match(r"<([a-zA-Z0-9]+)([^>]*?)(\s*/?)>", el)
    if not m:
        return el
    attrs = m.group(2)
    cm = re.search(r'\sclass="([^"]*)"', attrs)
    if cm:
        attrs = attrs.replace(cm.group(0), f' class="{cm.group(1)} {cls}"', 1)
    else:
        attrs += f' class="{cls}"'
    end = " /" if m.group(1).lower() in _TopLevel.VOID else m.group(3)
    return f"<{m.group(1)}{attrs}{end}>" + el[m.end():]


def description_body(p, smart):
    zalo = S.get("zalo") or S["hotline"]
    boiler = f'''
              <hr class="pdp-description__hidden" />
              <p class="pdp-description__hidden">Cảm ơn bạn đã ghé thăm website {esc(S["website"])} bán hàng online của chúng tôi. Chúng tôi rất trân trọng sự quan tâm của Quý khách đối với các sản phẩm và dịch vụ mà chúng tôi cung cấp. Đội ngũ tư vấn của chúng tôi luôn ở đây để hỗ trợ thông tin và giải đáp mọi thắc mắc của bạn.</p>
              <p class="pdp-description__hidden">Nếu cần hỗ trợ ngay, Quý khách vui lòng liên hệ:<br />Hotline/Zalo: {esc(zalo)}<br />Email: {esc(S["email"])}</p>'''
    if smart:
        return f'''<div class="pdp-description__body" id="js-desc-body">
              {smart[0]}{boiler}
        </div>'''
    parts = []
    for kind, el in _TopLevel(p.get("description_html") or "").parts:
        if kind == "text":
            el = f"<p>{el}</p>"
        parts.append(add_class(el, "pdp-description__hidden") if len(parts) >= DESC_VISIBLE else el)
    return f'''<div class="pdp-description__body" id="js-desc-body">
              {"".join(parts)}{boiler}
        </div>'''


def specs_block(p):
    rows = p.get("specs") or []
    if not rows:
        return ""
    hid = ' class="pdp-specs__row--hidden"'
    trs = "".join(f"<tr{hid if i >= SPECS_VISIBLE else ''}><th>{txt(a)}</th><td>{txt(b)}</td></tr>"
                  for i, (a, b) in enumerate(rows))
    return f'''<div class="pdp-specs">
            <h2 class="pdp-specs__title">Thông số kỹ thuật</h2>
            <table class="pdp-specs__table" id="js-specs-table">
              <tbody>{trs}</tbody>
            </table>
            {SPECS_TOGGLE}
          </div>'''


def breadcrumb(p):
    trail = p.get("breadcrumb")
    if not trail:
        cs = p.get("categories") or []
        trail = [[c["name"], f"/{c['slug']}/"] for c in chain(cs[0])] if cs else []
    items = [("/", "Trang chủ")] + [(h, n) for n, h in trail]
    lis = "".join(f'''
          <li class="global-breadcrumb__item">
            <a class="global-breadcrumb__link" href="{esc(h)}">{esc(n)}</a>
          </li>''' for h, n in items)
    return f'<ol class="global-breadcrumb__list">{lis}\n        </ol>'


def seo_description(p):
    d = (p.get("seo_description") or "").strip()
    if d:
        return d
    plain = [re.sub(r"<[^>]+>", "", H.unescape(x)) for x in (p.get("summary") or [])[:3]]
    return " ".join(plain) or f"{p['name']} chính hãng, giá tốt tại {BRAND}."


def product_page(p, sm):
    s = SHELL
    s = sub1(r"<title>.*?</title>", f"<title>{esc(p['name'], quote=False)} | {esc(BRAND, quote=False)}</title>", s)
    s = sub1(r'<meta\s+name="description"\s+content="[^"]*"\s*/?>',
             f'<meta name="description" content="{esc(seo_description(p))}" />', s)
    s = sub1(r'<ol class="global-breadcrumb__list">.*?</ol>', breadcrumb(p), s)
    i = s.index('<main class="pdp container"')
    j = s.index("</main>", i)
    m = s[i:j]
    m = sub1(r'<h1 class="pdp__title">.*?</h1>', f'<h1 class="pdp__title">{esc(p["name"], quote=False)}</h1>', m)
    m = sub1(r'<div class="pdp__meta">.*?</div>', meta_block(p), m)
    main_img, thumbs = gallery(p)
    m = sub1(r'<img class="pdp-gallery__main-img"[^>]*>', main_img, m)
    m = sub1(r'<div class="pdp-gallery__thumbs" id="js-gallery-thumbs">.*?</div>', thumbs, m)
    m = sub1(r'<div class="pdp-price-group">.*?</div>', price_group(p), m)
    m = sub1(r'<div class="pdp-summary">.*?</button>\s*</div>', summary_block(p) + color_block(p), m)
    offers = p.get("offers") or DEFAULT_OFFERS
    m = sub1(r'<ol class="pdp-offer__list">.*?</ol>', '<ol class="pdp-offer__list">' + "".join(
        f"\n              <li>{txt(o)}</li>" for o in offers) + "\n            </ol>", m)
    buy = "LIÊN HỆ ĐẶT MUA" if p.get("price") is None else "ĐẶT MUA NGAY"
    m = sub1(r'(<button type="button" class="pdp-actions__btn pdp-actions__btn--buy">).*?(<span>)',
             f'<button type="button" class="pdp-actions__btn pdp-actions__btn--buy">{buy}<span>', m)
    m = sub1(r'<div class="pdp-ads">.*?</div>', ads_block(p), m)
    m = sub1(r'<div class="pdp-description__body" id="js-desc-body">.*?</div>(?=\s*<button type="button" class="pdp-description__toggle")',
             description_body(p, sm), m)
    m = sub1(r'<div class="pdp-specs">.*?</button>\s*</div>', specs_block(p), m)
    cards = "".join(similar_card(q) for q in similar(p))
    m = sub1(r'<div class="pdp-tabs__track">.*?(?=\s*<button type="button" class="pdp-tabs__arrow pdp-tabs__arrow--prev")',
             f'<div class="pdp-tabs__track">{cards}</div>', m)
    s = s[:i] + m + s[j:]
    if sm:
        s = s.replace("</head>", smart.head_tags(sm[1]) + "</head>", 1)
        s = s.replace('<script src="js/main.js" defer></script>',
                      smart.JS_TAG + '\n  <script src="js/main.js" defer></script>', 1)
    return s


# ------------------------------------------------------------------ cards for grids
def card(p, link_key="href"):
    c = {"name": p["name"], "price": money(p.get("price"))}
    if p.get("old_price"):
        c["oldPrice"] = money(p["old_price"])
    if discount(p):
        c["discount"] = discount(p)
    c["attrs"] = p.get("attrs") or []
    c["image"] = rel((p.get("images") or [""])[0])
    c[link_key] = f"/{p['slug']}/"
    if p.get("badge") == "Mẫu mới":
        c["isNew"] = True
    return c


def groups_for(cat):
    layout = cat.get("layout") or "subcategory"
    kids = children(cat["slug"])
    if layout == "subcategory":
        out = []
        own = members(cat["slug"])
        if own or not kids:
            out.append({"title": cat["name"], "products": [card(PROD[s]) for s in own]})
        for k in kids:
            out.append({"title": k["name"], "viewAllHref": f"/{k['slug']}/",
                        "products": [card(PROD[s]) for s in members(k["slug"])]})
        return None, out
    strip = [{"label": k["name"], "image": rel(k.get("image") or "")} for k in kids]
    out = []
    for k in kids:
        ms = members(k["slug"])
        if ms or layout == "brand":
            out.append({"title": k["name"], "viewAllHref": f"/{k['slug']}/",
                        "products": [card(PROD[s]) for s in ms[:BAND_LIMIT]]})
    return strip, out


def js_const(name, value):
    return f"const {name} = " + json.dumps(value, ensure_ascii=False, indent=2) + ";\n"


CATALOG_SCRIPTS = tuple(f"js/components/{v}" for v in LAYOUT_JS.values())


def is_catalog_page(s):
    return 'class="pdp__title"' not in s and any(x in s for x in CATALOG_SCRIPTS)


def category_shell(layout):
    want = f'js/components/{LAYOUT_JS[layout]}'
    for d, p in pages():
        s = read(p)
        if want in s and 'class="pdp__title"' not in s and (layout != "subcategory" or "SUBCATEGORY_GROUPS" in s):
            return d, s
    return None, None


def category_page(cat):
    """Create or update html/<slug>/index.html for a category; returns True if written."""
    layout = cat.get("layout") or "subcategory"
    path = os.path.join(ROOT, cat["slug"], "index.html")
    strip, groups = groups_for(cat)
    exists = os.path.isfile(path)
    if exists:
        s = read(path)
    else:
        shell_slug, s = category_shell(layout)
        if s is None:
            print(f"! no shell page for layout {layout}, /{cat['slug']}/ not created")
            return False
        s = re.sub(r"\s*<!-- seo:start -->.*?<!-- seo:end -->", "", s, flags=re.S)
        s = re.sub(r"<title>.*?</title>", lambda m: f"<title>{esc(cat['name'], quote=False)} chính hãng, giá tốt | {esc(BRAND, quote=False)}</title>", s, 1, flags=re.S)
        lis = [("/", "Trang chủ", False)] + [(f"/{c['slug']}/", c["name"], False) for c in chain(cat.get("parent"))]
        lis.append((None, cat["name"], True))
        items = "".join(f'''
          <li class="global-breadcrumb__item" aria-current="page">
            <span class="global-breadcrumb__link">{esc(n)}</span>
          </li>''' if cur else f'''
          <li class="global-breadcrumb__item">
            <a class="global-breadcrumb__link" href="{h}">{esc(n)}</a>
          </li>''' for h, n, cur in lis)
        s = re.sub(r'<ol class="global-breadcrumb__list">.*?</ol>',
                   lambda m: f'<ol class="global-breadcrumb__list">{items}\n        </ol>', s, 1, flags=re.S)
        s = re.sub(r'aria-label="Danh mục [^"]*"', f'aria-label="Danh mục {esc(cat["name"])}"', s, 1)
        if layout != "subcategory":
            s = re.sub(r'js/data/[a-z0-9-]+-products\.js', f"js/data/{cat['slug']}-products.js", s, 1)
    desc = (cat.get("description") or "").strip() or (
        f"{cat['name']} chính hãng 100%, giá tốt nhất thị trường, bảo hành uy tín tại {BRAND}. "
        "Giao hàng toàn quốc, tư vấn và lắp đặt chuyên nghiệp.")
    if not exists or (cat.get("description") or "").strip():
        s = re.sub(r'<meta\s+name="description"\s+content="[^"]*"\s*/?>',
                   lambda m: f'<meta name="description" content="{esc(desc)}" />', s, 1, flags=re.S)
    if layout == "subcategory":
        data = json.dumps(groups, ensure_ascii=False, indent=2)
        s, n = re.subn(r"(window\.SUBCATEGORY_GROUPS = ).*?;(\s*</script>)",
                       lambda m: m.group(1) + data + ";" + m.group(2), s, 1, flags=re.S)
        if n != 1:
            print(f"! /{cat['slug']}/: SUBCATEGORY_GROUPS not found")
    else:
        src = re.search(r'<script src="js/data/([a-z0-9-]+-products\.js)"', s).group(1)
        var = LAYOUT_VAR[layout]
        write(os.path.join(ROOT, "js", "data", src),
              "// Generated by scripts/catalog/build.py from data/ — do not edit by hand.\n" +
              js_const(f"{var}_ICON_STRIP", strip) + "\n" + js_const(f"{var}_CATEGORY_GROUPS", groups))
    return write(path, s)


def featured_rank(p):
    """`featured`: 0/false/absent = not on the home page; n >= 1 = rank (true counts as 1)."""
    f = p.get("featured")
    try:
        f = int(f)
    except (TypeError, ValueError):
        f = 0
    return f if f > 0 else 10 ** 9


# ------------------------------------------------------------------ run
def main():
    smarts = smart.render_many({s: PROD[s].get("smart") for s in ORDER})
    written = 0
    for slug in ORDER:
        if write(os.path.join(ROOT, slug, "index.html"), product_page(PROD[slug], smarts.get(slug))):
            written += 1
    print(f"product pages: {len(ORDER)} ({written} written)")

    # orphan product pages
    removed = []
    for d, p in list(pages()):
        if d not in PROD and 'class="pdp__title"' in read(p):
            shutil.rmtree(os.path.join(ROOT, d))
            removed.append(d)
    print(f"orphan product pages removed: {len(removed)} {removed[:10]}")

    # categories (pages that exist first, so new pages can copy a shell)
    cw = 0
    for c in sorted(cats, key=lambda c: not os.path.isfile(os.path.join(ROOT, c["slug"], "index.html"))):
        cw += category_page(c)
    gone = []
    for d, p in list(pages()):
        if d not in CAT and is_catalog_page(read(p)):
            shutil.rmtree(os.path.join(ROOT, d))
            gone.append(d)
    used = set()
    for d, p in pages():
        used |= set(re.findall(r'js/data/([a-z0-9-]+-products\.js)', read(p)))
    for f in os.listdir(os.path.join(ROOT, "js", "data")):
        if f.endswith("-products.js") and f not in used:
            os.remove(os.path.join(ROOT, "js", "data", f))
            gone.append("js/data/" + f)
    print(f"category pages: {len(cats)} ({cw} written), orphans removed: {gone}")

    # home sections
    trees = {sec["id"]: set().union(*(subtree(r) for r in sec["roots"])) for sec in HOME_SECTIONS}
    by_claim = sorted(HOME_SECTIONS, key=lambda x: x["claim"])
    picked = {sec["id"]: [] for sec in HOME_SECTIONS}
    for slug in sorted(ORDER, key=lambda s: (featured_rank(PROD[s]), POS[s])):
        p = PROD[slug]
        if not featured_rank(p) < 10 ** 9:
            continue
        cs = set(p.get("categories") or [])
        sec = next((x for x in by_claim if cs & trees[x["id"]]), None)
        if sec and len(picked[sec["id"]]) < HOME_LIMIT:
            picked[sec["id"]].append(slug)
    out = []
    for sec in HOME_SECTIONS:
        o = {k: v for k, v in sec.items() if k not in ("roots", "claim")}
        prods = []
        for slug in picked[sec["id"]]:
            p = PROD[slug]
            c = card(p, "link")
            prods.append({"name": c["name"], "image": c["image"], "price": c["price"],
                          "oldPrice": c.get("oldPrice", ""), "discount": c.get("discount", ""),
                          "badge": p.get("badge") or "", "attrs": c["attrs"], "link": c["link"]})
        o["products"] = prods
        out.append(o)
    write(os.path.join(ROOT, "js", "data", "products.js"),
          "// Generated by scripts/catalog/build.py from data/ — do not edit by hand.\n" + js_const("PRODUCT_SECTIONS", out))
    print("home sections:", {k: len(v) for k, v in picked.items()})

    # search index: products + posts
    idx = []
    for slug in ORDER:
        p = PROD[slug]
        idx.append({"name": p["name"], "href": f"/{slug}/", "image": rel((p.get("images") or [""])[0]),
                    "price": money(p.get("price")), "oldPrice": money(p["old_price"]) if p.get("old_price") else "",
                    "discount": discount(p)})
    posts = load_json(os.path.join(DATA, "posts.json"))
    sp = os.path.join(ROOT, "js", "data", "search-index.js")
    if isinstance(posts, list):
        for a in posts:
            idx.append({"type": "post", "name": a.get("title", ""), "href": f"/{a['slug']}/",
                        "image": rel(a.get("cover") or ""), "date": a.get("date", "")})
    else:
        try:
            old = json.loads(re.search(r"SEARCH_INDEX = (.*);\s*$", read(sp), re.S).group(1))
            idx += [x for x in old if x.get("type") == "post"]
        except (OSError, AttributeError, ValueError):
            pass
    write(sp, "// Generated by scripts/catalog/build.py from data/ — do not edit by hand.\n"
              "const SEARCH_INDEX = " + json.dumps(idx, ensure_ascii=False, indent=0) + ";\n")
    print(f"search-index.js: {len(idx)} entries")


if __name__ == "__main__":
    main()
