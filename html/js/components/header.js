const siteHeader = document.getElementById('js-site-header');

// Sticky header: when scrolled, the header collapses to one compact row.
// Collapsing removes a lot of in-flow height, which used to pull the page
// content up, push scrollY back under the threshold and un-collapse the header
// again — an endless flicker loop. We fix that by:
//   1. reserving the lost height with margin-bottom, so content never moves;
//   2. using separate enter/leave thresholds (hysteresis);
//   3. batching scroll work into requestAnimationFrame.
if (siteHeader) {
  const ENTER_AT = 120;
  const LEAVE_AT = 40;
  let expandedHeight = 0;
  let ticking = false;

  const measure = () => {
    const wasSticky = siteHeader.classList.contains('is-sticky');
    siteHeader.classList.remove('is-sticky');
    siteHeader.style.marginBottom = '';
    expandedHeight = siteHeader.offsetHeight;
    if (wasSticky) applySticky(true);
  };

  function applySticky(sticky) {
    siteHeader.classList.toggle('is-sticky', sticky);
    if (sticky) {
      const lost = Math.max(0, expandedHeight - siteHeader.offsetHeight);
      siteHeader.style.marginBottom = `${lost}px`;
    } else {
      siteHeader.style.marginBottom = '';
    }
  }

  const update = () => {
    ticking = false;
    const isSticky = siteHeader.classList.contains('is-sticky');
    const y = window.scrollY;
    if (!isSticky && y > ENTER_AT) applySticky(true);
    else if (isSticky && y < LEAVE_AT) applySticky(false);
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  measure();
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { measure(); update(); });
  window.addEventListener('load', () => { measure(); update(); });
}

const categoryMenu = document.getElementById('js-category-menu');
const categoryBtn = document.getElementById('js-category-btn');

if (categoryMenu && categoryBtn) {
  categoryBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const isOpen = categoryMenu.classList.toggle('is-open');
    categoryBtn.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!categoryMenu.contains(event.target)) {
      categoryMenu.classList.remove('is-open');
      categoryBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

const mobileToggle = document.getElementById('js-mobile-toggle');
const mobileUtility = document.querySelector('.site-header__utility');
const siteHeaderRow2 = document.querySelector('.site-header__row2');

// On mobile the utility links move inside the category drawer so it reads
// as one menu instead of two separate floating pieces; on desktop/tablet
// they're moved back to their original spot (row2, alongside the category
// button).
function syncMobileDrawerLayout() {
  if (!categoryMenu || !mobileUtility) return;
  if (isMobileHeaderViewport()) {
    if (mobileUtility.parentElement !== categoryMenu) {
      categoryMenu.appendChild(mobileUtility);
    }
  } else if (siteHeaderRow2 && mobileUtility.parentElement !== siteHeaderRow2) {
    siteHeaderRow2.appendChild(mobileUtility);
  }
}

if (categoryMenu && mobileUtility) {
  syncMobileDrawerLayout();
  window.matchMedia('(max-width: 600px)').addEventListener('change', syncMobileDrawerLayout);
}

if (mobileToggle && siteHeader) {
  mobileToggle.addEventListener('click', () => {
    siteHeader.classList.remove('is-mobile-search-open');
    const isOpen = siteHeader.classList.toggle('is-mobile-open');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Tapping the backdrop (or anywhere outside the drawer) closes it.
  document.addEventListener('click', (event) => {
    if (
      siteHeader.classList.contains('is-mobile-open') &&
      !mobileToggle.contains(event.target) &&
      !(categoryMenu && categoryMenu.contains(event.target)) &&
      !(mobileUtility && mobileUtility.contains(event.target))
    ) {
      siteHeader.classList.remove('is-mobile-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      siteHeader.classList.remove('is-mobile-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const mobileSearchForm = document.querySelector('.site-header__search');
const mobileSearchInput = document.querySelector('.site-header__search-input');
const mobileSearchBtn = document.querySelector('.site-header__search-btn');

function isMobileHeaderViewport() {
  return window.matchMedia('(max-width: 600px)').matches;
}

if (mobileSearchForm && mobileSearchInput && mobileSearchBtn && siteHeader) {
  mobileSearchBtn.addEventListener('click', (event) => {
    if (isMobileHeaderViewport() && !siteHeader.classList.contains('is-mobile-search-open')) {
      event.preventDefault();
      siteHeader.classList.remove('is-mobile-open');
      siteHeader.classList.add('is-mobile-search-open');
      mobileSearchInput.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (
      isMobileHeaderViewport() &&
      siteHeader.classList.contains('is-mobile-search-open') &&
      !mobileSearchForm.contains(event.target)
    ) {
      siteHeader.classList.remove('is-mobile-search-open');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      siteHeader.classList.remove('is-mobile-search-open');
    }
  });
}
