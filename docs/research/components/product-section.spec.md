# Product grid sections — spec

Source: live DOM inspection of https://techonline.vn/ (2026-10-15), via Chrome automation +
the site's own `/ajax/get_json.php?action=product&action_type=product-list&...` data loaded
by the page's `getProductList(containerId)` helper (content is lazy-loaded; had to trigger it
per container before scraping). Images downloaded directly from `/media/product/...` via curl.

## 1. Product card anatomy (`.product-card`, replaces live `.p-item`)

- Card: white bg, `1px solid var(--color-border)`, `border-radius: var(--radius-lg)` (10px),
  `overflow: hidden`, hover → `box-shadow: var(--shadow-md)` + `translateY(-2px)`.
- Optional top-left badge (`.product-card__badge`, only "Mẫu mới" observed): pink bg
  (`--color-badge-pink-bg`), pink text (`--color-badge-pink-text`), 12px, radius 5px.
- Image area: 1:1 aspect ratio, `object-fit: contain` on a light (`--color-bg-page`) backdrop,
  zooms 1.04x on card hover.
- Optional discount ribbon (`.product-card__ribbon`), only rendered when `product.discount` is
  set: background image `assets/images/p-icon-bestsale.png` (red ribbon asset), white bold text
  showing the same `-NN%` string as the discount tag below.
- Name: `<a><h3>`, `color: var(--color-text-body)`, 15px, 2-line clamp, hover → `--color-accent-red`.
- Price row: optional `<del>` old price (muted, 15px, strikethrough) + `<p>` current price
  (`--color-accent-red`, 22px, weight 800) + optional discount tag (pink pill, matches badge
  colors). All three are conditionally rendered — several scraped products have no old
  price/discount (price shown as "Liên hệ" — contact for price).
- Attribute tags (`.product-card__attr`): 11px, `1px solid #ccc`, `border-radius: 3px`, small
  padding. Several scraped products have zero attribute tags (empty array) — row still reserves
  height via an empty `.product-card__attrs` wrapper so card heights stay aligned in a row.
- Footer actions row: "So sánh" text link (muted → blue on hover) + circular cart/add-to-cart
  icon button (outlined blue, fills blue on hover).

## 2. Product section anatomy (`.product-section`)

Two header layouts share one card/carousel structure, selected by `config.type`:

### `flashsale` (1 instance) — maps to live `.home-collection-group`
- Centered red-gradient pill title: `⚡ {title} ⚡` (`linear-gradient(90deg, #ff4d4d, var(--color-accent-red))`,
  `border-radius: var(--radius-full)`, white bold text).
- Below: 4 pill-shaped filter tabs (`.product-section__pill`), each showing a bold label + a
  muted sub-label (live markup: `<p><b>label</b><span>sub</span></p>`). First pill pre-marked
  active (red fill); clicking any pill toggles `.is-active` only — see "Known limitation" below.
- 5-product row, then a centered "XEM THÊM" button below the carousel
  (`.product-section__footer .product-section__view-all`, outlined blue, fills blue on hover).

### `category` (6 instances) — maps to live `.home-product-group` / `#js-product-container-{1..6}`
- Left-aligned uppercase title with a 48px red underline accent (`::after`).
- Right-aligned row of brand/sub-category tabs (`.product-section__subtab`, pipe-separated via
  `border-left`) + a "Xem tất cả ›" link, all in the same header row as the title (title left,
  tabs+view-all right, `justify-content: space-between`, wraps on narrow screens).
- 5-product row below, no second "xem thêm" button (the top-right link is the only CTA).

### Shared carousel (`.product-section__carousel` / `.product-section__track`)
- `display: grid; grid-auto-flow: column`, 5 equal columns at desktop (`grid-auto-columns: calc((100% - 4*gap)/5)`),
  3 columns ≤1024px, 2 columns ≤768px. `overflow-x: auto`, `scroll-snap-type: x mandatory`,
  scrollbar hidden.
- Two small circular arrow buttons (`.product-section__arrow--prev/--next`), absolutely
  positioned at the track's vertical center, outside the track edges; click scrolls by one
  card width (`track.scrollBy`). This replaces the live site's Owl Carousel nav.

## 3. The 7 sections scraped (real data, first 5 products each)

