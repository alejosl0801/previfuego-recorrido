'use strict';

/* ===================================================
   CONSTANTS — DROPBOX
=================================================== */
var DBX_APP_KEY    = 'alxflmx4qckl5gb';
var DBX_REDIRECT   = 'https://alejosl0801.github.io/previfuego-recorrido/';
var DBX_RECORRIDOS = '/Previfuego/recorridos.json';
var DBX_CONFIG     = '/Previfuego/config.json';
var DBX_VISITAS    = '/Previfuego/visitas.json';

var DBX_KFC_PATH   = localStorage.getItem('pf_path_kfc')   || '/Previfuego/2026/BASE_DATOS_KFC (8).xlsx';
var DBX_OTROS_PATH = localStorage.getItem('pf_path_otros') || '/Previfuego/PRESUPUESTOS/PROYECCION INGRESOS MENSUAL 2026.xlsx';

/* ===================================================
   STATE
=================================================== */
var USUARIO_ACTUAL = null;
var PUNTOS = [];
var CLIENTES_DISPONIBLES = [];
var VISITAS_MES = {};
var RUTA_PREVIEW = [];
var _seguimientoInterval = null;
var _toastTimer = null;
var _currentRec = null;

var USUARIOS = {
  alejandro: { nombre: 'Alejandro', emoji: '👔', esAdmin: true },
  raul:      { nombre: 'Ra\xFAl',   emoji: '👷' },
  juan:      { nombre: 'Juan',      emoji: '👷' }
};

/* ===================================================
   OAUTH PKCE — DROPBOX
=================================================== */
function getAccessToken() {
  return localStorage.getItem('pf_dbx_access_token') || '';
}

function getRefreshToken() {
  return localStorage.getItem('pf_dbx_refresh_token') || '';
}

function isTokenExpired() {
  var exp = parseInt(localStorage.getItem('pf_dbx_token_exp') || '0');
  return Date.now() > exp - 60000;
}

function refreshAccessToken() {
  var rt = getRefreshToken();
  if (!rt) return Promise.reject(new Error('No conectado a Dropbox'));

  return fetch('https://api.dropbox.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=refresh_token'
      + '&refresh_token=' + encodeURIComponent(rt)
      + '&client_id=' + DBX_APP_KEY
  })
  .then(function(r) { return r.json(); })
  .then(function(d) {
    if (d.error === 'invalid_grant' || d.error === 'expired_token') {
      localStorage.removeItem('pf_dbx_refresh_token');
      localStorage.removeItem('pf_dbx_access_token');
      pfModal('Sesi\xF3n Dropbox expirada', 'La conexi\xF3n con Dropbox expir\xF3. Ve a Config → Conectar con Dropbox para reconectar.');
      throw new Error('Sesi\xF3n Dropbox expirada — reconecta en Config');
    }
    if (d.error) throw new Error(d.error_description || d.error);
    localStorage.setItem('pf_dbx_access_token', d.access_token);
    if (d.expires_in) {
      localStorage.setItem('pf_dbx_token_exp', String(Date.now() + d.expires_in * 1000));
    }
    return d.access_token;
  });
}

function getValidToken() {
  if (!getRefreshToken()) return Promise.reject(new Error('No conectado a Dropbox. Ve a Config → Conectar Dropbox.'));
  if (!isTokenExpired()) return Promise.resolve(getAccessToken());
  return refreshAccessToken();
}

function generateCodeVerifier() {
  var arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return btoa(String.fromCharCode.apply(null, arr))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function generateCodeChallenge(verifier) {
  var data = new TextEncoder().encode(verifier);
  return crypto.subtle.digest('SHA-256', data).then(function(hash) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(hash)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  });
}

function iniciarOAuth() {
  var verifier = generateCodeVerifier();
  localStorage.setItem('pf_dbx_verifier', verifier);
  generateCodeChallenge(verifier).then(function(challenge) {
    window.location.href = 'https://www.dropbox.com/oauth2/authorize'
      + '?client_id=' + DBX_APP_KEY
      + '&response_type=code'
      + '&redirect_uri=' + encodeURIComponent(DBX_REDIRECT)
      + '&code_challenge=' + challenge
      + '&code_challenge_method=S256'
      + '&token_access_type=offline';
  });
}

function handleOAuthCallback() {
  var params = new URLSearchParams(window.location.search);
  var code = params.get('code');
  if (!code) return false;
  history.replaceState({}, '', window.location.pathname);
  var verifier = localStorage.getItem('pf_dbx_verifier');
  if (!verifier) return false;
  mostrarCargando(true);
  fetch('https://api.dropbox.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'code=' + encodeURIComponent(code)
      + '&grant_type=authorization_code'
      + '&client_id=' + DBX_APP_KEY
      + '&redirect_uri=' + encodeURIComponent(DBX_REDIRECT)
      + '&code_verifier=' + encodeURIComponent(verifier)
  })
  .then(function(r) { return r.json(); })
  .then(function(d) {
    mostrarCargando(false);
    localStorage.removeItem('pf_dbx_verifier');
    if (d.error) { pfModal('Error al conectar Dropbox', d.error_description || d.error); return; }
    localStorage.setItem('pf_dbx_access_token', d.access_token);
    localStorage.setItem('pf_dbx_refresh_token', d.refresh_token);
    if (d.expires_in) localStorage.setItem('pf_dbx_token_exp', String(Date.now() + d.expires_in * 1000));
    showToast('✅ Dropbox conectado correctamente');
    actualizarEstadoConexion();
  })
  .catch(function(err) { mostrarCargando(false); pfModal('Error OAuth', String(err)); });
  return true;
}

