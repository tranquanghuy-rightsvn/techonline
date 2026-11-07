// Renders the cart page (gio-hang.html) from the shared Cart store.
(() => {
  const listEl = document.getElementById('js-cart-list');
  const summaryEl = document.getElementById('js-cart-summary');
  const emptyEl = document.getElementById('js-cart-empty');
  if (!listEl) return;

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function render() {
    const items = Cart.getItems();

    if (!items.length) {
      listEl.innerHTML = '';
      summaryEl.innerHTML = '';
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;

    listEl.innerHTML = items.map((item) => `
      <div class="cart-item" data-id="${item.id}">
        <img class="cart-item__img" src="${escapeHtml(item.image)}" alt="" />
        <div>
          <a class="cart-item__name" href="${escapeHtml(item.href)}">${escapeHtml(item.name)}</a>
          <p class="cart-item__price">${item.priceValue === null ? item.priceText : Cart.formatVND(item.priceValue)}</p>
        </div>
        <div class="cart-item__qty">
          <button type="button" class="cart-item__qty-btn" data-action="minus" aria-label="Giảm số lượng">-</button>
          <input type="text" class="cart-item__qty-input" value="${item.qty}" data-action="input" inputmode="numeric" aria-label="Số lượng" />
          <button type="button" class="cart-item__qty-btn" data-action="plus" aria-label="Tăng số lượng">+</button>
        </div>
        <p class="cart-item__line-total">${item.priceValue === null ? 'Liên hệ' : Cart.formatVND(item.priceValue * item.qty)}</p>
        <button type="button" class="cart-item__remove" data-action="remove" aria-label="Xoá sản phẩm">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>
    `).join('');

    const subtotal = Cart.subtotal();
    const hasContactOnly = Cart.hasContactOnlyItems();

    summaryEl.innerHTML = `
      <h2 class="cart-summary__title">Tóm tắt đơn hàng</h2>
      <div class="cart-summary__row"><span>Tạm tính</span><strong>${Cart.formatVND(subtotal)}</strong></div>
      <div class="cart-summary__total">
        <span>Tổng cộng</span>
        <span class="cart-summary__total-value">${Cart.formatVND(subtotal)}</span>
      </div>
      ${hasContactOnly ? '<p class="cart-summary__note">Một số sản phẩm chưa có giá công khai, vui lòng liên hệ để được tư vấn giá tốt nhất.</p>' : ''}
      <a class="cart-summary__checkout" href="/thanh-toan/">Tiến hành thanh toán</a>
      <a class="cart-summary__continue" href="/">&larr; Tiếp tục mua hàng</a>
    `;
  }

  listEl.addEventListener('click', (event) => {
    const itemEl = event.target.closest('.cart-item');
    if (!itemEl) return;
    const id = itemEl.dataset.id;

    if (event.target.closest('[data-action="remove"]')) {
      Cart.remove(id);
      render();
      return;
    }

    const input = itemEl.querySelector('[data-action="input"]');
    if (event.target.closest('[data-action="minus"]')) {
      Cart.updateQty(id, Math.max(1, (parseInt(input.value, 10) || 1) - 1));
      render();
    } else if (event.target.closest('[data-action="plus"]')) {
      Cart.updateQty(id, (parseInt(input.value, 10) || 1) + 1);
      render();
    }
  });

  listEl.addEventListener('change', (event) => {
    const input = event.target.closest('[data-action="input"]');
    if (!input) return;
    const itemEl = event.target.closest('.cart-item');
    Cart.updateQty(itemEl.dataset.id, Math.max(1, parseInt(input.value, 10) || 1));
    render();
  });

  document.getElementById('js-cart-clear')?.addEventListener('click', () => {
    Cart.clear();
    render();
  });

  render();
})();
