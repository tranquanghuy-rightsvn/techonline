# -*- coding: utf-8 -*-
"""ONE-OFF import: scraped vendor catalogs -> data/ (GAS.md III, III-B, XII).

    python3 scripts/catalog/import_vendors.py hikvision_products_slim.json tplink_vn_products_slim.json

Sources (scraped, "slim" format): hikvision.vn (list) and tp-link.com/vn ({products: [...]}).
Cleaning, so the result matches the products already in data/:
  - SKU: the scraped `sku` is often wrong (copied from another product); the model code found in
    the name/slug wins. Duplicates (same model, "-sao-chep" copies, the same TP-Link model listed
    under 2 categories) are merged, keeping the richest record. Products whose model already exists
    in data/ are skipped (TP-Link: version/pack/region suffixes are ignored when comparing).
  - categories: mapped to the site tree; Hikvision gets its own brand tree + cross-listing in the
    generic trees (same pattern as Dahua: categories[0] = generic, [1] = brand); "uncategorized"
    and "san-pham-moi" are classified from the name.
  - name/slug: brand spelling normalised; slugs ASCII; TP-Link slugs follow the existing
    "<type>-tplink-<sku>" pattern.
  - attrs -> summary (feature lines) + specs ("Key: value" lines); card chips (`attrs`, <= 3) are
    short tokens derived like the existing cards (2MP / Wi-Fi 6 / 8 Cổng / PoE + brand).
New products are appended to data/products.json (after the existing ones). Re-running is a no-op
for products that are already in data/.
"""
import html as H
import json
import os
import re
import sys
import unicodedata
from collections import OrderedDict
from urllib.parse import unquote

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
DATA = os.path.join(REPO, "data")
NOW = "2026-11-11T00:00:00Z"
WARRANTY = "24 tháng"


def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)


def dump(p, v):
    with open(p, "w", encoding="utf-8") as f:
        json.dump(v, f, ensure_ascii=False, indent=2)
        f.write("\n")


def slugify(s):
    s = unquote(str(s))
    s = s.replace("đ", "d").replace("Đ", "D")
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return re.sub(r"-{2,}", "-", s)


def norm(s):
    return re.sub(r"[^A-Z0-9]", "", str(s or "").upper())


def clean_text(s):
    s = unicodedata.normalize("NFC", H.unescape(str(s or "")))
    s = s.replace(" ", " ").replace("​", "")
    s = re.sub(r"\s+", " ", s).strip()
    return s


# ------------------------------------------------------------------ categories
def cat(slug, name, parent, layout, order, desc=""):
    return OrderedDict(slug=slug, name=name, parent=parent, layout=layout, image="",
                       description=desc, order=order)


HIK_SUB = [  # key, brand-tree name, generic (cross-list) category or None
    ("camera-ip", "Camera IP", "camera-ip-hikvision"),
    ("camera-wifi", "Camera Wifi", "camera-wifi-hikvision"),
    ("camera-analog", "Camera Analog", "camera-analog-hikvision"),
    ("camera-ptz", "Camera PTZ", "camera-ptz-hikvision"),
    ("camera-chuyen-dung", "Camera chuyên dụng", "camera-chuyen-dung-hikvision"),
    ("dau-ghi-ip", "Đầu ghi IP", "dau-ghi-ip-hikvision"),
    ("dau-ghi-analog", "Đầu ghi Analog", "dau-ghi-analog-hikvision"),
    ("switch", "Switch", "switch-hikvision"),
    ("chuong-cua-man-hinh", "Chuông cửa màn hình", "chuong-cua-man-hinh-hikvision"),
    ("access-control", "Access control", "cham-cong-kiem-soat-ra-vao-hikvision"),
    ("bao-dong", "Báo động", "bao-dong-hikvision"),
    ("man-hinh", "Màn hình", None),
    ("luu-tru", "Ổ cứng / Thẻ nhớ", None),
    ("phu-kien-san-pham-khac", "Phụ kiện / Sản phẩm khác", "phu-kien-hikvision"),
]
GENERIC_NAME = {
    "camera-ip-hikvision": ("Camera IP Hikvision", "camera-giam-sat"),
    "camera-wifi-hikvision": ("Camera Wifi Hikvision", "camera-giam-sat"),
    "camera-analog-hikvision": ("Camera Analog Hikvision", "camera-giam-sat"),
    "camera-ptz-hikvision": ("Camera PTZ Hikvision", "camera-giam-sat"),
    "camera-chuyen-dung-hikvision": ("Camera chuyên dụng Hikvision", "camera-giam-sat"),
    "dau-ghi-ip-hikvision": ("Đầu ghi IP Hikvision", "camera-giam-sat"),
    "dau-ghi-analog-hikvision": ("Đầu ghi Analog Hikvision", "camera-giam-sat"),
    "switch-hikvision": ("Switch Hikvision", "camera-giam-sat"),
    "chuong-cua-man-hinh-hikvision": ("Chuông cửa màn hình Hikvision", "camera-giam-sat"),
    "phu-kien-hikvision": ("Phụ kiện Hikvision", "camera-giam-sat"),
    "cham-cong-kiem-soat-ra-vao-hikvision": ("Kiểm soát ra vào Hikvision", "cham-cong-kiem-soat-cua"),
    "bao-dong-hikvision": ("Báo động Hikvision", "thiet-bi-bao-dong-bao-chay"),
}
TP_NEW = [("tp-link-camera-wi-fi", "Camera Wi-Fi Tapo", 10), ("tp-link-nha-thong-minh", "Nhà thông minh", 11)]


