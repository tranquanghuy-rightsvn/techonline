# -*- coding: utf-8 -*-
"""Smart content rendering (GAS.md II-D.7), shared by the post and product generators.

The CSS scoper is html/js/smart-scope.js — the very file the Admin preview loads — run with
`node` (Node 22 in CI), so build and preview can never disagree.

    from smart import render_many
    out = render_many({"slug-a": post_a["smart"], ...})   # {slug: (html, css)} for valid ones
"""
import json
import os
import subprocess

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SCOPE_JS = os.path.join(REPO, "html", "js", "smart-scope.js")

CSS_LINK = '<link rel="stylesheet" href="css/smart.css">'
JS_TAG = '<script src="js/smart.js" defer></script>'

_NODE = r"""
const s = require(process.argv[1]);
const input = JSON.parse(require('fs').readFileSync(0, 'utf8'));
process.stdout.write(JSON.stringify(input.map((c) => s.smcScopeCss(c))));
"""


def scope_css_many(css_list):
    if not css_list:
        return []
    r = subprocess.run(["node", "-e", _NODE, SCOPE_JS], input=json.dumps(css_list),
                       capture_output=True, text=True, check=True)
    return json.loads(r.stdout)


def valid(smart):
    return isinstance(smart, dict) and str(smart.get("html") or "").strip() != ""


def render_many(smarts):
    """{key: smart_obj} -> {key: (wrapped_html, scoped_css)} for entries that have smart.html."""
    keys = [k for k, v in smarts.items() if valid(v)]
    scoped = scope_css_many([str(smarts[k].get("css") or "") for k in keys])
    return {k: (f'<div class="smc-root smc-a">{smarts[k]["html"]}</div>', css) for k, css in zip(keys, scoped)}


def head_tags(css):
    """Tags to put before </head> of a page that shows Smart content."""
    style = f"\n  <style>{css}</style>" if css else ""
    return f"  {CSS_LINK}{style}\n"
