// Client-side product search for /tim-kiem/?q=... over SEARCH_INDEX
// (generated from the product pages by scripts/site/build_pages.py).
(() => {
  const input = document.getElementById('js-search-input');
  const title = document.getElementById('js-search-title');
  const summary = document.getElementById('js-search-summary');
  const band = document.getElementById('js-search-band');
  const results = document.getElementById('js-search-results');
  if (!input || !results || typeof SEARCH_INDEX === 'undefined') return;

  const MAX_RESULTS = 60;

  // Lower-case, strip Vietnamese diacritics and punctuation so "khoa van tay"
  // matches "Khóa vân tay" and "ipc-a82p" matches "IPC A82P".
  function normalize(str) {
    return String(str)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  const indexed = SEARCH_INDEX.map((p) => {
    const norm = normalize(p.name);
    return { ...p, norm, compact: norm.replace(/ /g, '') };
  });

  function search(query) {
    const tokens = normalize(query).split(' ').filter(Boolean);
    if (!tokens.length) return [];
    return indexed
      .filter((p) => tokens.every((t) => p.norm.includes(t) || p.compact.includes(t)))
      .sort((a, b) => {
        const q = tokens.join(' ');
        return ((a.type === 'post') - (b.type === 'post')) || (b.norm.startsWith(q) - a.norm.startsWith(q)) || a.name.length - b.name.length;
      });
  }

  // Posts (type: 'post') are listed after products with a "Bài viết" label instead of a price.
  function postCard(p) {
    return `
      <article class="product-card">
        <a href="${escapeHtml(p.href)}" class="product-card__img">
          <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy">
        </a>
        <div class="product-card__body">
          <a href="${escapeHtml(p.href)}" class="product-card__name"><h3>${escapeHtml(p.name)}</h3></a>
          <div class="product-card__price-row"><p class="product-card__price product-card__price--contact">Bài viết</p></div>
        </div>
      </article>`;
  }

  function card(p) {
    if (p.type === 'post') return postCard(p);
    const contact = !p.price || p.price === 'Liên hệ';
    const priceRow = contact
      ? '<p class="product-card__price product-card__price--contact">Liên hệ</p>'
      : `${p.oldPrice ? `<span class="product-card__old-price">${escapeHtml(p.oldPrice)}</span>` : ''}
         <p class="product-card__price">${escapeHtml(p.price)}</p>
         ${p.discount ? `<span class="product-card__discount">${escapeHtml(p.discount)}</span>` : ''}`;
    return `
      <article class="product-card">
        <a href="${escapeHtml(p.href)}" class="product-card__img">
          <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy">
        </a>
        <div class="product-card__body">
          <a href="${escapeHtml(p.href)}" class="product-card__name"><h3>${escapeHtml(p.name)}</h3></a>
          <div class="product-card__price-row">${priceRow}</div>
          <div class="product-card__attrs"></div>
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

  const query = (new URLSearchParams(window.location.search).get('q') || '').trim();
  input.value = query;
  document.querySelectorAll('.site-header__search-input').forEach((el) => { el.value = query; });

  if (!query) {
    summary.textContent = `Nhập từ khóa để tìm trong ${SEARCH_INDEX.filter((p) => p.type !== 'post').length} sản phẩm.`;
    input.focus();
    return;
  }

  const found = search(query);
  title.textContent = `Kết quả tìm kiếm: “${query}”`;
  document.title = `${query} - Tìm kiếm - CAMERA AN NINH THÁI NGUYÊN`;

  if (!found.length) {
    summary.innerHTML = `Không tìm thấy sản phẩm phù hợp với “${escapeHtml(query)}”. Hãy thử từ khóa khác (ví dụ: <a href="/tim-kiem/?q=camera%20wifi">camera wifi</a>, <a href="/tim-kiem/?q=khoa%20van%20tay">khóa vân tay</a>) hoặc gọi <a href="tel:0913286293">0913.286.293</a> để được tư vấn.`;
    return;
  }

  summary.textContent = found.length > MAX_RESULTS
    ? `Tìm thấy ${found.length} sản phẩm, hiển thị ${MAX_RESULTS} kết quả phù hợp nhất.`
    : `Tìm thấy ${found.length} sản phẩm.`;
  results.innerHTML = found.slice(0, MAX_RESULTS).map(card).join('');
  band.hidden = false;
})();