def new_categories(cats):
    have = {c["slug"] for c in cats}
    top = max(c.get("order") or 0 for c in cats if not c.get("parent"))
    out = []
    if "hikvision" not in have:
        out.append(cat("hikvision", "HIKVISION", "", "brand", top + 1))
    for i, (k, name, _) in enumerate(HIK_SUB, 1):
        out.append(cat(f"hikvision-{k}", name, "hikvision", "subcategory", i))
    for slug, (name, parent) in GENERIC_NAME.items():
        order = max([c.get("order") or 0 for c in cats + out if c.get("parent") == parent] or [0]) + 1
        out.append(cat(slug, name, parent, "subcategory", order))
    out.append(cat("camera-wifi-tp-link-tapo", "Camera Wifi TP-Link Tapo", "camera-giam-sat", "subcategory",
                   max(c.get("order") or 0 for c in cats + out if c.get("parent") == "camera-giam-sat") + 1))
    for slug, name, order in TP_NEW:
        out.append(cat(slug, name, "tp-link", "subcategory", order))
    return [c for c in out if c["slug"] not in have]


# ------------------------------------------------------------------ Hikvision
HIK_CAT_RULES = [  # (source category slugs, key) — first match wins
    ({"chuong-hinh", "chuong-cua-man-hinh-video-intercom"}, "chuong-cua-man-hinh"),
    ({"he-thong-kiem-soat-vao-ra-cham-cong", "kiem-soat-vao-ra"}, "access-control"),
    ({"he-thong-bao-dong", "bao-dong-2"}, "bao-dong"),
    ({"thermal-camera", "camera-ip-anh-nhiet", "camera-ip-chong-an-mon-chong-chay-no", "camera-anpr", "traffic",
      "dashcam-va-mobile", "mobile-camera", "fortable-camera", "mobile-recoders", "camera-bi-mat"}, "camera-chuyen-dung"),
    ({"camera-ip-wi-fi", "bo-kit-wi-fi", "smart-home"}, "camera-wifi"),
    ({"camera-ptz", "camera-ptz-2", "ptz-camera"}, "camera-ptz"),
    ({"camera-hd-tvi", "camera-tubo-hd", "hd-tvi"}, "camera-analog"),
    ({"camera-ip", "camera-ip-2", "ip-camera", "colorvu"}, "camera-ip"),
    ({"dau-ghi-nvr", "dau-ghi-hinh-ip-nvr", "nvr", "network-storage"}, "dau-ghi-ip"),
    ({"turbo-hd-dvr", "dau-ghi-hinh-turbo-hd-dvr", "turbo-dvr"}, "dau-ghi-analog"),
    ({"switch-thiet-bi-mang", "network-switch"}, "switch"),
    ({"monitor", "man-hinh-hien-thi"}, "man-hinh"),
    ({"o-cung", "o-cung-segate-skyhawk-chuyen-dung", "o-cung-wd-purple-chuyen-dung", "o-cung-the-nho"}, "luu-tru"),
]
HIK_NAME_RULES = [  # (regex on lower-cased name, key) for "uncategorized"/"san-pham-moi"
    (r"chuông|intercom|door ?station|ds-kv|ds-kh|ds-kis", "chuong-cua-man-hinh"),
    (r"chấm công|kiểm soát|access|ds-k1|ds-k2|ds-kt|terminal|cửa quay|đầu đọc", "access-control"),
    (r"báo động|alarm|ax pro|cảm biến", "bao-dong"),
    (r"ảnh nhiệt|thermal|ds-2t[dect]|đo nhiệt|anpr|biển số|thể thao", "camera-chuyen-dung"),
    (r"speed ?dome|ptz|ds-2de|ds-2df|ds-2sh|tandemvu|2de\d", "camera-ptz"),
    (r"wi-?fi|wireless|ezviz|cs-c|\bc[36][a-z]{1,2}\b|dùng pin", "camera-wifi"),
    (r"\bdvr\b|turbo|ids-72|ds-72|huhi|hqhi", "dau-ghi-analog"),
    (r"đầu ghi|\bnvr\b|ds-76|ds-77|ds-96|ds-86|ds-als", "dau-ghi-ip"),
    (r"switch|ds-3e", "switch"),
    (r"màn hình|monitor|giá treo", "man-hinh"),
    (r"ổ cứng|thẻ nhớ|hdd|ssd", "luu-tru"),
    (r"hd-tvi|ds-2ce|tvi", "camera-analog"),
    (r"camera|ds-2cd|ipc|network|\bip\b", "camera-ip"),
]
MODEL_RX = re.compile(r"(?<![A-Za-z0-9])([A-Za-z]{1,6}-[A-Za-z0-9]*\d[A-Za-z0-9().+]*(?:[-/][A-Za-z0-9().+]+)*"
                      r"|[A-Za-z0-9]*\d[A-Za-z0-9]*(?:[-/][A-Za-z0-9().+]+)+)")