function actualizarEstadoConexion() {
  var status       = document.getElementById('cfg-status');
  var btnConectar  = document.getElementById('btn-conectar-dropbox');
  var btnDesconect = document.getElementById('btn-desconectar-dropbox');

  if (getRefreshToken()) {
    if (status)       status.innerHTML = '✅ <strong>Dropbox conectado</strong>';
    if (btnConectar)  btnConectar.style.display = 'none';
    if (btnDesconect) btnDesconect.style.display = 'block';
  } else {
    if (status)       status.innerHTML = '⚠️ No conectado a Dropbox';
    if (btnConectar)  btnConectar.style.display = 'block';
    if (btnDesconect) btnDesconect.style.display = 'none';
  }

  var inKfc   = document.getElementById('cfg-path-kfc');
  var inOtros = document.getElementById('cfg-path-otros');
  if (inKfc)   inKfc.value   = DBX_KFC_PATH;
  if (inOtros) inOtros.value = DBX_OTROS_PATH;

  var geminiStatus = document.getElementById('cfg-gemini-status');
  if (geminiStatus) {
    geminiStatus.textContent = localStorage.getItem('pf_gemini_key')
      ? '✅ Clave Gemini configurada'
      : '⚠️ Sin clave Gemini — la funci\xF3n de voz no estar\xE1 disponible';
  }
}

function desconectarDropbox() {
  localStorage.removeItem('pf_dbx_access_token');
  localStorage.removeItem('pf_dbx_refresh_token');
  localStorage.removeItem('pf_dbx_token_exp');
  actualizarEstadoConexion();
  showToast('Dropbox desconectado');
}

function listarCarpeta(carpeta) {
  var debug = document.getElementById('cfg-debug');
  if (!getRefreshToken()) { if (debug) debug.textContent = '⚠️ Conecta Dropbox primero.'; return; }
  if (debug) debug.textContent = 'Listando ' + carpeta + '...';
  getValidToken()
  .then(function(token) {
    return fetch('https://api.dropboxapi.com/2/files/list_folder', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: carpeta, recursive: false })
    });
  })
  .then(function(r) { return r.json(); })
  .then(function(d) {
    if (d.error_summary) { if (debug) debug.textContent = '❌ ' + d.error_summary; return; }
    var entries = (d.entries || []).filter(function(e) { return e['.tag'] === 'file'; });
    var txt = '📂 ' + carpeta + '\n';
    if (!entries.length) txt += '  (sin archivos)\n';
    entries.forEach(function(e) { txt += '  📄 ' + e.name + '\n'; });
    if (debug) debug.textContent = txt;
  })
  .catch(function(e) { if (debug) debug.textContent = '❌ ' + String(e); });
}

function guardarPathKfc() {
  var val = document.getElementById('cfg-path-kfc');
  if (!val) return;
  DBX_KFC_PATH = val.value.trim();
  localStorage.setItem('pf_path_kfc', DBX_KFC_PATH);
  showToast('✅ Path KFC guardado');
}

function guardarPathOtros() {
  var val = document.getElementById('cfg-path-otros');
  if (!val) return;
  DBX_OTROS_PATH = val.value.trim();
  localStorage.setItem('pf_path_otros', DBX_OTROS_PATH);
  showToast('✅ Path clientes guardado');
}

/* ===================================================
   GEMINI KEY — stored only in localStorage + Dropbox
=================================================== */
function getGeminiKey() {
  return localStorage.getItem('pf_gemini_key') || '';
}

function guardarGeminiKey() {
  var input = document.getElementById('cfg-gemini-key');
  if (!input) return;
  var key = input.value.trim();
  if (!key) { showToast('Ingresa una clave v\xE1lida'); return; }
  localStorage.setItem('pf_gemini_key', key);
  input.value = '';
  var geminiStatus = document.getElementById('cfg-gemini-status');
  if (geminiStatus) geminiStatus.textContent = '✅ Clave Gemini configurada';
  if (getRefreshToken()) {
    dbxDownloadJSON(DBX_CONFIG)
    .catch(function() { return {}; })
    .then(function(cfg) { cfg.gemini_key = key; return dbxUpload(DBX_CONFIG, JSON.stringify(cfg, null, 2)); })
    .then(function() { showToast('✅ Clave Gemini guardada en Dropbox'); })
    .catch(function() { showToast('✅ Clave guardada localmente'); });
  } else {
    showToast('✅ Clave Gemini guardada');
  }
}

function sincronizarConfig() {
  if (!getRefreshToken()) return;
  dbxDownloadJSON(DBX_CONFIG)
  .then(function(cfg) {
    if (cfg.gemini_key && !localStorage.getItem('pf_gemini_key')) {
      localStorage.setItem('pf_gemini_key', cfg.gemini_key);
    }
  })
  .catch(function() {});
}

/* ===================================================
   DROPBOX FILE HELPERS
=================================================== */
function dbxDownload(path) {
  return getValidToken().then(function(token) {
    return fetch('https://content.dropboxapi.com/2/files/download', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Dropbox-API-Arg': JSON.stringify({ path: path })
      }
    }).then(function(r) {
      if (r.status === 400 || r.status === 409) {
        return r.text().then(function(txt) {
          if (txt.indexOf('not_found') !== -1 || txt.indexOf('conflict') !== -1) return null;
          throw new Error('Dropbox ' + r.status + ' al descargar ' + path + ': ' + txt.slice(0, 120));
        });
      }
      if (!r.ok) throw new Error('Dropbox ' + r.status + ' al descargar ' + path);
      return r.arrayBuffer();
    });
  });
}

function dbxUpload(path, content) {
  return getValidToken().then(function(token) {
    return fetch('https://content.dropboxapi.com/2/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Dropbox-API-Arg': JSON.stringify({ path: path, mode: 'overwrite', autorename: false }),
        'Content-Type': 'application/octet-stream'
      },
      body: typeof content === 'string' ? content : JSON.stringify(content)
    }).then(function(r) {
      if (!r.ok) throw new Error('Dropbox upload error ' + r.status);
      return r.json();
    });
  });
}

