# GAS.md — Guideline CMS An Ninh Thái Nguyên (Google Apps Script)

> Nguồn quyết định CHỐT cho mọi file trong `gas/` và cho pipeline `data/ → build → html/`.
> Đọc TOÀN BỘ trước khi sửa code. Sửa code xong 1 quyết định → cập nhật lại file này trong CÙNG
> lượt sửa (playbook skill `free-cms-static-site-pipeline`). Mẫu tham chiếu: xevip (skill),
> `~/Desktop/clone-web/adzo` (Smart content, viết bài AI), `~/Desktop/clone-web/dolphinehouse`
> (API cho AI chạy trên máy khách — GAS.md mục XIX/XX của dự án đó).
>
> Chốt với khách 07/11/2026: phạm vi = tin tức + danh mục tin, sản phẩm + danh mục sản phẩm, liên
> hệ, đơn hàng, người dùng, trang hướng dẫn API cho AI; 3 cấp quyền; AI = **OpenAI** (KHÔNG dùng
> Claude, KHÔNG dùng Gemini) bằng key OpenAI của khách; KHÔNG có Smart content tự động ban đêm.

## 0. Phạm vi

| Nội dung | Lưu ở đâu | Ghi bởi |
|---|---|---|
| Bài viết | GitHub `data/posts.json` + `data/posts/<slug>.json` | CMS / API |
| Danh mục bài viết | GitHub `data/post-categories.json` | CMS / API |
| Sản phẩm | GitHub `data/products.json` + `data/products/<slug>.json` | CMS / API |
| Danh mục sản phẩm | GitHub `data/product-categories.json` | CMS / API |
| Thông tin website | GitHub `data/settings.json` | CMS (admin trở lên) |
| Người dùng | Google Sheet `Users` | CMS |
| Liên hệ | Google Sheet `Contacts` | Form `/lien-he/` → `doPost` |
| Đơn hàng | Google Sheet `Orders` | Trang `/thanh-toan/` → `doPost` |
| Khoá kết nối AI | Script Properties `apikey_<khoá>` | CMS (admin trở lên) |

KHÔNG thuộc CMS (sửa tay trong repo): menu (`html/js/data/menu-data.js`), trang chính sách,
giỏ hàng (localStorage), header/footer partial. Các khối tự động do build sinh từ `data/`: tin
tức trang chủ, khối sản phẩm theo danh mục (trang chủ + trang danh mục), chỉ mục tìm kiếm,
sitemap/JSON-LD (`scripts/site/seo.py`).

URL web app (`CMS_URL`):
`https://script.google.com/macros/s/AKfycbw7iAdl8RInlsR6SF49btpqUHHyZm1oF7Nu2X2RR5iN3iAhmpC5WN_kW7HUlMqny_W1/exec`
Trang quản trị: `https://anninhthainguyen.vn/admin/` (nhúng iframe, KHÔNG redirect — static-site-build.md mục 6).
Tài liệu API cho AI: `https://anninhthainguyen.vn/admin/api/`.

## I. Đăng nhập & phân quyền

1. Luồng: email → OTP qua email → nhập OTP → vào Admin. Không mật khẩu.
2. Chỉ email có trong sheet `Users` mới được gửi OTP.
3. Chủ script (người deploy) LUÔN là `root`, không lưu (và không hiện) trong `Users`.
4. 3 cấp `root > admin > editor`:

   | Chức năng | editor | admin | root |
   |---|---|---|---|
   | Bài viết, danh mục bài viết, sản phẩm, danh mục sản phẩm | ✔ | ✔ | ✔ |
   | Smart content, Viết bài bằng AI | ✔ | ✔ | ✔ |
   | Liên hệ, Đơn hàng (xem, đổi trạng thái, ghi chú, xoá) | ✘ | ✔ | ✔ |
   | Người dùng (thêm/sửa/xoá `admin`/`editor`) | ✘ | ✔ | ✔ |
   | Thông tin website, cấu hình OpenAI, khoá kết nối AI | ✘ | ✔ | ✔ |

   - `root` không cấp/sửa/xoá qua CMS. Không ai tự sửa/xoá tài khoản của chính mình.