NOT_MODEL = re.compile(r"mbps|gbps|mhz|ghz|inch|kênh|^\d+(?:[./]\d+)*[a-z]*$|^h\.26|^\d+-?(?:ch|mp|port)\b", re.I)
TYPE_WORDS = ("camera", "đầu ghi", "switch", "màn hình", "chuông", "thiết bị", "bộ ", "ổ cứng", "thẻ nhớ",
              "cáp", "giá ", "chân đế", "nguồn", "khóa", "khoá", "máy", "bàn phím", "phần mềm", "bản quyền",
              "ống kính", "vỏ", "pin", "đế", "hộp", "tủ", "cảm biến", "còi", "nút", "kit", "module", "đèn")
HIK_TYPE_LABEL = {
    "camera-ip": "Camera IP", "camera-wifi": "Camera Wifi", "camera-analog": "Camera HD-TVI",
    "camera-ptz": "Camera PTZ", "camera-chuyen-dung": "Camera", "dau-ghi-ip": "Đầu ghi hình IP",
    "dau-ghi-analog": "Đầu ghi hình", "switch": "Switch", "chuong-cua-man-hinh": "Chuông cửa màn hình",
    "access-control": "Thiết bị kiểm soát ra vào", "bao-dong": "Thiết bị báo động", "man-hinh": "Màn hình",
    "luu-tru": "Ổ cứng", "phu-kien-san-pham-khac": "Phụ kiện",
}
JUNK_LINE = re.compile(r"^(download|tải về|xem thêm|liên hệ|datasheet|brochure)\b", re.I)


def hik_key(p):
    cs = set(p.get("categories") or [])
    if not cs or cs <= {"uncategorized", "san-pham-moi"}:
        n = p["name"].lower()
        for rx, k in HIK_NAME_RULES:
            if re.search(rx, n):
                return k
        return "phu-kien-san-pham-khac"
    for keys, k in HIK_CAT_RULES:
        if cs & keys:
            return k
    return "phu-kien-san-pham-khac"


def models_in(text):
    out = []
    for m in MODEL_RX.finditer(text):
        c = m.group(1).strip("-/.")
        while c.endswith(")") and c.count(")") > c.count("("):
            c = c[:-1]
        if c.count("(") > c.count(")"):
            c = c[:c.rindex("(")].rstrip("-/.")
        if re.search(r"[A-Za-z]", c) and len(norm(c)) >= 5 and not NOT_MODEL.search(c):
            out.append(c)
    return out


def hik_sku(p, name):
    raw = clean_text(p.get("sku") if p.get("sku") is not None else "")
    hay = norm(name) + norm(p.get("slug"))
    cands = models_in(name)
    if raw and len(norm(raw)) >= 3:
        longer = [c for c in cands if norm(raw) in norm(c)]  # "DS-K1T341AM" vs name "...DS-K1T341AMF"
        if longer:
            return max(longer, key=len)
        if norm(raw) in hay:
            return raw
    if cands:
        return max(cands, key=len)
    return slug_model(p.get("slug"))


SLUG_PREFIX = {"ds", "ids", "hik", "hki", "hkn", "sh", "he", "cs", "ae", "ax"}
SLUG_STOP = {"camera", "dau", "ghi", "hinh", "ip", "hd", "tvi", "mp", "kenh", "ban", "cau", "than", "tru",
             "nvr", "dvr", "embedded", "series", "hikvision", "turbo", "ngoai", "trong", "mini", "the", "bo"}


def slug_model(slug):
    """'ds-2ce56c0t-irm-camera-ban-cau-...' -> 'DS-2CE56C0T-IRM' (model code at the start of the slug)."""
    toks = slugify(slug).split("-")
    if len(toks) < 2 or toks[0] not in SLUG_PREFIX or not re.search(r"\d", toks[1]):
        return ""
    out = [toks[0]]
    for t in toks[1:]:
        if t in SLUG_STOP or not (re.search(r"\d", t) or len(t) <= 3):
            break
        out.append(t)
    return "-".join(out).upper() if len(out) >= 2 else ""


