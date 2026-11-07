// /lien-he/ contact form -> CMS doPost action 'contact' (GAS.md V). Needs js/cms-config.js.
(() => {
  const form = document.getElementById('js-contact-form');
  if (!form || typeof window.cmsPost !== 'function') return;
  const errorEl = document.getElementById('js-contact-error');
  const successEl = document.getElementById('js-contact-success');
  const btn = document.getElementById('js-contact-submit');
  const val = (id) => document.getElementById(id).value.trim();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const payload = {
      action: 'contact',
      name: val('js-contact-name'),
      phone: val('js-contact-phone'),
      email: val('js-contact-email'),
      message: val('js-contact-message'),
      page: location.pathname,
      _hp: val('js-contact-hp'),
    };
    if (!payload.phone) {
      errorEl.textContent = 'Vui lòng nhập số điện thoại để chúng tôi liên hệ lại.';
      return;
    }
    if (!/^[0-9+\s.]{9,15}$/.test(payload.phone)) {
      errorEl.textContent = 'Số điện thoại không hợp lệ.';
      return;
    }
    if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      errorEl.textContent = 'Email không hợp lệ.';
      return;
    }
    errorEl.textContent = '';
    const restore = window.cmsBusy(btn);

    window.cmsPost(payload)
      .then(() => {
        form.hidden = true;
        successEl.hidden = false;
        successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .catch((err) => {
        errorEl.textContent = `Gửi chưa thành công: ${err.message.replace(/\.$/, '')}. Quý khách vui lòng thử lại hoặc gọi hotline.`;
      })
      .finally(restore);
  });
})();
