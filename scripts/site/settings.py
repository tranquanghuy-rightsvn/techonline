# -*- coding: utf-8 -*-
"""Site settings (GAS.md II-C): data/settings.json merged over the built-in defaults.

The defaults ARE the site's current values, so a missing/empty field (or a missing file)
renders exactly what the site showed before the CMS existed. Shared by every generator:

    sys.path.insert(0, "<repo>/scripts/site"); from settings import load, rel, tel
    S = load()            # dict with every key of DEFAULTS
"""
import json
import os
import re

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PATH = os.path.join(REPO, "data", "settings.json")

DEFAULTS = {
    "brand": "An Ninh Thái Nguyên",
    "hotline": "0913.286.293",
    "zalo": "",  # empty = hotline
    "email": "annguyentechcons@gmail.com",
    "website": "https://anninhthainguyen.vn",
    "address": "",
    "tax_code": "",
    "footer_text": "Camera giám sát, khóa cửa vân tay, báo cháy, thiết bị mạng chính hãng.",
    "copyright": "Bản quyền thuộc về An Ninh Thái Nguyên",
    "home_title": "An Ninh Thái Nguyên - Camera giám sát, Khoá cửa vân tay, Thiết bị mạng, Nhà thông minh",
    "home_description": "An Ninh Thái Nguyên - Chuyên camera giám sát, khoá cửa vân tay, thiết bị mạng, nhà thông minh, "
                        "chấm công kiểm soát cửa. Giao hàng toàn quốc, bảo hành chính hãng, lắp đặt chuyên nghiệp.",
    "logo": "/assets/images/logo.png",
    "favicon": "/assets/favicon.webp",
    "og_image": "/assets/images/og-default.jpg",
    "hero": [
        {"image": "/assets/images/hero-slide-1.png", "link": ""},
        {"image": "/assets/images/hero-slide-2.jpg", "link": ""},
        {"image": "/assets/images/hero-slide-3.png", "link": ""},
        {"image": "/assets/images/hero-slide-4.png", "link": ""},
    ],
    "promo_tiles": [
        {"image": "/assets/images/promo-tile-1.jpg", "link": ""},
        {"image": "/assets/images/promo-tile-2.jpg", "link": ""},
        {"image": "/assets/images/promo-tile-3.jpg", "link": ""},
        {"image": "/assets/images/promo-tile-4.jpg", "link": ""},
    ],
    "default_offers": [
        "Cam kết sản phẩm chính hãng",
        "Miễn phí giao hàng toàn quốc",
        "Miễn phí lắp đặt tận nhà tại nội thành Hà Nội và Hồ Chí Minh",
        "Miễn phí hỗ trợ từ xa 24/7",
        "Hỗ trợ cấu hình xem camera qua điện thoại",
        "Bảo hành chính hãng 24 tháng",
        "Nhận hàng, kiểm tra hàng trước khi thanh toán",
        "Lỗi đổi mới trong 30 ngày đầu sử dụng",
    ],
}

# Alt/aria texts of the original banners (settings only carry image + link).
HERO_TEXT = {
    "/assets/images/hero-slide-1.png": ("Xem khuyến mãi 1", "Khuyến mãi giảm giá khoá cửa và thiết bị thông minh"),
    "/assets/images/hero-slide-2.jpg": ("Xem khuyến mãi khoá cửa vân tay", "Khuyến mãi khoá cửa vân tay"),
    "/assets/images/hero-slide-3.png": ("Xem khuyến mãi 3", "Khuyến mãi camera giám sát và wifi mesh"),
    "/assets/images/hero-slide-4.png": ("Xem khuyến mãi 4", "Khuyến mãi thiết bị mạng và khoá thông minh"),
}
PROMO_ALT = {
    "/assets/images/promo-tile-1.jpg": "Bảo hành chính hãng",
    "/assets/images/promo-tile-2.jpg": "Lắp đặt chuyên nghiệp",
    "/assets/images/promo-tile-3.jpg": "Đổi 1-1 trong 30 ngày",
    "/assets/images/promo-tile-4.jpg": "Ship COD toàn quốc",
}


def _clean_slides(v, default):
    if not isinstance(v, list):
        return default
    out = []
    for it in v:
        if isinstance(it, dict) and str(it.get("image") or "").strip():
            out.append({"image": str(it["image"]).strip(), "link": str(it.get("link") or "").strip()})
    return out or default


def load(path=PATH):
    data = {}
    try:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
    except (OSError, ValueError):
        data = {}
    if not isinstance(data, dict):
        data = {}
    s = {}
    for k, dv in DEFAULTS.items():
        v = data.get(k)
        if k in ("hero", "promo_tiles"):
            s[k] = _clean_slides(v, dv)[:10 if k == "hero" else 4]
        elif k == "default_offers":
            v = [str(x).strip() for x in v if str(x).strip()] if isinstance(v, list) else []
            s[k] = v or dv
        else:
            v = str(v).strip() if v is not None else ""
            s[k] = v or dv
    if not s["zalo"]:
        s["zalo"] = s["hotline"]
    return s


def digits(phone):
    """'0913.286.293' -> '0913286293'"""
    return re.sub(r"[^\d+]", "", phone or "")


def tel(phone):
    return digits(phone)


def intl(phone):
    """'0913.286.293' -> '+84913286293' (schema.org telephone)."""
    d = re.sub(r"\D", "", phone or "")
    if (phone or "").strip().startswith("+"):
        return "+" + d
    return "+84" + d[1:] if d.startswith("0") else d


def zalo_url(s):
    return "https://zalo.me/" + re.sub(r"\D", "", s["zalo"])


def host(url):
    return re.sub(r"^https?://", "", url or "").rstrip("/")


def rel(src):
    """Site pages use <base href="/">: '/assets/x.jpg' is written as 'assets/x.jpg' (as before)."""
    src = src or ""
    return src[1:] if src.startswith("/") and not src.startswith("//") else src