EZVIZ_RX = re.compile(r"\bCS-[A-Z]{1,4}\d", re.I)


def brand_word(name):
    if re.search(r"hikvision|ezviz", name, re.I):
        return ""
    return " Ezviz" if EZVIZ_RX.search(name) else " Hikvision"


def hik_brand(name, key):
    n = name.lower()
    if "ezviz" in n or EZVIZ_RX.search(name):
        return "Ezviz"
    if key == "luu-tru":
        if "seagate" in n or "skyhawk" in n:
            return "Seagate"
        if re.search(r"\bwd\b|western|purple", n):
            return "WD"
    return "Hikvision"


ACRONYMS = {"IP", "PTZ", "HD", "TVI", "NVR", "DVR", "POE", "LCD", "LED", "IR", "EXIR", "UPS", "WDR", "AI", "USB",
            "SD", "RF", "PIR", "APEC", "HDMI", "VGA", "CCTV", "ANPR", "EM", "CMOS", "MP", "AHD", "CVI", "WIFI", "UTP"}


CASED = {"colorvu": "ColorVu", "acusense": "AcuSense", "darkfighter": "DarkFighter", "smartline": "SmartLine",
         "hikvision": "Hikvision", "ezviz": "Ezviz", "turbo": "Turbo", "tandemvu": "TandemVu", "panovu": "PanoVu"}


def fix_caps(name):
    """'CẢM BIẾN TỪ KHÔNG DÂY T2' -> 'Cảm biến từ không dây T2' (acronyms / model codes kept)."""
    def shouting(w):
        core = re.sub(r"[^\wÀ-ỹ]", "", w)
        return core.isalpha() and core.isupper() and core not in ACRONYMS and len(core) > 1

    words = name.split(" ")
    if sum(map(shouting, words)) < 2:
        return name
    out = [CASED.get(w.lower(), w.lower()) if shouting(w) else w for w in words]
    s = " ".join(out)
    return s[:1].upper() + s[1:]


def hik_name(p, key, sku):
    name = fix_caps(clean_text(p["name"]))
    name = re.sub(r"\bH+I+ikvision\b|\bHIKVISION\b|\bhikvision\b", "Hikvision", name, flags=re.I)
    name = re.sub(r"\s*[–-]\s*sao chép$", "", name, flags=re.I)
    name = re.sub(r"\bCamera Ip\b", "Camera IP", name)
    if sku and name.upper().startswith(sku.upper() + " "):
        # "DS-2CD2543G0-IS Camera bán cầu EXIR 4MP" -> "Camera bán cầu EXIR 4MP Hikvision DS-2CD2543G0-IS"
        rest = name[len(sku):].strip(" –-")
        if any(w in rest.lower() for w in TYPE_WORDS):
            name = f"{rest}{brand_word(rest + ' ' + sku)} {sku}"
    elif sku and norm(sku) not in norm(name):
        # generic name ("Camera bán cầu 2MP", "Đầu ghi Turbo HD DVR 8 kênh") -> append the model
        name = f"{name}{brand_word(name + ' ' + sku)} {sku}"
    low = name.lower()
    if not any(w in low for w in TYPE_WORDS) and not re.search(r"[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]", low):
        # code-only / English name ("DS-2TE127-F4A", "iDS-7216HQHI-M2/S") -> Vietnamese type prefix
        name = f"{HIK_TYPE_LABEL[key]}{brand_word(name)} {name}"
    return re.sub(r"\s+", " ", name).strip()


def split_lines(attrs):
    out = []
    for a in attrs or []:
        a = clean_text(a)
        if not a or JUNK_LINE.search(a):
            continue
        if len(a) > 260:  # pasted blobs -> sentences / bullet chunks
            parts = [x.strip(" ;,") for x in re.split(r"(?<=[.;])\s+|\s*•\s*", a) if x.strip(" ;,")]
            out += parts
        else:
            out.append(a.strip(" ;"))
    seen, res = set(), []
    for x in out:
        if x and x.lower() not in seen:
            seen.add(x.lower())
            res.append(x)
    return res


def spec_rows(lines):
    rows = []
    for x in lines:
        m = re.match(r"^([^:]{2,40}?)\s*:\s*(.+)$", x)
        if m and not re.search(r"https?$", m.group(1)):
            rows.append([m.group(1).strip(), m.group(2).strip()])
    return rows


