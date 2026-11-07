# -*- coding: utf-8 -*-
"""News section generator: /tin-tuc/, one page per post (/<slug>/), the homepage news row.

Reads the CMS data (GAS.md II, II-B, XII):
    data/post-categories.json, data/posts.json (index, newest first), data/posts/<slug>.json
and data/settings.json (brand, hotline). Run from the project root:
    python3 scripts/news/build.py html

- Post with `smart.html` -> that design replaces content_html (GAS.md II-D.7).
- Article pages whose post was deleted (orphans) are removed.
"""
import html
import json
import os
import re
import shutil
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(REPO, "scripts", "site"))
from settings import load as load_settings, rel, tel  # noqa: E402
import smart as smart_lib  # noqa: E402

ROOT = sys.argv[1]  # html/
DATA = os.path.join(REPO, "data")
S = load_settings()
B = S["brand"]
HOTLINE, HOTLINE_TEL = S["hotline"], tel(S["hotline"])
esc = html.escape

# Chip icons of the original categories (post-categories.json has no image field).
CAT_ICON = {
    "huong-dan": "news-cat-huong-dan.png",
    "tu-van-lua-chon": "news-cat-tu-van.png",
    "tin-tuc-cong-ty": "news-cat-cong-ty.png",
}


def read_json(path, default):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError) as e:
        print(f"WARN {path}: {e}", file=sys.stderr)
        return default


CATEGORIES = sorted(read_json(os.path.join(DATA, "post-categories.json"), []),
                    key=lambda c: (c.get("order") if isinstance(c.get("order"), (int, float)) else 1e9))
CAT = {c["slug"]: c for c in CATEGORIES}

ARTICLES = []
for entry in read_json(os.path.join(DATA, "posts.json"), []):
    slug = entry.get("slug", "")
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
        print(f"WARN bad post slug {slug!r}", file=sys.stderr)
        continue
    d = read_json(os.path.join(DATA, "posts", slug + ".json"), None)
    if not isinstance(d, dict):
        continue
    ARTICLES.append({**entry, **d})
# Newest first; same day keeps the order of posts.json.
ARTICLES.sort(key=lambda a: a.get("date", ""), reverse=True)

SMART = smart_lib.render_many({a["slug"]: a.get("smart") for a in ARTICLES})


def cat_of(a):
    c = CAT.get(a.get("category"))
    return (c["slug"], c["name"]) if c else (a.get("category", ""), a.get("category", ""))


def cover(a):
    return rel(a.get("cover") or f"/assets/images/news-{a['slug']}.jpg")


def show(d):
    """2026-11-08 -> 08/11/2026"""
    y, m, dd = (d.split("-") + ["", "", ""])[:3]
    return f"{dd}/{m}/{y}"


def local_paths(s):
    """'/assets/…' -> 'assets/…' (pages use <base href="/">, same output as before the CMS)."""
    return re.sub(r'(\s(?:src|href)=")/(?!/)(assets/)', r"\1\2", s)


CAL_ICON = ('<svg class="news-date__icon" viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">'
            '<rect x="3.5" y="5" width="17" height="15.5" rx="2" stroke="currentColor" stroke-width="1.7"/>'
            '<path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>')


def date_tag(a, extra=""):
    return (f'<time class="news-date{extra}" datetime="{esc(a["date"])}">'
            f'{CAL_ICON}<span>{show(a["date"])}</span></time>')


def feat(a, big=False):
    cls = "news-feature news-feature--big" if big else "news-feature"
    lazy = "" if big else ' loading="lazy"'
    return f'''      <a class="{cls}" href="/{a['slug']}/">
        <span class="news-feature__media"><img class="news-feature__img" src="{esc(cover(a))}" alt="{esc(a['title'])}"{lazy}></span>
        <span class="news-feature__text">
          {date_tag(a)}
          <span class="news-feature__title">{esc(a['title'])}</span>
        </span>
      </a>'''


def card(a, tag="h3"):
    return f'''        <article class="news-card">
          <a class="news-card__img" href="/{a['slug']}/">
            <img src="{esc(cover(a))}" alt="{esc(a['title'])}" loading="lazy">
          </a>
          {date_tag(a)}
          <{tag} class="news-card__title"><a href="/{a['slug']}/">{esc(a['title'])}</a></{tag}>
        </article>'''


