import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from PIL import Image, ImageDraw, ImageFont
from articles import ARTICLES, CATEGORIES

IMG = sys.argv[1]  # html/assets/images
W, H = 1200, 768
FB = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FR = "/System/Library/Fonts/Supplemental/Arial.ttf"
CATNAME = {c[0]: c[1] for c in CATEGORIES}


def gradient():
    im = Image.new("RGB", (W, H))
    a, b = (0, 0x64, 0xBD), (0x1D, 0xA7, 0xB0)
    px = im.load()
    for y in range(H):
        for x in range(W):
            t = (x / W) * 0.6 + (y / H) * 0.4
            px[x, y] = tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))
    d = ImageDraw.Draw(im)
    d.ellipse((W - 520, -260, W + 220, 480), outline=(120, 190, 230), width=3)
    d.ellipse((-200, H - 200, 260, H + 260), outline=(120, 190, 230), width=3)
    return im


def wrap(d, text, font, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if d.textlength(t, font=font) <= maxw:
            cur = t
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    return lines


def card(im, src, box, pad=30):
    x0, y0, x1, y1 = box
    mask = Image.new("L", (x1 - x0, y1 - y0), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, x1 - x0, y1 - y0), 36, fill=255)
    im.paste(Image.new("RGB", mask.size, "white"), (x0, y0), mask)
    p = Image.open(src).convert("RGBA")
    p.thumbnail((x1 - x0 - 2 * pad, y1 - y0 - 2 * pad), Image.LANCZOS)
    im.paste(p, (x0 + (x1 - x0 - p.width) // 2, y0 + (y1 - y0 - p.height) // 2), p)


def make(a, out):
    """Plain cover: the product photo (or logo) centred on white."""
    im = Image.new("RGB", (W, H), "white")
    src = os.path.join(IMG, a["cover_src"]) if a["cover_src"] else os.path.join(IMG, "logo.png")
    p = Image.open(src).convert("RGBA")
    box = (W - 160, H - 120) if a["cover_src"] else (W - 360, H - 360)
    p.thumbnail(box, Image.LANCZOS)
    if p.width < box[0] and p.height < box[1]:  # upscale small product shots
        r = min(box[0] / p.width, box[1] / p.height)
        p = p.resize((int(p.width * r), int(p.height * r)), Image.LANCZOS)
    im.paste(p, ((W - p.width) // 2, (H - p.height) // 2), p)
    im.save(out, "JPEG", quality=88, optimize=True)


for a in ARTICLES:
    if a.get("cover_ready"):
        continue
    out = os.path.join(IMG, f"news-{a['slug']}.jpg")
    make(a, out)
    print("cover", out)
