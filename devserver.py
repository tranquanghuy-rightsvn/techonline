#!/usr/bin/env python3
"""Local static server for html/. Pages live at html/<slug>/index.html and are
served at /<slug>/ (a request for /<slug> is redirected to /<slug>/)."""
import http.server
import os
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "html")


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5500
    http.server.test(HandlerClass=Handler, port=port)