def resolution(text):
    m = re.search(r"(\d+(?:[.,]\d)?)\s*(?:MP|Megapixel|Mega)\b", text, re.I)
    if m:
        v = m.group(1).replace(",", ".")
        v = v[:-2] if v.endswith(".0") else v
        return f"{v}MP"
    if re.search(r"\b4K\b", text):
        return "8MP"
    return ""


def channels(text):
    m = re.search(r"(\d+)\s*(?:kênh|-?ch\b|channel)", text, re.I)
    return f"{m.group(1)} kênh" if m else ""


def desc_html(lines, fallback):
    paras = lines or [fallback]
    return "".join(f"<p>{H.escape(x, quote=False)}</p>" for x in paras)


SEO_MAX = 160


def seo_desc(name, lines, brand="", warranty=WARRANTY):
    """Unique meta description: product name first (names are unique), then the key features, <= 160 chars.
    The first feature line often repeats the name ("Router Wi-Fi 6 ... AX6600") - skipped then."""
    head = f"{name} chính hãng"
    feats = []
    for x in lines:
        x = re.sub(r"<[^>]+>", " ", H.unescape(str(x))).replace("\u200d", "")
        x = re.sub(r"\s+", " ", x).strip(" .;,")
        if not x or norm(x) in norm(name) or JUNK_LINE.search(x):
            continue
        feats.append(x)
    tail = f", bảo hành {warranty}, giao hàng toàn quốc."
    s = head + (": " + ", ".join(feats) if feats else "") + "."
    if not feats or len(s) < 90:
        s = s.rstrip(".") + tail
    if len(s) > SEO_MAX:
        s = s[:SEO_MAX - 1].rsplit(" ", 1)[0].rstrip(" ,;:–-") + "…"
    return s


def richness(p):
    cs = set(p.get("categories") or [])
    return (0 if cs <= {"uncategorized", "san-pham-moi"} else 1, len(p.get("attrs") or []),
            1 if p.get("price") else 0, len(p.get("description") or ""), str(p.get("updated_at") or ""))


def build_hik(src):
    groups = OrderedDict()
    for p in src:
        key = hik_key(p)
        name0 = clean_text(p["name"])
        sku = hik_sku(p, name0)
        dk = norm(sku) or norm(name0)
        groups.setdefault(dk, []).append((p, key, sku))
    out = []
    for dk, items in groups.items():
        items.sort(key=lambda t: richness(t[0]), reverse=True)
        p, key, sku = items[0]
        new = any("san-pham-moi" in (q.get("categories") or []) for q, _, _ in items)
        price = next((q["price"] for q, _, _ in items if q.get("price")), None)
        name = hik_name(p, key, sku)
        brand = hik_brand(name, key)
        lines = split_lines(p.get("attrs"))
        base = slugify(p["slug"])
        base = re.sub(r"-sao-chep(-\d+)?$", "", base)
        if len(base) < 8:  # "ds-2"
            base = slugify(name)
        label = dict((k, n) for k, n, _ in HIK_SUB)[key]
        generic = dict((k, g) for k, _, g in HIK_SUB)[key]
        cats = ([generic] if generic else []) + [f"hikvision-{key}"]
        if key == "luu-tru":
            n = name.lower()
            cats.append("luu-tru-the-nho" if "thẻ nhớ" in n or "microsd" in n else "luu-tru-o-cung")
        text = name + " " + " ".join(lines[:4])
        chip = channels(name) if key.startswith("dau-ghi") else resolution(text)
        specs = [["Mã sản phẩm", sku]] if sku else []
        specs += [["Thương hiệu", brand], ["Danh mục", label]]
        if chip:
            specs.append(["Số kênh" if chip.endswith("kênh") else "Độ phân giải", chip])
        specs += spec_rows(lines)
        fallback = f"{name} chính hãng, bảo hành {WARRANTY}."
        out.append(dict(
            src_url=p.get("url"), slug=base, name=name, categories=cats, brand=brand, sku=sku,
            price=price, images=[p["image"]] if p.get("image") else [], summary=lines,
            specs=specs, description_html=desc_html(lines, fallback),
            attrs=[x for x in (chip, brand) if x][:3], badge="Mẫu mới" if new else "",
            seo_description=seo_desc(name, lines)))
    return out