5. OTP sống 10 phút, cooldown 60 giây/email, sai 5 lần phải xin mã mới. Token sống 30 ngày,
   localStorage. Đăng xuất thu hồi token trên server.
6. Mọi hàm server tự `requireRole_` — ẩn menu không phải bảo mật.

## II. Bài viết

1. Field có ô nhập: Tiêu đề (bắt buộc) · URL/slug (tự sinh, bất biến sau lần lưu đầu; URL công
   khai `/<slug>/`) · Danh mục (1, bắt buộc) · Ngày đăng (mặc định hôm nay, hiển thị dd/mm/yyyy) ·
   Ảnh bìa (bắt buộc) · Mô tả ngắn (bắt buộc; thẻ bài + meta description) · Nội dung TinyMCE
   (đoạn, H2/H3/H4, đậm/nghiêng/gạch chân, danh sách, link, bảng, xem mã HTML; **CÓ chèn ảnh
   trong nội dung** bằng nút "Chèn ảnh" nhanh `quickimage` mở thẳng file picker, chọn nhiều ảnh,
   bọc `<figure>` + caption, alt = caption hoặc tiêu đề; `paste_data_images: false`) · Từ khoá SEO
   (tuỳ chọn) · Từ khoá chính `focus_keyword` (tuỳ chọn, chỉ để chấm điểm SEO).
2. Build tự suy: `<title>` = `<Tiêu đề> - An Ninh Thái Nguyên`; mục lục từ H2 (giống trang bài
   hiện tại); "Bài viết mới" (5 bài) + "Bài viết liên quan" (4 bài, ưu tiên cùng danh mục).
3. Danh sách trong Admin: GAS đọc GitHub (luôn mới nhất), gộp trong `boot()`.
4. Ảnh nén phía client (cạnh dài 1600px, JPEG 0.85), upload thẳng GitHub. Ảnh RIÊNG 1-1 theo bài:
   `html/assets/img/posts/<slug>/cover.jpg`, `cNN.jpg`. Ảnh cũ đã migrate (`html/assets/images/…`)
   là ảnh chung, KHÔNG xoá theo bài.
5. Bộ chấm điểm SEO kiểu Rank Math (port `adzo/gas/rank-math-seo-js.html`) ở form bài viết và sản
   phẩm, chạy hoàn toàn trên trình duyệt, không chặn Lưu.
6. Thư viện ảnh `data/media-index.json` (build sinh) — chọn lại ảnh đã có cho nội dung/ảnh bìa/ảnh
   sản phẩm (port adzo mục II.6).
7. Danh sách có nút "Xem" mở `https://anninhthainguyen.vn/<slug>/`.

## II-B. Danh mục bài viết

Field: Tên, slug (bất biến), mô tả (tuỳ chọn), thứ tự. 4 danh mục hiện có: `huong-dan` (Hướng dẫn
kỹ thuật), `tin-cong-nghe` (Tin công nghệ), `tu-van-lua-chon` (Tư vấn lựa chọn), `tin-tuc-cong-ty`
(Tin tức công ty). Danh mục là anchor trong `/tin-tuc/` (`/tin-tuc/#<slug>`), không có trang riêng.
Không xoá được danh mục còn bài.

## II-C. Thông tin website (`data/settings.json`, admin trở lên)

Tên thương hiệu, hotline, Zalo (mặc định = hotline), email, website, địa chỉ (tuỳ chọn), MST (tuỳ
chọn), câu giới thiệu chân trang, dòng bản quyền, tiêu đề/mô tả trang chủ, logo, favicon, ảnh chia
sẻ mặc định, banner slide trang chủ (≤ 10: ảnh + link), 4 ô khuyến mãi dưới banner (ảnh + link).
Thiếu field = dùng mặc định trong build (nội dung site hiện tại). Địa chỉ có giá trị → JSON-LD
Organization chuyển thành `LocalBusiness`.

## II-D. Smart content + Viết bài bằng AI (OpenAI)

Port ý tưởng adzo mục II-D + dolphinehouse mục XX, **AI duy nhất là OpenAI**.

