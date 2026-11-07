# Site header (top bar + main bar + mega menu) — spec

Source: live DOM/CSS inspection of https://techonline.vn/ (2026-10-15), plus the shipped stylesheet
`static/assets/default/script/pc_style.css` fetched directly for exact rule text.

## 1. Top bar (`.global-header-top` → `.site-header__top`)
`background: var(--color-brand-blue)`, white text, `var(--text-sm)` (live computed `15px`; clone uses
the design-token `13px` instead). Left: two pills, `border-radius:40px`. Live CSS uses an **animated**
gradient on both pills: `repeating-linear-gradient(90deg,#c924aa 0,#6a7ed1 98.41%)`,
`background-size:200% auto`, `@keyframes` cycling `background-position 0 0 → -200% 0` over 2s linear
infinite — reproduced as `header-pill-shift`. (Task brief assumed two static shades; real site is one
animated gradient on both.) Right: 3 links, sprite icons in the live CSS — clone uses inline SVGs.

## 2. Main header (`.global-header-main` → `.site-header__main`)
Flex-wrap row of 5 children (logo / search / right-cluster / category-btn / utility-links) that wraps
into two rows, same as live (`header-logo calc(100%-915px)`, `search 480px`, `right-group 405px`,
`menu-container 230px`, `static-group calc(100%-242px)`) — clone uses flex-basis hints instead of the
exact px math for better responsiveness.
- Search button: `36px` circle, `linear-gradient(180deg,#0064bd 0%,#1da7b0 100%)` (confirmed exact).
- Right cluster pills: `background:#ecf2f9`, `height:44px`, `border-radius:50px`. Cart badge: live CSS
  `14×14` circle, `background:#ffa41c`, `color:#000`, `font-size:10px` — matched exactly.
- `DANH MỤC SẢN PHẨM` btn = live `.group-title`: brand-blue bg, white text, `border-radius:8px`,
  `line-height:40px`, `font-weight:700`, `13px`, uppercase; hamburger sprite → inline SVG.
- 4 utility links = live `.header-static-group .item`: equal width, `box-shadow:0 0 0 1px #e1e1e1`
  (reproduced as a real `1px border`), `border-radius:8px`, uppercase bold; hover → brand-blue bg + white.

## 3. Category mega menu (`.global-menu-container` → `.mega-menu`)
**Confirmed directly from the shipped CSS source:**
```
.header-menu-container:hover .global-menu-container{display:block}
.global-menu-container{display:none;background:#fff;border-radius:20px;width:250px;height:370px;
  position:absolute;top:100%;box-shadow:0 0 11px 0 rgba(157,157,157,.25)}
```
Matches the task brief exactly: hidden by default, hover-to-show. **Caveat:** the homepage specifically
adds `.header-homepage .global-menu-container{display:block;...}`, forcing it permanently open as a
decorative sidebar over the hero banner on `/` only — that's why the live homepage shows it open with no
hover. The clone implements the generic/reusable hover behavior (correct for every non-home page and for
a reusable header component), not the homepage-only always-open override.

- 9 rows, `height:calc(100%/9)` ≈ 41px, `.cat-title{font-size:14px}` (confirmed via computed style).
- Row hover (live CSS, not the brief's assumed "light gray bg"): `background:brand-blue`, white text,
  icon `filter:invert(1)` — clone matches this (`invert(1) brightness(2)`) since it's more accurate.
- Live site draws a CSS border-triangle pointer (transparent → blue on hover) instead of a persistent `>`
  glyph; clone adds an always-visible muted `>` chevron per the task brief's explicit requirement.
- Icons: 9 PNGs pulled from `/media/category/cat_icon_*.png` → `cat-icon-camera/network/lock/smarthome/
  attendance/storage/audio/alarm/tv.png`. `cat-icon-tv.png`'s source was unexpectedly 400×400; downsized
  to 80×80 with `sips` to keep asset weight reasonable (displayed at 20×20 via `object-fit:contain`).
- Flyout (`.sub-menu` → `.mega-menu__flyout`): live = `left:250px; width:calc(1200px-250px)`, 4 cols
  (`.sub-item{width:25%}`), each a bold title link + plain sub-links.
  - **Camera giám sát** (first item): real DOM had 10 sub-groups (Imou, Ezviz, Dahua, Hikvision, Tapo,
    "trọn bộ", "phụ kiện", 4G, năng lượng mặt trời, hành trình); clone keeps the first 4
    (Imou/Ezviz/Dahua/Hikvision) as a 4-column flyout for a reasonable flyout height — all hrefs used are
    the real site's.
  - Other 8 items: plausible (not scraped) 3-column flyouts with realistic Vietnamese brand/type labels,
    per the task brief's explicit allowance.

## 4. JS interaction
- `.is-sticky` on `#js-site-header` once `scrollY > 10` → `box-shadow: var(--shadow-md)` (brief's
  `--color-shadow` token doesn't exist in `variables.css`; used the closest real token).
- CSS `:hover` opens the mega menu by default; `#js-category-btn` click toggles `.is-open` for touch,
  closed via a document-level click-outside handler.
- `#js-mobile-toggle` (≤600px) toggles `.is-mobile-open`, re-showing the category list + utility row
  stacked full-width for mobile nav.

## 5. Responsive
`1024px`/`600px` per task brief (live `pc_style.css` has no responsive rules for this component — mobile
is likely a separate template/domain — so these breakpoints are original, not reverse-engineered).
- `≤1024px`: search wraps full-width; flyout narrows to 2 columns.
- `≤600px`: logo + hamburger + cart only; search becomes a full-width row below the logo; top-bar promo
  links hide, hotline pills go icon-only; category button replaced by hamburger toggle.

## Assumptions / deviations
- Sprite-based icons (top bar, hotline/account/cart/hamburger/utility) → inline SVG, not the shipped
  `sprite.png`; only the 9 category icons + logo are raster assets pulled from the live site.
- Generic hover-to-open implemented, not the homepage-only always-open override (see §3).
- Account hover-flyout (`.account-sub`) and the sticky header's logo/utility-row collapse
  (`.header-fixed` rules) seen in the live CSS were not reproduced — out of scope for the simple
  shadow-on-scroll sticky behavior requested.
