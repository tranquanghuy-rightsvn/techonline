// Shared cart module: storage, header badge, add-to-cart wiring, toast.
// Loaded on every page so the cart stays in sync across listing cards,
// product detail pages, the cart page and checkout.
const Cart = (() => {
  const STORAGE_KEY = 'antn_cart';

  function read() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const items = raw ? JSON.parse(raw) : [];
      return Array.isArray(items) ? items : [];
    } catch {
      return [];
    }
  }

  function write(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    renderBadge();
  }

  function parsePriceVN(text) {
    if (!text) return null;
    const digits = String(text).replace(/[^\d]/g, '');
    if (!digits) return null;
    return parseInt(digits, 10);
  }

  function formatVND(value) {
    if (value === null || value === undefined) return 'Liên hệ';
    return value.toLocaleString('vi-VN') + ' đ';
  }

  function normalizeId(href) {
    try {
      const url = new URL(href, window.location.href);
      let path = url.pathname;
      // /slug/index.html, /slug.html, /slug/ and /slug all map to /slug
      path = path.replace(/\/index\.html$/, '/');
      if (path.endsWith('.html')) path = path.slice(0, -5);
      if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);
      return path;
    } catch {
      return href;
    }
  }

  function getItems() {
    return read();
  }

  function count() {
    return read().reduce((sum, item) => sum + item.qty, 0);
  }

  function subtotal() {
    return read().reduce((sum, item) => {
      if (item.priceValue === null) return sum;
      return sum + item.priceValue * item.qty;
    }, 0);
  }

  function hasContactOnlyItems() {
    return read().some((item) => item.priceValue === null);
  }

  function add(product, qty = 1) {
    // Contact-priced ("Liên hệ") products are ordered via Zalo / phone, not the cart.
    if (product.priceValue === null) return false;
    const items = read();
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ ...product, qty });
    }
    write(items);
  }

  function updateQty(id, qty) {
    const items = read();
    const item = items.find((i) => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, qty);
    write(items);
  }

  function remove(id) {
    write(read().filter((item) => item.id !== id));
  }

  function clear() {
    write([]);
  }

  function renderBadge() {
    const total = count();
    document.querySelectorAll('#js-cart-count').forEach((el) => {
      el.textContent = String(total);
    });
  }

  let toastTimer = null;
  function toast(message) {
    let el = document.getElementById('js-cart-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'js-cart-toast';
      el.className = 'cart-toast';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2200);
  }

  function productFromCard(card) {
    const link = card.querySelector('.product-card__name') || card.querySelector('.product-card__img');
    const href = link ? link.getAttribute('href') : '#';
    const img = card.querySelector('.product-card__img img');
    const nameEl = card.querySelector('.product-card__name h3');
    const priceEl = card.querySelector('.product-card__price');

    return {
      id: normalizeId(href),
      name: nameEl ? nameEl.textContent.trim() : '',
      image: img ? img.getAttribute('src') : '',
      href: href === '#' ? window.location.href : href,
      priceText: priceEl ? priceEl.textContent.trim() : 'Liên hệ',
      priceValue: priceEl && !priceEl.classList.contains('product-card__price--contact')
        ? parsePriceVN(priceEl.textContent)
        : null,
    };
  }

  function productFromPdp() {
    const titleEl = document.querySelector('.pdp__title');
    const imgEl = document.getElementById('js-gallery-main-img');
    const priceEl = document.querySelector('.pdp-price');
    const priceText = priceEl ? priceEl.textContent.trim() : 'Liên hệ';
    const isContact = /liên hệ/i.test(priceText);

    return {
      id: normalizeId(window.location.pathname),
      name: titleEl ? titleEl.textContent.trim() : document.title,
      image: imgEl ? imgEl.getAttribute('src') : '',
      href: window.location.pathname,
      priceText,
      priceValue: isContact ? null : parsePriceVN(priceText),
    };
  }

  function initAddToCart() {
    document.addEventListener('click', (event) => {
      const cardBtn = event.target.closest('.product-card__cart');
      if (cardBtn) {
        const card = cardBtn.closest('.product-card');
        if (card && add(productFromCard(card), 1) !== false) toast('Đã thêm vào giỏ hàng');
        return;
      }

      const pdpBtn = event.target.closest('.pdp-actions__btn--cart');
      if (pdpBtn) {
        const qtyInput = document.getElementById('js-qty-input');
        const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;
        if (add(productFromPdp(), qty) !== false) toast('Đã thêm vào giỏ hàng');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderBadge();
    initAddToCart();
  });

  return {
    getItems,
    count,
    subtotal,
    hasContactOnlyItems,
    add,
    updateQty,
    remove,
    clear,
    renderBadge,
    formatVND,
  };
})();