1. Field `smart` trong file chi tiết bài viết/sản phẩm: `{html, css, mode, instructions,
   versions[{id, time, note, html, css}]}` — giữ 5 phiên bản, tổng ≤ ~600KB. `content_html`
   (bài viết) / `description_html` (sản phẩm) KHÔNG bị đụng: là bản gốc; bỏ Smart content = xoá
   `smart`. `cleanSmart_()` lọc script/iframe/form/`on*=`/`style=""`.
2. Trình thiết kế (port `adzo/gas/smart-content-js.html`): xem trước bằng CSS thật của site
   (máy tính/tablet/điện thoại), chế độ "Giữ nguyên chữ, chỉ dàn trang" (mặc định) / "Cho phép viết
   lại", yêu cầu thêm, góp ý bằng cách bấm/bôi đen → "Nhờ AI sửa" (find/replace, áp tất cả hoặc
   không gì), 5 phiên bản khôi phục được. Màu luôn theo màu website (không có màu riêng từng bài).
   Bản soạn chỉ lên web khi bấm Lưu. Danh sách có badge "✨ Smart content".
3. Viết bài bằng AI — **CHỈ bài viết** (sản phẩm không có AI tự sinh nội dung, cấm bịa thông số).
   Nút + độ dài (1.000–2.500 chữ) ở đầu form; lấy Tiêu đề/Từ khoá/Mô tả đang có; dàn ý
   (`smartOutline`) → sửa dàn ý → viết TỪNG MỤC (`smartWriteSection`, mỗi mục 1 lần gọi, tránh giới
   hạn 6 phút) → thay nội dung ô soạn thảo, KHÔNG tự Lưu. Ảnh chỉ từ ảnh đã có trong nội dung + ≤ 14
   ảnh thư viện gần chủ đề. Link nội bộ ≤ 12 ứng viên, ≤ 1 link/mục, bài viết bắt buộc ≥ 2 link nội
   bộ. Không bịa giá/khuyến mãi/bảo hành/số liệu.
4. Gọi OpenAI: client → hàm server → `UrlFetchApp` tới `https://api.openai.com/v1/responses`
   (Structured Outputs `text.format: json_schema`), không stream. Ảnh gửi dạng URL công khai
   (raw.githubusercontent.com) hoặc data URL ≤ 1,5MB. Server không lưu gì ở bước gọi AI.
5. Chi phí: dùng THẲNG key OpenAI của khách (OpenAI tính tiền vào tài khoản khách). Admin hiện số
   token đã dùng (cộng dồn `OPENAI_USAGE` theo tháng) để theo dõi, KHÔNG có số dư/hệ số bán.
6. Smart content tự động ban đêm: **KHÔNG** (khách chốt 07/11/2026).
7. Build: có `smart.html` thì trang dùng nó thay nội dung gốc, bọc `<div class="smc-root smc-a">`,
   nạp `/css/smart.css` + `<style>` đã gắn phạm vi `.smc-a.smc-a.smc-a` + `/js/smart.js`. Hàm gắn
   phạm vi `html/js/smart-scope.js` dùng chung cho build và khung xem trước của Admin.

## III. Sản phẩm

1. Field có ô nhập (khớp các khối đang hiển thị trên trang sản phẩm hiện tại):
   Tên (bắt buộc) · slug (bất biến) · Danh mục (≥ 1, chọn trong danh mục sản phẩm) · Thương hiệu ·
   Mã sản phẩm (`sku`) · Bảo hành (vd "24 tháng") · Tình trạng (`Còn hàng` | `Hết hàng` |
   `Liên hệ`) · Giá (số, để trống = "Liên hệ") · Giá cũ (số, tuỳ chọn; % giảm do build tính) ·
   Đã gồm VAT (bật/tắt) · Ảnh (≥ 1, ảnh đầu = ảnh đại diện, đổi thứ tự được) · Mô tả tóm tắt (danh
   sách gạch đầu dòng, 4 dòng đầu hiện sẵn) · Ưu đãi (danh sách, mặc định theo settings) · Thông
   số kỹ thuật (bảng 2 cột tên/giá trị) · Mô tả chi tiết (TinyMCE, có chèn ảnh) · Nhãn thẻ (`attrs`,
   ≤ 3 chip trên thẻ sản phẩm) · Badge (tuỳ chọn, vd "Mẫu mới") · Mô tả SEO · Từ khoá SEO · Từ khoá
   chính.