function dbxDownloadJSON(path) {
  return dbxDownload(path).then(function(buf) {
    if (buf === null) return {};
    try { return JSON.parse(new TextDecoder().decode(buf)); }
    catch(e) { console.error('[PF] JSON corrupto en ' + path, e); return {}; }
  });
}

/* ===================================================
   EXCEL PARSING (SheetJS)
=================================================== */
function parseExcel(buf) {
  var wb = XLSX.read(buf, { type: 'array' });
  var ws = wb.Sheets[wb.SheetNames[0]];
  return XLSX.utils.sheet_to_json(ws, { defval: '' });
}

function normalizarCliente(row, esKfc) {
  var nombre = row['NOMBRE_LOCAL'] || row['CLIENTE'] || row['Cliente'] || row['NOMBRE'] || row['Nombre'] ||
               row['RAZON SOCIAL'] || row['Raz\xF3n Social'] || row['RAZON_SOCIAL'] || row['RAZÓN SOCIAL'] || '';
  var dir    = row['UBICACI\xD3N'] || row['UBICACION'] || row['DIRECCION'] || row['Direcci\xF3n'] ||
               row['DIRECCI\xD3N'] || row['DIR'] || row['Direccion'] || row['DIREC'] || row['direccion'] || '';
  var ciudad = row['CIUDAD'] || row['Ciudad'] || row['ciudad'] || '';
  var ext    = row['EXTINTORES'] || row['Extintores'] || row['CAPACIDAD'] || row['CANTIDAD'] ||
               row['Cantidad'] || row['EXT'] || row['N_EXT'] || row['TOTAL'] || 0;
  var mes    = row['MES_SERVICIO'] || row['MES'] || row['Mes'] || row['mes'] || '';
  var local  = row['NOMBRE_LOCAL'] || row['LOCAL'] || row['Local'] || row['LOCAL_KFC'] ||
               row['Sucursal'] || row['SUCURSAL'] || '';
  var marca  = row['MARCA'] || row['Marca'] || '';
  return {
    nombre:     String(nombre).trim(),
    direccion:  String(dir).trim() + (ciudad ? ' — ' + ciudad : ''),
    extintores: parseInt(ext) || 0,
    mes:        String(mes).trim().toUpperCase(),
    local:      String(local).trim(),
    marca:      String(marca).trim(),
    esKfc:      !!esKfc
  };
}

/* ===================================================
   UTILITIES
=================================================== */
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function fechaHoy() {
  var d  = new Date();
  var dd = String(d.getDate()).padStart(2, '0');
  var mm = String(d.getMonth() + 1).padStart(2, '0');
  return dd + '/' + mm + '/' + d.getFullYear();
}

function mostrarCargando(show) {
  var el = document.getElementById('cargando');
  if (el) el.classList[show ? 'remove' : 'add']('hidden');
}

function pfModal(titulo, msg) {
  var overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  document.getElementById('modal-title').textContent = titulo;
  document.getElementById('modal-msg').innerHTML = esc(msg).replace(/\n/g, '<br>');
  var actEl = document.getElementById('modal-actions');
  actEl.innerHTML = '';
  var btn = document.createElement('button');
  btn.className = 'btn-primary';
  btn.textContent = 'OK';
  btn.onclick = function() { overlay.classList.add('hidden'); };
  actEl.appendChild(btn);
  overlay.classList.remove('hidden');
}

function pfConfirm(titulo, msg, cb) {
  var overlay = document.getElementById('modal-overlay');
  if (!overlay) return;
  document.getElementById('modal-title').textContent = titulo;
  document.getElementById('modal-msg').innerHTML = esc(msg).replace(/\n/g, '<br>');
  var actEl = document.getElementById('modal-actions');
  actEl.innerHTML = '';
  var btnCancel = document.createElement('button');
  btnCancel.className = 'btn-ghost';
  btnCancel.textContent = 'Cancelar';
  btnCancel.onclick = function() { overlay.classList.add('hidden'); };
  var btnOk = document.createElement('button');
  btnOk.className = 'btn-primary';
  btnOk.textContent = 'Confirmar';
  btnOk.onclick = function() { overlay.classList.add('hidden'); if (typeof cb === 'function') cb(); };
  actEl.appendChild(btnCancel);
  actEl.appendChild(btnOk);
  overlay.classList.remove('hidden');
}

function showToast(msg) {
  var el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('visible');
  if (_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function() { el.classList.remove('visible'); }, 3000);
}

/* ===================================================
   NAVIGATION
=================================================== */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
  var t = document.getElementById(id);
  if (t) t.classList.add('active');
}

function login(usuario) {
  if (!USUARIOS[usuario]) return;
  USUARIO_ACTUAL = usuario;
  localStorage.setItem('pf_usuario', usuario);
  if (USUARIOS[usuario].esAdmin) {
    var fechaEl = document.getElementById('admin-fecha');
    if (fechaEl) fechaEl.textContent = fechaHoy();
    showScreen('sadmin');
    var mesSelect = document.getElementById('admin-mes');
    if (mesSelect) {
      var meses = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
      mesSelect.value = meses[new Date().getMonth()];
    }
    sincronizarConfig();
    actualizarEstadoConexion();
    cargarClientes();
  } else {
    var titleEl = document.getElementById('s1-title');
    if (titleEl) titleEl.textContent = USUARIOS[usuario].emoji + ' ' + USUARIOS[usuario].nombre;
    cargarRecorrido();
  }
}

function logout() {
  detenerSeguimiento();
  USUARIO_ACTUAL = null;
  PUNTOS = [];
  CLIENTES_DISPONIBLES = [];
  VISITAS_MES = {};
  RUTA_PREVIEW = [];
  localStorage.removeItem('pf_usuario');
  switchTab('clientes');
  showScreen('s0');
}

