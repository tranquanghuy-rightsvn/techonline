/* Kiểm thử gas/Code.js trong môi trường giả lập (GAS.md mục XI.8). Chạy: node tools/gas-api-test/test-api.js */
const { sandbox: S, repo, commits, props, cache, mails, openai, external, spreadsheet, constant } = require('./harness.js');

let failed = 0;
let passed = 0;
function check(name, fn) {
  try { fn(); passed++; console.log('  ok   ' + name); }
  catch (e) { failed++; console.log('  FAIL ' + name + ' → ' + (e && e.message)); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg || 'assertion failed'); }
function throws(fn, re) {
  try { fn(); } catch (e) { if (re && !re.test(e.message)) throw new Error('lỗi sai nội dung: ' + e.message); return e.message; }
  throw new Error('không ném lỗi');
}
const sameKeys = (obj, keys) => {
  const a = Object.keys(obj).sort().join(','), b = keys.slice().sort().join(',');
  assert(a === b, 'field lệch:\n   có:  ' + a + '\n   cần: ' + b);
};
const json = (p) => JSON.parse(repo.get(p).toString('utf8'));
const put = (p, v) => repo.set(p, Buffer.from(JSON.stringify(v, null, 1) + '\n'));
const api = (payload, method) => S.handleApi_(payload, method || 'POST');
const okReply = (obj, tokens) => ({ body: { status: 'completed', output: [{ type: 'reasoning' }, { type: 'message', content: [{ type: 'output_text', text: JSON.stringify(obj) }] }], usage: { input_tokens: 100, output_tokens: (tokens || 150) - 100, total_tokens: tokens || 150 } } });

// ---- cấu hình + dữ liệu mẫu ----
props.set('GITHUB_OWNER', 'tranquanghuy-rightsvn'); props.set('GITHUB_REPO', 'techonline');
props.set('GITHUB_BRANCH', 'master'); props.set('GITHUB_TOKEN', 'ghp_test'); props.set('NOTIFY_EMAIL', 'shop@example.com');
put('data/posts.json', [{ slug: 'camera-ai-la-gi', title: 'Camera AI là gì?', category: 'tin-cong-nghe', date: '2026-11-08', cover: '/assets/images/news-camera-ai-la-gi.jpg', description: 'Mô tả', updated_at: '2026-11-08T00:00:00Z' }]);
put('data/posts/camera-ai-la-gi.json', { slug: 'camera-ai-la-gi', title: 'Camera AI là gì?', category: 'tin-cong-nghe', date: '2026-11-08', cover: '/assets/images/news-camera-ai-la-gi.jpg', description: 'Mô tả', content_html: '<p>Gốc</p>', keywords: '', focus_keyword: '', created_at: '2026-11-08T00:00:00Z', updated_at: '2026-11-08T00:00:00Z' });
put('data/post-categories.json', [
  { slug: 'huong-dan', name: 'Hướng dẫn kỹ thuật', description: '', order: 1 },
  { slug: 'tin-cong-nghe', name: 'Tin công nghệ', description: '', order: 2 },
  { slug: 'tu-van-lua-chon', name: 'Tư vấn lựa chọn', description: '', order: 3 },
  { slug: 'tin-tuc-cong-ty', name: 'Tin tức công ty', description: '', order: 4 },
]);
put('data/products.json', [{ slug: 'camera-imou-ipc-a22', name: 'Camera Imou IPC-A22', categories: ['camera-imou'], brand: 'Imou', image: '/assets/images/a22.jpg', price: 590000, old_price: 690000, attrs: ['2MP'], badge: '', stock: 'Còn hàng', updated_at: 'x' },
  { slug: 'khoa-lien-he', name: 'Khoá vân tay X', categories: ['camera-imou'], brand: 'Kabe', image: 'https://kabegroup.vn/a.jpg', price: null, old_price: null, attrs: [], badge: '', stock: 'Liên hệ', updated_at: 'x' }]);
put('data/product-categories.json', [
  { slug: 'camera-giam-sat', name: 'Camera giám sát', parent: '', layout: 'category', image: '', description: '', order: 1 },
  { slug: 'camera-imou', name: 'Camera Imou', parent: 'camera-giam-sat', layout: 'brand', image: '', description: '', order: 2 },
]);
put('data/media-index.json', [['/assets/images/shared.jpg', 'Ảnh chung', 'Bài A']]);
repo.set('html/assets/images/shared.jpg', Buffer.from('IMG'));
repo.set('html/assets/images/news-camera-ai-la-gi.jpg', Buffer.from('IMG'));
repo.set('html/gioi-thieu/index.html', Buffer.from('<html>'));

const ownerToken = 'owner-session';
props.set('token_' + ownerToken, JSON.stringify({ email: 'owner@example.com', exp: Date.now() + 1e7 }));
const editorToken = 'editor-session';
props.set('token_' + editorToken, JSON.stringify({ email: 'ed@example.com', exp: Date.now() + 1e7 }));
S.saveUser(ownerToken, 'ed@example.com', 'editor');

const API_ACTIONS = constant('API_ACTIONS');

console.log('\n— đăng nhập & quyền —');
check('chủ script là root, user trong Sheet đúng quyền', () => {
  assert(S.whoAmI_(ownerToken).role === 'root');
  assert(S.whoAmI_(editorToken).role === 'editor');
  assert(S.whoAmI_('nope') === null);
});
check('Users có cột created_at (GAS.md VIII)', () => {
  const users = S.listUsersForAdmin(ownerToken);
  assert(users[0].email === 'ed@example.com' && /^\d{4}-/.test(users[0].created_at), JSON.stringify(users));
});
check('editor không vào được Liên hệ / Đơn hàng / Người dùng / Thông tin website / khoá AI', () => {
  ['listContacts', 'listOrders', 'listUsersForAdmin', 'getSettings', 'getAiSettings', 'listApiKeys'].forEach((fn) => throws(() => S[fn](editorToken), /Không đủ quyền/));
  throws(() => S.createApiKey(editorToken, 'x'), /Không đủ quyền/);
});
check('OTP: email lạ bị từ chối, chủ script xin được mã, sai 5 lần phải xin lại', () => {
  throws(() => S.requestOtp('la@example.com'), /không có trong danh sách/);
  S.requestOtp('owner@example.com');
  assert(mails.length === 1 && /Mã đăng nhập/.test(mails[0].subject));
  for (let i = 0; i < 5; i++) throws(() => S.verifyOtp('owner@example.com', '000000'));
  throws(() => S.verifyOtp('owner@example.com', cache.get('otp_owner@example.com')), /quá nhiều lần/);
});
check('đăng xuất thu hồi token trên server', () => {
  props.set('token_tmp', JSON.stringify({ email: 'owner@example.com', exp: Date.now() + 1e7 }));
  S.logout('tmp');
  assert(!props.has('token_tmp'));
});

