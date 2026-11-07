# -*- coding: utf-8 -*-
"""Generate the static info pages (policies, recruitment, account, search) and the
search index, using /chinh-sach-giao-hang/ as the page shell.

Run from the project root:
    python3 scripts/site/build_pages.py html
"""
import html as H
import json
import os
import re
import sys

ROOT = sys.argv[1]
B = "An Ninh Thái Nguyên"
HOT, HOT_TEL = "0913.286.293", "0913286293"
MAIL = "anninhthainguyen@gmail.com"
esc = H.escape


def read(p):
    return open(os.path.join(ROOT, p), encoding="utf-8").read()


def write(p, s):
    full = os.path.join(ROOT, p)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    open(full, "w", encoding="utf-8").write(s)


TPL = read("chinh-sach-giao-hang/index.html")


def page(slug, title, desc, main, css=(), js=(), crumbs=None):
    s = TPL
    s = re.sub(r"<title>.*?</title>", f"<title>{esc(title)} - {B}</title>", s, 1)
    s = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{esc(desc)}">', s, 1)
    if css:
        links = "".join(f'\n  <link rel="stylesheet" href="css/components/{c}">' for c in css)
        s = s.replace('<link rel="stylesheet" href="css/components/policy-page.css">',
                      '<link rel="stylesheet" href="css/components/policy-page.css">' + links, 1)
    crumbs = crumbs or [(f"/{slug}/", title)]
    items = ['      <li class="global-breadcrumb__item"><a class="global-breadcrumb__link" href="/">Trang chủ</a></li>']
    items += [f'      <li class="global-breadcrumb__item"><a class="global-breadcrumb__link" href="{h}">{esc(t)}</a></li>'
              for h, t in crumbs]
    s = re.sub(r'(<ol class="global-breadcrumb__list">\n).*?(\n    </ol>)',
               lambda m: m.group(1) + "\n".join(items) + m.group(2), s, 1, flags=re.S)
    i = s.index("<main"); j = s.index("</main>", i) + len("</main>\n")
    s = s[:i] + main + s[j:]
    if js:
        tags = "".join(f'  <script src="{x}" defer></script>\n' for x in js)
        s = s.replace('  <script src="js/main.js" defer></script>', tags + '  <script src="js/main.js" defer></script>', 1)
    write(f"{slug}/index.html", s)
    print(f"{slug}/index.html")


def policy(slug, title, desc, body, css=()):
    main = f'''<main class="container">
  <article class="policy-page">
    <h1 class="policy-page__title">{esc(title)}</h1>
    <div class="policy-page__content">
{body.strip()}
    </div>
  </article>
</main>
'''
    page(slug, title, desc, main, css=css)


CONTACT = f'''      <p>Hotline (Zalo): <a href="tel:{HOT_TEL}">{HOT}</a></p>
      <p>Email: <a href="mailto:{MAIL}">{MAIL}</a></p>
      <p>Website: <a href="/">anninhthainguyen.vn</a></p>'''


def sec(n, title):
    return f'''      <ol start="{n}">
        <li><strong>{title}</strong></li>
      </ol>'''