2. Build tự suy: % giảm, JSON-LD Product, sản phẩm tương tự (cùng danh mục), thẻ sản phẩm trên
   trang danh mục/trang chủ, chỉ mục tìm kiếm.
3. Ảnh RIÊNG 1-1: `html/assets/img/products/<slug>/gNN.jpg`. Ảnh đã migrate (đường dẫn cũ, kể cả
   ảnh ngoài `https://kabegroup.vn/...`) giữ nguyên, không xoá theo sản phẩm.
4. Migrate 1 lần (script local, KHÔNG thuộc CMS): 381 trang `html/<slug>/index.html` có
   `pdp__title` + 144 khoá cửa chỉ có trong `js/data/khoa-cua-van-tay-products.js` → `data/products`.
   Sau migrate, build sinh lại trang sản phẩm phải trùng nội dung với trang hiện tại (so diff).

## III-B. Danh mục sản phẩm

Field: Tên, slug (bất biến; URL `/<slug>/`), danh mục cha (tuỳ chọn, 1 cấp), ảnh/icon (tuỳ
chọn), mô tả, thứ tự. Trang danh mục được build sinh từ `data/` giữ nguyên giao diện hiện tại
(các kiểu trang: `category-page`, `brand-category-page`, `subcategory-page`, `lock-page`,
`network-page` — field `layout` của danh mục). Không xoá được danh mục còn sản phẩm/danh mục con.
Menu (`menu-data.js`) vẫn sửa tay.

## IV. Sửa / Xoá (mọi loại nội dung)

- Slug bất biến sau lần lưu đầu (chặn server + disable input). Form tái sử dụng phải reset trạng
  thái khoá khi mở "tạo mới". Ảnh khi sửa hiển thị bằng URL tuyệt đối raw.githubusercontent.com.
- Xoá: file chi tiết + gỡ khỏi index + xoá thư mục ảnh RIÊNG (`posts/<slug>/`, `products/<slug>/`)
  trong 1 thao tác; KHÔNG xoá ảnh chung. Bắt buộc popup xác nhận. Xoá xong dọn `html/<slug>/`
  (trang mồ côi) qua build.

## V. Form công khai: Liên hệ

- Trang mới `/lien-he/` (build sinh, link ở chân trang + menu tiện ích). Field: Họ tên, Điện
  thoại (bắt buộc), Email, Nội dung. Honeypot `_hp`. Rate-limit 60 giây/số điện thoại.
- `fetch(CMS_URL, {method:'POST', body: JSON, headers: text/plain;charset=utf-8})`,
  `action: 'contact'`. Gửi mail báo `NOTIFY_EMAIL` nếu có (dùng chung quota Gmail với OTP).

## VI. Form công khai: Đơn hàng

- Trang `/thanh-toan/` hiện có gửi đơn lên `doPost` `action: 'order'` (giỏ hàng vẫn ở localStorage).
  LockService khi ghi Sheet. Honeypot + rate-limit 60 giây/số điện thoại. Mã đơn = mã hiện trang
  đang tạo (nội dung chuyển khoản). Server tính lại tổng tiền theo `data/products.json` (không tin
  giá từ client); sản phẩm "Liên hệ" ghi giá 0. Mail báo `NOTIFY_EMAIL`.
- Trạng thái: `Mới` | `Đã xác nhận` | `Đang giao` | `Hoàn thành` | `Đã huỷ`. Admin ghi chú nội bộ.

## VII. UX chung

- 2 loại pop-up riêng: XÁC NHẬN (Huỷ/Đồng ý) và THÔNG BÁO (1 nút Đóng). Không alert/confirm native.
- Mọi nút async: disable + spinner, tự phục hồi khi lỗi. Lưu/Xoá xong danh sách tự cập nhật.
- Chuyển tab chỉ là hiệu ứng giao diện. `boot()` 1 lượt lấy hết dữ liệu; lần sau hiện từ cache
  (stale-while-revalidate). Key localStorage (trừ token) mang hậu tố `CLIENT_BUILD` + tự dọn
  key cũ. Bump `CLIENT_BUILD` mỗi lần sửa client.