console.log('\n— khoá kết nối AI —');
let key;
check('createApiKey: tiền tố antn_ + 64 hex, lưu apikey_<khoá>', () => {
  const res = S.createApiKey(ownerToken, 'Máy ở nhà');
  key = res.key;
  assert(/^antn_[0-9a-f]{64}$/.test(key), key);
  const rec = JSON.parse(props.get('apikey_' + key));
  sameKeys(rec, ['label', 'email', 'role', 'created_at', 'last_used_at', 'calls']);
  assert(rec.role === 'editor' && rec.label === 'Máy ở nhà');
});
check('khoá luôn là editor: không đọc được người dùng, đơn hàng, liên hệ, không tạo khoá', () => {
  assert(S.whoAmI_(key).role === 'editor');
  ['listUsersForAdmin', 'listOrders', 'listContacts', 'getSettings', 'listApiKeys'].forEach((fn) => throws(() => S[fn](key), /Không đủ quyền/));
  throws(() => S.createApiKey(key, 'x'), /Không đủ quyền/);
  assert(S.boot(key).me.role === null, 'khoá không được mở trang quản trị');
});
check('tối đa 10 khoá', () => {
  for (let i = 0; i < 9; i++) S.createApiKey(ownerToken, 'k' + i);
  throws(() => S.createApiKey(ownerToken, 'thừa'), /tối đa 10/);
  S.listApiKeys(ownerToken).filter((k) => /^k\d$/.test(k.label)).forEach((k) => S.revokeApiKey(ownerToken, k.key));
  assert(S.listApiKeys(ownerToken).length === 1);
});
check('khoá lạ / thiếu khoá / sai định dạng / action lạ bị từ chối rõ', () => {
  assert(/không còn hiệu lực/.test(api({ key: 'antn_' + '0'.repeat(64), action: 'ping' }).error));
  assert(/Thiếu "key"/.test(api({ action: 'post.list' }, 'GET').error));
  assert(/định dạng/.test(api({ key: 'dhk_abc', action: 'ping' }).error));
  assert(/không tồn tại/.test(api({ key, action: 'post.nuke' }).error));
  assert(/Thiếu "action"/.test(api({ key }).error));
});
check('GET không chạy được action ghi', () => {
  const r = api({ key, action: 'post.create', title: 'x' }, 'GET');
  assert(r.ok === false && /POST/.test(r.error), JSON.stringify(r));
});
check('ping trả đúng API_ACTIONS (21 action theo GAS.md XI.3)', () => {
  const r = api({ key, action: 'ping' }, 'GET');
  assert(r.ok && JSON.stringify(r.data.actions) === JSON.stringify(API_ACTIONS), JSON.stringify(r));
  const want = ['ping', 'post.list', 'post.get', 'post.create', 'post.update', 'post.delete', 'post-category.list', 'post-category.create',
    'product.list', 'product.get', 'product.create', 'product.update', 'product.delete', 'product-category.list', 'product-category.create',
    'image.upload', 'smart.guide', 'smart.get', 'smart.set', 'smart.revert', 'site.info'];
  assert(JSON.stringify(API_ACTIONS) === JSON.stringify(want), 'API_ACTIONS lệch GAS.md');
  const rec = JSON.parse(props.get('apikey_' + key));
  assert(rec.calls >= 1 && rec.last_used_at, 'không ghi lượt dùng');
});
check('tài liệu khớp API_ACTIONS (admin/api, openapi.json, llms.txt)', () => {
  const fs = require('fs');
  const root = require('path').join(__dirname, '..', '..', 'html');
  const docs = fs.readFileSync(root + '/admin/api/index.html', 'utf8');
  const spec = fs.readFileSync(root + '/admin/api/openapi.json', 'utf8');
  const llms = fs.readFileSync(root + '/llms.txt', 'utf8');
  const enumInSpec = JSON.parse(spec).components.schemas.Action.enum;
  assert(JSON.stringify(enumInSpec) === JSON.stringify(API_ACTIONS), 'openapi.json Action.enum lệch');
  API_ACTIONS.forEach((a) => {
    assert(docs.includes('<code>' + a + '</code>'), 'admin/api thiếu ' + a);
    assert(llms.includes(a), 'llms.txt thiếu ' + a);
  });
});