# ---------------------------------------------------------------- policies
policy("chinh-sach-bao-hanh", "Chính sách bảo hành",
       f"Chính sách bảo hành và hậu mãi khi mua thiết bị an ninh tại {B}: điều kiện bảo hành, các trường hợp từ chối bảo hành và cách gửi yêu cầu.", f"""
      <p>Chân thành cảm ơn quý khách đã tin tưởng sử dụng sản phẩm và dịch vụ của <a href="/">{B}</a>. Quý khách vui lòng tham khảo chính sách bảo hành &amp; hậu mãi dưới đây để được phục vụ tốt nhất và đảm bảo quyền lợi của mình.</p>
      <p>Chính sách áp dụng cho khách hàng mua sản phẩm trực tiếp từ {B}.</p>

{sec(1, "Thời hạn bảo hành")}
      <p>Thời hạn bảo hành của từng sản phẩm được ghi rõ trên trang sản phẩm, phiếu bảo hành hoặc hóa đơn mua hàng, theo chính sách của từng hãng sản xuất.</p>
      <p>Thời gian bảo hành được tính từ ngày khách hàng nhận sản phẩm (hoặc ngày nghiệm thu bàn giao với sản phẩm có lắp đặt).</p>

{sec(2, "Điều kiện được bảo hành")}
      <p>– Sản phẩm hư hỏng do lỗi kỹ thuật của nhà sản xuất.</p>
      <p>– Sản phẩm còn trong thời hạn bảo hành; tem, nhãn, số serial/model còn đầy đủ, rõ ràng, không bị tẩy xóa hay chỉnh sửa.</p>
      <p>– Sản phẩm không thuộc các trường hợp từ chối bảo hành nêu ở mục 3.</p>

{sec(3, "Các trường hợp không được bảo hành")}
      <p>– Tem bảo hành, nhãn mác, số serial bị rách, mất, tẩy xóa hoặc không trùng khớp với sản phẩm.</p>
      <p>– Hết thời hạn bảo hành hoặc không cung cấp được thông tin mua hàng.</p>
      <p>– Hư hỏng do sử dụng, bảo quản không đúng hướng dẫn của nhà sản xuất; dùng sai nguồn điện.</p>
      <p>– Sản phẩm bị rơi vỡ, biến dạng, trầy xước, cháy nổ, vào nước, côn trùng xâm nhập.</p>
      <p>– Sản phẩm đã bị tháo mở, sửa chữa bởi cá nhân hoặc đơn vị không được {B} ủy quyền.</p>
      <p>– Hư hỏng do thiên tai, hỏa hoạn, sét đánh, ngập lụt.</p>

{sec(4, "Quy trình bảo hành")}
      <p>Bước 1: Liên hệ hotline/Zalo hoặc email bên dưới, cung cấp tên sản phẩm, thông tin mua hàng và mô tả lỗi (kèm hình ảnh/video nếu có).</p>
      <p>Bước 2: Kỹ thuật viên hỗ trợ kiểm tra từ xa. Nhiều lỗi cấu hình, phần mềm có thể khắc phục ngay mà không cần gửi máy.</p>
      <p>Bước 3: Nếu cần, quý khách gửi sản phẩm về hoặc hẹn lịch kỹ thuật viên kiểm tra tại chỗ. Thời gian xử lý bảo hành được thông báo cụ thể khi tiếp nhận.</p>

{sec(5, "Lưu ý")}
      <p>– Vui lòng sao lưu dữ liệu (video, cấu hình, tài khoản) trước khi gửi bảo hành; {B} không chịu trách nhiệm về dữ liệu lưu trên thiết bị.</p>
      <p>– Với sản phẩm có lắp đặt, công lắp đặt được bảo hành song song với thiết bị theo chính sách tại trang <a href="/giao-lap-chuyen-nghiep/">Giao lắp chuyên nghiệp</a>.</p>

{sec(6, "Liên hệ bảo hành")}
{CONTACT}
""")

