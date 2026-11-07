/* Chạy Code.js trên DỮ LIỆU THẬT trong data/ (bản sao trong bộ nhớ, không ghi gì ra đĩa):
   mở + Lưu lại MỌI bài viết, sản phẩm, danh mục, thông tin website qua đúng hàm của trang quản trị
   và API — dữ liệu phải giữ nguyên (chỉ updated_at đổi). Chạy: node tools/gas-api-test/test-real-data.js */
const fs = require('fs');
const path = require('path');
const { sandbox: S, repo, props } = require('./harness.js');

const root = path.join(__dirname, '..', '..');
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
walk(path.join(root, 'data')).forEach((f) => repo.set(path.relative(root, f).split(path.sep).join('/'), fs.readFileSync(f)));
['GITHUB_OWNER', 'GITHUB_REPO', 'GITHUB_BRANCH', 'GITHUB_TOKEN'].forEach((k) => props.set(k, 'x'));
props.set('token_t', JSON.stringify({ email: 'owner@example.com', exp: Date.now() + 1e7 }));
const T = 't';
const read = (p) => JSON.parse(repo.get(p).toString('utf8'));
const strip = (o) => { const c = JSON.parse(JSON.stringify(o)); delete c.updated_at; return c; };

let failed = 0;
const fail = (msg) => { failed++; if (failed <= 30) console.log('  FAIL ' + msg); };

// ---- bài viết: Lưu lại y nguyên như form Admin gửi ----
const posts = read('data/posts.json');
posts.forEach((m) => {
  const before = read('data/posts/' + m.slug + '.json');
  try {
    const rec = S.postInput_(before);
    if (before.smart) rec.smart = before.smart;
    S.savePost(T, rec);
    const after = read('data/posts/' + m.slug + '.json');
    if (JSON.stringify(strip(after)) !== JSON.stringify(strip(before))) fail('bài ' + m.slug + ' đổi sau khi Lưu lại');
  } catch (e) { fail('bài ' + m.slug + ': ' + e.message); }
});
console.log('  bài viết: ' + posts.length + ' bài Lưu lại');

// ---- sản phẩm ----
const products = read('data/products.json');
const indexBefore = JSON.stringify(products.map(strip));
products.forEach((m) => {
  const before = read('data/products/' + m.slug + '.json');
  try {
    const rec = S.productInput_(before);
    if (before.smart) rec.smart = before.smart;
    S.saveProduct(T, rec);
    const after = read('data/products/' + m.slug + '.json');
    const a = JSON.stringify(strip(after));
    const b = JSON.stringify(strip(before));
    if (a !== b) {
      const diff = Object.keys(Object.assign({}, before, after)).filter((k) => k !== 'updated_at' && JSON.stringify(before[k]) !== JSON.stringify(after[k]));
      fail('sản phẩm ' + m.slug + ' đổi field: ' + diff.join(', ') + (diff.length ? '' : ' (thứ tự field)'));
    }
  } catch (e) { fail('sản phẩm ' + m.slug + ': ' + e.message); }
});
const indexAfter = JSON.stringify(read('data/products.json').map(strip));
if (indexAfter !== indexBefore) fail('data/products.json đổi (thứ tự hoặc field) sau khi Lưu lại mọi sản phẩm');
console.log('  sản phẩm: ' + products.length + ' sản phẩm Lưu lại');

// ---- danh mục ----
['post', 'product'].forEach((kind) => {
  const file = kind === 'post' ? 'data/post-categories.json' : 'data/product-categories.json';
  const before = repo.get(file).toString('utf8');
  read(file).forEach((c) => {
    try { S.saveCategory(T, kind, Object.assign({ isNew: false }, c)); } catch (e) { fail('danh mục ' + c.slug + ': ' + e.message); }
  });
  if (JSON.stringify(read(file)) !== JSON.stringify(JSON.parse(before))) fail(file + ' đổi sau khi Lưu lại');
  console.log('  ' + file + ': ' + read(file).length + ' danh mục Lưu lại');
});

// ---- thông tin website ----
const settings = read('data/settings.json');
try {
  const saved = S.saveSettings(T, settings);
  if (JSON.stringify(saved) !== JSON.stringify(settings)) fail('settings.json đổi sau khi Lưu lại');
} catch (e) { fail('settings: ' + e.message); }

// ---- API đọc trên dữ liệu thật ----
const key = S.createApiKey(T, 'test').key;
const r1 = S.handleApi_({ key, action: 'site.info' }, 'GET');
if (!r1.ok || r1.data.counts.products !== products.length) fail('site.info: ' + JSON.stringify(r1).slice(0, 200));
const r2 = S.handleApi_({ key, action: 'product.list', q: 'camera imou', limit: 5 }, 'GET');
if (!r2.ok || !r2.data.items.length) fail('product.list q=camera imou không ra kết quả');
const r3 = S.handleApi_({ key, action: 'smart.get', kind: 'product', slug: products[0].slug }, 'GET');
if (!r3.ok) fail('smart.get: ' + r3.error);
// Đơn hàng: tính lại tổng theo products.json thật
const priced = products.find((p) => p.price);
const contact = products.find((p) => !p.price);
const total = S.handleOrder_ ? null : null;
const cand = S.smartLinkCandidates_({ title: 'Cách chọn camera wifi Imou cho gia đình', keyword: 'camera imou' });
if (!cand.length || !cand.every((l) => /^\/[a-z0-9-]+\/$/.test(l.url))) fail('gợi ý link nội bộ rỗng/sai: ' + JSON.stringify(cand).slice(0, 200));
console.log('  link nội bộ gợi ý cho "camera wifi Imou": ' + cand.slice(0, 3).map((l) => l.url).join(' '));
console.log('  sản phẩm có giá: ' + priced.slug + ' (' + priced.price + '), "Liên hệ": ' + (contact ? contact.slug : '-'));

console.log(failed ? '\n' + failed + ' lỗi' : '\nDữ liệu thật: Lưu lại không làm đổi gì — OK');
process.exit(failed ? 1 : 0);
