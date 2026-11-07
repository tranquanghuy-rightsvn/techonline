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