policy("chinh-sach-bao-mat", "Chính sách bảo mật",
       f"Chính sách bảo mật thông tin khách hàng của {B}: thông tin thu thập, mục đích sử dụng, chia sẻ và bảo mật dữ liệu.", f"""
      <p><a href="/">{B}</a> tôn trọng quyền riêng tư và cam kết bảo mật thông tin cá nhân của khách hàng. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin khi quý khách sử dụng website anninhthainguyen.vn.</p>

{sec(1, "Thông tin chúng tôi thu thập")}
      <p>– Thông tin quý khách cung cấp khi đặt hàng, đăng ký nhận tin hoặc gửi yêu cầu tư vấn: họ tên, số điện thoại, email, địa chỉ giao hàng.</p>
      <p>– Thông tin kỹ thuật như loại trình duyệt, thiết bị và hoạt động trên website, nhằm cải thiện trải nghiệm người dùng.</p>
      <p>– Giỏ hàng và danh sách sản phẩm đã xem được lưu ngay trên trình duyệt của quý khách (localStorage), không gửi về máy chủ.</p>

{sec(2, "Mục đích sử dụng thông tin")}
      <p>– Xử lý đơn hàng, giao hàng, lắp đặt và bảo hành.</p>
      <p>– Liên hệ xác nhận đơn hàng, tư vấn và hỗ trợ kỹ thuật.</p>
      <p>– Gửi thông tin khuyến mãi khi quý khách đăng ký nhận tin (quý khách có thể yêu cầu ngừng nhận bất kỳ lúc nào).</p>

{sec(3, "Chia sẻ thông tin")}
      <p>{B} không bán, trao đổi hay chia sẻ thông tin cá nhân của quý khách cho bên thứ ba, trừ các trường hợp cần thiết để hoàn thành dịch vụ (ví dụ: cung cấp địa chỉ cho đơn vị vận chuyển) hoặc theo yêu cầu của cơ quan nhà nước có thẩm quyền.</p>

{sec(4, "Bảo mật và lưu trữ")}
      <p>Thông tin được lưu trữ trong thời gian cần thiết để cung cấp dịch vụ hoặc cho đến khi quý khách yêu cầu xóa. Chúng tôi áp dụng các biện pháp hợp lý để bảo vệ thông tin khỏi truy cập, sử dụng hoặc tiết lộ trái phép.</p>

{sec(5, "Quyền của khách hàng")}
      <p>Quý khách có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình bằng cách liên hệ với chúng tôi qua thông tin bên dưới.</p>

{sec(6, "Thay đổi chính sách")}
      <p>Chính sách có thể được cập nhật để phù hợp với hoạt động thực tế và quy định pháp luật. Phiên bản mới nhất luôn được đăng tại trang này.</p>

{sec(7, "Liên hệ")}
{CONTACT}
""")

policy("chinh-sach-dai-ly", "Chính sách đại lý",
       f"{B} tìm kiếm đối tác đại lý phân phối camera giám sát, khóa cửa vân tay, thiết bị mạng và thiết bị an ninh.", f"""
      <p><a href="/">{B}</a> đang mở rộng mạng lưới và tìm kiếm đối tác đại lý, cộng tác viên kinh doanh các sản phẩm camera giám sát, khóa cửa vân tay, thiết bị báo cháy, chấm công – kiểm soát ra vào và thiết bị mạng.</p>

{sec(1, "Đối tượng hợp tác")}
      <p>– Cửa hàng điện máy, vi tính, điện nước, nội thất có nhu cầu bổ sung ngành hàng thiết bị an ninh.</p>
      <p>– Đội thợ, đơn vị thi công lắp đặt camera, mạng, điện nhẹ.</p>
      <p>– Cá nhân, hộ kinh doanh muốn kinh doanh thiết bị an ninh, nhà thông minh.</p>

{sec(2, "Quyền lợi đại lý")}
      <p>– Chính sách giá riêng cho đại lý, chiết khấu theo sản lượng.</p>
      <p>– Sản phẩm chính hãng, nguồn hàng ổn định, bảo hành rõ ràng.</p>
      <p>– Hỗ trợ tư vấn giải pháp, hỗ trợ kỹ thuật khi thi công và cấu hình thiết bị.</p>
      <p>– Hướng dẫn kiến thức sản phẩm và tài liệu bán hàng.</p>

{sec(3, "Danh mục sản phẩm")}
      <p>– Camera giám sát: Dahua, Imou, KBVision, Ezviz…</p>
      <p>– Khóa cửa vân tay, khóa thông minh.</p>
      <p>– Thiết bị báo cháy, báo động; chấm công – kiểm soát ra vào.</p>
      <p>– Thiết bị mạng: router, switch, wifi mesh; thiết bị lưu trữ.</p>

{sec(4, "Liên hệ hợp tác")}
      <p>Vui lòng liên hệ để nhận bảng giá và chính sách đại lý chi tiết:</p>
{CONTACT}
""")

