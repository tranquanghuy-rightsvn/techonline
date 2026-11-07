# Tiến độ dựng CMS (GAS + OpenAI + API cho AI local) — cập nhật 07/11/2026 (chiều)

Spec chốt: `GAS.md`. Script ID: `1MfyE2ItptX-V-hPcKdvVj9lC-d9GnYLv5gI6CoEDKXlS8hu5I1vEV3b4`.
`gas/` + `.clasp.json` CHỈ ở máy local (gitignore, KHÔNG commit) — đẩy bằng `npx -y @google/clasp push`.

## Đã xong
- 3 nhánh đã gộp vào master: sản phẩm (f5234b9), bài viết/settings/form (bafbc79), GAS CMS (31114c4,
  squash, không kèm `gas/`).
- Test pass: `node scripts/check_gas_client.mjs`, `node tools/gas-api-test/test-api.js` (57/57),
  `node tools/gas-api-test/test-real-data.js` (data thật: Lưu lại không đổi gì). `bash scripts/build.sh`
  chạy lại không đổi gì.
- Đã `clasp push` 8 file và deploy lại cùng URL (`AKfycbw7…W1` → phiên bản @2).

## Còn lại (cần chủ script làm trên trình duyệt)
1. Web app đang trả "Truy cập bị từ chối": mở script.google.com → dự án → chạy 1 hàm bất kỳ (vd
   `doGet`) → cấp quyền (Sheets, gửi mail, gọi URL ngoài). Kiểm tra Deploy → Manage deployments: Execute
   as = Me, Who has access = Anyone. Sau đó `curl -L "<CMS_URL>?action=ping"` phải ra JSON.
2. Điền Script Properties: `GITHUB_TOKEN`, `GITHUB_OWNER=tranquanghuy-rightsvn`, `GITHUB_REPO=techonline`,
   `GITHUB_BRANCH=master`, `NOTIFY_EMAIL`. Key OpenAI nhập trong Admin (tab Thông tin website).
3. Push master lên GitHub (chưa push) để Vercel có `/admin/`.
4. (Tuỳ chọn) xoá worktree đã gộp: `agent-ac59499ecf2fdb33f` (nhánh này còn commit chứa `gas/` — chỉ ở
   local, đừng push), `agent-a3de8af3a72dad4e6`, `agent-ae1894fadb11bfc3c`.
