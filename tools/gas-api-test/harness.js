/* Môi trường Apps Script giả lập + kho nội dung trong bộ nhớ, để chạy gas/Code.js trên máy (GAS.md mục XI.8).
   Không gọi mạng thật: GitHub Contents API, OpenAI Responses API, Google Sheet, Mail, Cache đều là bản giả. */
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const repo = new Map();       // đường dẫn trong repo -> Buffer
const commits = [];           // [{method, path, message}] theo đúng thứ tự
const props = new Map();
const cache = new Map();
const mails = [];
const OWNER = 'owner@example.com';
const openai = { replies: [], calls: [] };
const external = { calls: [] };

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function pad(n, w) { return String(n).padStart(w || 2, '0'); }

const Utilities = {
  Charset: { UTF_8: 'UTF-8' },
  DigestAlgorithm: { MD5: 'MD5' },
  getUuid: uuid,
  sleep: () => {},
  base64Encode(data) {
    if (typeof data === 'string') return Buffer.from(data, 'utf8').toString('base64');
    return Buffer.from(Uint8Array.from(data, (b) => b & 0xff)).toString('base64');
  },
  base64Decode: (s) => Array.from(Buffer.from(s, 'base64')),
  newBlob: (text) => ({ getBytes: () => Array.from(Buffer.from(String(text), 'utf8')), getDataAsString: () => String(text) }),
  formatDate(d, tz, fmt) {
    const utc = tz === 'Etc/UTC';
    const t = utc ? d : new Date(d.getTime() + 7 * 3600000);
    const v = { yyyy: t.getUTCFullYear(), MM: pad(t.getUTCMonth() + 1), dd: pad(t.getUTCDate()), HH: pad(t.getUTCHours()), mm: pad(t.getUTCMinutes()), ss: pad(t.getUTCSeconds()) };
    return fmt.replace(/'([^']*)'|yyyy|MM|dd|HH|mm|ss/g, (m, lit) => (lit !== undefined ? lit : v[m]));
  },
  computeDigest: () => [1, 2, 3, 4, 5, 6],
};

function response(code, body, contentType) {
  const buf = Buffer.isBuffer(body) ? body : Buffer.from(String(body), 'utf8');
  return {
    getResponseCode: () => code,
    getContentText: () => buf.toString('utf8'),
    getBlob: () => ({ getBytes: () => Array.from(buf), getContentType: () => contentType || 'application/octet-stream' }),
  };
}

function ghContents(url, params) {
  const m = url.match(/^https:\/\/api\.github\.com\/repos\/[^/]+\/[^/]+\/contents\/([^?]*)/);
  if (!m) return null;
  const p = decodeURI(m[1]);
  const method = String(params.method || 'get').toLowerCase();
  const headers = params.headers || {};
  if (!/^token /.test(headers.Authorization || '')) return response(401, '{"message":"Bad credentials"}');
  if (method === 'get') {
    if (repo.has(p)) {
      if (headers.Accept === 'application/vnd.github.raw+json') return response(200, repo.get(p), /\.(jpe?g|png|webp|gif)$/i.test(p) ? 'image/jpeg' : 'text/plain');
      return response(200, JSON.stringify({ type: 'file', name: p.split('/').pop(), path: p, sha: 'sha-' + p + '-' + repo.get(p).length }));
    }
    const kids = new Map();
    [...repo.keys()].filter((k) => k.startsWith(p + '/')).forEach((k) => {
      const rest = k.slice(p.length + 1);
      const name = rest.split('/')[0];
      kids.set(name, rest.includes('/') ? 'dir' : 'file');
    });
    if (kids.size) return response(200, JSON.stringify([...kids].map(([name, type]) => ({ name, type, path: p + '/' + name }))));
    return response(404, '{"message":"Not Found"}');
  }
  const payload = JSON.parse(params.payload || '{}');
  if (method === 'put') {
    if (repo.has(p) && !payload.sha) return response(422, '{"message":"Invalid request.\\n\\n\\"sha\\" wasn\'t supplied."}');
    repo.set(p, Buffer.from(payload.content, 'base64'));
    commits.push({ method: 'put', path: p, message: payload.message });
    return response(201, JSON.stringify({ content: { path: p } }));
  }
  if (method === 'delete') {
    repo.delete(p);
    commits.push({ method: 'delete', path: p, message: payload.message });
    return response(200, '{}');
  }
  return response(405, '{}');
}

const UrlFetchApp = {
  fetchAll(requests) {
    return requests.map((r) => UrlFetchApp.fetch(r.url, r));
  },
  fetch(url, params) {
    params = params || {};
    const gh = ghContents(url, params);
    if (gh) return gh;
    if (url === 'https://api.openai.com/v1/responses') {
      openai.calls.push({ url, headers: params.headers, body: JSON.parse(params.payload) });
      const r = openai.replies.shift();
      if (!r) throw new Error('chưa xếp sẵn câu trả lời OpenAI');
      return response(r.code || 200, JSON.stringify(r.body));
    }
    if (/^https?:\/\//.test(url)) {
      external.calls.push(url);
      if (url.includes('missing')) return response(404, 'nope');
      const ext = (url.split('?')[0].match(/\.([a-z0-9]{2,4})$/i) || [, 'jpg'])[1].toLowerCase();
      return response(200, 'FAKE-IMAGE-' + url, 'image/' + (ext === 'jpg' ? 'jpeg' : ext));
    }
    throw new Error('fetch không mong đợi: ' + url);
  },
};

