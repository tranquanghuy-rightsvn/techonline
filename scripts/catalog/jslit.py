# -*- coding: utf-8 -*-
"""Tiny parser for the JS object/array literals used in html/js/data/*.js
(single/double-quoted strings, unquoted keys, trailing commas, comments).
Stdlib only, so the catalog scripts never need Node."""
import re

_TOKEN = re.compile(r"""
    (?P<ws>\s+|//[^\n]*|/\*.*?\*/)
  | (?P<str>'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")
  | (?P<num>-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)
  | (?P<ident>[A-Za-z_$][\w$]*)
  | (?P<punct>[{}\[\]:,])
""", re.S | re.X)

_ESC = {"n": "\n", "t": "\t", "r": "\r", "b": "\b", "f": "\f", "v": "\v", "0": "\0"}


def _unquote(s):
    body = s[1:-1]
    out, i = [], 0
    while i < len(body):
        c = body[i]
        if c != "\\":
            out.append(c)
            i += 1
            continue
        n = body[i + 1]
        if n == "u":
            out.append(chr(int(body[i + 2:i + 6], 16)))
            i += 6
        elif n == "x":
            out.append(chr(int(body[i + 2:i + 4], 16)))
            i += 4
        else:
            out.append(_ESC.get(n, n))
            i += 2
    return "".join(out)


def _tokens(src):
    pos = 0
    while pos < len(src):
        m = _TOKEN.match(src, pos)
        if not m:
            raise ValueError(f"unexpected character {src[pos]!r} at {pos}")
        pos = m.end()
        if m.lastgroup != "ws":
            yield m.lastgroup, m.group()


def parse(src):
    """Parse one JS literal (object/array/string/number/bool/null)."""
    toks = list(_tokens(src))
    i = 0

    def value():
        nonlocal i
        kind, tok = toks[i]
        i += 1
        if kind == "str":
            return _unquote(tok)
        if kind == "num":
            return float(tok) if any(c in tok for c in ".eE") else int(tok)
        if kind == "ident":
            return {"true": True, "false": False, "null": None, "undefined": None}[tok]
        if tok == "[":
            arr = []
            while toks[i][1] != "]":
                arr.append(value())
                if toks[i][1] == ",":
                    i += 1
            i += 1
            return arr
        if tok == "{":
            obj = {}
            while toks[i][1] != "}":
                k_kind, k = toks[i]
                key = _unquote(k) if k_kind == "str" else k
                assert toks[i + 1][1] == ":", toks[i:i + 3]
                i += 2
                obj[key] = value()
                if toks[i][1] == ",":
                    i += 1
            i += 1
            return obj
        raise ValueError(f"unexpected token {tok!r}")

    return value()


def consts(src):
    """Return {NAME: value} for every top-level `const NAME = <literal>;`."""
    out = {}
    for m in re.finditer(r"^(?:const|let|var)\s+([A-Z_][A-Z0-9_]*)\s*=\s*", src, re.M):
        start = m.end()
        # find the end of the literal by bracket matching (strings aware)
        depth, j, q = 0, start, None
        while j < len(src):
            c = src[j]
            if q:
                if c == "\\":
                    j += 2
                    continue
                if c == q:
                    q = None
            elif c in "'\"":
                q = c
            elif c in "[{":
                depth += 1
            elif c in "]}":
                depth -= 1
                if depth == 0:
                    j += 1
                    break
            elif c == ";" and depth == 0:
                break
            j += 1
        out[m.group(1)] = parse(src[start:j])
    return out
