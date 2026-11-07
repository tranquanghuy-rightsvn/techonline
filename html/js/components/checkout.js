// Renders the order summary on the checkout page (/thanh-toan/) and sends the order to the
// CMS (GAS.md VI, via js/cms-config.js). The cart stays in localStorage until the CMS accepts it.
(() => {
  const formWrap = document.getElementById('js-checkout-form-wrap');
  const summaryEl = document.getElementById('js-checkout-summary');
  const emptyEl = document.getElementById('js-checkout-empty');
  const successEl = document.getElementById('js-checkout-success');
  const form = document.getElementById('js-checkout-form');
  const errorEl = document.getElementById('js-checkout-error');
  const bankContentEl = document.getElementById('js-bank-content');
  const bankConfirmEl = document.getElementById('js-bank-confirm');
  if (!form) return;

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderSummary() {
    const items = Cart.getItems();

    if (!items.length) {
      formWrap.hidden = true;
      summaryEl.innerHTML = '';
      emptyEl.hidden = false;
      return false;
    }

    emptyEl.hidden = true;
    formWrap.hidden = false;

    const subtotal = Cart.subtotal();
    const hasContactOnly = Cart.hasContactOnlyItems();

    summaryEl.innerHTML = `
      <h2 class="checkout-summary__title">Đơn hàng của bạn (${items.reduce((s, i) => s + i.qty, 0)} sản phẩm)</h2>
      ${items.map((item) => `
        <div class="checkout-summary__item">
          <img src="${escapeHtml(item.image)}" alt="" />
          <div>
            <p class="checkout-summary__item-name">${escapeHtml(item.name)}</p>
            <p class="checkout-summary__item-meta">SL: ${item.qty} &times; ${item.priceValue === null ? item.priceText : Cart.formatVND(item.priceValue)}</p>
          </div>
        </div>
      `).join('')}
      <div class="checkout-summary__total">
        <span>Tổng cộng</span>
        <span class="checkout-summary__total-value">${Cart.formatVND(subtotal)}</span>
      </div>
      ${hasContactOnly ? '<p class="cart-summary__note">Một số sản phẩm chưa có giá công khai, nhân viên sẽ liên hệ báo giá trước khi giao hàng.</p>' : ''}
    `;
    return true;
  }

  function randomOrderCode() {
    return 'AN' + Date.now().toString().slice(-8);
  }

  // Generated once per visit so the "Nội dung CK" shown before paying
  // matches the order code shown after the order is placed.
  const orderCode = randomOrderCode();
  if (bankContentEl) bankContentEl.textContent = orderCode;

  document.querySelectorAll('.bank-transfer__copy').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;
      navigator.clipboard.writeText(targetEl.textContent.trim()).then(() => {
        const original = btn.textContent;
        btn.textContent = 'Đã chép';
        btn.classList.add('is-copied');
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove('is-copied');
        }, 1500);
      });
    });
  });

  const submitBtn = document.getElementById('js-checkout-submit');
  const field = (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (submitBtn && submitBtn.disabled) return;
    const name = field('js-checkout-name');
    const phone = field('js-checkout-phone');
    const address = field('js-checkout-address');
    const paymentMethod = form.querySelector('input[name="payment"]:checked').value;

    if (!name || !phone || !address) {
      errorEl.textContent = 'Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng.';
      return;
    }
    if (!/^[0-9+\s]{9,13}$/.test(phone)) {
      errorEl.textContent = 'Số điện thoại không hợp lệ.';
      return;
    }
    if (paymentMethod === 'bank' && bankConfirmEl && !bankConfirmEl.checked) {
      errorEl.textContent = 'Vui lòng xác nhận bạn đã chuyển khoản trước khi đặt hàng.';
      return;
    }
    errorEl.textContent = '';

    // Order -> CMS (GAS.md VI). The server re-prices every line from data/products.json;
    // prices sent here are only what the customer saw ("Liên hệ" = 0).
    const items = Cart.getItems().map((item) => ({
      slug: String(item.id || '').replace(/^\/+|\/+$/g, ''),
      name: item.name,
      price: item.priceValue === null || item.priceValue === undefined ? 0 : item.priceValue,
      qty: item.qty,
    }));
    const payload = {
      action: 'order',
      id: orderCode,
      name,
      phone,
      email: field('js-checkout-email'),
      address,
      note: field('js-checkout-note'),
      payment: paymentMethod,
      items,
      total: Cart.subtotal(),
      page: location.pathname,
      _hp: field('js-checkout-hp'),
    };

    if (typeof window.cmsPost !== 'function') {
      errorEl.textContent = 'Không gửi được đơn hàng. Vui lòng tải lại trang và thử lại.';
      return;
    }
    const restore = submitBtn ? window.cmsBusy(submitBtn, 'Đang gửi đơn…') : () => {};
    window.cmsPost(payload)
      .then(() => {
        Cart.clear();
        formWrap.hidden = true;
        summaryEl.innerHTML = '';
        successEl.hidden = false;
        successEl.querySelector('#js-checkout-order-code').textContent = orderCode;
        successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .catch((err) => {
        errorEl.textContent = `Đặt hàng chưa thành công: ${err.message.replace(/\.$/, '')}. Giỏ hàng vẫn được giữ nguyên, quý khách có thể thử lại hoặc gọi hotline.`;
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .finally(restore);
  });

  renderSummary();
})();