/* ---- Google Sheet giả (đủ cho Users / Contacts / Orders) ---- */
function makeSheet(name) {
  const rows = [];
  const width = () => rows.reduce((n, r) => Math.max(n, r.length), 0);
  const sheet = {
    _rows: rows,
    getName: () => name,
    setName(n) { name = n; return sheet; },
    setFrozenRows() {},
    getLastColumn: () => width(),
    getLastRow: () => rows.length,
    appendRow(r) { rows.push(r.slice()); },
    deleteRow(i) { rows.splice(i - 1, 1); },
    getDataRange: () => ({ getValues: () => rows.map((r) => { const o = r.slice(); while (o.length < width()) o.push(''); return o; }) }),
    getRange(r, c, nr, nc) {
      nr = nr || 1; nc = nc || 1;
      return {
        getValues: () => Array.from({ length: nr }, (_, i) => Array.from({ length: nc }, (_, j) => ((rows[r - 1 + i] || [])[c - 1 + j] ?? ''))),
        setValues(vals) { vals.forEach((row, i) => { rows[r - 1 + i] = rows[r - 1 + i] || []; row.forEach((v, j) => (rows[r - 1 + i][c - 1 + j] = v)); }); },
        setValue(v) { rows[r - 1] = rows[r - 1] || []; rows[r - 1][c - 1] = v; },
      };
    },
  };
  return sheet;
}
const spreadsheet = { sheets: [makeSheet('Sheet1')], id: 'ss-1' };
const SpreadsheetApp = {
  create: () => spreadsheet,
  openById: () => ({
    getSheetByName: (n) => spreadsheet.sheets.find((s) => s.getName() === n) || null,
    insertSheet: (n) => { const s = makeSheet(n); spreadsheet.sheets.push(s); return s; },
    getSheets: () => spreadsheet.sheets,
  }),
};
spreadsheet.getSheets = () => spreadsheet.sheets;
spreadsheet.getId = () => spreadsheet.id;
spreadsheet.getUrl = () => 'https://sheet.example/' + spreadsheet.id;

const sandbox = {
  console: { log() {}, info() {}, warn() {}, error: console.error },
  JSON, Math, Date, Number, String, Object, Array, Boolean, isFinite, parseInt, parseFloat, RegExp, Error, encodeURI, encodeURIComponent, decodeURI,
  Utilities,
  UrlFetchApp,
  Logger: { log() {} },
  PropertiesService: {
    getScriptProperties: () => ({
      getProperty: (k) => (props.has(k) ? props.get(k) : null),
      setProperty: (k, v) => props.set(k, String(v)),
      deleteProperty: (k) => props.delete(k),
      getProperties: () => Object.fromEntries(props),
    }),
  },
  CacheService: {
    getScriptCache: () => ({
      get: (k) => (cache.has(k) ? cache.get(k) : null),
      put: (k, v) => cache.set(k, String(v)),
      remove: (k) => cache.delete(k),
    }),
  },
  Session: { getEffectiveUser: () => ({ getEmail: () => OWNER }), getScriptTimeZone: () => 'Asia/Ho_Chi_Minh' },
  ScriptApp: { getService: () => ({ getUrl: () => 'https://script.example/exec' }) },
  MailApp: { sendEmail: (o) => mails.push(o), getRemainingDailyQuota: () => 100 },
  LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {}, tryLock: () => true }) },
  ContentService: {
    MimeType: { JSON: 'json' },
    createTextOutput: (t) => ({ setMimeType: () => ({ body: t, json: JSON.parse(t) }) }),
  },
  HtmlService: {
    createTemplateFromFile: () => ({ evaluate: () => ({ getContent: () => '<div>app</div>', setTitle() { return this; } }) }),
    createHtmlOutputFromFile: () => ({ getContent: () => '' }),
    XFrameOptionsMode: { ALLOWALL: 'ALLOWALL' },
  },
  SpreadsheetApp,
};

vm.createContext(sandbox);
const codePath = process.env.CODE_PATH || path.join(__dirname, '..', '..', 'gas', 'Code.js');
vm.runInContext(fs.readFileSync(codePath, 'utf8'), sandbox, { filename: 'Code.js' });

/** Hằng số khai báo bằng const trong Code.js (không nằm trên sandbox). */
const constant = (name) => vm.runInContext(name, sandbox);

module.exports = { sandbox, repo, commits, props, cache, mails, OWNER, openai, external, spreadsheet, constant };