- Khối khởi động `bootApp()` đặt CUỐI `js.html` (bug TDZ của adzo). Chạy
  `scripts/check_gas_client.mjs` sau mỗi lần sửa `gas/js.html`.

## VIII. Kiến trúc lưu trữ (tên cố định)

- Google Sheet `An Ninh Thai Nguyen CMS Data` (tự tạo lần đầu):
  - `Users`: `email`, `role` (`admin` | `editor`), `created_at`
  - `Contacts`: `id`, `created_at`, `name`, `phone`, `email`, `message`, `page`, `status`
    (`Mới` | `Đã xử lý`)
  - `Orders`: `id`, `created_at`, `name`, `phone`, `email`, `address`, `note`, `payment`
    (`cod` | `bank`), `items` (JSON `[{slug, name, price, qty}]`), `items_text`, `total`, `status`,
    `admin_note`
- GitHub repo (Contents API) — đường dẫn cố định:
  - `data/posts.json` (index, commit CHỐT), `data/posts/<slug>.json`
  - `data/post-categories.json` (CHỐT)
  - `data/products.json` (index, CHỐT), `data/products/<slug>.json`
  - `data/product-categories.json` (CHỐT)
  - `data/settings.json` (CHỐT)
  - `data/media-index.json` (build sinh, CMS chỉ đọc)
  - `html/assets/img/posts/<slug>/…`, `html/assets/img/products/<slug>/…`, `html/assets/img/site/…`
- File index CHỐT luôn ghi SAU CÙNG trong 1 thao tác. Mọi commit của CMS có hậu tố `[CI-Skip]`.
- CI `.github/workflows/build.yml`: trigger khi `data/**` hoặc `scripts/**` đổi → `scripts/build.sh`
  (sinh trang từ `data/` + SEO) → commit `html/` (KHÔNG có `[CI-Skip]`).
- Hosting: Vercel (thư mục `html/`). `vercel.json` `ignoreCommand` bỏ qua commit có `[CI-Skip]`
  → chỉ deploy commit build của CI (tránh mỗi ảnh upload 1 lần deploy).
- Độ trễ Lưu → thấy trên site: ~1-3 phút.

## IX. Bug đã gặp ở dự án này

- (chưa có — ghi lại khi gặp, kèm cách vá)

## X. Script Properties (tên cố định)

- `GITHUB_TOKEN` (fine-grained PAT, Contents: Read and write trên repo site), `GITHUB_OWNER`
  (`tranquanghuy-rightsvn`), `GITHUB_REPO` (`techonline`), `GITHUB_BRANCH` (`master`) — bắt buộc.
- `SPREADSHEET_ID` — KHÔNG điền, code tự tạo.
- `NOTIFY_EMAIL` — nhận mail liên hệ/đơn hàng mới (tuỳ chọn).
- `OPENAI_API_KEY` — key OpenAI của khách. Nhập ở tab "Thông tin website" → thẻ "AI (OpenAI)"
  (gọi thử rồi mới lưu, chỉ hiện bản che). `OPENAI_MODEL` — model, chỉnh cùng thẻ đó (mặc định
  `gpt-5-mini`). `OPENAI_USAGE` — JSON số token đã dùng theo tháng (code tự ghi).
- `apikey_<khoá>` — khoá kết nối AI (mục XI), code tự ghi.

## XI. API cho AI chạy trên máy khách (khoá kết nối)

Port dolphinehouse mục XIX. Mục đích: AI local của khách (bất kỳ — OpenAI, mô hình chạy offline…)
tự đọc site và đăng bài/sản phẩm qua HTTP, không cần mở Admin.

1. Khoá `antn_` + 64 hex, Script Properties `apikey_<khoá>` = `{label, email, role, created_at,
   last_used_at, calls}`, tối đa 10 khoá. Chỉ admin trở lên tạo/xem/thu hồi. Khoá luôn mang quyền
   `editor` (chỉ nội dung; không chạm người dùng/liên hệ/đơn hàng). `whoAmI_()` nhận diện tiền tố
   `antn_` trước khi tra token phiên → dùng lại y nguyên các hàm nghiệp vụ. Thu hồi = xoá property.