| # | id | Title | Tabs (first = active) | View-all |
|---|----|-------|------------------------|----------|
| 1 | `flashsale` | TOP SẢN PHẨM BÁN CHẠY | Sản phẩm giá sốc / Camera ưu đãi / Cửa vân tay sale sốc / WIFI CHÍNH HÃNG | XEM THÊM → `/collection/san-pham-gia-soc` |
| 2 | `cat1` | Camera giám sát | Camera Wifi Imou / Camera Wifi Ezviz / Camera Dahua | Xem tất cả › → `/camera-giam-sat` |
| 3 | `cat2` | Thiết bị mạng | Thiết bị mạng theo hãng / Bộ phát wifi / Router – Modem | → `/thiet-bi-mang` |
| 4 | `cat3` | Khoá cửa vân tay | Khóa cửa Ezviz / Khóa vân tay Bosch / Khóa cửa Hafele | → `/khoa-cua-van-tay` |
| 5 | `cat4` | Nhà thông minh | Nhà thông minh theo hãng / Chuông cửa / Nhà thông minh theo tính năng | → `/nha-thong-minh` |
| 6 | `cat5` | Chấm công - Kiểm soát cửa | Máy chấm công / Thiết bị kiểm soát cửa / Thiết bị kiểm soát cổng | → `/cham-cong-kiem-soat-cua` |
| 7 | `cat6` | Thiết bị lưu trữ | Ổ cứng / Thẻ nhớ / Ổ SSD | → `/thiet-bi-luu-tru` |

35 real products scraped total (5 per section), each with: name, image, price, old price
(when present), discount % (when present), "Mẫu mới" badge (flashsale items 1–2 only),
attribute tags (when present — several products have none), and original product-detail link
(stored on the data object for reference; card `href` is set to `#` in the clone since detail
pages aren't part of this build — same placeholder convention used by the hero section).

Products with no discount (contact-for-price items, e.g. "Liên hệ") render with no old-price,
no discount tag, and no ribbon — verified conditional rendering, not faked data.

## 4. States captured / interaction notes

- **Tab click (flashsale pills + category subtabs)**: toggles `.is-active` and resets carousel
  scroll to start. **Known limitation**: only the first (active) tab's 5 products were scraped
  per section — the live site AJAX-loads a different product set per collection/sub-category id,
  which would require 1 additional live AJAX call per tab (4 for flashsale + 3×6 for categories
  = 22 more) to fully replicate. Clicking a non-first tab currently re-displays the same 5
  scraped products (acceptable per task brief: "reuse the same product array... TODO if sub-tab
  data wasn't scraped per-tab"). TODO: wire real per-tab data if/when scraped.
- **Carousel arrows**: scroll-snap + `scrollBy` one card width, works at all breakpoints incl.
  mobile (touch/drag scroll also works natively via `overflow-x: auto`).
- **Card hover**: shadow + lift + image zoom; name hover → red; cart button hover → filled blue.
- Both `renderProductSection` (pure string-returning render function, data-in/HTML-out) and
  `mountProductSections` (auto-mount on `DOMContentLoaded`, queries `.product-sections`) are
  defined in `js/components/product-section.js`.

## 5. Data-fetch technique (for provenance)

The live homepage lazy-loads each product block's HTML via AJAX only once the block scrolls
into view or a filter tab is clicked (direct `fetch` to the AJAX endpoint from outside the page
is rejected — `{"status":"error","message":"You need to use Hura.Ajax.post/get to access this API"}`
— it requires the page's own request-signing wrapper). Scraping was done by calling the page's
already-loaded `window.getProductList(containerId)` helper (and clicking the first flash-sale
filter pill) inside the live tab via `javascript_tool`, then reading `.p-item` nodes out of the
freshly-populated `.product-holder` / `.owl-carousel` DOM for each of the 7 blocks. Images were
downloaded afterwards with `curl` directly from the absolute `/media/product/...` URLs seen in
each scraped product's `<img src>`.

## Files

- `css/components/product-card.css`
- `css/components/product-section.css`
- `js/data/products.js` — `const PRODUCT_SECTIONS = [...]`
- `js/components/product-section.js` — `renderProductSection(config)`, `renderProductCard`,
  `renderTabs`, `initProductSectionInteractions`, `mountProductSections` (auto-run on
  `DOMContentLoaded`)
- `sections/products.html` — `<main class="product-sections"></main>` fragment; orchestrator
  wires in `js/data/products.js` and `js/components/product-section.js` (both `defer`) in
  `index.html`.
- `assets/images/product-flashsale-{1..5}.*`, `product-cat{1..6}-{1..5}.*` — 35 downloaded
  product photos.