/* ===================================================
   ADMIN — TABS
=================================================== */
function switchTab(tab) {
  ['clientes', 'voz', 'seguimiento', 'config'].forEach(function(t) {
    var c = document.getElementById('tab-' + t);
    var b = document.getElementById('tab-btn-' + t);
    if (c) c.classList.remove('active');
    if (b) b.classList.remove('active');
  });
  var ac = document.getElementById('tab-' + tab);
  var ab = document.getElementById('tab-btn-' + tab);
  if (ac) ac.classList.add('active');
  if (ab) ab.classList.add('active');
  if (tab === 'seguimiento') iniciarSeguimiento(); else detenerSeguimiento();
  if (tab === 'config') actualizarEstadoConexion();
}

/* ===================================================
   ADMIN — CLIENTES DEL MES
=================================================== */
function _claveMesActual() {
  var mesEl = document.getElementById('admin-mes');
  var mes = mesEl ? mesEl.value : 'JUNIO';
  return mes + '_' + new Date().getFullYear();
}

function cargarClientes() {
  if (!getRefreshToken()) {
    var cont = document.getElementById('clientes-mes-lista');
    if (cont) cont.innerHTML = '<div class="no-clientes"><strong>⚠️ Conecta Dropbox primero</strong><br><small>Ve al tab ⚙️ Config y pulsa "Conectar con Dropbox".</small><br><button class="btn-primary" style="margin-top:12px" onclick="switchTab(\'config\')">Ir a Config</button></div>';
    return;
  }
  var mesEl = document.getElementById('admin-mes');
  var mes = mesEl ? mesEl.value : '';
  mostrarCargando(true);
  Promise.all([
    dbxDownload(DBX_KFC_PATH).then(function(buf) { return buf ? parseExcel(buf) : []; }),
    dbxDownload(DBX_OTROS_PATH).then(function(buf) { return buf ? parseExcel(buf) : []; }),
    dbxDownloadJSON(DBX_VISITAS)
  ])
  .then(function(results) {
    mostrarCargando(false);
    var rawKfc   = results[0];
    var rawOtros = results[1];
    var kfc   = rawKfc.map(function(r) { return normalizarCliente(r, true); })
                      .filter(function(c) { return c.nombre && (!mes || !c.mes || c.mes === mes || c.mes === ''); });
    var otros = rawOtros.map(function(r) { return normalizarCliente(r, false); })
                        .filter(function(c) { return c.nombre && (!mes || !c.mes || c.mes === mes || c.mes === ''); });
    CLIENTES_DISPONIBLES = kfc.concat(otros);
    if (CLIENTES_DISPONIBLES.length > 0) {
      try { localStorage.setItem('pf_clientes_cache', JSON.stringify(CLIENTES_DISPONIBLES)); } catch(e) {}
    } else {
      localStorage.removeItem('pf_clientes_cache');
    }
    var claveMes = _claveMesActual();
    VISITAS_MES = (results[2] || {})[claveMes] || {};
    if (!CLIENTES_DISPONIBLES.length) {
      var mesesEnKfc = rawKfc.length ? [...new Set(rawKfc.slice(0,50).map(function(r){ return r['MES_SERVICIO']||r['MES']||''; }).filter(Boolean))].slice(0,8).join(', ') : '';
      var cont = document.getElementById('clientes-mes-lista');
      var debugMsg = 'KFC: ' + rawKfc.length + ' filas — Otros: ' + rawOtros.length + ' filas'
        + '\nFiltro mes: "' + mes + '"'
        + (rawKfc.length ? '\nColumnas KFC: ' + Object.keys(rawKfc[0]).slice(0,8).join(', ') : '')
        + (mesesEnKfc ? '\nValores MES en KFC: ' + mesesEnKfc : '')
        + '\nRuta KFC: ' + DBX_KFC_PATH
        + '\nRuta Otros: ' + DBX_OTROS_PATH;
      if (cont) cont.innerHTML = '<div class="no-clientes"><strong>Sin clientes para este mes.</strong><br><small style="white-space:pre-wrap;font-size:11px;color:#555">' + esc(debugMsg) + '</small></div>';
      return;
    }
    renderClientesMes();
  })
  .catch(function(err) {
    mostrarCargando(false);
    console.error('[PF] cargarClientes error:', err);
    var cont = document.getElementById('clientes-mes-lista');
    var cache = localStorage.getItem('pf_clientes_cache');
    var cacheData = null;
    try { if (cache) cacheData = JSON.parse(cache); } catch(e) {}
    if (cacheData && cacheData.length > 0) {
      CLIENTES_DISPONIBLES = cacheData;
      showToast('Sin conexi\xF3n — usando cach\xE9 (' + cacheData.length + ' clientes)');
      renderClientesMes();
      return;
    }
    if (cont) cont.innerHTML = '<div class="no-clientes"><strong>❌ Error al cargar desde Dropbox</strong><br><small style="white-space:pre-wrap;font-size:11px;color:#c00">' + esc(String(err)) + '</small><br><br><small>Ruta KFC: ' + esc(DBX_KFC_PATH) + '<br>Ruta Otros: ' + esc(DBX_OTROS_PATH) + '</small></div>';
  });
}

function _guardarVisitas() {
  if (!getRefreshToken()) return;
  dbxDownloadJSON(DBX_VISITAS)
  .catch(function() { return {}; })
  .then(function(data) { data[_claveMesActual()] = VISITAS_MES; return dbxUpload(DBX_VISITAS, JSON.stringify(data, null, 2)); })
  .catch(function(e) { console.error('[PF] guardarVisitas error:', e); });
}

function marcarVisitado(idx) {
  var c = CLIENTES_DISPONIBLES[idx];
  if (!c) return;
  var key = c.nombre;
  if (VISITAS_MES[key] && VISITAS_MES[key].visitado) {
    delete VISITAS_MES[key];
  } else {
    VISITAS_MES[key] = { visitado: true, fecha: fechaHoy() };
  }
  renderClientesMes();
  _guardarVisitas();
}

