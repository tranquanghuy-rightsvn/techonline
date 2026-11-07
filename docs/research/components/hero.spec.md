# Hero banner + under-banner strip + category icon row — spec

Source: live DOM/computed-style inspection of https://techonline.vn/ (2026-10-15).

## 1. Hero banner slider (`.hero`)

Source selector: `.home-banner-container` → `.owl-carousel` (Owl Carousel v2).
Full-bleed (outside the 1224px `.container`, sits inside a `.homepage` wrapper with no max-width).

- Container: `width: 100%`, `height: 500px`, `overflow: hidden`, `position: relative`.
- Track: flex row of slides, one slide = `flex: 0 0 100%`; current slide shown via
  `transform: translateX(-N * 100%)` on the track (vanilla JS, no Owl Carousel library used in the clone).
- Slide image: `object-fit: cover`, fills the 100%×100% slide box.
- 4 slides found (deduplicated from Owl's cloned-items DOM; order per `href="/ad.php?id=N"`):
  1. `hero-slide-1.png` — id 30, generic promo (door-lock / 10% off creative).
  2. `hero-slide-2.jpg` — id 31, alt text pointed at `/khoa-cua-van-tay` (fingerprint door lock category).
  3. `hero-slide-3.png` — id 32, camera/WiFi-mesh style promo creative.
  4. `hero-slide-4.png` — id 36, network devices promo creative.
  Originals were 5764×1924px; downscaled to 1920px wide via `sips` before committing to `assets/images/`.
- Arrows (`.owl-prev`/`.owl-next` on the live site): present in DOM but carried the Owl `disabled` class
  with 0 visible children on this environment — i.e. the production site currently renders **no visible
  arrows or dots** (likely a config/skeleton-state quirk, `.home-banner-container` never lost its
  `skeleton` class during inspection). Per task spec, arrows + dots were still built as first-class vanilla
  JS controls (semi-transparent circular arrows, bottom-center dots), since that is the intended design
  for an Owl-style hero and is the safer default for a usable carousel.
- Built arrows: 44px circular buttons, `rgba(0,0,0,.28)` background, `opacity:0` at rest → `opacity:1` on
  `.hero__slider:hover` (whole slider hover, not per-arrow), darken on direct hover.
- Built dots: 10px circles, `rgba(255,255,255,.55)` inactive → solid white + `scale(1.2)` active, centered
  at `bottom: var(--space-4)`.
- Autoplay: `setInterval` every 4000ms advancing one slide (loops via modulo), cleared on
  `mouseenter` of `.hero__slider`, restarted on `mouseleave`; arrow/dot clicks also restart the timer so
  autoplay doesn't immediately fire right after a manual interaction.

### States (slide content)
| # | File | Content |
|---|------|---------|
| 1 | hero-slide-1.png | Door-lock lineup + "GIẢM 10%" badge creative |
| 2 | hero-slide-2.jpg | Fingerprint door-lock promo (links toward `khoa-cua-van-tay`) |
| 3 | hero-slide-3.png | Camera / WiFi-mesh deal creative |
| 4 | hero-slide-4.png | Network device deal creative |

## 2. Under-banner promo strip (`.promo-strip`)

Source selector: `.home-banner-under.hover-img`, inside `.container` (1224px max-width).

- Computed on live site: `display:flex`, `height:175px`, `margin: -40px 0 40px` (negative top margin pulls
  the strip up to overlap the bottom 40px of the hero banner — reproduced with `margin-top: -40px` +
  `z-index: 3`).
- 4 tiles, each a direct `<a>` (no extra wrapper class), computed `width: 291px` (equal 4-up split of the
  1200px inner content width with 12px gaps), `border-radius: 20px`, `overflow: hidden`.
- Each tile = one image with all copy baked in (no separate text layer): `promo-tile-1.jpg` "Bảo hành
  chính hãng", `promo-tile-2.jpg` "Lắp đặt chuyên nghiệp", `promo-tile-3.jpg` "Đổi 1-1 trong 30 ngày",
  `promo-tile-4.jpg` "Ship COD toàn quốc" (source order confirmed via DOM).
- Hover: image `transform: scale(1.03)` with `var(--transition-base)` (250ms ease), tile wrapper keeps
  `overflow:hidden` so the zoom crops rather than overflowing the rounded corners.
  - Before: `transform: none`.
  - After (hover): `transform: scale(1.03)`.

## 3. Category icon row (`.category-icons`)

Source selector: `.home-category-list`, inside `.container`.

- `display:flex; flex-wrap:wrap; justify-content:center`, `margin: 40px 0 30px` on the live site
  (reproduced via `margin-top: var(--space-10); margin-bottom: var(--space-6)`).
- 9 items, each `width:140px; text-align:center`.
- Icon: `<span class="item-image">` (140×~96, background transparent in practice) containing a
  background-image `<i>` sized 52×52, `background-size:contain`. The icon graphic itself is a pre-colored
  circular PNG (red/orange/green/blue/yellow/purple/blue/pink/blue) — not CSS-drawn — so the clone just
  renders `<img>` at `80×80` inside `.category-icons__icon`.
- Label: `font-size:16px (var(--text-md)); font-weight:400; line-height:21px; color:#000`.
- Exact labels + order (verified against live DOM text, in order):
  1. Camera giám sát → `cat-tile-1.png`
  2. Thiết bị mạng → `cat-tile-2.png`
  3. Khoá cửa vân tay → `cat-tile-3.png`
  4. Nhà thông minh → `cat-tile-4.png`
  5. Chấm công - Kiểm soát cửa → `cat-tile-5.png`
  6. Thiết bị lưu trữ → `cat-tile-6.png`
  7. Âm thanh → `cat-tile-7.png`
  8. Thiết bị báo động - báo cháy → `cat-tile-8.png` (live text has no space before the dash:
     "báo động- báo cháy"; normalized to "báo động - báo cháy" in the markup for consistency)
  9. Tivi - Màn hình máy tính → `cat-tile-9.png`
- Each item links to its category URL on the live site (e.g. `/camera-giam-sat`); clone uses `href="#"`
  placeholders since those category pages aren't part of this build.
- Hover: icon nudges up (`translateY(-3px)`) — not present on live site, added as a small affordance;
  no computed value to match since live site had no hover transform on this element.

## Breakpoints

| Breakpoint | Hero height | Promo strip | Category icons |
|---|---|---|---|
| Desktop (default) | 500px | 4-up row, 175px tall tiles | 9-up single row, 140px items |
| ≤1024px | 360px | 2-up wrap, 150px tall tiles | 3-up wrap (`33.333%` items) |
| ≤600px | 240px | 2-up wrap, 110px tall tiles, tighter gap | 3-up wrap, smaller icon (60px) + smaller label font |

These breakpoints/heights are per the task brief (not reverse-engineered from the live site's own
responsive CSS, which wasn't captured in this pass).

## Assumptions
- Hero/promo-strip link targets use `href="#"` placeholders (the live site links to `/ad.php?id=N`
  redirect endpoints and real category slugs that don't exist in this static clone).
- Arrow/dot visuals are an original vanilla-JS implementation since the live Owl Carousel instance
  rendered them in a disabled/empty state during inspection.
- Hero slide images were downscaled from 5764×1924 originals to 1920px-wide via `sips` to keep page
  weight reasonable; aspect ratio preserved.