# ------------------------------------------------------------------ TP-Link
TP_CAT = {  # second-level source category -> site category
    "deco": "tp-link-mesh-wi-fi",
    "wifi-router": "tp-link-router-wi-fi", "all-router": "tp-link-router-wi-fi",
    "high-power-router": "tp-link-router-wi-fi",
    "5g-4g-router": "tp-link-modem-gateway", "3g-4g-router": "tp-link-modem-gateway",
    "dsl-modem-router": "tp-link-modem-gateway", "gpon": "tp-link-modem-gateway",
    "range-extender": "tp-link-thiet-bi-mo-rong-mang", "powerline": "tp-link-thiet-bi-mo-rong-mang",
    "mifi": "tp-link-wi-fi-di-dong",
    "pci-adapter": "tp-link-wi-fi-adapter", "adapter": "tp-link-wi-fi-adapter",
    "high-gain-adapter": "tp-link-wi-fi-adapter",
    "usb-ethernet-adapter": "tp-link-phu-kien", "usb-c-hub-and-converter": "tp-link-phu-kien",
    "usb-a-hub-and-converter": "tp-link-phu-kien", "mobile-accessory": "tp-link-phu-kien",
    "computer-accessory": "tp-link-phu-kien", "antenna": "tp-link-phu-kien", "splitters": "tp-link-phu-kien",
    "antenna-and-accessory": "tp-link-phu-kien", "pharos-antenna": "tp-link-phu-kien",
    "high-power-adapter": "tp-link-phu-kien",
    "soho-switch-unmanaged": "tp-link-mang-van-phong-soho", "soho-switch-easy-smart": "tp-link-mang-van-phong-soho",
    "soho-switch": "tp-link-mang-van-phong-soho", "soho-festa-access-point": "tp-link-mang-van-phong-soho",
    "soho-festa-switch": "tp-link-mang-van-phong-soho",
    "unmanaged-switch": "tp-link-giai-phap-doanh-nghiep", "managed-switch": "tp-link-giai-phap-doanh-nghiep",
    "easy-smart-switch": "tp-link-giai-phap-doanh-nghiep", "poe-switch": "tp-link-giai-phap-doanh-nghiep",
    "load-balance-router": "tp-link-giai-phap-doanh-nghiep", "outdoor-radio": "tp-link-giai-phap-doanh-nghiep",
    "pharos-cpe": "tp-link-giai-phap-doanh-nghiep", "smart-switch": "tp-link-giai-phap-doanh-nghiep",
    "cloud-camera": "tp-link-camera-wi-fi",
    "robot-vacuum": "tp-link-nha-thong-minh", "smart-bulb": "tp-link-nha-thong-minh",
    "smart-plug": "tp-link-nha-thong-minh", "smart-sensor": "tp-link-nha-thong-minh",
    "smart-hub": "tp-link-nha-thong-minh", "entertainment-device": "tp-link-nha-thong-minh",
}
TP_SLUG_TYPE = {
    "tp-link-mesh-wi-fi": "he-thong-wifi-mesh", "tp-link-router-wi-fi": "router-wifi",
    "tp-link-modem-gateway": "router-modem", "tp-link-thiet-bi-mo-rong-mang": "bo-mo-rong-wifi",
    "tp-link-wi-fi-di-dong": "wifi-di-dong", "tp-link-wi-fi-adapter": "wifi-adapter",
    "tp-link-phu-kien": "phu-kien", "tp-link-mang-van-phong-soho": "mang-van-phong-soho",
    "tp-link-giai-phap-doanh-nghiep": "giai-phap-doanh-nghiep", "tp-link-camera-wi-fi": "camera-wifi",
    "tp-link-nha-thong-minh": "nha-thong-minh",
}


def tp_key(sku):
    """Model key ignoring hardware version / pack / region suffixes (Deco BE25(2-pack) == Deco BE25)."""
    s = str(sku or "").upper()
    s = re.sub(r"\(.*?\)", " ", s)
    s = re.sub(r"\b(V\d+(\.\d+)?|EU|VN|US|UK|KIT|\d-PACK|\d PACK)\b", " ", s)
    s = re.sub(r"\(.*$", " ", s)
    return norm(s)


def tp_site_cat(p):
    cs = p.get("categories") or []
    sub = cs[1] if len(cs) > 1 else (cs[0] if cs else "")
    if cs and cs[0] == "home-networking" and sub == "smart-switch":
        return "tp-link-nha-thong-minh"
    if cs and cs[0] == "service-provider" and sub == "wifi-router":
        return "tp-link-router-wi-fi"
    c = TP_CAT.get(sub, "tp-link-phu-kien")
    if c == "tp-link-camera-wi-fi" and re.search(r"khóa|khoá|lock|chuông|doorbell", p["name"], re.I) and \
            not re.search(r"camera", p["name"].split(" - ", 1)[-1], re.I):
        c = "tp-link-nha-thong-minh"
    return c


GLUE = [re.compile(r"(?<=[a-z0-9)\]°%])(?=[A-Z][A-Za-z0-9 .&/-]{1,30}:)"),  # "4 mmAperture: F2.0"
        re.compile(r"(?<=[A-Za-z)])(?=\d+\s?×)"),                         # "Button1× MicroSD"
        re.compile(r"(?<=[a-zà-ỹ]{3})(?=[A-ZĐ][a-zà-ỹ])"),                   # "DetectionPerson", "cậpLiên"
        re.compile(r"(?<=[A-Z]{3})(?=[A-ZĐ][a-zà-ỹ]{2})"),                   # "SPIKiểm"
        re.compile(r"(?<=\d)(?=[A-Z]{3,}\b)"),                               # "Wi-Fi 6IEEE"
        re.compile(r"(?<=[a-z])(?=IEEE)")]                                    # "GHzIEEE"