function renderClientesMes() {
  var cont  = document.getElementById('clientes-mes-lista');
  var stats = document.getElementById('clientes-mes-stats');
  if (!cont) return;
  if (!CLIENTES_DISPONIBLES || !CLIENTES_DISPONIBLES.length) {
    cont.innerHTML = '<div class="no-clientes">No hay clientes para este mes.</div>';
    if (stats) stats.innerHTML = '';
    return;
  }
  var visitados  = CLIENTES_DISPONIBLES.filter(function(c) { return VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado; });
  var pendientes = CLIENTES_DISPONIBLES.filter(function(c) { return !(VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado); });
  if (stats) {
    stats.innerHTML = '<div class="mes-stats">'
      + '<span class="mes-stat-ok">&#x2713; ' + visitados.length + ' visitados</span>'
      + '<span class="mes-stat-pend">&#x23F3; ' + pendientes.length + ' pendientes</span>'
      + '</div>';
  }
  var html = '';
  if (pendientes.length) {
    html += '<div class="clientes-grupo-header">&#x23F3; Pendientes (' + pendientes.length + ')</div>';
    pendientes.forEach(function(c) { html += renderClienteMesCard(c, CLIENTES_DISPONIBLES.indexOf(c), false); });
  }
  if (visitados.length) {
    html += '<div class="clientes-grupo-header">&#x2713; Visitados (' + visitados.length + ')</div>';
    visitados.forEach(function(c) { html += renderClienteMesCard(c, CLIENTES_DISPONIBLES.indexOf(c), true); });
  }
  cont.innerHTML = html;
}

function renderClienteMesCard(c, idx, visitado) {
  var badge  = c.esKfc ? '<span class="badge-kfc">KFC</span>' : '';
  var local  = c.local ? ' \xB7 ' + esc(c.local) : '';
  var fechaV = visitado && VISITAS_MES[c.nombre] ? ' \xB7 ' + VISITAS_MES[c.nombre].fecha : '';
  return '<div class="cliente-mes-card' + (visitado ? ' visitado' : '') + '">'
    + '<div class="cliente-mes-info">'
    +   '<div class="cliente-nombre">' + badge + esc(c.nombre) + local + '</div>'
    +   '<div class="cliente-dir">' + esc(c.direccion) + '</div>'
    +   '<div class="cliente-ext">&#x1F9EF; ' + (c.extintores || '?') + ' extintor(es)</div>'
    + '</div>'
    + '<button class="btn-visitado' + (visitado ? ' btn-visitado-done' : '') + '" onclick="marcarVisitado(' + idx + ')">'
    +   (visitado ? '&#x2713;' + fechaV : 'Marcar')
    + '</button>'
    + '</div>';
}

/* ===================================================
   ADMIN — VOZ + GEMINI
=================================================== */
function iniciarVoz() {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    pfModal('No disponible', 'Tu navegador no soporta reconocimiento de voz. Usa Chrome en Android o iOS.');
    return;
  }
  var key = getGeminiKey();
  if (!key) {
    pfModal('Clave Gemini requerida', 'Ve a ⚙️ Config e ingresa tu clave de API Gemini primero.');
    return;
  }
  if (!CLIENTES_DISPONIBLES.length) {
    pfModal('Sin clientes', 'Primero carga los clientes en el tab "Clientes".');
    return;
  }
  var btn      = document.getElementById('btn-mic');
  var statusEl = document.getElementById('voz-status');
  var transcEl = document.getElementById('voz-transcript');
  if (_currentRec) {
    _currentRec.abort();
    _currentRec = null;
    if (btn) { btn.classList.remove('grabando'); btn.innerHTML = '&#x1F3A4;'; }
    if (statusEl) statusEl.textContent = '';
    return;
  }
  if (btn) { btn.classList.add('grabando'); btn.innerHTML = '&#x23F9;'; }
  if (statusEl) statusEl.textContent = 'Escuchando... habla ahora';
  if (transcEl) transcEl.textContent = '';
  var rec = new SpeechRecognition();
  _currentRec = rec;
  rec.lang = 'es-EC';
  rec.continuous = false;
  rec.interimResults = false;
  rec.onresult = function(e) {
    var texto = e.results[0][0].transcript;
    if (transcEl) transcEl.textContent = '"' + texto + '"';
    if (statusEl) statusEl.textContent = 'Procesando con Gemini AI...';
    if (btn) { btn.classList.remove('grabando'); btn.innerHTML = '&#x1F3A4;'; }
    _currentRec = null;
    procesarInstruccionVoz(texto);
  };
  rec.onerror = function(e) {
    _currentRec = null;
    if (btn) { btn.classList.remove('grabando'); btn.innerHTML = '&#x1F3A4;'; }
    if (statusEl) statusEl.textContent = '⚠️ Error de micr\xF3fono: ' + e.error;
  };
  rec.onend = function() {
    _currentRec = null;
    if (btn) { btn.classList.remove('grabando'); btn.innerHTML = '&#x1F3A4;'; }
  };
  rec.start();
}