console.log('\n— bài viết —');
check('post-category.list / create', () => {
  const r = api({ key, action: 'post-category.list' }, 'GET');
  assert(r.ok && r.data.items.length === 4);
  const c = api({ key, action: 'post-category.create', name: 'Khuyến mãi' });
  assert(c.ok, JSON.stringify(c));
  sameKeys(c.data, ['slug', 'name', 'description', 'order']);
  assert(c.data.slug === 'khuyen-mai' && json('data/post-categories.json').length === 5);
});
check('post.create: ảnh bìa URL + ảnh trong nội dung tải về thư mục riêng, file đúng schema XII', () => {
  commits.length = 0;
  const r = api({
    key, action: 'post.create', title: 'Cách chọn camera wifi cho gia đình', category: 'tu-van-lua-chon',
    cover: 'https://anh.example/cover.png', description: 'Hướng dẫn chọn camera wifi phù hợp cho gia đình, từ độ phân giải tới lưu trữ.',
    content_html: '<p>Mở bài</p><figure><img src="https://anh.example/x.jpg" alt="x"></figure><h2>Độ phân giải</h2><p>2MP là đủ. <a href="https://anninhthainguyen.vn/camera-imou-ipc-a22">Imou A22</a></p>',
    keywords: 'camera wifi, camera gia đình', focus_keyword: 'camera wifi',
  });
  assert(r.ok, JSON.stringify(r));
  const d = r.data.record;
  sameKeys(d, ['slug', 'title', 'category', 'date', 'cover', 'description', 'content_html', 'keywords', 'focus_keyword', 'created_at', 'updated_at']);
  assert(d.slug === 'cach-chon-camera-wifi-cho-gia-dinh', d.slug);
  assert(d.cover === '/assets/img/posts/cach-chon-camera-wifi-cho-gia-dinh/cover.png', d.cover);
  assert(d.content_html.includes('src="/assets/img/posts/cach-chon-camera-wifi-cho-gia-dinh/c01.jpg"'), d.content_html);
  assert(d.content_html.includes('href="/camera-imou-ipc-a22/"'), 'link tuyệt đối về site chưa đổi thành /slug/');
  assert(/^\d{4}-\d{2}-\d{2}$/.test(d.date) && /Z$/.test(d.updated_at));
  assert(r.data.url === 'https://anninhthainguyen.vn/cach-chon-camera-wifi-cho-gia-dinh/');
  const idx = json('data/posts.json');
  sameKeys(idx[0], ['slug', 'title', 'category', 'date', 'cover', 'description', 'updated_at']);
  assert(commits.every((c) => / \[CI-Skip\]$/.test(c.message)), 'commit thiếu [CI-Skip]');
  assert(commits[commits.length - 1].path === 'data/posts.json', 'index phải ghi SAU CÙNG: ' + commits.map((c) => c.path).join(', '));
});
check('post.create: trùng slug, danh mục lạ, thiếu ảnh bìa, URL của trang có sẵn', () => {
  assert(/post\.update/.test(api({ key, action: 'post.create', title: 'Cách chọn camera wifi cho gia đình', category: 'huong-dan', cover: '/assets/images/shared.jpg', description: 'x' }).error));
  assert(/post-category\.list/.test(api({ key, action: 'post.create', title: 'Bài B', category: 'lung-tung', cover: '/assets/images/shared.jpg', description: 'x' }).error));
  assert(/cover/.test(api({ key, action: 'post.create', title: 'Bài C', category: 'huong-dan', description: 'x' }).error));
  assert(/trang có sẵn/.test(api({ key, action: 'post.create', title: 'Giới thiệu', category: 'huong-dan', cover: '/assets/images/shared.jpg', description: 'x' }).error));
  assert(/trang có sẵn/.test(api({ key, action: 'post.create', title: 'Tin tức', category: 'huong-dan', cover: '/assets/images/shared.jpg', description: 'x' }).error));
});
check('post.create dùng ảnh bìa CHUNG có sẵn (/assets/...) không chép', () => {
  const r = api({ key, action: 'post.create', title: 'Bài dùng ảnh chung', category: 'huong-dan', cover: '/assets/images/shared.jpg', description: 'Mô tả ngắn' });
  assert(r.ok && r.data.record.cover === '/assets/images/shared.jpg', JSON.stringify(r));
});
check('post.update chỉ đổi field được gửi', () => {
  const r = api({ key, action: 'post.update', slug: 'cach-chon-camera-wifi-cho-gia-dinh', description: 'Mô tả mới' });
  assert(r.ok, JSON.stringify(r));
  const d = r.data.record;
  assert(d.description === 'Mô tả mới' && d.title === 'Cách chọn camera wifi cho gia đình' && d.content_html.includes('Mở bài') && d.cover.endsWith('cover.png'), JSON.stringify(d));
  assert(/post\.create/.test(api({ key, action: 'post.update', slug: 'khong-co', title: 'x' }).error));
});
check('post.list lọc không dấu + danh mục + phân trang; post.get', () => {
  assert(api({ key, action: 'post.list', q: 'camera wifi' }, 'GET').data.items.length === 1);
  assert(api({ key, action: 'post.list', category: 'huong-dan' }, 'GET').data.items.length === 1);
  const p = api({ key, action: 'post.list', limit: 1 }, 'GET').data;
  assert(p.items.length === 1 && p.total === 3, JSON.stringify(p));
  assert(api({ key, action: 'post.get', slug: 'camera-ai-la-gi' }, 'GET').data.content_html === '<p>Gốc</p>');
});
check('savePost (Admin): slug bất biến, ảnh bìa lạ bị chặn', () => {
  throws(() => S.savePost(editorToken, { isNew: false, slug: 'khong-ton-tai', title: 'x', description: 'y', category: 'huong-dan', cover: '/assets/images/shared.jpg' }), /không tồn tại/);
  throws(() => S.savePost(editorToken, { isNew: false, slug: 'camera-ai-la-gi', title: 'x', description: 'y', category: 'huong-dan', cover: '/assets/img/posts/khac/cover.jpg' }), /Ảnh bìa/);
});

