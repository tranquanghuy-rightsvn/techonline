# -*- coding: utf-8 -*-
"""Apply data/settings.json (GAS.md II-C) to every page of the site.

Run FIRST in scripts/build.sh (before the generators, which copy existing pages as shells):
    python3 scripts/site/apply_settings.py html

Two kinds of edits, both idempotent:
  * value swap — brand, hotline, email: the values currently on the site are read back from
    html/index.html (header pill + footer, written last so it always reflects the last applied
    settings) and replaced everywhere (pages + js/components/*.js) when they differ;
  * structural — logo, favicon, footer intro/address/MST/website/copyright, Zalo button,
    newsletter line, "Liên hệ" links (footer + utility menu), and on the home page the
    title/description, hero slides and promo tiles are rewritten from settings every run.
"""
import glob
import html as H
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from settings import DEFAULTS, HERO_TEXT, PROMO_ALT, load, rel, tel, zalo_url, host  # noqa: E402

ROOT = sys.argv[1]
S = load()
esc = H.escape
INDEX = os.path.join(ROOT, "index.html")


def current_values():
    try:
        s = open(INDEX, encoding="utf-8").read()
    except OSError:
        s = ""
    m = re.search(r'class="site-header__pill" href="tel:([^"]*)">.*?<span>Hotline ([^<]*)</span>', s, re.S)
    brand = (re.search(r'<h3 class="site-footer__title site-footer__brand">.*?\balt="([^"]*)"', s, re.S)
             or re.search(r'<h3 class="site-footer__title">([^<]*)</h3>', s))
    mail = re.search(r'<a href="mailto:([^"]+)">Email:', s)
    return {
        "brand": H.unescape(brand.group(1)) if brand else DEFAULTS["brand"],
        "tel": m.group(1) if m else tel(DEFAULTS["hotline"]),
        "hotline": H.unescape(m.group(2)) if m else DEFAULTS["hotline"],
        "email": mail.group(1) if mail else DEFAULTS["email"],
    }


OLD = current_values()
SWAPS = []  # (compiled regex, replacement)


def swap(old, new, boundary=None):
    if old and new and old != new:
        pat = re.escape(old)
        if boundary:
            pat = f"(?<!{boundary}){pat}(?!{boundary})"
        SWAPS.append((re.compile(pat), new.replace("\\", "\\\\")))


swap(OLD["brand"], S["brand"])
swap(OLD["brand"].upper(), S["brand"].upper())
swap(OLD["tel"], tel(S["hotline"]), boundary=r"\d")
swap(OLD["hotline"], S["hotline"], boundary=r"\d")
swap(OLD["email"], S["email"])
# html-escaped forms (e.g. a brand with "&")
for k in ("brand", "hotline", "email"):
    if esc(OLD[k]) != OLD[k]:
        swap(esc(OLD[k]), esc(S[k]))


def value_swap(s):
    for rx, new in SWAPS:
        s = rx.sub(new, s)
    return s