def chips(current=None):
    out = []
    for c in CATEGORIES:
        cid, name, icon = c["slug"], c["name"], CAT_ICON.get(c["slug"])
        cur = " is-current" if cid == current else ""
        ic = f'\n        <img class="news-cats__icon" src="assets/images/{icon}" alt="">' if icon else ""
        out.append(f'''      <a class="news-cats__item{cur}" href="/tin-tuc/#{cid}">{ic}
        <span>{esc(name)}</span>
      </a>''')
    return "\n".join(out)


def page(template, title, desc, crumbs, main, extra_css=(), keywords="", smart_css=None):
    s = template
    s = re.sub(r"<title>.*?</title>", lambda m: f"<title>{esc(title)} - {esc(B)}</title>", s, 1)
    s = re.sub(r'<meta name="description" content="[^"]*">',
               lambda m: f'<meta name="description" content="{esc(desc)}">' +
               (f'\n  <meta name="keywords" content="{esc(keywords)}">' if keywords else ""), s, 1)
    css = '<link rel="stylesheet" href="css/components/news-page.css">'
    for c in extra_css:
        css += f'\n  <link rel="stylesheet" href="css/components/{c}">'
    if smart_css is not None:
        css += f"\n  {smart_lib.CSS_LINK}" + (f"\n  <style>{smart_css}</style>" if smart_css else "")
    s = re.sub(r'<link rel="stylesheet" href="css/components/news-page.css">(\n  <link rel="stylesheet" href="css/components/article-page.css">)?',
               lambda m: css, s, 1)
    if smart_css is not None:
        s = s.replace('  <script src="js/main.js" defer></script>',
                      f'  {smart_lib.JS_TAG}\n  <script src="js/main.js" defer></script>', 1)
    items = ['      <li class="global-breadcrumb__item"><a class="global-breadcrumb__link" href="/">Trang chủ</a></li>']
    for href, label in crumbs:
        items.append(f'      <li class="global-breadcrumb__item"><a class="global-breadcrumb__link" href="{href}">{esc(label)}</a></li>')
    s = re.sub(r'(<ol class="global-breadcrumb__list">\n).*?(\n    </ol>)', lambda m: m.group(1) + "\n".join(items) + m.group(2), s, 1, flags=re.S)
    i = s.index("<main"); j = s.index("</main>", i) + len("</main>\n")
    return s[:i] + main + s[j:]


tpl = open(os.path.join(ROOT, "tin-tuc", "index.html"), encoding="utf-8").read()

# ---------- Listing page ----------
boxes = []
for c in CATEGORIES:
    cid, name = c["slug"], c["name"]
    items = [a for a in ARTICLES if a.get("category") == cid]
    if not items:
        continue
    cards = "\n".join(card(a) for a in items[:3])
    boxes.append(f'''    <section class="news-box" id="{cid}" aria-labelledby="{cid}-title">
      <h2 class="news-box__title" id="{cid}-title">{esc(name)}</h2>
      <div class="news-box__grid">
{cards}
      </div>
    </section>''')

top = ""
if ARTICLES:
    top = f'''      <div class="news-top">
{feat(ARTICLES[0], True)}
        <div class="news-top__small">
{chr(10).join(feat(a) for a in ARTICLES[1:5])}
        </div>
      </div>
'''
listing = f'''<main class="news-page">
  <h1 class="news-page__h1">Tin tức</h1>
  <div class="container">
    <nav class="news-cats" aria-label="Danh mục tin tức">
{chips()}
    </nav>
  </div>

  <div class="news-page__body">
    <div class="container">
{top}
{chr(10).join(boxes)}
    </div>
  </div>
</main>
'''
out = page(tpl, "Tin tức", f"Tin tức, hướng dẫn kỹ thuật, tư vấn lựa chọn camera và thiết bị an ninh từ {B}.",
           [("/tin-tuc/", "Tin tức")], listing)
open(os.path.join(ROOT, "tin-tuc", "index.html"), "w", encoding="utf-8").write(out)
print("tin-tuc/index.html")


# ---------- Detail pages ----------
def with_toc(body):
    """Give every <h2> an id and build a "Mục lục" box from them."""
    heads = []

    def repl(m):
        n = len(heads) + 1
        heads.append(re.sub(r"<[^>]+>", "", m.group(1)))
        return f'<h2 id="muc-{n}">{m.group(1)}</h2>'
    body = re.sub(r"<h2(?:\s[^>]*)?>(.*?)</h2>", repl, body.strip(), flags=re.S)
    if len(heads) < 3:
        return body
    items = "\n".join(f'          <li><a href="#muc-{i}">{h}</a></li>' for i, h in enumerate(heads, 1))
    toc = f'''<nav class="article-toc" aria-label="Mục lục">
        <p class="article-toc__title">Mục lục</p>
        <ol class="article-toc__list">
{items}
        </ol>
      </nav>'''
    i = body.find("<h2")
    return body[:i] + toc + "\n" + body[i:]


