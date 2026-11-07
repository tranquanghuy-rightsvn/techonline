# Footer — techonline.vn

Source: `.global-footer-container` (white bg) + body-level copyright `<p>`.
Reconnoitered live 2026-10-15 via `getComputedStyle` (not assumed).

## Structure
1. 4-column row (`.site-footer__main`): Trụ sở chính | Chính sách | Kết nối với chúng tôi | Tin tức.
2. Branch grid (`.site-footer__branches`): "CHÍNH SÁCH ĐẠI LÝ" link + 4 numbered branch cards.
3. Copyright bar.

## Verbatim content
**Col 1 — Trụ sở chính** (NOT bold, confirmed via zoom screenshot — contradicts common assumption):
CÔNG TY TNHH TECH ONLINE VIỆT NAM / VPGD: Số 25 Phố Doãn Kế Thiện, Phú Diễn, Hà Nội / Hotline: 0928.066.068 / Hotline: 0973.678.550 / Email: kinhdoanh.techonline@gmail.com / Mã số thuế: 0108743917 / link "CHÍNH SÁCH ĐẠI LÝ" → /chinh-sach-dai-ly

**Col 2 — Chính sách**: Chính sách bảo mật, Chính sách bảo hành, Chính sách giao hàng, Chính sách đổi trả hàng, Hướng dẫn mua hàng, Hình thức thanh toán.

**Col 3 — Kết nối với chúng tôi**: Facebook (real link: facebook.com/techonlinevietnam), Instagram (href empty), YouTube (href empty). Badge links to online.gov.vn Bộ Công Thương verification.

**Col 4 — Tin tức**: Cẩm nang sử dụng, Tin tuyển dụng (both point to `/tuyen-dung-nhan-vien-ky-thuat` on live site — likely a site bug, kept verbatim).

**Branches** (4, verbatim):
| # | Name | VPGD | Hotline 1-5 | Khiếu nại | Email |
|---|---|---|---|---|---|
| 01 | Tech Online - Hà Nội | Số 701 Giải Phóng, Giáp Bát, Hoàng Mai, Hà Nội | 0928.066.068 / 0983.555.120 / 0983.520.998 / 0911.105.456 / 0989.720.550 | 0972.030.468 | kinhdoanh.techonline@gmail.com |
| 02 | Tech Online - Hà Nội | Số 25 Phố Doãn Kế Thiện, Phú Diễn, Hà Nội | 0928.066.068 / 0983.555.120 / 0983.520.998 / 0911.105.456 / 0989.720.550 | 0972.030.468 | kinhdoanh.techonline@gmail.com |
| 03 | Tech Online - Hồ Chí Minh | Số 64 Tân Sơn, Phường Tân Sơn, Hồ Chí Minh | 0928.066.068 / 0985.688.820 / 0983.520.998 / 0911.105.456 / 0989.720.550 | 0972.030.468 | kinhdoanh.techonline@gmail.com |
| 04 | Tech Online - Đà Nẵng | 155 Điện Biên Phủ, Thạc Gián, Thanh Khê, Đà Nẵng | 0928.066.068 / 0969.183.819 / 0983.520.998 / 0911.105.456 / 0989.720.550 | 0972.030.468 | kinhdoanh.techonline@gmail.com |

Note: Hotline 2 differs per branch; Hotlines 1/3/4/5 are identical across all 4 branches.

**Copyright**: "Bản quyền thuộc về Tech Online Việt Nam"

## Captured styles (computed, not assumed)
- `.global-footer-container`: bg `#fff` (rgb 255,255,255), text `#000`, padding `30px 0`.
- Column title (`.item.js-footer-info .title`): 15px / 700 / uppercase (content already caps) / `#000` / margin-bottom 16px.
- Body links/text in cols 1/2/4 (`.item-list a`, `.item-list p`): 13px / 400 / `#353535` (NOT the `--color-text-body` token — verified distinct, hardcoded) / line-height 24px.
- Link hover (`.item-list a:hover`): `rgb(0,100,189)` = `#0064bd` = `--color-brand-blue`.
- "CHÍNH SÁCH ĐẠI LÝ" link: `rgb(0,123,255)` = `#007bff` — this is Bootstrap's default anchor blue (no custom rule found for this selector), **not** the brand blue and **not** orange/red as might be assumed. Verified via live stylesheet scan — no matching CSS rule overrides it.
- Social icons: 41×41px circles, sourced from a CSS sprite (`sprite.png`, 600×600) at positions FB `-494,-162`, IG `-557,-162`, YT `-494,-216`. Cropped into standalone `social-*.png` files via `sips`.
- Badge image: natural 297×113, rendered ≈148×56 (`w-auto h-auto` utility preserves aspect ratio).
- Branch pill (`.store-title`): bg `#0064bd` (brand blue), text white, 15px/700, border-radius 50px, padding 4px, margin-bottom 12px, `display:flex`.
- Branch number badge (`.number`): 24px circle, white bg, text `#ff601c` (orange-red, no matching token — hardcoded), 16px/700, margin-right 14px.
- Branch grid: `display:flex; flex-wrap:wrap; gap:12px` (`--space-3`), 4 equal columns of 291px at 1224px container (confirmed via live DOM measurement — an earlier read of a *second*, hidden `.global-store-list-holder` inside the header's "Hệ thống cửa hàng" popup gave a false 2-column/568px reading; the actual footer instance scoped under `.global-footer-container` is 4-column).
- Branch item link text: `#000`, 13px/400, bold via inline `<b>` for labels (Hotline 1:, Email:, etc.), hover → brand blue.
- Copyright bar: no explicit `border-top` rule exists on the live page — separation reads purely from the background transition (`white` footer → `--color-bg-page` `#f8f8fa` page bg behind the centered 13px copyright text, `padding:10px`). Implemented as `background: var(--color-bg-page)` rather than a fabricated border, per verified DOM/CSS.
- Main row layout: `float:left`, 4 columns × 300px exactly filling 1200px inner width (1224 − 24 container padding), spacing via `padding-right:40px` (`--space-10`) on each column except the last — reimplemented as `display:flex; column-gap:40px` for simpler responsive wrapping (visually identical at desktop width).

## Assets downloaded
- `assets/images/social-facebook.png`, `social-instagram.png`, `social-youtube.png` — 41×41px, cropped from live sprite.
- `assets/images/badge-bct.png` — 297×113px, downloaded directly (not a sprite).

## Responsive
4 columns → 2 columns at ≤900px → 1 column at ≤560px, for both the main row and the branch grid (branch pill corner radius reduced to `--radius-md` at ≤560px since full-width pills look odd fully rounded).
