import sys, os, re, html
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from articles import ARTICLES, CATEGORIES, HOTLINE, HOTLINE_TEL

ROOT = sys.argv[1]  # html/
B = "An Ninh Thái Nguyên"
CAT = {c[0]: c for c in CATEGORIES}
esc = html.escape


def cover(a):
    return a["cover_src"] if a.get("cover_ready") else f"news-{a['slug']}.jpg"


def iso(d):
    dd, mm, yy = d.split(".")
    return f"{yy}-{mm}-{dd}"


CAL_ICON = ('<svg class="news-date__icon" viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">'
            '<rect x="3.5" y="5" width="17" height="15.5" rx="2" stroke="currentColor" stroke-width="1.7"/>'
            '<path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>')


def show(d):
    """08.11.2026 -> 08/11/2026"""
    return d.replace(".", "/")


def date_tag(a, extra=""):
    return (f'<time class="news-date{extra}" datetime="{iso(a["date"])}">'
            f'{CAL_ICON}<span>{show(a["date"])}</span></time>')


def feat(a, big=False):
    cls = "news-feature news-feature--big" if big else "news-feature"
    lazy = "" if big else ' loading="lazy"'
    return f'''      <a class="{cls}" href="/{a['slug']}/">
        <span class="news-feature__media"><img class="news-feature__img" src="assets/images/{cover(a)}" alt="{esc(a['title'])}"{lazy}></span>
        <span class="news-feature__text">
          {date_tag(a)}
          <span class="news-feature__title">{esc(a['title'])}</span>
        </span>
      </a>'''


def card(a, tag="h3"):
    return f'''        <article class="news-card">
          <a class="news-card__img" href="/{a['slug']}/">
            <img src="assets/images/{cover(a)}" alt="{esc(a['title'])}" loading="lazy">
          </a>
          {date_tag(a)}
          <{tag} class="news-card__title"><a href="/{a['slug']}/">{esc(a['title'])}</a></{tag}>
        </article>'''


def chips(current=None):
    out = []
    for cid, name, icon in CATEGORIES:
        cur = " is-current" if cid == current else ""
        ic = f'\n        <img class="news-cats__icon" src="assets/images/{icon}" alt="">' if icon else ""
        out.append(f'''      <a class="news-cats__item{cur}" href="/tin-tuc/#{cid}">{ic}
        <span>{name}</span>
      </a>''')
    return "\n".join(out)


def page(template, title, desc, crumbs, main, extra_css=()):
    s = template
    s = re.sub(r"<title>.*?</title>", f"<title>{esc(title)} - {B}</title>", s, 1)
    s = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{esc(desc)}">', s, 1)
    css = '<link rel="stylesheet" href="css/components/news-page.css">'
    for c in extra_css:
        css += f'\n  <link rel="stylesheet" href="css/components/{c}">'
    s = re.sub(r'<link rel="stylesheet" href="css/components/news-page.css">(\n  <link rel="stylesheet" href="css/components/article-page.css">)?', css, s, 1)
    items = ['      <li class="global-breadcrumb__item"><a class="global-breadcrumb__link" href="/">Trang chủ</a></li>']
    for href, label in crumbs:
        items.append(f'      <li class="global-breadcrumb__item"><a class="global-breadcrumb__link" href="{href}">{esc(label)}</a></li>')
    s = re.sub(r'(<ol class="global-breadcrumb__list">\n).*?(\n    </ol>)', lambda m: m.group(1) + "\n".join(items) + m.group(2), s, 1, flags=re.S)
    i = s.index("<main"); j = s.index("</main>", i) + len("</main>\n")
    return s[:i] + main + s[j:]


tpl = open(os.path.join(ROOT, "tin-tuc", "index.html"), encoding="utf-8").read()

# ---------- Listing page ----------
boxes = []
for cid, name, _ in CATEGORIES:
    items = [a for a in ARTICLES if a["cat"] == cid]
    if not items:
        continue
    cards = "\n".join(card(a) for a in items[:3])
    boxes.append(f'''    <section class="news-box" id="{cid}" aria-labelledby="{cid}-title">
      <h2 class="news-box__title" id="{cid}-title">{name}</h2>
      <div class="news-box__grid">
{cards}
      </div>
    </section>''')