console.log('\n— sản phẩm —');
check('product-category.create: cha 1 cấp, layout hợp lệ, ảnh URL', () => {
  const r = api({ key, action: 'product-category.create', name: 'Camera Dahua', parent: 'camera-giam-sat', layout: 'brand', image: 'https://anh.example/logo.png' });
  assert(r.ok, JSON.stringify(r));
  sameKeys(r.data, ['slug', 'name', 'parent', 'layout', 'image', 'description', 'order']);
  assert(r.data.parent === 'camera-giam-sat' && /^\/assets\/img\/site\/cat-.*\.png$/.test(r.data.image), JSON.stringify(r.data));
  assert(/1 cấp/.test(api({ key, action: 'product-category.create', name: 'Cháu', parent: 'camera-imou' }).error));
  assert(/layout/.test(api({ key, action: 'product-category.create', name: 'Lạ', layout: 'grid' }).error));
});
check('product.create: ảnh tải về gNN, đủ field schema XII, index đúng field', () => {
  commits.length = 0;
  const r = api({
    key, action: 'product.create', name: 'Camera Dahua H3A 3MP', categories: ['camera-dahua'], brand: 'Dahua', sku: 'DH-H3A',
    warranty: '24 tháng', stock: 'Còn hàng', price: '890.000đ', old_price: 990000, vat: true,
    images: ['https://anh.example/1.jpg', { url: 'https://anh.example/2.png' }, '/assets/images/shared.jpg'],
    summary: ['3MP', 'Hồng ngoại 30m'], offers: 'Miễn phí lắp đặt', specs: [['Độ phân giải', '3MP'], { name: 'Ống kính', value: '3.6mm' }],
    description_html: '<p>Mô tả</p>', attrs: ['3MP', 'Wi-Fi'], badge: 'Mẫu mới', featured: '3', seo_description: 'SEO', keywords: 'dahua', focus_keyword: 'camera dahua',
  });
  assert(r.ok, JSON.stringify(r));
  const d = r.data.record;
  sameKeys(d, ['slug', 'name', 'categories', 'brand', 'sku', 'warranty', 'stock', 'price', 'old_price', 'vat', 'images', 'summary', 'offers', 'specs',
    'description_html', 'attrs', 'badge', 'featured', 'seo_description', 'keywords', 'focus_keyword', 'created_at', 'updated_at']);
  assert(d.price === 890000 && d.old_price === 990000 && d.vat === true, JSON.stringify(d));
  assert(JSON.stringify(d.images) === JSON.stringify(['/assets/img/products/camera-dahua-h3a-3mp/g01.jpg', '/assets/img/products/camera-dahua-h3a-3mp/g02.png', '/assets/images/shared.jpg']), JSON.stringify(d.images));
  assert(JSON.stringify(d.specs) === JSON.stringify([['Độ phân giải', '3MP'], ['Ống kính', '3.6mm']]));
  assert(JSON.stringify(d.offers) === '["Miễn phí lắp đặt"]');
  const idx = json('data/products.json');
  sameKeys(idx[0], ['slug', 'name', 'categories', 'brand', 'image', 'price', 'old_price', 'attrs', 'badge', 'stock', 'featured', 'updated_at']);
  assert(idx[0].featured === 3 && d.featured === 3, 'featured');
  assert(idx[0].image === d.images[0] && idx[0].slug === 'camera-dahua-h3a-3mp', 'sản phẩm mới phải lên đầu');
  assert(commits.filter((c) => c.method === 'put').pop().path === 'data/products.json', 'index ghi sau cùng');
});
check('product.create: thiếu ảnh / danh mục lạ / stock sai / trùng slug', () => {
  assert(/images/.test(api({ key, action: 'product.create', name: 'SP không ảnh', categories: ['camera-imou'] }).error));
  assert(/product-category\.list/.test(api({ key, action: 'product.create', name: 'SP X', categories: ['khong-co'], images: ['/assets/images/shared.jpg'] }).error));
  assert(/stock/.test(api({ key, action: 'product.create', name: 'SP Y', stock: 'Sắp về', categories: ['camera-imou'], images: ['/assets/images/shared.jpg'] }).error));
  assert(/product\.update/.test(api({ key, action: 'product.create', name: 'Camera Dahua H3A 3MP', categories: ['camera-imou'], images: ['/assets/images/shared.jpg'] }).error));
});
check('product.update trộn với bản cũ; price null = Liên hệ; thay images dọn gNN không dùng', () => {
  let r = api({ key, action: 'product.update', slug: 'camera-dahua-h3a-3mp', price: null });
  assert(r.ok && r.data.record.price === null && r.data.record.old_price === null && r.data.record.sku === 'DH-H3A' && r.data.record.images.length === 3, JSON.stringify(r));
  r = api({ key, action: 'product.update', slug: 'camera-dahua-h3a-3mp', images: ['/assets/img/products/camera-dahua-h3a-3mp/g02.png'] });
  assert(r.ok, JSON.stringify(r));
  assert(!repo.has('html/assets/img/products/camera-dahua-h3a-3mp/g01.jpg'), 'g01 chưa bị dọn');
  assert(repo.has('html/assets/img/products/camera-dahua-h3a-3mp/g02.png'), 'g02 bị xoá oan');
  assert(r.data.record.summary.length === 2 && r.data.record.brand === 'Dahua', 'mất field cũ');
});
check('field chỉ có từ migrate (breadcrumb, colors, reviews) được giữ khi sửa; đổi danh mục chính thì bỏ breadcrumb', () => {
  const p0 = 'data/products/camera-imou-ipc-a22.json';
  put(p0, { slug: 'camera-imou-ipc-a22', name: 'Camera Imou IPC-A22', categories: ['camera-imou'], brand: 'Imou', sku: 'A22', warranty: '', stock: 'Còn hàng', price: 590000, old_price: 690000, vat: false,
    images: ['/assets/images/a22.jpg'], summary: [], offers: [], specs: [], description_html: '', attrs: ['2MP'], badge: '', featured: 2, seo_description: '', keywords: '', focus_keyword: '',
    breadcrumb: [['Camera', '/camera-giam-sat/']], colors: [{ name: 'Trắng', hex: '#fff', image: '' }], reviews: [{ name: 'A', time: '2026-01-01T10:00', stars: 5, text: 'Tốt' }], created_at: 'x', updated_at: 'x' });
  let r = api({ key, action: 'product.update', slug: 'camera-imou-ipc-a22', price: 580000 });
  assert(r.ok && r.data.record.breadcrumb && r.data.record.colors.length === 1 && r.data.record.reviews.length === 1 && r.data.record.featured === 2, JSON.stringify(r).slice(0, 300));
  const keys = Object.keys(r.data.record);
  assert(keys.indexOf('breadcrumb') > keys.indexOf('focus_keyword') && keys.indexOf('updated_at') === keys.length - 1, 'thứ tự field lệch XII');
  r = api({ key, action: 'product.update', slug: 'camera-imou-ipc-a22', categories: ['camera-giam-sat', 'camera-imou'] });
  assert(r.ok && !('breadcrumb' in r.data.record) && r.data.record.reviews.length === 1, 'breadcrumb chưa bỏ');
});
check('product.list lọc tên/thương hiệu/danh mục; product.get', () => {
  assert(api({ key, action: 'product.list', q: 'dahua h3a' }, 'GET').data.items.length === 1);
  assert(api({ key, action: 'product.list', brand: 'imou' }, 'GET').data.items.length === 1);
  assert(api({ key, action: 'product.list', category: 'camera-imou' }, 'GET').data.items.length === 2);
  assert(api({ key, action: 'product.get', slug: 'camera-dahua-h3a-3mp' }, 'GET').data.brand === 'Dahua');
});

console.log('\n— ảnh —');
check('image.upload: base64 có tiền tố data:, URL, đường dẫn có sẵn', () => {
  const data = 'data:image/png;base64,' + Buffer.from('PNG').toString('base64');
  let r = api({ key, action: 'image.upload', target: 'post-content', slug: 'cach-chon-camera-wifi-cho-gia-dinh', data, filename: 'a.png' });
  assert(r.ok && r.data.path === '/assets/img/posts/cach-chon-camera-wifi-cho-gia-dinh/c02.png', JSON.stringify(r));
  assert(r.data.url === 'https://anninhthainguyen.vn' + r.data.path);
  r = api({ key, action: 'image.upload', target: 'product-content', slug: 'camera-dahua-h3a-3mp', url: 'https://anh.example/d.webp' });
  assert(r.ok && r.data.path === '/assets/img/products/camera-dahua-h3a-3mp/c01.webp', JSON.stringify(r));
});
check('image.upload: ảnh riêng của bài khác được CHÉP sang bài này', () => {
  const r = api({ key, action: 'image.upload', target: 'post-content', slug: 'camera-ai-la-gi', url: '/assets/img/posts/cach-chon-camera-wifi-cho-gia-dinh/c01.jpg' });
  assert(r.ok && r.data.path === '/assets/img/posts/camera-ai-la-gi/c01.jpg', JSON.stringify(r));
});
check('image.upload báo lỗi rõ: thiếu nguồn, target sai, tải không được, quá 5MB', () => {
  assert(/url/.test(api({ key, action: 'image.upload', target: 'post-content', slug: 'a-b' }).error));
  assert(/target/.test(api({ key, action: 'image.upload', target: 'video', slug: 'a-b', url: 'https://x/y.jpg' }).error));
  assert(/Không tải được ảnh/.test(api({ key, action: 'image.upload', target: 'post-content', slug: 'a-b', url: 'https://anh.example/missing.jpg' }).error));
  assert(/5MB/.test(api({ key, action: 'image.upload', target: 'post-content', slug: 'a-b', data: 'A'.repeat(7200000) }).error));
});

