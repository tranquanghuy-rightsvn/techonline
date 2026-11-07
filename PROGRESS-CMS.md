# Tiến độ dựng CMS (GAS + OpenAI + API cho AI local) — cập nhật 07/11/2026

Spec chốt: `GAS.md`. CMS_URL đã có trong GAS.md. Script ID (clasp):
`1MfyE2ItptX-V-hPcKdvVj9lC-d9GnYLv5gI6CoEDKXlS8hu5I1vEV3b4` → `.clasp.json` = `{ "scriptId": "...", "rootDir": "gas" }`
(clasp chạy qua `npx -y @google/clasp`, đã đăng nhập sẵn `~/.clasprc.json`).

Chia 3 nhánh song song (git worktree trong `.claude/worktrees/`), tất cả bị dừng do hết quota,
đã commit WIP. LƯU Ý: 3 nhánh tạo từ commit 6592983 (trước commit GAS.md 8911787) → khi gộp
phải rebase lên master.

| Nhánh | Phạm vi | Trạng thái |
|---|---|---|
| `worktree-agent-ac59499ecf2fdb33f` | `gas/` (CMS, Smart content, AI viết bài bằng OpenAI, API khoá `antn_`), `html/admin/`, `html/admin/api/`, `openapi.json`, `llms.txt`, `tools/gas-api-test/`, `scripts/check_gas_client.mjs` | Mới có `gas/Code.js` ~2.800 dòng (viết dở, commit force vì gas/ bị gitignore). Còn: app/js/css/index.html, smart-content-js, rank-math, trang admin, docs API, test |
| `worktree-agent-ae1894fadb11bfc3c` | Migrate sản phẩm + danh mục sản phẩm → `data/`, `scripts/catalog/build.py`, search-index | ✅ XONG, đã gộp vào master (f5234b9): 515 sản phẩm, 118 danh mục. Field mới `featured`, `breadcrumb`, `colors`, `reviews` (GAS.md III, XII, XIV) — CMS cần hỗ trợ |
| `worktree-agent-a3de8af3a72dad4e6` | Bài viết → `data/posts*`, `data/settings.json`, smart.css/js/scope, `/lien-he/`, form đơn hàng gửi CMS, media-index, CI workflow, `vercel.json` | ✅ XONG, đã gộp vào master (bafbc79). Quyết định ghi ở GAS.md mục XIII. Catalog build nên dùng `scripts/site/settings.py` + `scripts/site/smart.py` |

Bước tiếp theo:
1. Tiếp tục từng nhánh tới khi xong + test pass.
2. Gộp 3 nhánh vào master (rebase lên 8911787), chạy `bash scripts/build.sh`, test.
3. `npx -y @google/clasp push` từ repo gốc (cần `.clasp.json`), deploy lại web app cùng URL.
4. Khách điền Script Properties: `GITHUB_TOKEN`, `GITHUB_OWNER=tranquanghuy-rightsvn`,
   `GITHUB_REPO=techonline`, `GITHUB_BRANCH=master`, `NOTIFY_EMAIL`; key OpenAI nhập trong Admin.
5. Dọn worktree thừa `agent-a662384a985358d0f`, `agent-a682367313df9e5d1` (từ phiên cũ, gần như trống).