ICON_TYPES = {".webp": "image/webp", ".png": "image/png", ".ico": "image/x-icon", ".svg": "image/svg+xml",
              ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif"}
FAVICON = rel(S["favicon"])
FAVICON_TYPE = ICON_TYPES.get(os.path.splitext(FAVICON.split("?")[0])[1].lower(), "image/png")


# Nút Messenger nổi góc phải: TẠM ẨN (khách yêu cầu 07/11/2026, sẽ mở lại) - bọc trong comment HTML.
# Mở lại: đổi thành True rồi chạy scripts/build.sh (tự gỡ comment).
SHOW_MESSENGER = False
MSG_OPEN = "<!-- messenger:hidden (tạm ẩn - mở lại: SHOW_MESSENGER = True trong scripts/site/apply_settings.py)"
MSG_CLOSE = "messenger:hidden -->"


def messenger(s):
    if SHOW_MESSENGER:
        return re.sub(r"<!-- messenger:hidden[^\n]*\n[ \t]*(.*?)\n[ \t]*messenger:hidden -->", r"\1", s, flags=re.S)
    if MSG_OPEN in s:
        return s
    return re.sub(r"([ \t]*)(<a\b[^>]*contact-stack__item--messenger[^>]*>.*?</a>)",
                  lambda m: f"{m.group(1)}{MSG_OPEN}\n{m.group(1)}{m.group(2)}\n{m.group(1)}{MSG_CLOSE}",
                  s, count=1, flags=re.S)


def structural(s):
    # favicon + logo
    s = re.sub(r'<link rel="icon" href="[^"]*" type="[^"]*"',
               lambda m: f'<link rel="icon" href="{esc(FAVICON)}" type="{FAVICON_TYPE}"', s)
    s = re.sub(r'(class="site-header__logo"[^>]*>\s*<img\b[^>]*?\bsrc=")[^"]*(")',
               lambda m: m.group(1) + esc(rel(S["logo"])) + m.group(2), s, count=1)

    # footer, column 1: tiêu đề cột đầu = logo (khách chốt 08/11/2026). Idempotent: bản đã đổi thì chỉ cập nhật src/alt.
    logo_h3 = (f'<h3 class="site-footer__title site-footer__brand"><a href="/" aria-label="{esc(S["brand"])} - về trang chủ">'
               f'<img src="{esc(rel(S["logo"]))}" alt="{esc(S["brand"])}" width="164" height="48" loading="lazy"></a></h3>')
    foot = s.find("<footer")
    if foot != -1:
        head, tail = s[:foot], s[foot:]
        tail = re.sub(r'<h3 class="site-footer__title site-footer__brand">.*?</h3>|<h3 class="site-footer__title">[^<]*</h3>',
                      lambda m: logo_h3, tail, count=1, flags=re.S)
        s = head + tail

    def footer_intro(m):
        ind = m.group(3)
        extra = ""
        if S["address"]:
            extra += f'{ind}<p class="site-footer__address">Địa chỉ: {esc(S["address"])}</p>'
        if S["tax_code"]:
            extra += f'{ind}<p class="site-footer__tax">MST: {esc(S["tax_code"])}</p>'
        return (f'{m.group(1)}{esc(S["brand"].upper())}</p>{m.group(2)}<p>{esc(S["footer_text"])}</p>'
                f'{extra}{ind}')
    s = re.sub(r'(<p class="site-footer__company">)[^<]*</p>(\s*)<p>[^<]*</p>'
               r'(?:\s*<p class="site-footer__(?:address|tax)">[^<]*</p>)*(\s*)(?=<a href="tel:)',
               footer_intro, s, count=1)
    s = re.sub(r'<a href="[^"]*">Website: [^<]*</a>',
               lambda m: f'<a href="{esc(S["website"])}">Website: {esc(host(S["website"]))}</a>', s, count=1)
    s = re.sub(r'(<div class="site-footer__copyright">\s*<p>)[^<]*(</p>)',
               lambda m: m.group(1) + esc(S["copyright"]) + m.group(2), s, count=1)
    foot = s.find("<footer")
    if foot != -1 and 'href="/lien-he/"' not in s[foot:]:
        s = re.sub(r'(\n[ \t]*)(<a href="/hinh-thuc-thanh-toan/">Hình thức thanh toán</a>)',
                   lambda m: m.group(1) + m.group(2) + m.group(1) + '<a href="/lien-he/">Liên hệ</a>', s, count=1)

    # header utility menu: KHÔNG thêm "Liên hệ" (thêm mục thứ 5 làm hàng tiện ích tràn, rớt dòng đè menu
    # danh mục - GAS.md mục IX). Gỡ mục đã chèn ở bản build cũ; link "Liên hệ" vẫn có ở chân trang.
    s = re.sub(r'\n[ \t]*<a class="site-header__utility-item" href="/lien-he/">.*?</a>', "", s, count=1, flags=re.S)

    s = messenger(s)

    # top bar: bỏ "Khuyến mãi hot" + "Hệ thống cửa hàng" (khách chốt 07/11/2026), chỉ giữ "Tin tức nổi bật"
    s = re.sub(r'\n[ \t]*<a class="site-header__top-link"[^>]*>(?:(?!</a>).)*?<span>(?:Khuyến mãi hot|Hệ thống cửa hàng)</span>\s*</a>',
               "", s, flags=re.S)

    # floating Zalo button (attribute order differs between page families)
    z = esc(zalo_url(S))
    s = re.sub(r'href="[^"]*"(\s+)class="contact-stack__item contact-stack__item--zalo"',
               lambda m: f'href="{z}"{m.group(1)}class="contact-stack__item contact-stack__item--zalo"', s)
    s = re.sub(r'(<a\s+class="contact-stack__item contact-stack__item--zalo"[^>]*?\shref=")[^"]*(")',
               lambda m: m.group(1) + z + m.group(2), s)

    # newsletter line names the brand (some product pages still had the old shop name, wrapped)
    s = re.sub(r'(<p class="newsletter__subtitle">)(\s*)Bạn vui lòng để lại Email để nhận thông tin khuyến mãi từ[^<]*?(\s*</p>)',
               lambda m: f'{m.group(1)}{m.group(2)}Bạn vui lòng để lại Email để nhận thông tin khuyến mãi từ {esc(S["brand"])}{m.group(3)}', s)
    return s


def link(href):
    return esc(href) if href else "#"


def home(s):
    t = esc(S["home_title"], quote=False)
    cur = re.search(r"<title>(.*?)</title>", s, re.S)
    if not cur or (cur.group(1) != t and not cur.group(1).startswith(t + " | ")):  # seo.py may add " | brand"
        s = re.sub(r"<title>.*?</title>", lambda m: f"<title>{t}</title>", s, count=1, flags=re.S)
    s = re.sub(r'<meta name="description" content="[^"]*">',
               lambda m: f'<meta name="description" content="{esc(S["home_description"])}">', s, count=1)

    slides, dots = [], []
    for i, h in enumerate(S["hero"]):
        aria, alt = HERO_TEXT.get(h["image"], (f"Xem khuyến mãi {i + 1}", f"Khuyến mãi {i + 1}"))
        slides.append(f'''      <a class="hero__slide" href="{link(h['link'])}" aria-label="{esc(aria)}">
        <img src="{esc(rel(h['image']))}" alt="{esc(alt)}" loading="{'eager' if i == 0 else 'lazy'}">
      </a>''')
        dots.append(f'      <button type="button" class="hero__dot{" is-active" if i == 0 else ""}" role="tab" '
                    f'aria-selected="{"true" if i == 0 else "false"}" aria-label="Slide {i + 1}" data-index="{i}"></button>')
    s = re.sub(r'(<div class="hero__track" id="js-hero-track">\n).*?(\n    </div>\n\n    <button)',
               lambda m: m.group(1) + "\n".join(slides) + m.group(2), s, count=1, flags=re.S)
    s = re.sub(r'(<div class="hero__dots" id="js-hero-dots"[^>]*>\n).*?(\n    </div>)',
               lambda m: m.group(1) + "\n".join(dots) + m.group(2), s, count=1, flags=re.S)

    tiles = []
    for i, t in enumerate(S["promo_tiles"]):
        alt = PROMO_ALT.get(t["image"], f"Ưu đãi {i + 1}")
        tiles.append(f'''  <a class="promo-strip__tile" href="{link(t['link'])}">
    <img class="promo-strip__img" src="{esc(rel(t['image']))}" alt="{esc(alt)}" loading="lazy">
  </a>''')
    s = re.sub(r'(<section class="promo-strip container"[^>]*>\n).*?(\n</section>)',
               lambda m: m.group(1) + "\n".join(tiles) + m.group(2), s, count=1, flags=re.S)
    return s


def process(path, is_home=False):
    s0 = open(path, encoding="utf-8").read()
    if 'class="site-header' not in s0 and not path.endswith(".js"):
        return False
    s = value_swap(s0)
    if not path.endswith(".js"):
        s = structural(s)
        if is_home:
            s = home(s)
    if s != s0:
        open(path, "w", encoding="utf-8").write(s)
        return True
    return False


pages = sorted(glob.glob(os.path.join(ROOT, "*", "index.html")))
scripts = sorted(glob.glob(os.path.join(ROOT, "js", "components", "*.js")))
changed = sum(process(p) for p in pages + scripts)
changed += process(INDEX, is_home=True)  # last: it records what is applied
print(f"settings: {changed} files updated" + (f" (swapped {', '.join(k for k in ('brand', 'hotline', 'email') if OLD[k] != S[k])})"
                                            if any(OLD[k] != S[k] for k in ('brand', 'hotline', 'email')) else ""))