console.log('\n— Smart content qua API —');
check('smart.guide đọc được bằng GET qua doGet', () => {
  const out = S.doGet({ parameter: { action: 'smart.guide', key } });
  assert(out.json.ok && out.json.data.rules.length > 5 && out.json.data.tokens['--smc-primary'].includes('#0064bd'), JSON.stringify(out.json).slice(0, 200));
});
check('smart.get: nội dung gốc + ảnh được dùng', () => {
  const r = api({ key, action: 'smart.get', kind: 'post', slug: 'cach-chon-camera-wifi-cho-gia-dinh' }, 'GET');
  assert(r.ok && r.data.source_html.includes('Mở bài') && r.data.smart === null, JSON.stringify(r));
  assert(r.data.images.map((i) => i.src).join() === '/assets/img/posts/cach-chon-camera-wifi-cho-gia-dinh/cover.png,/assets/img/posts/cach-chon-camera-wifi-cho-gia-dinh/c01.jpg', JSON.stringify(r.data.images));
});
check('smart.set: lọc script/on*/style, giữ nội dung gốc, cờ smart:true ở index', () => {
  const r = api({ key, action: 'smart.set', kind: 'post', slug: 'cach-chon-camera-wifi-cho-gia-dinh', html: '<h2 onclick="x()" style="a">Đẹp</h2><script>1</script><form><input></form>', css: '.smc-h{color:red}</style>', note: 'Lần 1' });
  assert(r.ok && r.data.versions === 1, JSON.stringify(r));
  const d = api({ key, action: 'post.get', slug: 'cach-chon-camera-wifi-cho-gia-dinh' }, 'GET').data;
  assert(d.smart.html === '<h2>Đẹp</h2>' && !d.smart.css.includes('</style') && d.content_html.includes('Mở bài'), JSON.stringify(d.smart));
  sameKeys(d.smart, ['html', 'css', 'mode', 'instructions', 'versions']);
  sameKeys(d.smart.versions[0], ['id', 'time', 'note', 'html', 'css']);
  assert(json('data/posts.json').find((p) => p.slug === d.slug).smart === true, 'thiếu cờ smart ở posts.json');
});
check('smart.set nhiều lần giữ 5 phiên bản; post.update không làm mất smart', () => {
  for (let i = 2; i <= 7; i++) api({ key, action: 'smart.set', kind: 'post', slug: 'cach-chon-camera-wifi-cho-gia-dinh', html: '<h2>Lần ' + i + '</h2>' });
  const u = api({ key, action: 'post.update', slug: 'cach-chon-camera-wifi-cho-gia-dinh', title: 'Cách chọn camera wifi cho gia đình 2026' });
  assert(u.ok && u.data.record.smart.html === '<h2>Lần 7</h2>' && u.data.record.smart.versions.length === 5, JSON.stringify(u.data.record.smart).slice(0, 200));
});
check('smart.set sản phẩm + ảnh chỉ còn dùng trong bản thiết kế không bị dọn', () => {
  api({ key, action: 'product.update', slug: 'camera-dahua-h3a-3mp', images: ['/assets/img/products/camera-dahua-h3a-3mp/g02.png', 'https://anh.example/3.jpg'] });
  api({ key, action: 'smart.set', kind: 'product', slug: 'camera-dahua-h3a-3mp', html: '<img src="/assets/img/products/camera-dahua-h3a-3mp/g03.jpg" alt="b">' });
  const u = api({ key, action: 'product.update', slug: 'camera-dahua-h3a-3mp', images: ['/assets/img/products/camera-dahua-h3a-3mp/g02.png'] });
  assert(u.ok && repo.has('html/assets/img/products/camera-dahua-h3a-3mp/g03.jpg'), 'g03 bị xoá dù bản thiết kế còn dùng');
  assert(json('data/products.json')[0].smart === true);
});
check('smart.revert: bỏ Smart content, xoá cờ ở index', () => {
  const r = api({ key, action: 'smart.revert', kind: 'product', slug: 'camera-dahua-h3a-3mp' });
  assert(r.ok, JSON.stringify(r));
  const d = api({ key, action: 'product.get', slug: 'camera-dahua-h3a-3mp' }, 'GET').data;
  assert(!('smart' in d) && !('smart' in json('data/products.json')[0]), 'còn smart');
});
check('smart.* báo lỗi rõ', () => {
  assert(/kind/.test(api({ key, action: 'smart.get', kind: 'news', slug: 'a' }).error));
  assert(/html/.test(api({ key, action: 'smart.set', kind: 'post', slug: 'camera-ai-la-gi' }).error));
  assert(/Không tìm thấy/.test(api({ key, action: 'smart.get', kind: 'product', slug: 'khong-co' }).error));
  assert(/POST/.test(S.doGet({ parameter: { action: 'smart.set', key } }).json.error));
});
check('site.info: thông tin + danh mục + quy tắc viết bài', () => {
  put('data/settings.json', { brand: 'An Ninh Thái Nguyên', hotline: '0913286293', default_offers: ['Lắp đặt miễn phí'] });
  const r = api({ key, action: 'site.info' }, 'GET');
  assert(r.ok && r.data.settings.hotline === '0913286293' && r.data.writing_rules.length >= 5 && r.data.product_categories.length === 3, JSON.stringify(r).slice(0, 300));
});

console.log('\n— khoá ghi (advisory, GAS.md XI.5) —');
check('đang có tiến trình ghi khác thì chờ rồi báo bận; đọc vẫn chạy', () => {
  cache.set('api_write_lock', '1');
  const r = api({ key, action: 'post-category.create', name: 'Bận' });
  assert(r.ok === false && /đang ghi/.test(r.error), JSON.stringify(r));
  assert(api({ key, action: 'post.list' }, 'GET').ok, 'đọc bị chặn');
  cache.delete('api_write_lock');
  assert(api({ key, action: 'post-category.create', name: 'Hết bận' }).ok);
  assert(!cache.has('api_write_lock'), 'khoá không được nhả');
});

console.log('\n— xoá —');
check('post.delete: xoá file chi tiết + thư mục ảnh riêng + gỡ index', () => {
  const r = api({ key, action: 'post.delete', slug: 'cach-chon-camera-wifi-cho-gia-dinh' });
  assert(r.ok && r.data.remaining === 2, JSON.stringify(r));
  assert(!repo.has('data/posts/cach-chon-camera-wifi-cho-gia-dinh.json'));
  assert([...repo.keys()].filter((k) => k.includes('img/posts/cach-chon-camera-wifi-cho-gia-dinh/')).length === 0, 'ảnh còn sót');
  assert(repo.has('html/assets/images/shared.jpg'), 'xoá nhầm ảnh chung');
});
check('xoá danh mục còn nội dung bị chặn', () => {
  throws(() => S.deleteCategory(editorToken, 'post', 'huong-dan'), /còn 1 bài viết/);
  throws(() => S.deleteCategory(editorToken, 'product', 'camera-giam-sat'), /danh mục con/);
  throws(() => S.deleteCategory(editorToken, 'product', 'camera-imou'), /sản phẩm/);
  assert(S.deleteCategory(editorToken, 'post', 'khuyen-mai').cats.length === 5);
});
check('product.delete: dọn ảnh riêng, giữ ảnh chung', () => {
  const r = api({ key, action: 'product.delete', slug: 'camera-dahua-h3a-3mp' });
  assert(r.ok && r.data.remaining === 2, JSON.stringify(r));
  assert([...repo.keys()].filter((k) => k.includes('img/products/camera-dahua-h3a-3mp/')).length === 0, 'ảnh còn sót');
});

