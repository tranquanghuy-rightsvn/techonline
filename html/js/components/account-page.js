// Fills the counters on /taikhoan/ from the browser-side cart and viewed lists.
(() => {
  const cartEl = document.getElementById('js-account-cart');
  const viewedEl = document.getElementById('js-account-viewed');
  if (cartEl && typeof Cart !== 'undefined') cartEl.textContent = Cart.count();
  if (viewedEl && typeof Viewed !== 'undefined') viewedEl.textContent = Viewed.getItems().length;
})();