2. Cổng: cùng `CMS_URL`. `doPost`: `action` `contact`/`order` → form công khai; còn lại → API.
   `doGet`: có `action` → API đọc; không → trang Admin. Phản hồi `{ok:true, action, data}` /
   `{ok:false, action, error}` (Apps Script không đặt được HTTP status).
3. Action (`API_ACTIONS`; `ping` trả đúng danh sách này): `ping`; `post.list|get|create|update|delete`;
   `post-category.list|create`; `product.list|get|create|update|delete`;
   `product-category.list|create`; `image.upload`; `smart.guide|get|set|revert`;
   `site.info` (thông tin website + quy tắc viết bài). `create` từ chối slug đã có; `update` từ
   chối slug chưa có và TRỘN với bản cũ. Bài/sản phẩm tạo qua API lên web ngay (không có bước duyệt).
4. Ảnh: URL http(s) (server tải về), `{data: base64, filename}`, hoặc `/assets/...` có sẵn; ≤ 5MB.
5. Khoá ghi advisory bằng CacheService (`api_write_lock`), KHÔNG dùng LockService (dùng chung với
   đơn hàng). Chờ tối đa 45 giây rồi báo bận; TTL 180 giây.
6. Admin: tab "Kết nối AI" (admin trở lên) — tạo/ẩn-hiện/chép/thu hồi khoá, chép sẵn "Hướng dẫn cho
   AI" (có địa chỉ + khoá), mở `/admin/api/`.
7. Tài liệu: `html/admin/api/index.html` (trang tĩnh, không chứa khoá, có ô dán khoá để ví dụ tự
   điền; bảng action khớp `API_ACTIONS`) + `html/llms.txt` (tóm tắt site + link tài liệu, cho AI tự
   khám phá) + `html/admin/api/openapi.json` (mô tả máy đọc được cho AI có hỗ trợ tool calling).
   Sửa action trong `Code.js` thì sửa luôn 3 file này.
8. Kiểm thử: `node tools/gas-api-test/test-api.js` chạy `Code.js` trong môi trường giả lập (port
   dolphinehouse). Chạy lại trước mỗi lần đẩy code GAS.

## XII. Schema JSON (tên field cố định — build, CMS và API cùng dùng)

Ngày dạng `YYYY-MM-DD`; thời điểm dạng ISO UTC. Giá là số nguyên VND hoặc `null` (= "Liên hệ").
Ảnh là đường dẫn `/assets/...` (ảnh trong repo) hoặc URL tuyệt đối http(s) (ảnh ngoài đã migrate).

- `data/post-categories.json`: `[{slug, name, description, order}]`
- `data/posts.json` (mới nhất trước): `[{slug, title, category, date, cover, description, smart, updated_at}]`
  (`smart`: `true` khi bài có Smart content, không có key khi không dùng)
- `data/posts/<slug>.json`: `{slug, title, category, date, cover, description, content_html,
  keywords, focus_keyword, smart, created_at, updated_at}` (`keywords`: chuỗi, phân cách dấu phẩy;
  `smart`: object mục II-D.1 hoặc không có key)
- `data/product-categories.json`: `[{slug, name, parent, layout, image, description, order}]`
  (`parent`: slug hoặc `""`; `layout`: `category` | `brand` | `subcategory` | `lock` | `network`)
- `data/products.json`: `[{slug, name, categories, brand, image, price, old_price, attrs, badge,
  stock, smart, updated_at}]` (`image` = ảnh đầu của `images`)
- `data/products/<slug>.json`: `{slug, name, categories, brand, sku, warranty, stock, price,
  old_price, vat, images, summary, offers, specs, description_html, attrs, badge,
  seo_description, keywords, focus_keyword, smart, created_at, updated_at}`
  (`vat`: bool; `summary`/`offers`/`attrs`: mảng chuỗi; `specs`: mảng `[tên, giá trị]`)
- `data/settings.json`: `{brand, hotline, zalo, email, website, address, tax_code, footer_text,
  copyright, home_title, home_description, logo, favicon, og_image, hero: [{image, link}],
  promo_tiles: [{image, link}], default_offers: [chuỗi]}`
- `data/media-index.json`: `[[src, caption, used_in]]`
