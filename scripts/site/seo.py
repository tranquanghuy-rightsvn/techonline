# -*- coding: utf-8 -*-
"""Add SEO metadata to every page and write robots.txt + sitemap.xml.

Run from the project root, AFTER the other generators (they copy page shells):
    python3 scripts/site/seo.py html

Per page, inside <head> (between <!-- seo:start --> / <!-- seo:end -->, so the
script can be re-run safely):
  - <title> gets the brand suffix if missing; meta description is kept
  - canonical (https://anninhthainguyen.vn/<slug>/), meta robots, theme-color
  - Open Graph + Twitter card (product photo / article cover / default image)
  - JSON-LD: Organization + WebSite (home), BreadcrumbList, Product (product
    pages), BlogPosting (news articles), WebPage/CollectionPage elsewhere
"""
import html as H
import json
import os
import re
import sys
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from settings import load as load_settings, intl, rel  # noqa: E402

ROOT = sys.argv[1]
SETTINGS = load_settings()  # data/settings.json over the built-in defaults (GAS.md II-C)
SITE = SETTINGS["website"].rstrip("/")
BRAND = SETTINGS["brand"]
PHONE = intl(SETTINGS["hotline"])
EMAIL = SETTINGS["email"]
TODAY = date.today().isoformat()
ORG_ID = f"{SITE}/#organization"
SITE_ID = f"{SITE}/#website"

# Utility pages: keep out of the index and the sitemap.
# Trang quản trị CMS (/admin/, /admin/api/) tự có meta noindex - không thêm SEO, không vào sitemap.
SKIP_DIRS = {"admin"}
NOINDEX = {"gio-hang", "thanh-toan", "taikhoan", "tim-kiem", "san-pham-da-xem"}

BLOCK = re.compile(r"\s*<!-- seo:start -->.*?<!-- seo:end -->", re.S)


def absolute(url):
    if not url:
        return OG_DEFAULT
    if url.startswith(("http://", "https://")):
        return url
    return f"{SITE}/{url.lstrip('/')}"


LOGO = absolute(SETTINGS["logo"])
OG_DEFAULT = absolute(SETTINGS["og_image"])
FAVICON = rel(SETTINGS["favicon"])


def text(rx, s):
    m = re.search(rx, s, re.S)
    return " ".join(H.unescape(re.sub(r"<[^>]+>", " ", m.group(1))).split()) if m else ""


def attr(v):
    return H.escape(v, quote=True)


def price_number(p):
    digits = re.sub(r"[^\d]", "", p or "")
    return digits if digits and "liên hệ" not in (p or "").lower() else ""


def breadcrumbs(s, url, title):
    m = re.search(r'<ol class="global-breadcrumb__list">(.*?)</ol>', s, re.S)
    items = []
    if m:
        for href, label in re.findall(r'<a class="global-breadcrumb__link" href="([^"]*)">(.*?)</a>', m.group(1), re.S):
            label = " ".join(H.unescape(re.sub(r"<[^>]+>", "", label)).split())
            if href.startswith("#") or not label:
                continue
            items.append((absolute(href if href != "/" else ""), label))
    if not items or items[0][0] != absolute(""):
        items.insert(0, (absolute(""), "Trang chủ"))
    items[0] = (f"{SITE}/", "Trang chủ")
    if items[-1][0] != url:
        items.append((url, title))
    return {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": i, "name": n, "item": u}
            for i, (u, n) in enumerate(items, 1)
        ],
    }


ORG = {
    # An address makes the shop a LocalBusiness (GAS.md II-C).
    "@type": "LocalBusiness" if SETTINGS["address"] else "Organization",
    "@id": ORG_ID,
    "name": BRAND,
    "url": f"{SITE}/",
    "logo": {"@type": "ImageObject", "url": LOGO},
    "image": OG_DEFAULT,
    "email": EMAIL,
    "telephone": PHONE,
    "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": PHONE,
        "contactType": "customer service",
        "areaServed": "VN",
        "availableLanguage": ["Vietnamese"],
    }],
}
if SETTINGS["address"]:
    ORG["address"] = {"@type": "PostalAddress", "streetAddress": SETTINGS["address"], "addressCountry": "VN"}
