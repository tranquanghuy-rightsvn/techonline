function escapeHtmlNetwork(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderNetworkProductCard(p) {
  const href = p.href || '#';
  const hasPromo = Boolean(p.promo);
  const hasOldPrice = Boolean(p.oldPrice);
  const isContactPrice = p.price === 'Liên hệ';

  const ribbon = hasPromo
    ? `<div class="product-card__ribbon">
        <span class="product-card__ribbon-promo">Khuyến mãi đặc biệt</span>
        <span class="product-card__ribbon-percent">${p.promo}</span>
      </div>`
    : '';

  const newBadge = p.isNew
    ? `<span class="product-card__badge">Mẫu mới</span>`
    : '';

  const priceRow = isContactPrice
    ? `<p class="product-card__price">${p.price}</p>`
    : `${hasOldPrice ? `<span class="product-card__old-price">${p.oldPrice}</span>` : ''}
       <p class="product-card__price">${p.price}</p>
       ${p.discount ? `<span class="product-card__discount">${p.discount}</span>` : ''}`;

  const attrs = (p.attrs && p.attrs.length)
    ? `<div class="product-card__attrs">${p.attrs.map(a => `<span class="product-card__attr">${escapeHtmlNetwork(a)}</span>`).join('')}</div>`
    : `<div class="product-card__attrs"></div>`;

  return `
    <article class="product-card">
      ${newBadge}
      <a href="${href}" class="product-card__img">
        <img src="${p.image}" alt="${escapeHtmlNetwork(p.name)}" loading="lazy">
        ${ribbon}
      </a>
      <div class="product-card__body">
        <a href="${href}" class="product-card__name"><h3>${escapeHtmlNetwork(p.name)}</h3></a>
        <div class="product-card__price-row">${priceRow}</div>
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
    </article>`;
}

function renderNetworkCategoryGroup(group) {
  return `
    <div class="category-band">
      <div class="category-band__title">
        <a href="${group.viewAllHref || '#'}" class="category-band__title-text">${escapeHtmlNetwork(group.title)}</a>
        <a href="${group.viewAllHref}" class="category-band__view-all">Xem tất cả <span>&rsaquo;</span></a>
      </div>
      <div class="category-band__grid">
        ${group.products.map(renderNetworkProductCard).join('')}
      </div>
    </div>`;
}

function renderNetworkIconStrip() {
  return NETWORK_ICON_STRIP.map(icon => `
    <a href="${icon.href || '#'}" class="category-icon">
      <span class="category-icon__thumb" style="background-image:url('${icon.image}')"></span>
      <h2 class="category-icon__label">${escapeHtmlNetwork(icon.label)}</h2>
    </a>`).join('');
}

function mountNetworkPage() {
  const iconsEl = document.getElementById('js-category-icons');
  const groupsEl = document.getElementById('js-category-groups');

  if (iconsEl) iconsEl.innerHTML = renderNetworkIconStrip();
  if (groupsEl) groupsEl.innerHTML = NETWORK_CATEGORY_GROUPS.map(renderNetworkCategoryGroup).join('');
}

document.addEventListener('DOMContentLoaded', mountNetworkPage);