check('danh mục bài viết mới: có trang riêng /<slug>/ nên không được trùng URL đã dùng', () => {
  throws(() => S.saveCategory(ownerToken, 'post', { isNew: true, name: 'Tin tức', slug: 'tin-tuc' }), /đã được dùng|có sẵn/);
  const someProduct = JSON.parse(repo.get('data/products.json').toString('utf8'))[0];
  if (someProduct) throws(() => S.saveCategory(ownerToken, 'post', { isNew: true, name: 'X', slug: someProduct.slug }), /đã được dùng/);
});
check('listOpenAiModels: chỉ model chữ, bỏ bản có ngày / -pro / âm thanh / ảnh / embedding', () => {
  const had = props.get('OPENAI_API_KEY');
  props.set('OPENAI_API_KEY', 'sk-test');
  try {
    const ids = S.listOpenAiModels(ownerToken);
    assert(JSON.stringify(ids) === JSON.stringify(['gpt-5', 'gpt-5-mini', 'o4-mini']), JSON.stringify(ids));
  } finally {
    if (had) props.set('OPENAI_API_KEY', had); else props.delete('OPENAI_API_KEY');
  }
});

console.log('\n— form công khai: liên hệ + đơn hàng —');
check('doPost contact: lưu Sheet Contacts đúng cột, gửi mail, rate-limit 60 giây', () => {
  mails.length = 0;
  let out = S.doPost({ postData: { contents: JSON.stringify({ action: 'contact', name: 'An', phone: '0912 345 678', email: 'a@x.vn', message: 'Tư vấn camera', page: '/lien-he/' }) } });
  assert(out.json.ok, JSON.stringify(out.json));
  const sh = spreadsheet.sheets.find((s) => s.getName() === 'Contacts');
  assert(JSON.stringify(sh._rows[0]) === JSON.stringify(constant('CONTACT_HEADERS')) && sh._rows[1][3] === '0912345678' && sh._rows[1][7] === 'Mới', JSON.stringify(sh._rows));
  assert(mails.length === 1 && mails[0].to === 'shop@example.com' && mails[0].replyTo === 'a@x.vn');
  out = S.doPost({ postData: { contents: JSON.stringify({ action: 'contact', phone: '0912345678' }) } });
  assert(!out.json.ok && /1 phút/.test(out.json.error), 'thiếu rate-limit');
  assert(!S.doPost({ postData: { contents: JSON.stringify({ action: 'contact', phone: '12' }) } }).json.ok, 'SĐT sai vẫn nhận');
});
check('mail liên hệ: mẫu email.html, logo cid, escape dữ liệu khách, không link trang lạ', () => {
  mails.length = 0;
  const out = S.doPost({ postData: { contents: JSON.stringify({ action: 'contact', name: '<img src=x onerror=alert(1)>', phone: '0933 111 222', email: 'b@y.vn', message: 'Dòng 1\nDòng 2', page: '@evil.com/x' }) } });
  assert(out.json.ok, JSON.stringify(out.json));
  const m = mails[0];
  assert(m && m.inlineImages && m.inlineImages.logo && m.htmlBody.includes('src="cid:logo"'), 'thiếu logo cid');
  assert(m.name === 'An Ninh Thái Nguyên', m.name);
  assert(!m.htmlBody.includes('<img src=x') && m.htmlBody.includes('&lt;img src=x'), 'không escape tên khách');
  assert(!/href="[^"]*evil\.com/.test(m.htmlBody), 'tạo link tới trang lạ');
  assert(m.htmlBody.includes('href="tel:0933111222"') && m.htmlBody.includes('href="mailto:b@y.vn"'));
  assert(m.htmlBody.includes('Dòng 1\nDòng 2') && m.htmlBody.includes('LIÊN HỆ MỚI'));
  assert(/Nội dung:\nDòng 1/.test(m.body) && !/<\?/.test(m.htmlBody), 'bản chữ thường / scriptlet sót');
});
check('honeypot _hp: trả ok nhưng không lưu', () => {
  const sh = spreadsheet.sheets.find((s) => s.getName() === 'Contacts');
  const n = sh._rows.length;
  assert(S.doPost({ postData: { contents: JSON.stringify({ action: 'contact', phone: '0988888888', _hp: 'bot' }) } }).json.ok);
  assert(sh._rows.length === n);
});
check('doPost order: server tính lại tổng theo products.json, "Liên hệ" = 0, giữ mã đơn của trang', () => {
  const out = S.doPost({ postData: { contents: JSON.stringify({
    action: 'order', id: 'KT47', total: 1, name: 'Bình', phone: '0987654321', address: 'Thái Nguyên', payment: 'bank',
    items: [{ id: '/camera-imou-ipc-a22', name: 'gì đó', price: 1, qty: 2 }, { slug: 'khoa-lien-he', qty: 1, price: 999 }],
  }) } });
  assert(out.json.ok && out.json.id === 'KT47' && out.json.total === 1160000, JSON.stringify(out.json));
  const sh = spreadsheet.sheets.find((s) => s.getName() === 'Orders');
  const header = sh._rows[0];
  assert(JSON.stringify(header) === JSON.stringify(constant('ORDER_HEADERS')), JSON.stringify(header));
  const row = sh._rows[1];
  const items = JSON.parse(row[header.indexOf('items')]);
  assert(items[0].name === 'Camera Imou IPC-A22' && items[0].price === 580000 && items[1].price === 0, JSON.stringify(items));
  sameKeys(items[0], ['slug', 'name', 'price', 'qty']);
  assert(row[header.indexOf('payment')] === 'bank' && row[header.indexOf('status')] === 'Mới');
});
check('mail đơn hàng: mã đơn, bảng sản phẩm, tổng tiền, nhãn chuyển khoản', () => {
  const m = mails[mails.length - 1];
  assert(m && /Đơn hàng mới KT47/.test(m.subject), m && m.subject);
  assert(m.htmlBody.includes('KT47') && m.htmlBody.includes('Camera Imou IPC-A22') && m.htmlBody.includes('1.160.000đ'), 'thiếu nội dung đơn');
  assert(m.htmlBody.includes('CHUYỂN KHOẢN') && m.htmlBody.includes('Liên hệ báo giá'), 'thiếu nhãn / dòng Liên hệ');
  assert(/Tạm tính: 1\.160\.000đ/.test(m.body), m.body);
});
check('order: trùng mã -> server lặng lẽ đổi mã khác; giỏ trống / thiếu địa chỉ bị chặn', () => {
  const dup = S.doPost({ postData: { contents: JSON.stringify({ action: 'order', id: 'KT47', name: 'C', phone: '0977777777', address: 'x', items: [{ slug: 'camera-imou-ipc-a22' }] }) } });
  assert(dup.json.ok && /^[A-HJ-NP-Z]{2}[0-9]{2}$/.test(dup.json.id) && dup.json.id !== 'KT47', JSON.stringify(dup.json));
  S.deleteOrder(ownerToken, dup.json.id);
  assert(/trống/.test(S.doPost({ postData: { contents: JSON.stringify({ action: 'order', name: 'C', phone: '0966666666', address: 'x', items: [] }) } }).json.error));
  assert(/địa chỉ/.test(S.doPost({ postData: { contents: JSON.stringify({ action: 'order', name: 'C', phone: '0966666666', items: [{ slug: 'a' }] }) } }).json.error));
});
check('mã đơn server tự sinh: 2 chữ (không I/O) + 2 số', () => {
  for (let i = 0; i < 300; i++) {
    const c = S.randomOrderCode_();
    assert(/^[A-HJ-NP-Z]{2}[0-9]{2}$/.test(c), c);
  }
});
check('Admin: đơn hàng đổi trạng thái/ghi chú, liên hệ đổi trạng thái', () => {
  const orders = S.listOrders(ownerToken);
  assert(orders.length === 1 && Array.isArray(orders[0].items) && !('items_text' in orders[0]));
  S.updateOrder(ownerToken, 'KT47', { status: 'Đã xác nhận', admin_note: 'gọi lại' });
  throws(() => S.updateOrder(ownerToken, 'KT47', { status: 'Bừa' }), /không hợp lệ/);
  assert(S.listOrders(ownerToken)[0].status === 'Đã xác nhận');
  const c = S.listContacts(ownerToken)[0];
  S.updateContactStatus(ownerToken, c.id, 'Đã xử lý');
  assert(S.listContacts(ownerToken)[0].status === 'Đã xử lý');
});
check('doPost không phải form -> API', () => {
  const out = S.doPost({ postData: { contents: JSON.stringify({ key, action: 'ping' }) } });
  assert(out.json.ok === true && out.json.action === 'ping', JSON.stringify(out.json));
  assert(S.doPost({ postData: { contents: 'không phải json' } }).json.ok === false);
});

