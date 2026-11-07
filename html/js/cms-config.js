// CMS endpoint (Google Apps Script web app, GAS.md mục 0). Public forms (/lien-he/, /thanh-toan/)
// POST to it with Content-Type text/plain so the browser sends no CORS preflight.
window.CMS_URL = 'https://script.google.com/macros/s/AKfycbw7iAdl8RInlsR6SF49btpqUHHyZm1oF7Nu2X2RR5iN3iAhmpC5WN_kW7HUlMqny_W1/exec';

// POST {action, ...} -> resolves with the server's `data`; rejects with an Error whose message is
// safe to show (the server's `error`, or a generic network message). Reply: {ok, action, data|error}.
window.cmsPost = function cmsPost(payload) {
  return fetch(window.CMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  }).then(
    (res) => res.text().then((text) => {
      let json = null;
      try { json = JSON.parse(text); } catch (e) { /* not JSON */ }
      if (json && json.ok) return json.data !== undefined ? json.data : json; // forms reply {ok, id, …} at top level
      throw new Error((json && json.error) || `Máy chủ không phản hồi (${res.status}).`);
    }),
    () => { throw new Error('Không kết nối được máy chủ. Vui lòng kiểm tra mạng và thử lại.'); },
  );
};

// Disable a submit button + spinner while a request runs; returns the restore function.
window.cmsBusy = function cmsBusy(btn, text) {
  const label = btn.textContent;
  btn.disabled = true;
  btn.classList.add('is-loading');
  btn.textContent = text || 'Đang gửi…';
  return () => {
    btn.disabled = false;
    btn.classList.remove('is-loading');
    btn.textContent = label;
  };
};