if SETTINGS["tax_code"]:
    ORG["taxID"] = SETTINGS["tax_code"]
WEBSITE = {
    "@type": "WebSite",
    "@id": SITE_ID,
    "url": f"{SITE}/",
    "name": BRAND,
    "inLanguage": "vi-VN",
    "publisher": {"@id": ORG_ID},
    "potentialAction": {
        "@type": "SearchAction",
        "target": {"@type": "EntryPoint", "urlTemplate": f"{SITE}/tim-kiem/?q={{search_term_string}}"},
        "query-input": "required name=search_term_string",
    },
}


def process(slug, path):
    s = open(path, encoding="utf-8").read()
    s = BLOCK.sub("", s)
    url = f"{SITE}/" if slug == "" else f"{SITE}/{slug}/"

    title = text(r"<title>(.*?)</title>", s)
    if BRAND.lower() not in title.lower():
        title = f"{title} | {BRAND}"
        s = re.sub(r"<title>.*?</title>", f"<title>{H.escape(title, quote=False)}</title>", s, 1, flags=re.S)
    desc = ""
    m = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', s, re.S)
    if m:
        desc = " ".join(H.unescape(m.group(1)).split())
    if not desc:
        desc = f"{title} - camera giám sát, khóa cửa vân tay, thiết bị an ninh chính hãng tại {BRAND}."

    h1 = text(r"<h1[^>]*>(.*?)</h1>", s) or title
    graph = []
    og_type, image = "website", OG_DEFAULT
    extra_meta = []

    if slug == "":
        graph += [ORG, WEBSITE, {
            "@type": "WebPage", "@id": url + "#webpage", "url": url, "name": title,
            "description": desc, "isPartOf": {"@id": SITE_ID}, "about": {"@id": ORG_ID},
            "inLanguage": "vi-VN",
        }]
    elif 'class="pdp__title"' in s:
        name = text(r'<h1 class="pdp__title">(.*?)</h1>', s)
        img = re.search(r'class="pdp-gallery__main-img"[^>]*src="([^"]*)"', s)
        image = absolute(img.group(1)) if img else OG_DEFAULT
        brand = text(r'Thương hiệu:\s*(?:<a[^>]*>)?(.*?)</', s)
        sku = text(r'Mã sản phẩm:\s*<strong>(.*?)</strong>', s)
        stock = text(r'class="pdp__meta-stock">(.*?)<', s)
        price = price_number(text(r'<span class="pdp-price[^"]*">(.*?)</span>', s))
        product = {
            "@type": "Product", "@id": url + "#product", "name": name, "url": url,
            "image": [image], "description": desc,
        }
        if brand:
            product["brand"] = {"@type": "Brand", "name": brand}
        if sku:
            product["sku"] = sku
            product["mpn"] = sku
        if price:
            product["offers"] = {
                "@type": "Offer", "url": url, "priceCurrency": "VND", "price": price,
                "availability": "https://schema.org/InStock" if "còn" in stock.lower() else "https://schema.org/OutOfStock",
                "itemCondition": "https://schema.org/NewCondition",
                "seller": {"@id": ORG_ID},
            }
            extra_meta += [("product:price:amount", price), ("product:price:currency", "VND")]
        graph.append(product)
        og_type = "product"
    elif 'class="article-detail"' in s:
        cover = re.search(r'class="article-detail__cover" src="([^"]*)"', s)
        image = absolute(cover.group(1)) if cover else OG_DEFAULT
        dt = re.search(r'<div class="article-detail__meta">.*?datetime="([^"]+)"', s, re.S)
        published = dt.group(1) if dt else TODAY
        section = text(r'class="article-detail__cat"[^>]*>(.*?)</a>', s)
        graph.append({
            "@type": "BlogPosting", "@id": url + "#article", "headline": h1, "description": desc,
            "image": [image], "datePublished": published, "dateModified": published,
            "author": {"@id": ORG_ID}, "publisher": {"@id": ORG_ID},
            "mainEntityOfPage": url, "articleSection": section, "inLanguage": "vi-VN",
        })
        graph.append(ORG)
        og_type = "article"
        extra_meta += [("article:published_time", published), ("article:section", section)]
    else:
        listing = 'class="category-page' in s or 'class="news-page' in s or "product-card" in s
        graph.append({
            "@type": "CollectionPage" if listing else "WebPage", "@id": url + "#webpage", "url": url,
            "name": h1, "description": desc, "isPartOf": {"@id": SITE_ID}, "inLanguage": "vi-VN",
        })
    if slug != "":
        graph.append(breadcrumbs(s, url, h1))

    noindex = slug in NOINDEX
    robots = "noindex, follow" if noindex else "index, follow, max-image-preview:large"
    metas = [
        f'<link rel="canonical" href="{url}">',
        f'<meta name="robots" content="{robots}">',
        '<meta name="theme-color" content="#0064bd">',
        f'<link rel="apple-touch-icon" href="{attr(FAVICON)}">',
        f'<meta property="og:locale" content="vi_VN">',
        f'<meta property="og:site_name" content="{attr(BRAND)}">',
        f'<meta property="og:type" content="{og_type}">',
        f'<meta property="og:title" content="{attr(title)}">',
        f'<meta property="og:description" content="{attr(desc)}">',
        f'<meta property="og:url" content="{url}">',
        f'<meta property="og:image" content="{attr(image)}">',
        f'<meta property="og:image:alt" content="{attr(h1)}">',
    ]
    metas += [f'<meta property="{k}" content="{attr(v)}">' for k, v in extra_meta if v]
    metas += [
        '<meta name="twitter:card" content="summary_large_image">',
        f'<meta name="twitter:title" content="{attr(title)}">',
        f'<meta name="twitter:description" content="{attr(desc)}">',
        f'<meta name="twitter:image" content="{attr(image)}">',
    ]
    ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False, separators=(",", ":"))
    ld = ld.replace("</", "<\\/")
    block = ("\n  <!-- seo:start -->\n  " + "\n  ".join(metas) +
             f'\n  <script type="application/ld+json">{ld}</script>\n  <!-- seo:end -->')
    i = s.index("</head>")
    head_end = s.rfind("\n", 0, i)
    s = s[:head_end] + block + s[head_end:]
    open(path, "w", encoding="utf-8").write(s)
    return not noindex