function procesarInstruccionVoz(texto) {
  var key      = getGeminiKey();
  var statusEl = document.getElementById('voz-status');
  var clientesCtx = CLIENTES_DISPONIBLES.map(function(c, i) {
    var visitado = VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado ? 'VISITADO' : 'PENDIENTE';
    return i + '. [' + (c.esKfc ? 'KFC' : 'OTRO') + '] ' + c.nombre
      + (c.local ? ' (' + c.local + ')' : '') + ' - ' + c.direccion + ' [' + visitado + ']';
  }).join('\n');
  var prompt = 'Eres un asistente de gesti\xF3n de rutas para una empresa de mantenimiento de extintores llamada Previfuego.\n'
    + 'Lista completa de clientes disponibles (formato: \xEDndice. [TIPO] Nombre (Local) - Direcci\xF3n [ESTADO]):\n'
    + clientesCtx + '\n\n'
    + 'Instrucci\xF3n del administrador: "' + texto + '"\n\n'
    + 'Selecciona los clientes que deben incluirse en el recorrido de hoy seg\xFAn la instrucci\xF3n.\n'
    + 'Responde \xDANICAMENTE con un array JSON de \xEDndices num\xE9ricos. Ejemplo: [0, 3, 7]\n'
    + 'No incluyas texto adicional, solo el array JSON.';
  fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + key, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 512 }
    })
  })
  .then(function(r) { return r.json(); })
  .then(function(d) {
    if (d.error) throw new Error(d.error.message || 'Error Gemini API');
    var raw = ((d.candidates || [])[0] || {});
    var part0 = (raw.content && raw.content.parts && raw.content.parts[0]) ? raw.content.parts[0] : null;
    var text = part0 ? ((part0.text || '').trim()) : '';
    var match = text.match(/\[[\d,\s,-]*\]/);
    if (!match) throw new Error('Respuesta inesperada de Gemini: ' + text.slice(0, 100));
    var indices = JSON.parse(match[0]);
    RUTA_PREVIEW = indices
      .filter(function(i) { return Number.isInteger(i) && i >= 0 && i < CLIENTES_DISPONIBLES.length; })
      .map(function(i) { return Object.assign({}, CLIENTES_DISPONIBLES[i]); });
    if (!RUTA_PREVIEW.length) {
      if (statusEl) statusEl.textContent = '⚠️ Gemini no encontr\xF3 clientes para esa instrucci\xF3n.';
      return;
    }
    if (statusEl) statusEl.textContent = '✅ Gemini seleccion\xF3 ' + RUTA_PREVIEW.length + ' cliente(s)';
    renderRutaPreview();
  })
  .catch(function(err) {
    if (statusEl) statusEl.textContent = '❌ Error: ' + String(err);
    console.error('[PF] Gemini error:', err);
  });
}

function renderRutaPreview() {
  var wrap  = document.getElementById('ruta-preview');
  var lista = document.getElementById('ruta-preview-lista');
  var title = document.getElementById('ruta-preview-title');
  if (!wrap || !lista) return;
  if (!RUTA_PREVIEW.length) { wrap.style.display = 'none'; return; }
  if (title) title.textContent = 'Ruta sugerida — ' + RUTA_PREVIEW.length + ' punto(s)';
  var html = '';
  RUTA_PREVIEW.forEach(function(c, i) {
    var badge = c.esKfc ? '<span class="badge-kfc">KFC</span>' : '';
    html += '<div class="ruta-preview-item">'
      + '<div class="ruta-preview-num">' + (i + 1) + '</div>'
      + '<div class="ruta-preview-info">'
      +   '<div class="cliente-nombre">' + badge + esc(c.nombre) + (c.local ? ' \xB7 ' + esc(c.local) : '') + '</div>'
      +   '<div class="cliente-dir">' + esc(c.direccion) + '</div>'
      + '</div>'
      + '<select class="opts-select" id="rtecnico-' + i + '" style="width:80px;font-size:0.82rem;padding:6px 4px">'
      +   '<option>Ra\xFAl</option><option>Juan</option>'
      + '</select>'
      + '</div>';
  });
  lista.innerHTML = html;
  wrap.style.display = 'flex';
}

function limpiarPreview() {
  RUTA_PREVIEW = [];
  var wrap = document.getElementById('ruta-preview');
  if (wrap) wrap.style.display = 'none';
  var transcEl = document.getElementById('voz-transcript');
  var statusEl = document.getElementById('voz-status');
  if (transcEl) transcEl.textContent = '';
  if (statusEl) statusEl.textContent = '';
}

function publicarRutaPreview() {
  if (!RUTA_PREVIEW.length) { pfModal('Sin ruta', 'Usa el micr\xF3fono para crear la ruta primero.'); return; }
  var puntos = RUTA_PREVIEW.map(function(c, i) {
    var tecnicoEl = document.getElementById('rtecnico-' + i);
    return {
      nombre: c.nombre, direccion: c.direccion, extintores: c.extintores,
      local: c.local || '', esKfc: c.esKfc || false, mision: 'Mantenimiento',
      tecnico: tecnicoEl ? tecnicoEl.value : 'Ra\xFAl', done: false, horaCompletado: null
    };
  });
  pfConfirm('Publicar recorrido', 'Se publicar\xE1n ' + puntos.length + ' punto(s) para hoy ' + fechaHoy() + '. \xBFConfirmar?', function() {
    mostrarCargando(true);
    dbxDownloadJSON(DBX_RECORRIDOS)
    .then(function(recorridos) {
      var existing = recorridos[fechaHoy()];
      var existingPuntos = (existing && existing.puntos) ? existing.puntos : [];
      puntos = puntos.map(function(p) {
        var prev = existingPuntos.filter(function(e) { return e.nombre === p.nombre; })[0];
        if (prev && prev.done) { p.done = true; p.horaCompletado = prev.horaCompletado; }
        return p;
      });
      recorridos[fechaHoy()] = { fecha: fechaHoy(), publicado: new Date().toISOString(), puntos: puntos };
      return dbxUpload(DBX_RECORRIDOS, JSON.stringify(recorridos, null, 2));
    })
    .then(function() { mostrarCargando(false); limpiarPreview(); pfModal('\xA1Publicado!', 'Recorrido del d\xEDa publicado con ' + puntos.length + ' punto(s).'); })
    .catch(function(err) { mostrarCargando(false); pfModal('Error', 'No se pudo publicar: ' + String(err)); });
  });
}

/* ===================================================
   ADMIN — SEGUIMIENTO
=================================================== */
function iniciarSeguimiento() {
  detenerSeguimiento();
  pfRenderSeguimiento();
  _seguimientoInterval = setInterval(pfRenderSeguimiento, 30000);
}

function detenerSeguimiento() {
  if (_seguimientoInterval) { clearInterval(_seguimientoInterval); _seguimientoInterval = null; }
}