policy("hinh-thuc-thanh-toan", "Hình thức thanh toán",
       f"Các hình thức thanh toán khi mua hàng tại {B}: thanh toán khi nhận hàng (COD) và chuyển khoản ngân hàng.", f"""
      <p>Quý khách có thể lựa chọn một trong các hình thức thanh toán sau khi mua hàng tại <a href="/">{B}</a>:</p>

{sec(1, "Thanh toán khi nhận hàng (COD)")}
      <p>Áp dụng trên toàn quốc. Chúng tôi giao hàng và thu tiền tại địa chỉ của quý khách; quý khách kiểm tra hàng rồi thanh toán cho nhân viên giao hàng, không cần trả trước.</p>

{sec(2, "Chuyển khoản ngân hàng")}
      <p>Quý khách chuyển khoản vào tài khoản dưới đây với nội dung là <strong>mã đơn hàng</strong> hoặc <strong>số điện thoại đặt hàng</strong>:</p>
      <div class="payment-account">
        <img class="payment-account__qr" src="assets/images/bank-qr.png" alt="Mã QR chuyển khoản" width="160" height="160">
        <dl class="payment-account__info">
          <dt>Ngân hàng</dt><dd>Techcombank</dd>
          <dt>Số tài khoản</dt><dd><strong>9929394999</strong></dd>
          <dt>Chủ tài khoản</dt><dd>HO KINH DOANH DICH VU KY THUAT TAN AN NGUYEN</dd>
        </dl>
      </div>
      <p>Sau khi chuyển khoản, quý khách vui lòng gọi hoặc nhắn Zalo <a href="tel:{HOT_TEL}">{HOT}</a> để chúng tôi xác nhận và xử lý đơn hàng nhanh nhất.</p>

{sec(3, "Thanh toán trực tiếp")}
      <p>Với đơn hàng có lắp đặt, quý khách có thể thanh toán bằng tiền mặt hoặc chuyển khoản cho kỹ thuật viên sau khi nghiệm thu, bàn giao hệ thống.</p>

{sec(4, "Hỗ trợ")}
{CONTACT}
""", css=("site-pages.css",))

policy("huong-dan-mua-hang", "Hướng dẫn mua hàng",
       f"Hướng dẫn đặt mua camera, khóa cửa vân tay và thiết bị an ninh tại {B} qua điện thoại, Zalo hoặc website.", f"""
      <p>Quý khách có thể đặt mua sản phẩm tại <a href="/">{B}</a> theo một trong các cách sau:</p>

{sec(1, "Đặt hàng qua điện thoại / Zalo")}
      <p>Gọi hoặc nhắn Zalo đến số <a href="tel:{HOT_TEL}">{HOT}</a>. Nhân viên sẽ tư vấn sản phẩm phù hợp, báo giá và tiếp nhận đơn hàng.</p>
      <p>Đơn hàng ngoài giờ làm việc sẽ được xử lý sớm nhất vào ngày làm việc tiếp theo.</p>

{sec(2, "Đặt hàng trên website")}
      <p><strong>Bước 1:</strong> Tìm sản phẩm qua <strong>Danh mục sản phẩm</strong> hoặc ô <strong>tìm kiếm</strong> ở đầu trang.</p>
      <p><strong>Bước 2:</strong> Tại trang sản phẩm, chọn số lượng và bấm <strong>Thêm vào giỏ hàng</strong>. Quý khách có thể tiếp tục chọn thêm sản phẩm khác.</p>
      <p><strong>Bước 3:</strong> Vào <a href="/gio-hang/">Giỏ hàng</a>, kiểm tra sản phẩm, số lượng rồi bấm <strong>Tiến hành thanh toán</strong>.</p>
      <p><strong>Bước 4:</strong> Điền thông tin người nhận, chọn <a href="/hinh-thuc-thanh-toan/">hình thức thanh toán</a> và bấm <strong>Đặt hàng</strong>.</p>
      <p><strong>Bước 5:</strong> Nhân viên {B} sẽ liên hệ qua số điện thoại của quý khách để xác nhận đơn hàng, thời gian giao hàng và lắp đặt (nếu có).</p>

{sec(3, "Nhận hàng")}
      <p>Quý khách vui lòng kiểm tra sản phẩm khi nhận hàng. Xem thêm <a href="/chinh-sach-giao-hang/">Chính sách giao hàng</a> và <a href="/chinh-sach-doi-tra-hang/">Chính sách đổi trả hàng</a>.</p>

{sec(4, "Cần hỗ trợ?")}
{CONTACT}
""")

