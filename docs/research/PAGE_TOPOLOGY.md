# Page Topology — techonline.vn (homepage)

Source: https://techonline.vn/ (live, reconnoitered 2026-10-15). Platform: Haravan-like storefront, Owl Carousel for sliders, lazy-loaded blocks.

Global container: `.container` max-width 1224px, padding 0 12px. Font: Mulish. Body bg #F8F8FA.

Top to bottom:

1. **Header** — fixed/sticky, two bars:
   - `.global-header-top`: bg #0064BD (brand blue), white text 13px. Left: 2 hotline pill buttons. Right: "Khuyến mãi hot", "Hệ thống cửa hàng", "Tin tức nổi bật" links w/ icons.
   - `.global-header-main`: white bg. Row 1: logo (left), search bar (center, large), hotline block + "Tài khoản" + "Giỏ hàng" (badge count) (right). Row 2: "DANH MỤC SẢN PHẨM" button (blue, hamburger icon) + utility links (Giao lắp chuyên nghiệp, Chính sách đổi trả, Chính sách giao hàng, Sản phẩm đã xem).
   - Category button triggers `.global-menu-container` (position:absolute, display:none by default, shown on hover) — a vertical list of 9 categories with icons, each `.has-child` revealing a multi-column mega-menu flyout to the right on hover.

2. **Hero banner** (`.home-banner-container`) — full width, Owl Carousel, autoplay slides, arrow nav + dots. ~500px tall. The category sidebar menu (from header) visually overlaps the left portion of this banner when open on page load/hover.

3. **Under-banner strip** (`.home-banner-under`) — 4 equal promo tiles in a row: Bảo hành chính hãng / Lắp đặt chuyên nghiệp / Đổi 1-1 trong 30 ngày / Ship COD toàn quốc. Hover: zoom 1.03x.

4. **Category icon row** (`.home-category-list`) — 9 circular flat-icon tiles with labels: Camera giám sát, Thiết bị mạng, Khoá cửa vân tay, Nhà thông minh, Chấm công - Kiểm soát cửa, Thiết bị lưu trữ, Âm thanh, Thiết bị báo động-báo cháy, Tivi - Màn hình máy tính.

5. **Flash-sale block** (`.home-collection-group`) — red gradient header pill "⚡ TOP SẢN PHẨM BÁN CHẠY ⚡" with 4 filter tabs (Sản phẩm giá sốc / Camera ưu đãi / Cửa vân tay sale sốc / WIFI CHÍNH HÃNG). Below: 5-col product grid (Owl Carousel), "XEM THÊM" link.

6. **Category product blocks** ×6 (`.home-product-group`, `#js-product-container-1..6`) — repeating pattern: left-aligned category title (e.g. "KHOÁ CỬA VÂN TAY") with red underline accent, row of brand sub-tabs on the right + "Xem thêm ›", then 5-col product carousel below. Categories observed: Khoá cửa vân tay, Camera giám sát (tabs: Camera wifi Imou/Ezviz/Dahua), Thiết bị mạng, Nhà thông minh, Thiết bị lưu trữ (SanDisk cards seen), + 1 more.

7. **Article/promo cards** (`.home-article-group`, `#js-top-article-container`) — 4-card row, each image + caption overlay (branch openings, recruitment, install services).

8. **USP bar** (`.global-footer-policy-container`) — 4 equal columns w/ icon + bold title + gray subtitle: THANH TOÁN TIỆN LỢI / GIAO HÀNG TOÀN QUỐC / HỖ TRỢ NHIỆT TÌNH / ĐỔI TRẢ DỄ DÀNG.

9. **Newsletter** — full-width blue bar (#0064BD family), envelope icon + "Đăng ký nhận tin" title + subtext, email input (white, rounded) + circular arrow submit button on the right.

10. **Footer** — white bg, dark text. 4 columns: (1) Trụ sở chính — company name, address, hotlines, email, MST; (2) Chính sách — policy links list; (3) Kết nối với chúng tôi — social icons (FB/Instagram/YouTube) + "Đã thông báo Bộ Công Thương" badge; (4) Tin tức — 2 links. Below that: "CHÍNH SÁCH ĐẠI LÝ" heading + 4-column numbered branch list (01 Hà Nội, 02 Hà Nội, 03 Hồ Chí Minh, 04 Đà Nẵng) each with address/hotlines/email. Bottom: centered copyright bar, thin top border, "Bản quyền thuộc về Tech Online Việt Nam".

11. **Floating overlays** (fixed, all pages): right-side stack (Messenger bubble, Zalo bubble, 2 call buttons) with pulsing animation; back-to-top circular button (bottom-right, appears after 300px scroll); left-side "So sánh (0)" compare bar tab.

## Interaction models
- Header category menu: **hover-driven** (CSS/JS show on hover of `.header-menu-container`).
- Hero banner: **time-driven carousel** (Owl autoplay) + click arrows/dots.
- Flash-sale & category block tabs: **click-driven** filter (swaps product set).
- Product carousels: **click-driven** (arrow nav) horizontal scroll, Owl Carousel equivalent.
- Floating buttons: static position, CSS pulse animation (time-driven, infinite).
- Back-to-top: **scroll-driven** visibility (appears > 300px).
- Newsletter/compare bar: click-driven.
