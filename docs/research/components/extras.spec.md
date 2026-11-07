# Article row + USP bar + newsletter bar — spec

Source: live DOM/computed-style inspection of https://techonline.vn/ (2026-10-15).
Order on page: product grids → `.article-row` → `.usp-bar` → `.newsletter` → footer.

## 1. Article/promo card row (`.article-row`)

Source: `#js-top-article-container` (`.home-article-group`) — lazy-loaded, empty
on initial paint, content injected ~1-2s after scrolling into view.

- Box: `max-width: var(--max-width); margin: 35px auto; padding: 15px
  calc(var(--container-pad) * 2)` (reproduces nested container padding → 1176px
  content width).
- Header: flex space-between, `margin-bottom:16px`. `<h2>` "Tin tức" —
  `24px/800/black`. "Xem tất cả" — `18px (--text-lg)/400/var(--color-brand-blue)`.
- Grid: `flex; gap:12px (--space-3)`, 4 cards, `285×207px`, `border-radius:15px`,
  `overflow:hidden`. Each card = `<a><img><span class="caption"></a>`.
- Overlay: flat `rgba(0,0,0,0.2)` full-card (confirmed via computed style —
  **not actually a gradient** despite how it may read in a screenshot).
- Caption: absolute, `left/right:12px; bottom:12px; color:#fff;
  15px(--text-md)/700/line-height:18px`.
- Hover: `:hover` can't be triggered via synthetic DOM events, so zoom wasn't
  directly measured; implemented as `scale(1.03)` to match this clone's sibling
  `.promo-strip` tiles, per task instruction.
- Cards (file — alt/caption): `article-1.jpg` "Tech Online khai trương chi
  nhánh mới tại 25 Doãn Kế Thiện, Hà Nội"; `article-2.jpg` "Tuyển Nhân Viên Kỹ
  Thuật - Lắp Đặt Camera/Thiết Bị Mạng/ Khoá Vân Tay..."; `article-3.jpg`
  "Dịch vụ lắp đặt khóa cửa vân tay Đà Nẵng uy tín, chuyên nghiệp";
  `article-4.jpg` "Dịch vụ lắp đặt camera Đà Nẵng uy tín, chuyên nghiệp".
- **Secondary "TIN TỨC" news grid (thumbnail+date+excerpt): does not exist.**
  Walked the DOM — the element right after `#js-top-article-container`'s
  `.homepage` wrapper is the USP bar. A page-wide query for
  `[class*="article"], [class*="news"]` matched only this one container.
  Skipped per the task's own fallback instruction.

## 2. USP bar (`.usp-bar`)

Source: `.global-footer-policy-container` (misleading class name — not the
real footer; sits between the article row and the newsletter bar).

- `max-width:1224px; margin:0 auto; padding:12px; flex; wrap; space-between`.
  Background is transparent — the pale strip is just the page bg
  (`--color-bg-page`) showing through.
- 4 items, `flex; align-items:center`, ~24% width each.
- Icon: CSS-sprite crop, rendered `68×68px`, `margin-right:8px (--space-2)`.
  Saved individually: `usp-icon-payment.png`, `usp-icon-truck.png`,
  `usp-icon-support.png`, `usp-icon-trade.png`.
- Text: title + subtitle both measured `12px (--text-xs)`, `line-height:22px`,
  color black for **both** — title `700`, subtitle `400`. The "muted gray" look
  in a casual glance is the weight difference, not a distinct color.
- **No vertical divider lines** — checked border/box-shadow/pseudo-elements on
  every item, confirmed none set; verified visually too.
- Columns: THANH TOÁN TIỆN LỢI / "Trả tiền mặt, chuyển khoản, trả góp 0%";
  GIAO HÀNG TOÀN QUỐC / "Nhận hàng và thanh toán tiền tại nhà"; HỖ TRỢ NHIỆT
  TÌNH / "Tư vấn, giải đáp mọi thắc mắc"; ĐỔI TRẢ DỄ DÀNG / "Đổi mới trong 30
  ngày đầu".

## 3. Newsletter bar (`.newsletter`)

Source: `.global-footer-newsletter-container.bg-main`, full-bleed, content
centered as a compact flex unit (no max-width on the outer element).

- Background `rgb(0,100,189)` = exactly `var(--color-brand-blue)`.
- Padding `18px`. Left (~310px) + `70px` gap + right (580px).
- Left: mail icon (sprite crop, `newsletter-icon-mail.png`, 24×24 display) +
  title "Đăng ký nhận tin" (`20px/700/white`, `margin-bottom:5px`) + subtitle
  "Bạn vui lòng để lại Email để nhận thông tin khuyến mãi từ Tech Online"
  (`15px/400/white`).
- Right: `.newsletter__form` is the visible pill —
  `background:#0d3e88; border-radius:90px; padding:6px 6px 6px 23px;
  height:62px` (no existing token matches this darker blue, hardcoded). Inside:
  transparent `<input>` (white text/placeholder, no own border/bg) + circular
  white submit button (`50×50`) overlapping the right edge.
- Submit button: a `36×36` ring (`1px solid #0d3e88`, `border-radius:50%`) plus
  a `13×13` arrow glyph centered inside — saved separately as
  `newsletter-icon-arrow.png` (arrow only; ring drawn with CSS border, not part
  of the icon image).
- Confirmation text: shown on submit, `margin-top:10px; 16px; white`, literal
  "Cảm ơn bạn đã đăng ký!". JS also does a basic email-format check and shows a
  red error message if invalid (required by task spec; not present in source,
  which posts to a real `javascript:subscribe_newsletter(...)` handler).

## Assets downloaded

`article-1.jpg`…`article-4.jpg` (700×700, used as-is); `usp-icon-payment.png`,
`usp-icon-truck.png`, `usp-icon-support.png`, `usp-icon-trade.png` (68×68,
cropped from the shared `sprite.png`); `newsletter-icon-mail.png` (48×48),
`newsletter-icon-arrow.png` (26×26), both cropped from the same sprite.

## Breakpoints (per task brief)

| Breakpoint | Article row | USP bar | Newsletter |
|---|---|---|---|
| Desktop | 4-up row | 4-up row | side-by-side |
| ≤768px | 2-up wrap | 2×2 grid | input stacks below text |
| ≤480px | 1-up stack | stacked | tighter padding only |