policy("tuyen-dung-nhan-vien-ky-thuat", "Tuyển dụng nhân viên kỹ thuật",
       f"{B} tuyển dụng nhân viên kỹ thuật lắp đặt camera giám sát, thiết bị mạng, khóa cửa vân tay.", f"""
      <p><a href="/">{B}</a> cần tuyển <strong>nhân viên kỹ thuật lắp đặt</strong> camera giám sát, thiết bị mạng, khóa cửa vân tay và thiết bị an ninh.</p>

{sec(1, "Mô tả công việc")}
      <p>– Khảo sát, thi công, lắp đặt hệ thống camera, thiết bị mạng, khóa vân tay, báo cháy cho khách hàng.</p>
      <p>– Cấu hình thiết bị, cài đặt ứng dụng xem camera, hướng dẫn khách hàng sử dụng.</p>
      <p>– Bảo trì, bảo hành, xử lý sự cố kỹ thuật.</p>
      <p>– Các công việc khác theo phân công của quản lý kỹ thuật.</p>

{sec(2, "Yêu cầu")}
      <p>– Có kinh nghiệm lắp đặt camera, mạng, điện nhẹ là lợi thế; chưa có kinh nghiệm sẽ được đào tạo.</p>
      <p>– Tốt nghiệp trung cấp trở lên các ngành điện, điện tử, công nghệ thông tin hoặc liên quan.</p>
      <p>– Cẩn thận, trung thực, có tinh thần trách nhiệm; có phương tiện đi lại.</p>

{sec(3, "Quyền lợi")}
      <p>– Thu nhập thỏa thuận theo năng lực, trao đổi cụ thể khi phỏng vấn.</p>
      <p>– Được đào tạo chuyên môn, làm việc với nhiều dòng thiết bị mới.</p>
      <p>– Môi trường làm việc thân thiện, gắn bó lâu dài.</p>

{sec(4, "Cách ứng tuyển")}
      <p>Gửi CV qua email hoặc liên hệ trực tiếp:</p>
{CONTACT}
""")

# ---------------------------------------------------------------- account
page("taikhoan", "Tài khoản", f"Tài khoản khách hàng {B}: giỏ hàng, sản phẩm đã xem và hỗ trợ đơn hàng.", f"""<main class="container">
  <section class="account-page">
    <h1 class="account-page__title">Tài khoản của bạn</h1>
    <p class="account-page__lead">Website hiện chưa cần đăng ký tài khoản. Giỏ hàng và sản phẩm đã xem được lưu ngay trên trình duyệt của bạn.</p>
    <div class="account-page__grid">
      <a class="account-card" href="/gio-hang/">
        <span class="account-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="28" height="28" fill="none"><path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="21" r="1.4" fill="currentColor"/><circle cx="17" cy="21" r="1.4" fill="currentColor"/></svg></span>
        <span class="account-card__title">Giỏ hàng</span>
        <span class="account-card__desc"><span id="js-account-cart">0</span> sản phẩm đang chờ thanh toán</span>
      </a>
      <a class="account-card" href="/san-pham-da-xem/">
        <span class="account-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="28" height="28" fill="none"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg></span>
        <span class="account-card__title">Sản phẩm đã xem</span>
        <span class="account-card__desc"><span id="js-account-viewed">0</span> sản phẩm gần đây</span>
      </a>
      <a class="account-card" href="tel:{HOT_TEL}">
        <span class="account-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="28" height="28" fill="none"><path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 7 7L16 14l5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></span>
        <span class="account-card__title">Tra cứu đơn hàng</span>
        <span class="account-card__desc">Gọi/Zalo {HOT} để kiểm tra tình trạng đơn hàng</span>
      </a>
      <a class="account-card" href="/chinh-sach-bao-hanh/">
        <span class="account-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="28" height="28" fill="none"><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.5 12l2.5 2.5 4.5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <span class="account-card__title">Bảo hành</span>
        <span class="account-card__desc">Điều kiện và quy trình gửi bảo hành</span>
      </a>
    </div>
  </section>
</main>
""", css=("site-pages.css",), js=("js/components/account-page.js",))