function pfRenderSeguimiento() {
  dbxDownloadJSON(DBX_RECORRIDOS)
  .then(function(recorridos) {
    var hoy = recorridos[fechaHoy()];
    renderTablaSeguimiento(hoy && hoy.puntos ? hoy.puntos : []);
    var nota = document.querySelector('.auto-refresh-note');
    if (nota) {
      var ahora = new Date();
      nota.textContent = 'Actualizado: ' + String(ahora.getHours()).padStart(2,'0') + ':' + String(ahora.getMinutes()).padStart(2,'0') + ':' + String(ahora.getSeconds()).padStart(2,'0');
    }
  })
  .catch(function(err) {
    var nota = document.querySelector('.auto-refresh-note');
    if (nota) nota.textContent = '⚠️ Sin conexi\xF3n — reintentando...';
    console.error('[PF] seguimiento error:', err);
  });
}

function renderTablaSeguimiento(puntos) {
  var tbody    = document.getElementById('seg-tbody');
  var counters = document.getElementById('seg-counters');
  if (!tbody || !counters) return;
  if (!puntos || !puntos.length) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#aaa;padding:20px">Sin recorrido publicado hoy.</td></tr>';
    counters.innerHTML = '';
    return;
  }
  var tecnicos = {};
  puntos.forEach(function(p) {
    var t = p.tecnico || '—';
    if (!tecnicos[t]) tecnicos[t] = { done: 0, total: 0 };
    tecnicos[t].total++;
    if (p.done) tecnicos[t].done++;
  });
  var cHtml = '';
  for (var t in tecnicos) {
    if (!tecnicos.hasOwnProperty(t)) continue;
    var s = tecnicos[t];
    cHtml += '<div class="seg-counter-card"><div class="seg-counter-name">' + esc(t) + '</div>'
      + '<div class="seg-counter-num">' + s.done + '</div><div class="seg-counter-total">de ' + s.total + '</div></div>';
  }
  counters.innerHTML = cHtml;
  var sorted = puntos.slice().sort(function(a, b) {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return (a.nombre || '').localeCompare(b.nombre || '');
  });
  var tHtml = '';
  sorted.forEach(function(p) {
    var badge = p.done ? '<span class="badge-done">&#x2713; Listo</span>' : '<span class="badge-pending">Pendiente</span>';
    tHtml += '<tr>'
      + '<td>' + esc(p.nombre || '') + (p.esKfc ? ' <span class="badge-kfc-sm">KFC</span>' : '') + '</td>'
      + '<td><span class="tecnico-tag">' + esc(p.tecnico || '—') + '</span></td>'
      + '<td>' + badge + '</td>'
      + '<td>' + esc(p.horaCompletado || '—') + '</td>'
      + '</tr>';
  });
  tbody.innerHTML = tHtml;
}

/* ===================================================
   T\xc9CNICO
=================================================== */
function cargarRecorrido() {
  showScreen('s1');
  mostrarCargando(true);
  var vacio = document.getElementById('s1-vacio');
  if (vacio) vacio.style.display = 'none';
  var tecnico = USUARIOS[USUARIO_ACTUAL].nombre;
  dbxDownloadJSON(DBX_RECORRIDOS)
  .then(function(recorridos) {
    mostrarCargando(false);
    var hoy = recorridos[fechaHoy()];
    if (!hoy || !hoy.puntos || !hoy.puntos.length) { cargarRecorridoLocal(); return; }
    var misPuntos = hoy.puntos.filter(function(p) { return p.tecnico === tecnico; });
    if (!misPuntos.length) { mostrarVacio('No tienes puntos asignados para hoy.'); return; }
    localStorage.setItem('pf_puntos_' + fechaHoy(), JSON.stringify(misPuntos));
    procesarPuntos(misPuntos);
  })
  .catch(function() {
    mostrarCargando(false);
    var guardados = localStorage.getItem('pf_puntos_' + fechaHoy());
    if (guardados) {
      try {
        var arr = JSON.parse(guardados);
        var mis = arr.filter(function(p) { return !p.tecnico || p.tecnico === tecnico; });
        if (mis.length) { showToast('Sin conexi\xF3n — usando datos guardados'); procesarPuntos(mis); return; }
      } catch(e) {}
    }
    mostrarVacio('Sin conexi\xF3n con el servidor.\nVerifica tu internet e intenta de nuevo.');
  });
}

function cargarRecorridoLocal() {
  var guardados = localStorage.getItem('pf_puntos_' + fechaHoy());
  if (!guardados) { mostrarVacio(); return; }
  try {
    var arr = JSON.parse(guardados);
    var tecnico = USUARIO_ACTUAL ? USUARIOS[USUARIO_ACTUAL].nombre : '';
    var mis = arr.filter(function(p) { return !p.tecnico || p.tecnico === tecnico; });
    if (mis.length) procesarPuntos(mis); else mostrarVacio();
  } catch(e) { mostrarVacio(); }
}

function mostrarVacio(msg) {
  PUNTOS = [];
  var lista = document.getElementById('lista-puntos');
  if (lista) lista.innerHTML = '';
  var vacio = document.getElementById('s1-vacio');
  if (vacio) {
    vacio.style.display = 'flex';
    var p1 = vacio.querySelector('p:first-child');
    var p2 = vacio.querySelector('p:last-child');
    if (msg) { if (p1) p1.textContent = msg; if (p2) p2.textContent = ''; }
    else { if (p1) p1.textContent = 'No hay recorrido publicado para hoy.'; if (p2) p2.textContent = 'Consulta con Alejandro.'; }
  }
  actualizarProgreso();
}

