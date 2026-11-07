// Shared "recently viewed products" module: storage, PDP tracking, and
// rendering into the PDP "Sản phẩm đã xem" tab. Loaded on every page so a
// product view recorded on any PDP can be read back anywhere else.
const Viewed = (() => {
  const STORAGE_KEY = 'antn_viewed';
  const MAX_ITEMS = 20;

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

  function clear() {
    write([]);
  }

  function record(product) {
    if (!product || !product.id) return;
    const items = read().filter((item) => item.id !== product.id);
    items.unshift(product);
    write(items.slice(0, MAX_ITEMS));
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function cardHtml(item) {
    const priceClass = item.priceValue === null ? ' product-card__price--contact' : '';
    return `
      <article class="product-card">
        <a href="${escapeHtml(item.href)}" class="product-card__img"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" /></a>
        <div class="product-card__body">
          <a href="${escapeHtml(item.href)}" class="product-card__name"><h3>${escapeHtml(item.name)}</h3></a>
          <div class="product-card__price-row"><p class="product-card__price${priceClass}">${escapeHtml(item.priceText)}</p></div>
          <div class="product-card__attrs"></div>
          <div class="product-card__actions">
            <a href="${escapeHtml(item.href)}" class="product-card__compare">Xem lại</a>
            <button class="product-card__cart" type="button" aria-label="Thêm vào giỏ hàng">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="9" cy="21" r="1.4" fill="currentColor"/>
                <circle cx="17" cy="21" r="1.4" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </article>`;
  }

  function recordCurrentPdp() {
    const titleEl = document.querySelector('.pdp__title');
    if (!titleEl) return;
    const imgEl = document.getElementById('js-gallery-main-img');
    const priceEl = document.querySelector('.pdp-price');
    const priceText = priceEl ? priceEl.textContent.trim() : 'Liên hệ';
    const isContact = /liên hệ/i.test(priceText);
    const digits = priceText.replace(/[^\d]/g, '');

    record({
      id: normalizeId(window.location.pathname),
      name: titleEl.textContent.trim(),
      image: imgEl ? imgEl.getAttribute('src') : '',
      href: window.location.pathname,
      priceText,
      priceValue: isContact || !digits ? null : parseInt(digits, 10),
    });
  }

  function renderPdpTab() {
    const panel = document.querySelector('.pdp-tabs__panel[data-panel="viewed"]');
    if (!panel) return;
    const currentId = normalizeId(window.location.pathname);
    const items = getItems().filter((item) => item.id !== currentId);

    panel.innerHTML = items.length
      ? `<div class="pdp-tabs__track">${items.map(cardHtml).join('')}</div>`
      : '<p class="pdp-tabs__empty">Bạn chưa xem sản phẩm nào khác.</p>';
  }

  document.addEventListener('DOMContentLoaded', () => {
    recordCurrentPdp();
    renderPdpTab();
  });

  return { getItems, clear, cardHtml };
})();
