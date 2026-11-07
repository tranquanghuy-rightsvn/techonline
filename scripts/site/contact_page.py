# -*- coding: utf-8 -*-
"""/lien-he/ — contact page with the form that posts to the CMS (GAS.md V).

Uses /chinh-sach-giao-hang/ as the page shell (like build_pages.py) and data/settings.json for
the contact details. Run from the project root:
    python3 scripts/site/contact_page.py html
"""
import html as H
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from settings import load as load_settings, tel, zalo_url, host  # noqa: E402

ROOT = sys.argv[1]
S = load_settings()
B = S["brand"]
esc = H.escape

ICON = {
    "phone": '<path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    "chat": '<path d="M4 5h16v12H9l-4 3V5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8 9.5h8M8 12.5h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    "mail": '<rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 6.5L12 13l8.5-6.5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    "web": '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" stroke="currentColor" stroke-width="1.6"/>',
    "pin": '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="9.5" r="2.5" stroke="currentColor" stroke-width="1.6"/>',
    "doc": '<path d="M6 3h9l4 4v14H6z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 11h7M9 15h7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
}


def row(icon, label, value):
    return f'''        <li class="contact-info__item">
          <span class="contact-info__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none">{ICON[icon]}</svg></span>
          <span><span class="contact-info__label">{label}</span>{value}</span>
        </li>'''


rows = [
    row("phone", "Hotline", f'<a href="tel:{tel(S["hotline"])}">{esc(S["hotline"])}</a>'),
    row("chat", "Zalo", f'<a href="{esc(zalo_url(S))}" target="_blank" rel="noopener">{esc(S["zalo"])}</a>'),
    row("mail", "Email", f'<a href="mailto:{esc(S["email"])}">{esc(S["email"])}</a>'),
    row("web", "Website", f'<a href="/">{esc(host(S["website"]))}</a>'),
]
if S["address"]:
    rows.append(row("pin", "Địa chỉ", esc(S["address"])))
if S["tax_code"]:
    rows.append(row("doc", "Mã số thuế", esc(S["tax_code"])))
ROWS = "\n".join(rows)

MAIN = f'''<main class="container">
  <section class="contact-page">
    <h1 class="contact-page__title">Liên hệ</h1>
    <p class="contact-page__lead">Quý khách cần tư vấn chọn camera, khóa cửa vân tay, thiết bị mạng hay báo giá lắp đặt? Gọi hotline hoặc để lại lời nhắn, {esc(B)} sẽ liên hệ lại trong thời gian sớm nhất.</p>
    <div class="contact-page__grid">
      <ul class="contact-info">
{ROWS}
      </ul>

      <div class="contact-page__form-wrap">
        <form class="checkout-form contact-form" id="js-contact-form" novalidate>
          <h2 class="checkout-form__section-title">Gửi lời nhắn cho chúng tôi</h2>
          <p class="checkout-form__error" id="js-contact-error" role="alert"></p>
          <div class="checkout-form__row">
            <div class="checkout-form__field">
              <label for="js-contact-name">Họ và tên</label>
              <input type="text" id="js-contact-name" name="name" placeholder="Nguyễn Văn A" autocomplete="name" maxlength="100">
            </div>
            <div class="checkout-form__field">
              <label for="js-contact-phone">Số điện thoại *</label>
              <input type="tel" id="js-contact-phone" name="phone" placeholder="09xx xxx xxx" autocomplete="tel" required maxlength="20">
            </div>
          </div>
          <div class="checkout-form__field">
            <label for="js-contact-email">Email</label>
            <input type="email" id="js-contact-email" name="email" placeholder="email@example.com" autocomplete="email" maxlength="120">
          </div>
          <div class="checkout-form__field">
            <label for="js-contact-message">Nội dung</label>
            <textarea id="js-contact-message" name="message" rows="5" placeholder="Quý khách cần tư vấn sản phẩm, lắp đặt, bảo hành…" maxlength="3000"></textarea>
          </div>
          <div class="checkout-form__hp" aria-hidden="true">
            <label for="js-contact-hp">Để trống ô này</label>
            <input type="text" id="js-contact-hp" name="_hp" tabindex="-1" autocomplete="off">
          </div>
          <button type="submit" class="checkout-form__submit" id="js-contact-submit">Gửi liên hệ</button>
        </form>

        <div class="checkout-success contact-success" id="js-contact-success" hidden>
          <div class="checkout-success__icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </div>
          <p class="checkout-success__title">Đã gửi liên hệ!</p>
          <p class="checkout-success__text">Cảm ơn quý khách. {esc(B)} sẽ liên hệ lại trong thời gian sớm nhất.<br>Cần gấp, vui lòng gọi <a href="tel:{tel(S["hotline"])}">{esc(S["hotline"])}</a>.</p>
          <a class="checkout-success__cta" href="/">Về trang chủ</a>
        </div>
      </div>
    </div>
  </section>
</main>
'''

TPL = open(os.path.join(ROOT, "chinh-sach-giao-hang", "index.html"), encoding="utf-8").read()
title, desc = "Liên hệ", f"Liên hệ {B}: hotline, Zalo, email và form gửi yêu cầu tư vấn camera giám sát, khóa cửa vân tay, thiết bị an ninh."
s = TPL
s = re.sub(r"<title>.*?</title>", lambda m: f"<title>{esc(title)} - {esc(B)}</title>", s, count=1, flags=re.S)
s = re.sub(r'<meta name="description" content="[^"]*">', lambda m: f'<meta name="description" content="{esc(desc)}">', s, count=1)
s = s.replace('<link rel="stylesheet" href="css/components/policy-page.css">',
              '<link rel="stylesheet" href="css/components/policy-page.css">\n'
              '  <link rel="stylesheet" href="css/components/contact-page.css">', 1)
s = re.sub(r'(<ol class="global-breadcrumb__list">\n).*?(\n    </ol>)', lambda m: m.group(1) + (
    '      <li class="global-breadcrumb__item"><a class="global-breadcrumb__link" href="/">Trang chủ</a></li>\n'
    '      <li class="global-breadcrumb__item"><a class="global-breadcrumb__link" href="/lien-he/">Liên hệ</a></li>')
    + m.group(2), s, count=1, flags=re.S)
i = s.index("<main"); j = s.index("</main>", i) + len("</main>\n")
s = s[:i] + MAIN + s[j:]
s = s.replace('  <script src="js/main.js" defer></script>',
              '  <script src="js/cms-config.js" defer></script>\n'
              '  <script src="js/components/contact-form.js" defer></script>\n'
              '  <script src="js/main.js" defer></script>', 1)
os.makedirs(os.path.join(ROOT, "lien-he"), exist_ok=True)
open(os.path.join(ROOT, "lien-he", "index.html"), "w", encoding="utf-8").write(s)
print("lien-he/index.html")