CAMEL_WORDS = ["HomeShield", "HomeCare", "EasyMesh", "OneMesh", "AiMesh", "JetStream", "MicroSD", "YouTube",
               "TrendMicro", "TapoCare", "PowerLine", "HomePlug", "WireGuard", "OpenVPN", "OneClick", "TouchPad",
               "SmartLine", "DarkFighter", "ColorVu", "AcuSense", "QoS", "IPv6", "IPv4", "PoE", "MacBook", "iPhone",
               "iPad", "WiFi", "SafeStream", "VPNs", "LiFePO"]


def tp_value(v):
    """Spec value: bullets / glued items -> lines; the scraper cut values at 200 chars -> drop the cut tail."""
    v = clean_text(v)
    if v in ("/", "-", "") or v.lower() in ("n/a", "none"):
        return ""
    truncated = len(v) >= 197
    keep = {f"\x00{i}\x00": w for i, w in enumerate(CAMEL_WORDS)}
    for k, w in keep.items():
        v = v.replace(w, k)
    for rx in GLUE:
        v = rx.sub(" • ", v)
    for k, w in keep.items():
        v = v.replace(k, w)
    parts = [x.strip(" ;,") for x in re.split(r"\s*•\s*", v) if x.strip(" ;,")]
    if truncated and len(parts) > 1:
        parts = parts[:-1]
    elif truncated and parts:
        cut = re.split(r"(?<=[.;,])\s", parts[0])
        parts = [" ".join(cut[:-1]) if len(cut) > 1 else parts[0].rsplit(" ", 1)[0] + "…"]
    if len(parts) > 1:
        return "<br />".join(H.escape(x, quote=False) for x in parts)
    return parts[0] if parts else ""


def tp_chips(name, specs_text, cat):
    t = name + " " + specs_text
    chips = []
    m = re.search(r"Wi-?Fi\s?(7|6E|6|5)\b", t, re.I)
    if m:
        chips.append(f"Wi-Fi {m.group(1).upper()}")
    else:
        m = re.search(r"\b(BE|AX|AC)\d{3,5}\b", t)
        if m:
            chips.append({"BE": "Wi-Fi 7", "AX": "Wi-Fi 6", "AC": "Wi-Fi 5"}[m.group(1)])
    m = re.search(r"\b(BE|AX|AC|N)\d{3,5}\b", name)
    if m and cat not in ("tp-link-camera-wi-fi",):
        chips.append(m.group(0))
    m = re.search(r"(\d+)[- ](?:Port|Cổng)", name, re.I)
    if m:
        chips.append(f"{m.group(1)} Cổng")
    if re.search(r"\bPoE", name):
        chips.append("PoE")
    if cat == "tp-link-camera-wi-fi":
        r = resolution(t) or ("2K" if re.search(r"\b2K\b", t) else "")
        if r:
            chips.append(r)
        if re.search(r"quay quét|pan|tilt", name, re.I):
            chips.append("Quay quét")
        if re.search(r"ngoài trời|outdoor", name, re.I):
            chips.append("Ngoài trời")
    if re.search(r"\b(4G|5G)\b", name):
        chips.append(re.search(r"\b(5G|4G)\b", name).group(1))
    seen, out = set(), []
    for c in chips:
        if c not in seen:
            seen.add(c)
            out.append(c)
    return out[:3]