console.log('\n— Thông tin website —');
check('saveSettings: đúng field schema XII, hero ≤ 10, link/ảnh được kiểm', () => {
  const s = S.saveSettings(ownerToken, { brand: 'ANTN', hotline: '0913', email: 'a@b.vn', logo: '/assets/img/site/logo.png',
    hero: Array.from({ length: 12 }, (_, i) => ({ image: '/assets/images/h' + i + '.jpg', link: '/camera-giam-sat/' })),
    promo_tiles: [{ image: '/assets/images/p.jpg', link: '' }], default_offers: ['Lắp miễn phí', ''], junk: 'x' });
  sameKeys(s, ['brand', 'hotline', 'zalo', 'email', 'website', 'address', 'tax_code', 'footer_text', 'copyright', 'home_title', 'home_description',
    'logo', 'favicon', 'og_image', 'hero', 'promo_tiles', 'default_offers']);
  assert(s.hero.length === 10 && s.default_offers.length === 1, JSON.stringify(s).slice(0, 200));
  throws(() => S.saveSettings(ownerToken, { hero: [{ image: 'javascript:x' }] }), /ảnh/);
});

console.log('\n— AI trong Admin (OpenAI Responses API) —');
check('chưa có key: báo rõ, không gọi OpenAI', () => {
  const n = openai.calls.length;
  throws(() => S.smartGenerate(editorToken, { kind: 'post', title: 'A', content_html: '<p>x</p>' }), /key OpenAI/);
  assert(openai.calls.length === n);
  assert(S.getAiQuota(editorToken).has_key === false);
});
check('saveAiSettings: gọi thử rồi mới lưu; key sai không lưu; hiện bản che', () => {
  openai.replies.push({ code: 401, body: { error: { message: 'Incorrect API key' } } });
  throws(() => S.saveAiSettings(ownerToken, { key: 'sk-proj-' + 'a'.repeat(30) }), /không hợp lệ/);
  assert(!props.has('OPENAI_API_KEY'));
  throws(() => S.saveAiSettings(ownerToken, { key: 'abc' }), /sk-/);
  openai.replies.push(okReply({}, 20));
  const a = S.saveAiSettings(ownerToken, { key: 'sk-proj-' + 'b'.repeat(30), model: '' });
  assert(props.get('OPENAI_API_KEY').startsWith('sk-proj-b') && a.key_masked === 'sk-proj…bbbb' && a.model === constant('OPENAI_DEFAULT_MODEL'), JSON.stringify(a));
  const call = openai.calls[openai.calls.length - 1];
  assert(call.headers.Authorization === 'Bearer sk-proj-' + 'b'.repeat(30) && call.body.model === constant('OPENAI_DEFAULT_MODEL'));
  assert(!JSON.stringify(S.getAiSettings(ownerToken)).includes('b'.repeat(20)), 'lộ key');
});
check('smartGenerate: Responses API + Structured Outputs strict, lọc HTML, gỡ link bịa, cộng token theo tháng', () => {
  const before = JSON.parse(props.get('OPENAI_USAGE') || '{}');
  openai.replies.push(okReply({ html: '<h2>Ưu điểm</h2><p onclick="x">Xem <a href="/khong-ton-tai/">trang lạ</a> và <a href="/camera-imou-ipc-a22/">Imou</a></p><script>x</script>', css: '.smc-a{}', short_desc: 'Mô tả mới' }, 1000));
  const res = S.smartGenerate(editorToken, { kind: 'post', title: 'Camera Imou A22 có tốt không', keyword: 'camera imou', content_html: '<p>Gốc</p>', images: [{ src: '/assets/images/shared.jpg', w: 800, h: 600 }] });
  const call = openai.calls[openai.calls.length - 1];
  assert(call.url === 'https://api.openai.com/v1/responses');
  assert(call.body.text.format.type === 'json_schema' && call.body.text.format.strict === true, JSON.stringify(call.body.text));
  assert(call.body.text.format.schema.additionalProperties === false && call.body.text.format.schema.required.length === 3);
  assert(call.body.reasoning && call.body.input[0].content[0].type === 'input_text' && call.body.input[0].content[0].text.includes('<material>'));
  assert(call.body.instructions.includes('anninhthainguyen.vn') && call.body.input[0].content[0].text.includes('/camera-imou-ipc-a22/'), 'thiếu link nội bộ ứng viên');
  assert(res.html === '<h2>Ưu điểm</h2><p>Xem trang lạ và <a href="/camera-imou-ipc-a22/">Imou</a></p>', res.html);
  assert(res.short_desc === 'Mô tả mới' && /1\.000 token/.test(res.ai_note), res.ai_note);
  const usage = JSON.parse(props.get('OPENAI_USAGE'));
  const m = Object.keys(usage).pop();
  assert(/^\d{4}-\d{2}$/.test(m) && usage[m].total === ((before[m] || {}).total || 0) + 1000, JSON.stringify(usage));
  assert(S.getAiQuota(editorToken).tokens === usage[m].total);
});
check('smartGenerate: lỗi 429 / bị cắt / từ chối báo tiếng Việt rõ ràng', () => {
  openai.replies.push({ code: 429, body: { error: { message: 'quota' } } });
  throws(() => S.smartGenerate(editorToken, { kind: 'post', title: 'A', content_html: '<p>x</p>' }), /giới hạn/);
  openai.replies.push({ body: { status: 'incomplete', incomplete_details: { reason: 'max_output_tokens' }, output: [], usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 } } });
  throws(() => S.smartGenerate(editorToken, { kind: 'post', title: 'A', content_html: '<p>x</p>' }), /bị cắt/);
  openai.replies.push({ body: { status: 'completed', output: [{ type: 'message', content: [{ type: 'refusal', refusal: 'no' }] }] } });
  throws(() => S.smartGenerate(editorToken, { kind: 'post', title: 'A', content_html: '<p>x</p>' }), /từ chối/);
});
check('smartRevise: find sai thì thử lại 1 lần rồi áp', () => {
  openai.replies.push(okReply({ summary: 'x', edits: [{ target: 'html', find: 'KHÔNG CÓ', replace: 'y' }] }));
  openai.replies.push(okReply({ summary: 'Đổi tiêu đề', edits: [{ target: 'html', find: 'Ưu điểm</h2>', replace: 'Ưu điểm nổi bật</h2>' }, { target: 'css', find: '', replace: '.smc-x{}' }] }));
  const res = S.smartRevise(editorToken, { kind: 'product', html: '<h2>Ưu điểm</h2><p>a</p>', css: '.smc-a{}', comments: [{ note: 'đổi tiêu đề' }] });
  assert(res.html.includes('Ưu điểm nổi bật') && res.css.includes('.smc-x{}') && res.summary === 'Đổi tiêu đề', JSON.stringify(res));
  assert(openai.calls[openai.calls.length - 1].body.input[0].content[0].text.includes('previous_attempt_failed'));
});
check('smartOutline: chỉ bài viết, ảnh gửi dạng data URL, mỗi ảnh 1 lần', () => {
  throws(() => S.smartOutline(editorToken, { kind: 'product', title: 'x' }), /chỉ dùng cho bài viết/);
  openai.replies.push(okReply({ angle: 'a', description: 'd', sections: [
    { kind: 'intro', heading: 'Mở bài', words: 80, points: ['x'], subheadings: [], images: [1, 9] },
    { kind: 'body', heading: 'Chọn camera', words: 300, points: [], subheadings: [], images: [1, 2] },
    { kind: 'conclusion', heading: 'Kết luận', words: 80, points: [], subheadings: [], images: [] }] }));
  const o = S.smartOutline(editorToken, { title: 'Chọn camera wifi', keyword: 'camera wifi', words: 1400,
    images: [{ n: 1, src: '/assets/images/shared.jpg', label: 'A' }, { n: 2, src: '/assets/images/news-camera-ai-la-gi.jpg', label: 'B' }] });
  assert(JSON.stringify(o.sections.map((s) => s.images)) === '[[1],[2],[]]', JSON.stringify(o.sections));
  const content = openai.calls[openai.calls.length - 1].body.input[0].content;
  assert(content.filter((p) => p.type === 'input_image' && /^data:image\/jpeg;base64,/.test(p.image_url)).length === 2, JSON.stringify(content).slice(0, 300));
  const sch = openai.calls[openai.calls.length - 1].body.text.format.schema;
  assert(sch.properties.sections.items.additionalProperties === false, 'schema lồng chưa strict');
});
check('smartWriteSection: H1 thành H2, chỉ link nội bộ hợp lệ', () => {
  openai.replies.push(okReply({ html: '<h1>Chọn camera</h1><p onclick="z">t</p><img data-smc-img="2" alt="b">' }));
  const r = S.smartWriteSection(editorToken, { title: 'Camera', outline: [{ kind: 'intro', words: 80 }, { kind: 'body', heading: 'Chọn camera', words: 200 }], index: 1, prev: 'abc',
    images: [], links: [{ title: 'Imou A22', url: '/camera-imou-ipc-a22/' }, { title: 'Lạ', url: 'http://evil/' }] });
  assert(r.html === '<h2>Chọn camera</h2><p>t</p><img data-smc-img="2" alt="b">', r.html);
  const sys = openai.calls[openai.calls.length - 1].body.instructions;
  assert(sys.includes('/camera-imou-ipc-a22/') && !sys.includes('evil'));
});
check('ước lượng token + đổi model gọi thử lại', () => {
  const e = S.smartEstimate(editorToken, { kind: 'post', material: 6000 });
  assert(e.has_key && e.tokens > 0 && e.text, JSON.stringify(e));
  assert(S.writerEstimate(editorToken, { words: 1400 }).tokens > 0);
  openai.replies.push({ code: 404, body: { error: { message: 'model not found' } } });
  throws(() => S.saveAiSettings(ownerToken, { model: 'gpt-x' }), /model gpt-x/);
  assert(!props.has('OPENAI_MODEL'));
  throws(() => S.saveAiSettings(editorToken, { model: 'gpt-5' }), /Không đủ quyền/);
});

console.log('\n— thu hồi khoá —');
check('thu hồi là ngừng dùng được ngay', () => {
  S.revokeApiKey(ownerToken, key);
  assert(api({ key, action: 'ping' }).ok === false);
  assert(!props.has('apikey_' + key));
});
check('mọi commit của CMS đều có [CI-Skip]', () => {
  assert(commits.length > 0 && commits.every((c) => / \[CI-Skip\]$/.test(c.message)), commits.filter((c) => !/CI-Skip/.test(c.message)).map((c) => c.message).join('; '));
});

console.log(failed ? '\n' + failed + ' kiểm tra thất bại, ' + passed + ' đạt' : '\nTất cả ' + passed + ' kiểm tra đã qua');
process.exit(failed ? 1 : 0);