pages = [("", os.path.join(ROOT, "index.html"))]
pages += [(d, os.path.join(ROOT, d, "index.html")) for d in sorted(os.listdir(ROOT))
          if d not in SKIP_DIRS and os.path.isfile(os.path.join(ROOT, d, "index.html"))]
indexable = [slug for slug, path in pages if process(slug, path)]


def priority(slug):
    if slug == "":
        return "1.0"
    p = os.path.join(ROOT, slug, "index.html")
    s = open(p, encoding="utf-8").read()
    if 'class="pdp__title"' in s:
        return "0.6"
    if 'class="article-detail"' in s:
        return "0.6"
    if "chinh-sach" in slug or slug in {"hinh-thuc-thanh-toan", "huong-dan-mua-hang", "tuyen-dung-nhan-vien-ky-thuat"}:
        return "0.3"
    return "0.8"


urls = "\n".join(
    f"  <url>\n    <loc>{SITE}/{slug + '/' if slug else ''}</loc>\n    <lastmod>{TODAY}</lastmod>\n"
    f"    <priority>{priority(slug)}</priority>\n  </url>"
    for slug in indexable)
open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8").write(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + "\n</urlset>\n")

open(os.path.join(ROOT, "robots.txt"), "w", encoding="utf-8").write(
    "User-agent: *\n"
    "Allow: /\n"
    "Disallow: /gio-hang/\n"
    "Disallow: /thanh-toan/\n"
    "Disallow: /taikhoan/\n"
    "\n"
    f"Sitemap: {SITE}/sitemap.xml\n")

print(f"{len(pages)} pages, {len(indexable)} in sitemap, {len(pages) - len(indexable)} noindex")
