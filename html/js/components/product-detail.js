// Gallery: thumbnail click + prev/next arrows swap the main image
(() => {
  const mainImg = document.getElementById('js-gallery-main-img');
  const thumbs = document.querySelectorAll('.pdp-gallery__thumb');
  if (!mainImg || !thumbs.length) return;

  let activeIndex = 0;

  function setActive(index) {
    activeIndex = (index + thumbs.length) % thumbs.length;
    thumbs.forEach((t, i) => t.classList.toggle('is-active', i === activeIndex));
    mainImg.src = thumbs[activeIndex].dataset.src;
  }

  thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => setActive(i)));
  document.getElementById('js-gallery-prev')?.addEventListener('click', () => setActive(activeIndex - 1));
  document.getElementById('js-gallery-next')?.addEventListener('click', () => setActive(activeIndex + 1));
})();

// Color swatches
(() => {
  const swatches = document.querySelectorAll('.pdp-color__swatch');
  const valueEl = document.getElementById('js-color-value');
  if (!swatches.length) return;

  swatches.forEach((swatch) => {
    swatch.addEventListener('click', () => {
      swatches.forEach((s) => s.classList.remove('is-active'));
      swatch.classList.add('is-active');
      if (valueEl) valueEl.textContent = swatch.dataset.color;
    });
  });
})();

// Quantity stepper
(() => {
  const input = document.getElementById('js-qty-input');
  const minus = document.getElementById('js-qty-minus');
  const plus = document.getElementById('js-qty-plus');
  if (!input) return;

  function clamp() {
    const val = Math.max(1, parseInt(input.value, 10) || 1);
    input.value = val;
  }

  minus?.addEventListener('click', () => {
    input.value = Math.max(1, (parseInt(input.value, 10) || 1) - 1);
  });
  plus?.addEventListener('click', () => {
    input.value = (parseInt(input.value, 10) || 1) + 1;
  });
  input.addEventListener('change', clamp);
})();

// Summary "Xem thêm" toggle
(() => {
  const summary = document.querySelector('.pdp-summary');
  const toggle = document.getElementById('js-summary-toggle');
  if (!summary || !toggle) return;

  toggle.addEventListener('click', () => {
    const expanded = summary.classList.toggle('is-expanded');
    toggle.querySelector('span').textContent = expanded ? 'Thu gọn' : 'Xem thêm';
  });
})();

// Description "Xem tất cả" toggle
(() => {
  const desc = document.querySelector('.pdp-description');
  const toggle = document.getElementById('js-desc-toggle');
  if (!desc || !toggle) return;

  toggle.addEventListener('click', () => {
    const expanded = desc.classList.toggle('is-expanded');
    toggle.querySelector('span').textContent = expanded ? 'Thu gọn' : 'Xem tất cả';
  });
})();

// Specs "Xem thêm thông số" toggle
(() => {
  const specs = document.querySelector('.pdp-specs');
  const toggle = document.getElementById('js-specs-toggle');
  if (!specs || !toggle) return;

  toggle.addEventListener('click', () => {
    const expanded = specs.classList.toggle('is-expanded');
    toggle.querySelector('span').textContent = expanded
      ? 'Ẩn bớt thông số kỹ thuật'
      : 'Xem thêm thông số kỹ thuật';
  });
})();

// Similar / viewed products tabs
(() => {
  const buttons = document.querySelectorAll('.pdp-tabs__btn');
  const panels = document.querySelectorAll('.pdp-tabs__panel');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      panels.forEach((p) => p.classList.remove('is-active'));

      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      document.querySelector(`.pdp-tabs__panel[data-panel="${btn.dataset.tab}"]`)?.classList.add('is-active');
    });
  });

  const track = document.querySelector('.pdp-tabs__track');
  document.getElementById('js-tabs-prev')?.addEventListener('click', () => {
    track?.scrollBy({ left: -420, behavior: 'smooth' });
  });
  document.getElementById('js-tabs-next')?.addEventListener('click', () => {
    track?.scrollBy({ left: 420, behavior: 'smooth' });
  });
})();

// Consult form: prevent real submission on a static demo page
document.getElementById('js-consult-form')?.addEventListener('submit', (e) => e.preventDefault());

// "Liên hệ đặt mua": the buy button of a contact-priced product (build.py puts the Zalo / phone
// numbers on it as data-contact-*) opens a picker with 2 options: chat Zalo or call the hotline.
(() => {
  const btn = document.querySelector('.pdp-actions__btn--buy[data-contact-tel]');
  if (!btn) return;
  const { contactZalo, contactTel, contactPhone } = btn.dataset;
  const name = document.querySelector('.pdp__title')?.textContent.trim() || '';

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };
  const icon = (svg) => {
    const n = el('span', 'contact-pick__icon');
    n.innerHTML = svg;
    return n;
  };
  const option = (cls, href, svg, title, sub, newTab) => {
    const a = el('a', `contact-pick__option ${cls}`);
    a.href = href;
    if (newTab) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
    const txt = el('span', 'contact-pick__text');
    txt.append(el('strong', '', title), el('span', '', sub));
    a.append(icon(svg), txt);
    return a;
  };

  const overlay = el('div', 'contact-pick');
  overlay.hidden = true;
  const box = el('div', 'contact-pick__box');
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-labelledby', 'js-contact-pick-title');
  const head = el('div', 'contact-pick__head');
  const title = el('p', 'contact-pick__title', 'Liên hệ đặt mua');
  title.id = 'js-contact-pick-title';
  const close = el('button', 'contact-pick__close', '×');
  close.type = 'button';
  close.setAttribute('aria-label', 'Đóng');
  head.append(title, close);
  box.append(head);
  if (name) box.append(el('p', 'contact-pick__product', name));
  box.append(
    option('contact-pick__option--zalo', contactZalo, '<b>Zalo</b>', 'Chat qua Zalo', contactPhone, true),
    option(
      'contact-pick__option--phone',
      `tel:${contactTel}`,
      '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z"/></svg>',
      'Gọi điện thoại',
      contactPhone,
      false
    )
  );
  overlay.append(box);
  document.body.append(overlay);

  const onKey = (e) => {
    if (e.key === 'Escape') hide();
  };
  function show() {
    overlay.hidden = false;
    document.addEventListener('keydown', onKey);
    box.querySelector('.contact-pick__option')?.focus();
  }
  function hide() {
    overlay.hidden = true;
    document.removeEventListener('keydown', onKey);
    btn.focus();
  }
  btn.addEventListener('click', show);
  close.addEventListener('click', hide);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hide();
  });
  box.querySelectorAll('.contact-pick__option').forEach((a) => a.addEventListener('click', () => setTimeout(hide, 0)));
})();