function procesarPuntos(arr) {
  var estadoGuardado = {};
  try { var raw = localStorage.getItem('pf_estado_' + fechaHoy()); if (raw) estadoGuardado = JSON.parse(raw); } catch(e) {}
  PUNTOS = arr.map(function(p, i) {
    var clave = p.nombre || i;
    var e = estadoGuardado[clave];
    return {
      num: i + 1, nombre: p.nombre || p.cliente || '', direccion: p.direccion || p.dir || '',
      mision: p.mision || 'Mantenimiento', tecnico: p.tecnico || '', esKfc: p.esKfc || false,
      done: e ? e.done : (p.done || false), horaCompletado: e ? e.hora : (p.horaCompletado || null)
    };
  });
  var vacio = document.getElementById('s1-vacio');
  if (vacio) vacio.style.display = 'none';
  renderPuntos();
  actualizarProgreso();
}

function renderPuntos() {
  var lista = document.getElementById('lista-puntos');
  if (!lista) return;
  var filtro = '';
  var buscar = document.getElementById('s1-buscar');
  if (buscar) filtro = buscar.value.trim().toLowerCase();
  var html = '';
  var count = 0;
  for (var i = 0; i < PUNTOS.length; i++) {
    var p = PUNTOS[i];
    if (filtro && p.nombre.toLowerCase().indexOf(filtro) === -1 && p.direccion.toLowerCase().indexOf(filtro) === -1) continue;
    count++;
    var kfcBadge = p.esKfc ? '<span class="badge-kfc-sm">KFC</span> ' : '';
    var accion   = p.done ? '<span class="btn-done-icon">&#10003;</span>'
      : '<button class="btn-success" onclick="marcarListo(' + i + ')">&#10003; Listo</button>';
    var hora = p.done && p.horaCompletado ? '<div class="punto-card-hora">&#10003; ' + esc(p.horaCompletado) + '</div>' : '';
    html += '<div class="punto-card' + (p.done ? ' done' : '') + '">'
      + '<div class="punto-card-num">' + (p.done ? '&#10003;' : p.num) + '</div>'
      + '<div class="punto-card-body">'
      +   '<div class="punto-card-nombre">' + kfcBadge + esc(p.nombre) + '</div>'
      +   '<div class="punto-card-dir">' + esc(p.direccion) + '</div>'
      +   '<div class="punto-card-mision">' + esc(p.mision) + '</div>'
      +   hora
      + '</div>'
      + '<div class="punto-card-actions">' + accion + '</div>'
      + '</div>';
  }
  if (!count && filtro) html = '<div class="no-clientes">Sin resultados para "<strong>' + esc(filtro) + '</strong>"</div>';
  lista.innerHTML = html;
}

function filtrarPuntos() { renderPuntos(); }

function actualizarProgreso() {
  var total = PUNTOS.length;
  var done  = PUNTOS.filter(function(p) { return p.done; }).length;
  var texto = document.getElementById('prog-texto');
  var bar   = document.getElementById('prog-bar');
  if (texto) texto.textContent = done + '/' + total + ' completados';
  if (bar)   bar.style.width = (total > 0 ? Math.round(done / total * 100) : 0) + '%';
}

function marcarListo(idx) {
  if (idx < 0 || idx >= PUNTOS.length || PUNTOS[idx].done) return;
  PUNTOS[idx].done = true;
  var ahora = new Date();
  PUNTOS[idx].horaCompletado = String(ahora.getHours()).padStart(2,'0') + ':' + String(ahora.getMinutes()).padStart(2,'0');
  var estado = {};
  try { var r = localStorage.getItem('pf_estado_' + fechaHoy()); if (r) estado = JSON.parse(r); } catch(e) {}
  estado[PUNTOS[idx].nombre || idx] = { done: true, hora: PUNTOS[idx].horaCompletado };
  localStorage.setItem('pf_estado_' + fechaHoy(), JSON.stringify(estado));
  renderPuntos();
  actualizarProgreso();
  showToast('✓ ' + PUNTOS[idx].nombre + ' marcado como listo');
  subirFichas();
}

function recargarRecorrido() { cargarRecorrido(); }

var _subirFichasTimer   = null;
var _subirFichasPending = false;

function subirFichas() {
  if (_subirFichasTimer) clearTimeout(_subirFichasTimer);
  _subirFichasTimer = setTimeout(function() { _ejecutarSubirFichas(); }, 800);
}

function _ejecutarSubirFichas() {
  if (_subirFichasPending) return;
  _subirFichasPending = true;
  var tecnico  = USUARIO_ACTUAL ? USUARIOS[USUARIO_ACTUAL].nombre : '';
  var snapshot = PUNTOS.map(function(p) { return { nombre: p.nombre, done: p.done, horaCompletado: p.horaCompletado }; });
  dbxDownloadJSON(DBX_RECORRIDOS)
  .catch(function() { return {}; })
  .then(function(recorridos) {
    var hoy = recorridos[fechaHoy()];
    if (!hoy) return;
    hoy.puntos = hoy.puntos.map(function(p) {
      if (p.tecnico !== tecnico) return p;
      var match = snapshot.filter(function(s) { return s.nombre === p.nombre; })[0];
      if (match) { p.done = match.done; p.horaCompletado = match.horaCompletado; }
      return p;
    });
    recorridos[fechaHoy()] = hoy;
    return dbxUpload(DBX_RECORRIDOS, JSON.stringify(recorridos, null, 2));
  })
  .finally(function() { _subirFichasPending = false; })
  .catch(function(err) {
    console.error('[PF] subirFichas error:', err);
    showToast('⚠️ No se pudo sincronizar. Se reintentar\xE1.');
    setTimeout(_ejecutarSubirFichas, 5000);
  });
}

/* ===================================================
   INIT
=================================================== */
document.addEventListener('DOMContentLoaded', function() {
  var oauthInProgress = handleOAuthCallback();
  if (!oauthInProgress) {
    var savedUser = localStorage.getItem('pf_usuario');
    if (savedUser && USUARIOS[savedUser]) login(savedUser);
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/previfuego-recorrido/sw.js').catch(function() {});
  }
});