# ---------------------------------------------------------------- search
page("tim-kiem", "Tìm kiếm", f"Tìm kiếm sản phẩm camera, khóa cửa vân tay, thiết bị mạng tại {B}.", """<main class="container search-page">
  <h1 class="search-page__title" id="js-search-title">Tìm kiếm sản phẩm</h1>
  <form class="search-page__form" action="/tim-kiem/" role="search">
    <input class="search-page__input" type="search" name="q" id="js-search-input" placeholder="Nhập tên sản phẩm, mã model, thương hiệu…" autocomplete="off">
    <button class="search-page__btn" type="submit">Tìm kiếm</button>
  </form>
  <p class="search-page__summary" id="js-search-summary" aria-live="polite"></p>
  <div class="category-band search-page__results" hidden id="js-search-band">
    <div class="category-band__grid" id="js-search-results"></div>
  </div>
</main>
""", css=("product-card.css", "category-page.css", "site-pages.css"),
     js=("js/data/search-index.js", "js/components/search-page.js"))

# ---------------------------------------------------------------- search index
def text(rx, s):
    m = re.search(rx, s, re.S)
    return H.unescape(re.sub(r"<[^>]+>", "", m.group(1))).strip() if m else ""


index = []
for d in sorted(os.listdir(ROOT)):
    p = os.path.join(ROOT, d, "index.html")
    if not os.path.isfile(p):
        continue
    s = open(p, encoding="utf-8").read()
    name = text(r'<h1 class="pdp__title">(.*?)</h1>', s)
    if not name:
        continue
    img = re.search(r'class="pdp-gallery__main-img"[^>]*src="([^"]*)"', s) or \
        re.search(r'src="([^"]*)"[^>]*class="pdp-gallery__main-img"', s)
    index.append({
        "name": name,
        "href": f"/{d}/",
        "image": img.group(1) if img else "",
        "price": text(r'<span class="pdp-price[^"]*">(.*?)</span>', s) or "Liên hệ",
        "oldPrice": text(r'<span class="pdp-old-price">(.*?)</span>', s),
        "discount": text(r'<span class="pdp-discount">(.*?)</span>', s),
    })
# Products that only exist in a listing's data file (no detail page of their
# own, e.g. the fingerprint locks) link to that listing page instead.
import subprocess
NODE = r"""
const fs=require('fs'),vm=require('vm'),path=require('path');
const dir=process.argv[1];const out=[];
for (const f of fs.readdirSync(dir).filter(f=>f.endsWith('-products.js'))){
  const ctx={};vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(dir,f),'utf8').replace(/^const /gm,'var '),ctx);
  (function walk(o){if(Array.isArray(o))o.forEach(walk);else if(o&&typeof o==='object'){
    if(o.name&&o.image&&o.price!==undefined)out.push({...o,file:f});else Object.values(o).forEach(walk)}})(Object.values(ctx));
}
console.log(JSON.stringify(out));
"""
extra = json.loads(subprocess.run(["node", "-e", NODE, os.path.join(ROOT, "js", "data")],
                                  capture_output=True, text=True, check=True).stdout)
known = {p["name"].lower() for p in index}
for p in extra:
    if p.get("href") or p["name"].lower() in known:
        continue
    listing = p["file"].replace("-products.js", "")
    if not os.path.isfile(os.path.join(ROOT, listing, "index.html")):
        continue
    known.add(p["name"].lower())
    index.append({"name": p["name"], "href": f"/{listing}/", "image": p["image"],
                  "price": p.get("price") or "Liên hệ", "oldPrice": p.get("oldPrice", ""),
                  "discount": p.get("discount", "")})

write("js/data/search-index.js",
      "// Generated by scripts/site/build_pages.py — do not edit by hand.\n"
      "const SEARCH_INDEX = " + json.dumps(index, ensure_ascii=False, indent=0) + ";\n")
print("search-index.js", len(index), "products")
