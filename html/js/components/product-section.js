function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

const FLASH_TAB_ICONS = {
  flame: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 2s-5 5.3-5 10a5 5 0 0 0 10 0c0-1.7-.8-2.8-.8-2.8s.1 1.8-1.2 2.4c.4-1.9-.8-3.4-.9-5.3-1.3 1.1-2 2.8-1.8 4.3-.9-.6-1-2-.7-3.3C10.4 8.6 12 5.3 12 2z"/></svg>',
  camera: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="13.5" r="5.2"/><circle cx="12" cy="13.5" r="2"/><path d="M8.3 4.5h7.4L17 7.5H7l1.3-3z" stroke-linejoin="round"/></svg>',
  fingerprint: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M12 11a3 3 0 0 1 3 3v2.5"/><path d="M9 16.5V14a3 3 0 0 1 6 0"/><path d="M6 17.5V14a6 6 0 0 1 12 0v1.5"/><path d="M4 19v-5a8 8 0 0 1 16 0v1.5"/><path d="M12 19.5V16"/></svg>',
  wifi: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3 9a14 14 0 0 1 18 0"/><path d="M6.3 13a9 9 0 0 1 11.4 0"/><path d="M9.8 17a4 4 0 0 1 4.4 0"/><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/></svg>'
};

function renderProductCard(product, isFlash) {
  const badge = product.badge
    ? `<span class="product-card__badge">${escapeHtml(product.badge)}</span>`
    : '';
  const showRibbon = isFlash ? product.specialPromo : product.discount;
  const ribbon = showRibbon
    ? `<span class="product-card__ribbon">
        <span class="product-card__ribbon-promo">Khuyến mãi đặc biệt</span>
        <span class="product-card__ribbon-percent">${escapeHtml(product.discount)}</span>
      </span>`
    : '';
  const oldPrice = product.oldPrice
    ? `<del class="product-card__old-price">${escapeHtml(product.oldPrice)}</del>`
    : '';
  const discountTag = product.discount
    ? `<span class="product-card__discount">${escapeHtml(product.discount)}</span>`
    : '';
  const attrs = product.attrs && product.attrs.length
    ? `<div class="product-card__attrs">${product.attrs.map((a) => `<span class="product-card__attr">${escapeHtml(a)}</span>`).join('')}</div>`
    : '<div class="product-card__attrs"></div>';

  return `
    <article class="product-card">
      ${badge}
      <a class="product-card__img" href="${product.link}">
        <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy">
        ${ribbon}
      </a>
      <div class="product-card__body">
        <a class="product-card__name" href="${product.link}"><h3>${escapeHtml(product.name)}</h3></a>
        <div class="product-card__price-row">
          ${oldPrice}
          <p class="product-card__price${product.price === 'Liên hệ' ? ' product-card__price--contact' : ''}">${escapeHtml(product.price)}</p>
          ${discountTag}
        </div>
        ${attrs}
        <div class="product-card__actions">
          <button class="product-card__cart" type="button" aria-label="Thêm vào giỏ hàng">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="9" cy="21" r="1.4" fill="currentColor"/>
              <circle cx="17" cy="21" r="1.4" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderTabs(config) {
  if (config.type === 'flashsale') {
    return config.tabs.map((tab, i) => `
      <button type="button" class="product-section__pill${i === 0 ? ' is-active' : ''}" data-tab-index="${i}">
        <span class="product-section__pill-icon">${FLASH_TAB_ICONS[tab.icon] || ''}</span>
        <span class="product-section__pill-text">
          <b>${escapeHtml(tab.label)}</b>
          <span>${escapeHtml(tab.sub || '')}</span>
        </span>
      </button>
    `).join('');
  }
  return config.tabs.map((tab, i) => `
    <a href="${tab.href}" class="product-section__subtab${i === 0 ? ' is-active' : ''}" data-tab-index="${i}">${escapeHtml(tab.label)}</a>
  `).join('');
}

function renderProductSection(config) {
  const isFlash = config.type === 'flashsale';
  const titleHtml = isFlash
    ? `<h2 class="product-section__title product-section__title--flash">⚡ ${escapeHtml(config.title)} ⚡</h2>`
    : `<h2 class="product-section__title">${escapeHtml(config.title)}</h2>`;
  const cardsHtml = config.products.map((product) => renderProductCard(product, isFlash)).join('');

  return `
    <section class="product-section ${isFlash ? 'product-section--flash' : 'product-section--category'}" id="${config.id}" data-section-id="${config.id}" aria-label="${escapeHtml(config.title)}">
      <div class="container">
        <div class="product-section__header">
          ${titleHtml}
          <div class="product-section__tabs">${renderTabs(config)}</div>
        </div>
        <div class="product-section__carousel">
          <div class="product-section__track" data-track>${cardsHtml}</div>
        </div>
        <a class="product-section__view-more" href="${config.viewAllHref || '#'}">Xem thêm</a>
      </div>
    </section>
  `;
}

function initProductSectionInteractions(root) {
  root.querySelectorAll('.product-section').forEach((section) => {
    section.querySelectorAll('.product-section__pill, .product-section__subtab').forEach((tab) => {
      tab.addEventListener('click', (e) => {
        if (tab.classList.contains('product-section__subtab')) {
          e.preventDefault();
        }
        section.querySelectorAll('.product-section__pill, .product-section__subtab').forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');
      });
    });
  });
}

function mountProductSections() {
  const root = document.querySelector('.product-sections');
  if (!root || typeof PRODUCT_SECTIONS === 'undefined') return;
  root.innerHTML = PRODUCT_SECTIONS.map(renderProductSection).join('');
  initProductSectionInteractions(root);
}

document.addEventListener('DOMContentLoaded', mountProductSections);