def build_tp(src):
    groups = OrderedDict()
    for p in src:
        groups.setdefault(tp_key(p["sku"]) or norm(p["name"]), []).append(p)
    out = []
    for k, items in groups.items():
        items.sort(key=richness, reverse=True)
        p = items[0]
        sku = clean_text(p["sku"])
        full = clean_text(p["name"])
        desc_part = full.split(" - ", 1)[1].strip() if " - " in full else ""
        name = f"{desc_part} TP-Link {sku}" if desc_part else f"TP-Link {sku}"
        name = re.sub(r"\s+", " ", name)
        c = tp_site_cat(p)
        specs = [["Mã sản phẩm", sku], ["Thương hiệu", "TP-Link"]]
        for a in p.get("attrs") or []:
            a = clean_text(a)
            m = re.match(r"^([^:]{1,60}?)\s*:\s*(.*)$", a)
            if m and m.group(2).strip():
                val = tp_value(m.group(2))
                if val:
                    specs.append([m.group(1).strip(), val])
        description = clean_text(p.get("description"))
        sents = [x.strip() for x in re.split(r"(?<=[.!?])\s+", description) if len(x.strip()) > 3]
        summary = ([desc_part] if desc_part else []) + sents[:5]
        if len(summary) < 4:
            summary += [f"{a}: {re.sub(r'<br />', '; ', H.unescape(b))}" for a, b in specs[2:8 - len(summary)]]
        fallback = f"{name} chính hãng, bảo hành {WARRANTY}."
        dparas = ([desc_part] if desc_part else []) + sents
        out.append(dict(
            src_url=p.get("url"), slug=f"{TP_SLUG_TYPE[c]}-tplink-{slugify(sku)}", name=name, categories=[c],
            brand="TP-Link", sku=sku, price=p.get("price"), images=[p["image"]] if p.get("image") else [],
            summary=summary, specs=specs, description_html=desc_html(dparas, fallback),
            attrs=tp_chips(name, " ".join(b for _, b in specs[2:6]), c), badge="",
            seo_description=seo_desc(name, ([desc_part] if desc_part else []) + sents + [f"{a}: {b}" for a, b in specs[2:6]])))
    for q in out:  # Tapo cameras are also listed under "Camera giám sát" (like Imou)
        if q["categories"] == ["tp-link-camera-wi-fi"]:
            q["categories"] = ["camera-wifi-tp-link-tapo", "tp-link-camera-wi-fi"]
    return out


# ------------------------------------------------------------------ run
def full_record(q):
    imgs = q["images"]
    return OrderedDict(
        slug=q["slug"], name=q["name"], categories=q["categories"], brand=q["brand"], sku=q["sku"],
        warranty=WARRANTY, stock="Còn hàng", price=q["price"], old_price=None, vat=False, images=imgs,
        summary=q["summary"], offers=[], specs=q["specs"], description_html=q["description_html"],
        attrs=q["attrs"], badge=q["badge"], featured=0, seo_description=q["seo_description"],
        keywords="", focus_keyword="", created_at=NOW, updated_at=NOW)


def index_row(r):
    return OrderedDict(slug=r["slug"], name=r["name"], categories=r["categories"], brand=r["brand"],
                       image=(r["images"] or [""])[0], price=r["price"], old_price=None, attrs=r["attrs"],
                       badge=r["badge"], stock=r["stock"], featured=0, updated_at=NOW)


def main():
    hik_path, tp_path = sys.argv[1], sys.argv[2]
    hik_src = load(hik_path)
    tp_src = load(tp_path)
    tp_src = tp_src["products"] if isinstance(tp_src, dict) else tp_src

    cats = load(os.path.join(DATA, "product-categories.json"))
    index = load(os.path.join(DATA, "products.json"))
    existing = {r["slug"]: load(os.path.join(DATA, "products", f"{r['slug']}.json")) for r in index}
    have_sku = {norm(p.get("sku")) for p in existing.values() if p.get("sku")}
    have_tp = {tp_key(p.get("sku")) for p in existing.values() if p.get("brand") == "TP-Link" and p.get("sku")}
    root = os.path.join(REPO, "html")
    taken = set(existing) | {c["slug"] for c in cats} | {d for d in os.listdir(root)} | {
        p["slug"] for p in (load(os.path.join(DATA, "posts.json")) if os.path.isfile(os.path.join(DATA, "posts.json")) else [])}

    add_cats = new_categories(cats)
    taken |= {c["slug"] for c in add_cats}

    stats = {}
    new = []
    for label, items, dup in (("hikvision", build_hik(hik_src), lambda q: norm(q["sku"]) in have_sku if q["sku"] else False),
                              ("tp-link", build_tp(tp_src), lambda q: tp_key(q["sku"]) in have_tp or norm(q["sku"]) in have_sku)):
        skipped = [q for q in items if dup(q)]
        kept = [q for q in items if not dup(q)]
        for q in kept:
            s, i = q["slug"] or slugify(q["name"]), 2
            while s in taken:
                s, i = f"{q['slug']}-{i}", i + 1
            q["slug"] = s
            taken.add(s)
        stats[label] = {"merged_records": len(items), "already_on_site": len(skipped), "added": len(kept)}
        stats[label]["skipped_skus"] = [q["sku"] for q in skipped]
        new += kept

    os.makedirs(os.path.join(DATA, "products"), exist_ok=True)
    for q in new:
        rec = full_record(q)
        dump(os.path.join(DATA, "products", f"{q['slug']}.json"), rec)
        index.append(index_row(rec))
    dump(os.path.join(DATA, "products.json"), index)
    dump(os.path.join(DATA, "product-categories.json"), cats + add_cats)
    print(json.dumps({"source_rows": {"hikvision": len(hik_src), "tp-link": len(tp_src)}, **stats,
                      "new_categories": [c["slug"] for c in add_cats]}, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