def is_article_page(path):
    try:
        with open(path, encoding="utf-8") as f:
            return 'class="article-detail"' in f.read()
    except OSError:
        return False


written = set()
for a in ARTICLES:
    target = os.path.join(ROOT, a["slug"], "index.html")
    if os.path.exists(target) and not is_article_page(target):
        print(f"WARN skip post {a['slug']}: /{a['slug']}/ is already another page", file=sys.stderr)
        continue
    cid, cname = cat_of(a)
    recent = [x for x in ARTICLES if x is not a][:5]
    related = [x for x in ARTICLES if x is not a and x.get("category") == a.get("category")]
    related += [x for x in ARTICLES if x is not a and x not in related]
    related = related[:4]
    side = "\n".join(f'''          <li>
            <a class="article-side__item" href="/{x['slug']}/">
              <img src="{esc(cover(x))}" alt="" loading="lazy">
              <span>
                <span class="article-side__title">{esc(x['title'])}</span>
                {date_tag(x)}
              </span>
            </a>
          </li>''' for x in recent)
    sm = SMART.get(a["slug"])
    content = local_paths(sm[0]) if sm else with_toc(local_paths(a.get("content_html") or ""))
    main = f'''<main class="article-page">
  <div class="container article-page__layout">
    <article class="article-detail">
      <a class="article-detail__cat" href="/tin-tuc/#{cid}">{esc(cname)}</a>
      <h1 class="article-detail__title">{esc(a['title'])}</h1>
      <div class="article-detail__meta">
        {date_tag(a)}
        <span>{esc(B)}</span>
      </div>
      <p class="article-detail__summary">{esc(a.get('description', ''))}</p>
      <img class="article-detail__cover" src="{esc(cover(a))}" alt="{esc(a['title'])}">
      <div class="article-detail__content">
{content}
      </div>
      <div class="article-detail__cta">
        <p><strong>Cần tư vấn chọn camera, thiết bị an ninh?</strong> Gọi ngay cho {esc(B)} để được hỗ trợ miễn phí.</p>
        <a class="article-detail__cta-btn" href="tel:{HOTLINE_TEL}">Hotline {esc(HOTLINE)}</a>
      </div>
    </article>

    <aside class="article-side" aria-label="Bài viết mới">
      <div class="article-side__box">
        <h2 class="article-side__heading">Bài viết mới</h2>
        <ul class="article-side__list">
{side}
        </ul>
      </div>
    </aside>
  </div>

  <section class="container article-related" aria-labelledby="related-title">
    <h2 class="news-box__title" id="related-title">Bài viết liên quan</h2>
    <div class="article-related__grid">
{chr(10).join(card(x) for x in related)}
    </div>
  </section>
</main>
'''
    out = page(tpl, a["title"], a.get("description", ""), [("/tin-tuc/", "Tin tức"), (f"/tin-tuc/#{cid}", cname)], main,
               extra_css=("article-page.css",), keywords=a.get("keywords", ""),
               smart_css=sm[1] if sm else None)
    os.makedirs(os.path.dirname(target), exist_ok=True)
    open(target, "w", encoding="utf-8").write(out)
    written.add(a["slug"])
    print(a["slug"] + "/index.html" + (" (smart)" if sm else ""))

# ---------- Orphans: article pages whose post no longer exists ----------
for d in sorted(os.listdir(ROOT)):
    p = os.path.join(ROOT, d, "index.html")
    if d not in written and os.path.isfile(p) and is_article_page(p):
        shutil.rmtree(os.path.join(ROOT, d))
        print("removed orphan", d + "/")

# ---------- Homepage news row ----------
p = os.path.join(ROOT, "index.html")
s = open(p, encoding="utf-8").read()
cards = "\n".join(f'''    <a class="article-row__card" href="/{a['slug']}/">
      <img class="article-row__img" src="{esc(cover(a))}" alt="{esc(a['title'])}" loading="lazy">
      <span class="article-row__caption">{esc(a['title'])}</span>
    </a>''' for a in ARTICLES[:4])
s, k = re.subn(r'(<div class="article-row__grid">\n).*?(\n  </div>\n</section>)', lambda m: m.group(1) + cards + m.group(2), s, 1, flags=re.S)
open(p, "w", encoding="utf-8").write(s)
print("index.html row", k)