listing = f'''<main class="news-page">
  <h1 class="news-page__h1">Tin tức</h1>
  <div class="container">
    <nav class="news-cats" aria-label="Danh mục tin tức">
{chips()}
    </nav>
  </div>

  <div class="news-page__body">
    <div class="container">
      <div class="news-top">
{feat(ARTICLES[0], True)}
        <div class="news-top__small">
{chr(10).join(feat(a) for a in ARTICLES[1:5])}
        </div>
      </div>

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
def strip_cover_fig(a):
    """Drop inline figures that just repeat the article's cover product."""
    if not a.get("cover_src"):
        return a["body"]
    pat = r'<figure class="article-figure"><img src="assets/images/' + re.escape(a["cover_src"]) + r'".*?</figure>\n?'
    return re.sub(pat, "", a["body"], flags=re.S)


def with_toc(body):
    """Give every <h2> an id and build a "Mục lục" box from them."""
    heads = []
    def repl(m):
        n = len(heads) + 1
        heads.append(re.sub(r"<[^>]+>", "", m.group(1)))
        return f'<h2 id="muc-{n}">{m.group(1)}</h2>'
    body = re.sub(r"<h2>(.*?)</h2>", repl, body.strip())
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


for a in ARTICLES:
    cid, cname, _ = CAT[a["cat"]]
    recent = [x for x in ARTICLES if x is not a][:5]
    related = [x for x in ARTICLES if x is not a and x["cat"] == a["cat"]]
    related += [x for x in ARTICLES if x is not a and x not in related]
    related = related[:4]
    side = "\n".join(f'''          <li>
            <a class="article-side__item" href="/{x['slug']}/">
              <img src="assets/images/{cover(x)}" alt="" loading="lazy">
              <span>
                <span class="article-side__title">{esc(x['title'])}</span>
                {date_tag(x)}
              </span>
            </a>
          </li>''' for x in recent)
    main = f'''<main class="article-page">
  <div class="container article-page__layout">
    <article class="article-detail">
      <a class="article-detail__cat" href="/tin-tuc/#{cid}">{cname}</a>
      <h1 class="article-detail__title">{esc(a['title'])}</h1>
      <div class="article-detail__meta">
        {date_tag(a)}
        <span>{B}</span>
      </div>
      <p class="article-detail__summary">{esc(a['summary'])}</p>
      <img class="article-detail__cover" src="assets/images/{cover(a)}" alt="{esc(a['title'])}">
      <div class="article-detail__content">
{with_toc(strip_cover_fig(a))}
      </div>
      <div class="article-detail__cta">
        <p><strong>Cần tư vấn chọn camera, thiết bị an ninh?</strong> Gọi ngay cho {B} để được hỗ trợ miễn phí.</p>
        <a class="article-detail__cta-btn" href="tel:{HOTLINE_TEL}">Hotline {HOTLINE}</a>
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
    out = page(tpl, a["title"], a["summary"], [("/tin-tuc/", "Tin tức"), (f"/tin-tuc/#{cid}", cname)], main,
               extra_css=("article-page.css",))
    os.makedirs(os.path.join(ROOT, a["slug"]), exist_ok=True)
    open(os.path.join(ROOT, a["slug"], "index.html"), "w", encoding="utf-8").write(out)
    print(a["slug"] + "/index.html")

# ---------- Homepage news row ----------
p = os.path.join(ROOT, "index.html")
s = open(p, encoding="utf-8").read()
cards = "\n".join(f'''    <a class="article-row__card" href="/{a['slug']}/">
      <img class="article-row__img" src="assets/images/{cover(a)}" alt="{esc(a['title'])}" loading="lazy">
      <span class="article-row__caption">{esc(a['title'])}</span>
    </a>''' for a in ARTICLES[:4])
s, k = re.subn(r'(<div class="article-row__grid">\n).*?(\n  </div>\n</section>)', lambda m: m.group(1) + cards + m.group(2), s, 1, flags=re.S)
open(p, "w", encoding="utf-8").write(s)
print("index.html row", k)
