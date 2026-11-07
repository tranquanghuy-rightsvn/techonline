# -*- coding: utf-8 -*-
"""Semantic diff of product pages between two html/ trees (verification tool).

    python3 scripts/catalog/diff_pages.py OLD_HTML_DIR NEW_HTML_DIR [slug ...] [-v]

Pages are compared as token streams (tags with attributes, class lists sorted; text with
whitespace collapsed and entities decoded), so pure formatting/whitespace differences do
not count. The SEO block (<!-- seo:start --> … <!-- seo:end -->, rebuilt by seo.py) is
ignored. Each differing page is classified by the regions that differ.
"""
import difflib
import html as H
import os
import re
import sys
from collections import Counter
from html.parser import HTMLParser

REGIONS = [  # (name, start marker) in document order
    ("head", "<head"),
    ("breadcrumb", 'class="global-breadcrumb"'),
    ("title+meta", '<main class="pdp'),
    ("gallery", 'class="pdp__layout"'),
    ("price", 'class="pdp__col-center"'),
    ("summary", 'class="pdp-summary"'),
    ("offers", 'class="pdp-offer"'),
    ("actions", 'class="pdp-qty"'),
    ("sidebar", 'class="pdp__col-right"'),
    ("description", 'class="pdp__details"'),
    ("reviews", 'class="pdp-reviews"'),
    ("qa", 'class="pdp-qa"'),
    ("specs", 'class="pdp__details-right"'),
    ("similar", 'class="pdp-tabs"'),
    ("footer", "</main>"),
]


class Tok(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []

    def handle_starttag(self, tag, attrs):
        a = []
        for k, v in sorted(attrs):
            v = v or ""
            if k == "class":
                v = " ".join(sorted(v.split()))
            a.append(f'{k}="{" ".join(v.split())}"')
        self.out.append(f"<{tag} {' '.join(a)}>".replace(" >", ">"))

    handle_startendtag = handle_starttag

    def handle_endtag(self, tag):
        if tag not in ("br", "hr", "img", "input", "meta", "link"):
            self.out.append(f"</{tag}>")

    def handle_data(self, d):
        d = " ".join(d.split())
        if d:
            self.out.append(d)


def regions(s):
    s = re.sub(r"<!-- seo:start -->.*?<!-- seo:end -->", "", s, flags=re.S)
    cuts = []
    for name, mark in REGIONS:
        i = s.find(mark, cuts[-1][1] if cuts else 0)
        if i >= 0:
            cuts.append((name, i))
    out = {}
    for k, (name, i) in enumerate(cuts):
        j = cuts[k + 1][1] if k + 1 < len(cuts) else len(s)
        t = Tok()
        t.feed(s[i:j])
        out[name] = t.out
    return out


def main():
    args = [a for a in sys.argv[1:] if a != "-v"]
    verbose = "-v" in sys.argv
    old, new, only = args[0], args[1], args[2:]
    slugs = only or sorted(d for d in os.listdir(old)
                           if os.path.isfile(os.path.join(old, d, "index.html"))
                           and 'class="pdp__title"' in open(os.path.join(old, d, "index.html"), encoding="utf-8").read())
    same, missing, by_region, per_page = 0, [], Counter(), {}
    for d in slugs:
        pn = os.path.join(new, d, "index.html")
        if not os.path.isfile(pn):
            missing.append(d)
            continue
        a = regions(open(os.path.join(old, d, "index.html"), encoding="utf-8").read())
        b = regions(open(pn, encoding="utf-8").read())
        diff = [r for r, _ in REGIONS if a.get(r) != b.get(r)]
        if not diff:
            same += 1
            continue
        per_page[d] = diff
        by_region.update(diff)
        if verbose:
            print(f"== {d}: {', '.join(diff)}")
            for r in diff:
                for line in difflib.unified_diff(a.get(r, []), b.get(r, []), lineterm="", n=0):
                    if not line.startswith(("---", "+++", "@@")):
                        print("   ", line[:220])
    print(f"pages compared: {len(slugs)}; identical (ignoring whitespace/SEO block): {same}; "
          f"differing: {len(per_page)}; missing in new: {len(missing)}")
    for r, n in by_region.most_common():
        print(f"  region {r:12s} differs in {n} pages")
    combos = Counter(tuple(v) for v in per_page.values())
    for k, n in combos.most_common(15):
        print(f"  {n:4d} pages: {', '.join(k)}")


if __name__ == "__main__":
    main()
