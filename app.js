'use strict';

var APP_VERSION = '2.7';

var GROQ_KEY_DEFAULT = '';

/* ===================================================
   CONSTANTS — DROPBOX
=================================================== */
var DBX_APP_KEY    = 'alxflmx4qckl5gb';
var DBX_REDIRECT   = 'https://alejosl0801.github.io/previfuego-recorrido/';
var DBX_RECORRIDOS = '/Previfuego/recorridos.json';
var DBX_CONFIG     = '/Previfuego/config.json';
var DBX_VISITAS    = '/Previfuego/visitas.json';
var DBX_VALERIA    = '/Previfuego/valeria_memoria.json';

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
var VALERIA_MEMORIA = {};
var VALERIA_CHAT = [];
var _seguimientoInterval = null;
var _seguimientoIntervaloSeg = 30;
var _toastQueue = [];
var _toastTimer = null;
var _toastShowing = false;
var _currentRec = null;
var _undoTimer = null;
var _undoIdx = null;
var _undoData = null;
var _guardarVisitasTimer = null;
var _segPuntosCache = [];
var _obsClasifCache = {};
var _fontSizeDelta = parseInt(localStorage.getItem('pf_font_delta') || '0');
var _darkMode = localStorage.getItem('pf_dark') === '1';
var _ultimaInstruccionVoz = '';
var _chipHistorial = [];
var _clientesFiltro = '';

var USUARIOS = {
  alejandro: { nombre: 'Alejandro', emoji: '👔', esAdmin: true },
  raul:      { nombre: 'Ra\xFAl',   emoji: '👷' },
  juan:      { nombre: 'Juan',      emoji: '👷' }
};

/* ===================================================
   DARK MODE + FONT SIZE — init immediately
=================================================== */
(function initAppearance() {
  if (_darkMode) document.documentElement.classList.add('dark');
  if (_fontSizeDelta !== 0) {
    document.documentElement.style.fontSize = (16 + _fontSizeDelta) + 'px';
  }
})();

function toggleDarkMode() {
  _darkMode = !_darkMode;
  localStorage.setItem('pf_dark', _darkMode ? '1' : '0');
  document.documentElement.classList.toggle('dark', _darkMode);
  showToast(_darkMode ? 'Modo oscuro activado' : 'Modo claro activado');
}

function cambiarFuente(delta) {
  _fontSizeDelta = Math.max(-4, Math.min(8, _fontSizeDelta + delta));
  localStorage.setItem('pf_font_delta', String(_fontSizeDelta));
  document.documentElement.style.fontSize = (16 + _fontSizeDelta) + 'px';
  showToast('Tama\xF1o: ' + (16 + _fontSizeDelta) + 'px');
}

/* ===================================================
   OFFLINE BANNER
=================================================== */
window.addEventListener('offline', function() {
  var b = document.getElementById('offline-banner');
  if (b) b.classList.remove('hidden');
});
window.addEventListener('online', function() {
  var b = document.getElementById('offline-banner');
  if (b) b.classList.add('hidden');
  showToast('✅ Conexi\xF3n restaurada');
});

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

  var groqStatus = document.getElementById('cfg-groq-status');
  if (groqStatus) {
    groqStatus.textContent = localStorage.getItem('pf_groq_key')
      ? '✅ Groq AI configurado (clave personalizada)'
      : '✅ Groq AI configurado (llama-3.3-70b)';
  }

  var lastSync = document.getElementById('cfg-last-sync');
  if (lastSync) {
    var ts = localStorage.getItem('pf_last_sync');
    lastSync.textContent = ts ? '\xDAltima sync: ' + ts : '\xDAltima sync: —';
  }

  var rNaul = document.getElementById('cfg-nombre-raul');
  var rJuan = document.getElementById('cfg-nombre-juan');
  if (rNaul) rNaul.value = localStorage.getItem('pf_nombre_raul') || 'Ra\xFAl';
  if (rJuan) rJuan.value = localStorage.getItem('pf_nombre_juan') || 'Juan';
}

function desconectarDropbox() {
  localStorage.removeItem('pf_dbx_access_token');
  localStorage.removeItem('pf_dbx_refresh_token');
  localStorage.removeItem('pf_dbx_token_exp');
  actualizarEstadoConexion();
  showToast('Dropbox desconectado');
}

function verificarConexion() {
  var debug = document.getElementById('cfg-debug');
  if (!getRefreshToken()) { if (debug) debug.textContent = '⚠️ Conecta Dropbox primero.'; return; }
  if (debug) debug.textContent = 'Verificando conexi\xF3n...';
  getValidToken()
  .then(function(token) {
    return fetch('https://api.dropboxapi.com/2/users/get_current_account', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token }
    });
  })
  .then(function(r) { return r.json(); })
  .then(function(d) {
    if (debug) debug.textContent = '✅ Conectado como: ' + (d.email || (d.name && d.name.display_name) || 'OK');
    showToast('✅ Conexi\xF3n OK');
  })
  .catch(function(e) {
    if (debug) debug.textContent = '❌ Error: ' + String(e);
  });
}

function limpiarCache() {
  pfConfirm('Limpiar cach\xE9', '\xBFEliminar cach\xE9 local de clientes y puntos?', function() {
    localStorage.removeItem('pf_clientes_cache');
    var hoy = fechaHoy();
    localStorage.removeItem('pf_puntos_' + hoy);
    localStorage.removeItem('pf_estado_' + hoy);
    showToast('✅ Cach\xE9 eliminada');
  });
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

function guardarNombresTecnicos() {
  var rNaul = document.getElementById('cfg-nombre-raul');
  var rJuan = document.getElementById('cfg-nombre-juan');
  if (rNaul && rNaul.value.trim()) {
    localStorage.setItem('pf_nombre_raul', rNaul.value.trim());
    USUARIOS.raul.nombre = rNaul.value.trim();
  }
  if (rJuan && rJuan.value.trim()) {
    localStorage.setItem('pf_nombre_juan', rJuan.value.trim());
    USUARIOS.juan.nombre = rJuan.value.trim();
  }
  showToast('✅ Nombres guardados');
}

function testDescargarArchivo(path) {
  var debug = document.getElementById('cfg-debug');
  if (!debug) return;
  debug.textContent = 'Descargando ' + path + '...';
  dbxDownload(path)
  .then(function(buf) {
    if (!buf) { debug.textContent = '❌ Archivo no encontrado: ' + path; return; }
    debug.textContent = '✅ Archivo OK: ' + path + ' (' + buf.byteLength + ' bytes)';
  })
  .catch(function(e) { debug.textContent = '❌ Error: ' + String(e); });
}

function inspeccionarExcel(path) {
  var debug = document.getElementById('cfg-debug');
  if (!debug) return;
  debug.textContent = 'Descargando ' + path + '...';
  dbxDownload(path)
  .then(function(buf) {
    if (!buf) { debug.textContent = '❌ Archivo no encontrado: ' + path; return; }
    var wb = XLSX.read(buf, { type: 'array' });
    var txt = '📋 Hojas: ' + wb.SheetNames.join(', ') + '\n\n';
    wb.SheetNames.forEach(function(sheetName) {
      var ws = wb.Sheets[sheetName];
      var rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
      txt += '📄 Hoja: "' + sheetName + '" — ' + rows.length + ' filas\n';
      if (rows.length) {
        txt += 'Columnas: ' + Object.keys(rows[0]).join(' | ') + '\n';
        txt += 'Fila 1: ' + Object.values(rows[0]).slice(0,8).join(' | ') + '\n';
        if (rows[1]) txt += 'Fila 2: ' + Object.values(rows[1]).slice(0,8).join(' | ') + '\n';
        if (rows[2]) txt += 'Fila 3: ' + Object.values(rows[2]).slice(0,8).join(' | ') + '\n';
      }
      txt += '\n';
    });
    debug.textContent = txt;
  })
  .catch(function(e) { debug.textContent = '❌ Error: ' + String(e); });
}

/* ===================================================
   GROQ KEY — hardcoded default, optional override
=================================================== */
function getGroqKey() {
  return localStorage.getItem('pf_groq_key') || GROQ_KEY_DEFAULT;
}

function guardarGroqKey() {
  var input = document.getElementById('cfg-groq-key');
  if (!input) return;
  var key = input.value.trim();
  if (!key) {
    localStorage.removeItem('pf_groq_key');
    input.value = '';
    var gs0 = document.getElementById('cfg-groq-status');
    if (gs0) gs0.textContent = '✅ Groq AI configurado (llama-3.3-70b)';
    showToast('✅ Usando clave Groq por defecto');
    return;
  }
  localStorage.setItem('pf_groq_key', key);
  input.value = '';
  var groqStatus = document.getElementById('cfg-groq-status');
  if (groqStatus) groqStatus.textContent = '✅ Groq AI configurado (clave personalizada)';
  if (getRefreshToken()) {
    dbxDownloadJSON(DBX_CONFIG)
    .catch(function() { return {}; })
    .then(function(cfg) { cfg.groq_key = key; return dbxUpload(DBX_CONFIG, JSON.stringify(cfg, null, 2)); })
    .then(function() { showToast('✅ Clave Groq guardada en Dropbox'); })
    .catch(function() { showToast('✅ Clave guardada localmente'); });
  } else {
    showToast('✅ Clave Groq guardada');
  }
}

function sincronizarConfig() {
  if (!getRefreshToken()) return;
  dbxDownloadJSON(DBX_CONFIG)
  .then(function(cfg) {
    if (cfg.groq_key) {
      localStorage.setItem('pf_groq_key', cfg.groq_key);
    }
    localStorage.setItem('pf_last_sync', new Date().toLocaleString('es-EC'));
  })
  .catch(function() {});
}

/* ===================================================
   GROQ API — shared call helper
=================================================== */
function _llamarGroq(mensajes, maxTokens, temperatura) {
  var key = getGroqKey();
  if (!key) throw new Error('Sin clave Groq');
  var timeoutP = new Promise(function(_, reject) {
    setTimeout(function() { reject(new Error('Tiempo de espera agotado (20s). Intenta de nuevo.')); }, 20000);
  });
  return Promise.race([
    fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: mensajes,
        temperature: temperatura || 0.1,
        max_tokens: maxTokens || 1024
      })
    }).then(function(r) {
      if (!r.ok) return r.text().then(function(t) { throw new Error('Groq HTTP ' + r.status + ': ' + t.slice(0, 200)); });
      return r.json();
    }),
    timeoutP
  ]);
}

/* D1 — Auto-resumen diario de la ruta publicada */
function _resumenDiarioGroq(puntos) {
  if (!puntos || !puntos.length) return;
  var lista = puntos.map(function(p) {
    return '- ' + p.nombre + (p.esKfc ? ' (KFC)' : '') + ' → ' + (p.tecnico || 'sin asignar');
  }).join('\n');
  var DIAS_SEMANA = ['domingo','lunes','martes','mi\xE9rcoles','jueves','viernes','s\xE1bado'];
  var diaSemana = DIAS_SEMANA[new Date().getDay()];
  _llamarGroq([
    { role: 'system', content: 'Eres Valeria, asistente de Previfuego. Resume la ruta del d\xEDa en UNA sola l\xEDnea breve en espa\xF1ol. Ejemplo: "Ruta del lunes: 8 clientes KFC en Guayaquil Norte, t\xE9cnico Ra\xFAl". No agregues nada m\xE1s.' },
    { role: 'user', content: 'D\xEDa: ' + diaSemana + '\nPuntos:\n' + lista }
  ], 256, 0.3)
  .then(function(d) {
    var choice = (d.choices || [])[0] || {};
    var text = (choice.message && choice.message.content ? choice.message.content : '').trim();
    if (!text) return;
    if (!VALERIA_MEMORIA.resumenes_diarios) VALERIA_MEMORIA.resumenes_diarios = [];
    VALERIA_MEMORIA.resumenes_diarios.unshift({ fecha: fechaHoy(), resumen: text });
    if (VALERIA_MEMORIA.resumenes_diarios.length > 30) VALERIA_MEMORIA.resumenes_diarios = VALERIA_MEMORIA.resumenes_diarios.slice(0, 30);
    if (getRefreshToken()) {
      dbxUpload(DBX_VALERIA, JSON.stringify(VALERIA_MEMORIA, null, 2)).catch(function() {});
    }
  })
  .catch(function(e) { console.error('[PF] resumenDiario error:', e); });
}

/* D2 — Sugerencia proactiva al cargar admin (rate-limited 4h) */
function sugerenciaProactiva() {
  if (!CLIENTES_DISPONIBLES.length) return;
  if (!VALERIA_MEMORIA.historial_rutas || !VALERIA_MEMORIA.historial_rutas.length) return;
  var ultima = parseInt(localStorage.getItem('pf_ultima_sugerencia') || '0');
  if (Date.now() - ultima < 4 * 60 * 60 * 1000) return;
  localStorage.setItem('pf_ultima_sugerencia', String(Date.now()));

  var pendientes = CLIENTES_DISPONIBLES.filter(function(c) {
    return !(VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado);
  }).slice(0, 80).map(function(c) {
    return '- ' + c.nombre + (c.esKfc ? ' (KFC)' : '') + (c.direccion ? ' - ' + c.direccion : '');
  }).join('\n');
  var historialCtx = (VALERIA_MEMORIA.historial_rutas || []).slice(0, 10).map(function(h) {
    return h.fecha + ': ' + (h.clientes || []).join(', ');
  }).join('\n');

  _llamarGroq([
    { role: 'system', content: 'Eres Valeria, asistente de Previfuego. Bas\xE1ndote en el historial de rutas y los clientes pendientes, sugiere en 1-2 frases qu\xE9 clientes deber\xEDan visitarse hoy. S\xE9 concreto y breve.' },
    { role: 'user', content: '=== HISTORIAL ===\n' + (historialCtx || '(sin historial)') + '\n\n=== PENDIENTES ===\n' + (pendientes || '(ninguno)') }
  ], 512, 0.3)
  .then(function(d) {
    var choice = (d.choices || [])[0] || {};
    var text = (choice.message && choice.message.content ? choice.message.content : '').trim();
    if (text) _mostrarSugerenciaChip(text);
  })
  .catch(function(e) { console.error('[PF] sugerenciaProactiva error:', e); });
}

function _mostrarSugerenciaChip(texto) {
  var cont = document.getElementById('valeria-sugerencia');
  if (!cont) return;
  cont.innerHTML = '<div class="valeria-sugerencia-chip">💡 ' + esc(texto)
    + ' <button onclick="this.parentNode.parentNode.innerHTML=\'\'" style="background:none;border:none;cursor:pointer;color:#999">✕</button></div>';
}

/* D3 — Clasificar observaciones de t\xE9cnicos */
function clasificarObservacion(texto) {
  if (!texto || texto.length <= 20) return Promise.resolve('');
  return _llamarGroq([
    { role: 'system', content: 'Clasifica la siguiente observaci\xF3n de un t\xE9cnico de extintores. Responde \xDANICAMENTE con una de estas tres etiquetas exactas: "⚠️ Problema detectado", "🔧 Requiere seguimiento", "✅ Normal".' },
    { role: 'user', content: texto }
  ], 32, 0)
  .then(function(d) {
    var choice = (d.choices || [])[0] || {};
    var text = (choice.message && choice.message.content ? choice.message.content : '').trim();
    if (text.indexOf('Problema') !== -1) return '⚠️ Problema detectado';
    if (text.indexOf('seguimiento') !== -1) return '🔧 Requiere seguimiento';
    return '✅ Normal';
  })
  .catch(function() { return ''; });
}

/* D4 — Resumen IA del seguimiento del d\xEDa */
function resumenSeguimientoIA() {
  if (!_segPuntosCache || !_segPuntosCache.length) {
    pfModal('Sin datos', 'No hay recorrido publicado hoy para resumir.');
    return;
  }
  showToast('⏳ Generando resumen IA...');
  var lista = _segPuntosCache.map(function(p) {
    return '- ' + p.nombre + ' [' + (p.done ? 'LISTO' : (p.enCamino ? 'EN CAMINO' : 'PENDIENTE')) + '] '
      + (p.tecnico || 'sin asignar') + (p.observacion ? ' | Obs: ' + p.observacion : '');
  }).join('\n');
  _llamarGroq([
    { role: 'system', content: 'Eres Valeria, asistente de Previfuego. Genera un breve reporte de estado en espa\xF1ol del avance del recorrido del d\xEDa: cu\xE1ntos completados, pendientes, por t\xE9cnico, y resalta observaciones importantes. S\xE9 conciso. Firma como "Valeria 🤖".' },
    { role: 'user', content: 'Fecha: ' + fechaHoy() + '\n\n' + lista }
  ], 1024, 0.3)
  .then(function(d) {
    var choice = (d.choices || [])[0] || {};
    var text = (choice.message && choice.message.content ? choice.message.content : '').trim();
    pfModal('📊 Resumen IA del d\xEDa', text || 'Sin respuesta.');
  })
  .catch(function(err) {
    pfModal('Error', 'No se pudo generar el resumen: ' + String(err));
  });
}

/* ===================================================
   VALERIA — AI ASSISTANT WITH MEMORY
=================================================== */
function sincronizarValeria() {
  if (!getRefreshToken()) return;
  dbxDownloadJSON(DBX_VALERIA)
  .then(function(mem) {
    VALERIA_MEMORIA = mem || {};
    if (!VALERIA_MEMORIA.historial_rutas) VALERIA_MEMORIA.historial_rutas = [];
    if (!VALERIA_MEMORIA.patrones_cliente) VALERIA_MEMORIA.patrones_cliente = {};
    if (!VALERIA_MEMORIA.conversaciones) VALERIA_MEMORIA.conversaciones = [];
  })
  .catch(function() {
    VALERIA_MEMORIA = { historial_rutas: [], patrones_cliente: {}, conversaciones: [] };
  });
}

function actualizarMemoriaValeria(puntos, instruccion) {
  if (!VALERIA_MEMORIA.historial_rutas) VALERIA_MEMORIA.historial_rutas = [];
  if (!VALERIA_MEMORIA.patrones_cliente) VALERIA_MEMORIA.patrones_cliente = {};

  var tecnicos = {};
  puntos.forEach(function(p) {
    var t = p.tecnico || 'Sin asignar';
    if (!tecnicos[t]) tecnicos[t] = [];
    tecnicos[t].push(p.nombre);
  });

  var entrada = {
    fecha: fechaHoy(),
    instruccion: instruccion || '',
    clientes: puntos.map(function(p) { return p.nombre; }),
    tecnicos: tecnicos
  };

  VALERIA_MEMORIA.historial_rutas.unshift(entrada);
  if (VALERIA_MEMORIA.historial_rutas.length > 60) {
    VALERIA_MEMORIA.historial_rutas = VALERIA_MEMORIA.historial_rutas.slice(0, 60);
  }

  puntos.forEach(function(p) {
    var key = p.nombre;
    if (!VALERIA_MEMORIA.patrones_cliente[key]) {
      VALERIA_MEMORIA.patrones_cliente[key] = { ultimo_recorrido: '', veces_en_ruta: 0, tecnico_habitual: '' };
    }
    var pc = VALERIA_MEMORIA.patrones_cliente[key];
    pc.ultimo_recorrido = fechaHoy();
    pc.veces_en_ruta = (pc.veces_en_ruta || 0) + 1;
    if (p.tecnico) pc.tecnico_habitual = p.tecnico;
  });

  if (getRefreshToken()) {
    dbxUpload(DBX_VALERIA, JSON.stringify(VALERIA_MEMORIA, null, 2)).catch(function(e) {
      console.error('[PF] actualizarMemoriaValeria error:', e);
    });
  }
}

function _esConsultaValeria(texto) {
  // App-improvement requests must go to consultarValeria, NOT route creation.
  var esMejoras = /\b(mejor|mejora|suger|recomiend|implementa|funcionalidad|feature)\b/i.test(texto);
  if (esMejoras) return true;

  // Route-creation keywords take priority — even if the message contains "?"
  var crearRutaPatrones = /\b(pon|agrega|agregar|incluye|incluir|mete|meter|crea|crear|dame|haz|hacer|selecciona|seleccionar|a\xF1ade|a\xF1adir)\b/i;
  if (crearRutaPatrones.test(texto)) return false;

  var consultaPatrones = [
    /\bcu\xe1ndo\b/i, /\bqu\xe9 hicimos\b/i, /\bhistorial\b/i, /\brecordas\b/i,
    /\bfuimos a\b/i, /\ba d\xF3nde\b/i, /\bcu\xe1ntas veces\b/i, /\bqu\xe9 d\xEDa\b/i,
    /\bla \xFAltima vez\b/i, /\bme recuerdas\b/i, /\bmuestra\b/i, /\bcu\xe1l es\b/i,
    /\bcu\xe1nto\b/i, /\bcu\xe1ntos\b/i
  ];
  for (var i = 0; i < consultaPatrones.length; i++) {
    if (consultaPatrones[i].test(texto)) return true;
  }
  return false;
}

function consultarValeria(texto) {
  agregarBurbuja('valeria', '⏳ Pensando...', 'thinking');

  var hoy = new Date();
  var hace30 = new Date(hoy.getTime() - 30 * 24 * 60 * 60 * 1000);

  var historialReciente = (VALERIA_MEMORIA.historial_rutas || []).filter(function(h) {
    var partes = (h.fecha || '').split('/');
    if (partes.length !== 3) return false;
    var d = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
    return d >= hace30;
  }).slice(0, 15);

  // Limit to first 150 clients to keep the prompt compact
  var MAX_CLIENTES_CTX = 150;
  var clientesCtx = CLIENTES_DISPONIBLES.slice(0, MAX_CLIENTES_CTX).map(function(c, i) {
    var vis = VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado ? 'VISITADO' : 'PENDIENTE';
    var patron = VALERIA_MEMORIA.patrones_cliente && VALERIA_MEMORIA.patrones_cliente[c.nombre];
    var extra = patron ? ' [veces:' + (patron.veces_en_ruta || 0) + ',\xFAltima:' + (patron.ultimo_recorrido || '—') + ']' : '';
    return i + '. [' + (c.esKfc ? 'KFC' : 'OTRO') + '] ' + c.nombre
      + (c.local ? ' (' + c.local + ')' : '') + ' - ' + c.direccion + ' [' + vis + ']' + extra;
  }).join('\n');
  if (CLIENTES_DISPONIBLES.length > MAX_CLIENTES_CTX) {
    clientesCtx += '\n... y ' + (CLIENTES_DISPONIBLES.length - MAX_CLIENTES_CTX) + ' m\xE1s';
  }

  var historialCtx = historialReciente.map(function(h) {
    var tecCtx = '';
    if (h.tecnicos) {
      tecCtx = ' | T\xe9cnicos: ' + Object.keys(h.tecnicos).map(function(t) {
        return t + '(' + (h.tecnicos[t] || []).join(',') + ')';
      }).join('; ');
    }
    return h.fecha + ': "' + (h.instruccion || '') + '" → ' + (h.clientes || []).join(', ') + tecCtx;
  }).join('\n');

  var esMejoras = /mejor[ao]|implementa|funcionalidad|feature|sugiere|recomienda|cambio|app|sistema|necesitamos/i.test(texto);
  var DIAS_SEMANA = ['domingo','lunes','martes','mi\xE9rcoles','jueves','viernes','s\xE1bado'];
  var diaSemana = DIAS_SEMANA[new Date().getDay()];

  var systemMsg = 'Eres Valeria, asistente inteligente de Previfuego (empresa de mantenimiento de extintores en Ecuador). '
    + 'Tienes acceso al historial de rutas y datos de clientes. '
    + 'Hoy es ' + diaSemana + ' ' + fechaHoy() + '. '
    + 'Responde en espa\xF1ol de forma concisa, \xFAtil y proactiva. '
    + 'Si te preguntan por clientes pendientes, agr\xFApalos por zona o ciudad. '
    + 'Si te piden crear una ruta, incluye el tiempo estimado (15min \xD7 n clientes) y responde con exactamente '
    + 'CREAR_RUTA: seguido del array JSON de \xEDndices. '
    + (esMejoras
      ? 'Si te piden sugerencias de mejoras para la app, analiza el historial de uso y los patrones de clientes, '
        + 'y genera una lista numerada de mejoras CONCRETAS y ESPEC\xCDFICAS basadas en los datos reales. '
        + 'Termina tu respuesta con este bloque exacto para que el administrador lo pueda copiar a Claude:\n'
        + '--- INSTRUCCIÓN PARA CLAUDE ---\n'
        + '[aquí escribe en imperativo las mejoras a implementar, siendo muy específico con cada feature]\n'
        + '--- FIN INSTRUCCIÓN ---\n'
      : '')
    + 'Siempre firma tus respuestas como "Valeria 🤖".';

  var userMsg = '=== HISTORIAL \xDALTIMOS 30 D\xCDAS ===\n' + (historialCtx || '(sin historial)') + '\n\n'
    + '=== CLIENTES DEL MES (con estado de visita y patrones) ===\n' + (clientesCtx || '(sin clientes)') + '\n\n'
    + '=== PREGUNTA DEL ADMINISTRADOR ===\n' + texto;

  _llamarGroq([
    { role: 'system', content: systemMsg },
    { role: 'user', content: userMsg }
  ], 4096, 0.2)
  .then(function(d) {
    eliminarBurbujaThinking();
    if (d.error) throw new Error(d.error.message || 'Error Groq API');
    var choice = (d.choices || [])[0] || {};
    if (choice.finish_reason === 'length') {
      agregarBurbuja('valeria', '⚠️ Respuesta incompleta (l\xEDmite de tokens). Intenta con una instrucci\xF3n m\xE1s corta.');
      return;
    }
    var text = (choice.message && choice.message.content ? choice.message.content : '').trim();

    if (text.trim().indexOf('CREAR_RUTA:') === 0) {
      var jsonPart = text.slice('CREAR_RUTA:'.length).trim();
      var match = jsonPart.match(/\[[\d,\s,-]*\]/);
      if (match) {
        var indices = JSON.parse(match[0]);
        RUTA_PREVIEW = indices
          .filter(function(i) { return Number.isInteger(i) && i >= 0 && i < CLIENTES_DISPONIBLES.length; })
          .map(function(i) { return Object.assign({}, CLIENTES_DISPONIBLES[i]); });
        if (RUTA_PREVIEW.length) {
          agregarBurbuja('valeria', '✅ Selecci\xF3n lista: ' + RUTA_PREVIEW.length + ' cliente(s). Revisa la vista previa abajo.');
          renderRutaPreview();
          return;
        }
      }
      agregarBurbuja('valeria', '⚠️ No encontr\xE9 clientes que coincidan con esa instrucci\xF3n.');
    } else {
      agregarBurbuja('valeria', text || '⚠️ Sin respuesta.');
    }
  })
  .catch(function(err) {
    eliminarBurbujaThinking();
    agregarBurbuja('valeria', '❌ Error al consultar: ' + String(err));
    console.error('[PF] consultarValeria error:', err);
  });
}

function enviarMensajeValeria() {
  var input = document.getElementById('valeria-input');
  if (!input) return;
  var texto = input.value.trim();
  if (!texto) return;
  input.value = '';
  agregarBurbuja('usuario', texto);
  _agregarChipHistorial(texto);

  if (!CLIENTES_DISPONIBLES.length) {
    agregarBurbuja('valeria', '⚠️ Primero carga los clientes desde el tab Clientes.');
    return;
  }

  if (_esConsultaValeria(texto)) {
    consultarValeria(texto);
  } else {
    procesarInstruccionVoz(texto);
  }
}

function valeriaTecla(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    enviarMensajeValeria();
  }
}

function agregarBurbuja(quien, texto, clase) {
  VALERIA_CHAT.push({ quien: quien, texto: texto, clase: clase || '' });
  renderChat();
}

function eliminarBurbujaThinking() {
  VALERIA_CHAT = VALERIA_CHAT.filter(function(b) { return b.clase !== 'thinking'; });
  renderChat();
}

function renderChat() {
  var chat = document.getElementById('valeria-chat');
  if (!chat) return;
  var html = '';
  VALERIA_CHAT.forEach(function(b, idx) {
    var esUsuario = b.quien === 'usuario';
    var tieneInstruccion = !esUsuario && b.texto && b.texto.indexOf('--- INSTRUCCIÓN PARA CLAUDE ---') !== -1;
    var textoHtml = esc(b.texto).replace(/\n/g, '<br>');
    if (tieneInstruccion) {
      textoHtml = textoHtml
        .replace('--- INSTRUCCIÓN PARA CLAUDE ---', '<strong style="color:#7c3aed">--- INSTRUCCIÓN PARA CLAUDE ---</strong>')
        .replace('--- FIN INSTRUCCIÓN ---', '<strong style="color:#7c3aed">--- FIN INSTRUCCIÓN ---</strong>');
    }
    html += '<div class="chat-burbuja ' + (esUsuario ? 'chat-usuario' : 'chat-valeria') + (b.clase ? ' chat-' + b.clase : '') + '">'
      + '<div class="chat-texto">' + textoHtml + '</div>'
      + (tieneInstruccion ? '<button class="btn-copiar-instruccion" onclick="copiarInstruccionClaude(' + idx + ')">📋 Copiar instrucción para Claude</button>' : '')
      + '</div>';
  });
  chat.innerHTML = html;
  chat.scrollTop = chat.scrollHeight;
}

function copiarInstruccionClaude(idx) {
  var b = VALERIA_CHAT[idx];
  if (!b) return;
  var inicio = b.texto.indexOf('--- INSTRUCCIÓN PARA CLAUDE ---');
  var fin = b.texto.indexOf('--- FIN INSTRUCCIÓN ---');
  var instruccion = fin > inicio
    ? b.texto.slice(inicio, fin + '--- FIN INSTRUCCIÓN ---'.length)
    : b.texto.slice(inicio);
  navigator.clipboard.writeText(instruccion).then(function() {
    showToast('✅ Instrucción copiada al portapapeles');
  }).catch(function() {
    var ta = document.createElement('textarea');
    ta.value = instruccion;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('✅ Instrucción copiada');
  });
}

function _agregarChipHistorial(texto) {
  _chipHistorial = _chipHistorial.filter(function(c) { return c !== texto; });
  _chipHistorial.unshift(texto);
  if (_chipHistorial.length > 5) _chipHistorial = _chipHistorial.slice(0, 5);
  var cont = document.getElementById('valeria-chips');
  if (!cont) return;
  var html = '';
  _chipHistorial.forEach(function(c) {
    html += '<button class="valeria-chip" onclick="usarChip(this.getAttribute(\'data-val\'))" data-val="' + esc(c) + '">' + esc(c) + '</button>';
  });
  cont.innerHTML = html;
}

function usarChip(texto) {
  var input = document.getElementById('valeria-input');
  if (input) { input.value = texto; input.focus(); }
}

/* ===================================================
   DROPBOX FILE HELPERS
=================================================== */
function dbxDownload(path) {
  return _retryBackoff(function() {
    return getValidToken().then(function(token) {
      return fetch('https://content.dropboxapi.com/2/files/download', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Dropbox-API-Arg': JSON.stringify({ path: path })
        }
      }).then(function(r) {
        if (r.status === 401) throw new Error('Tu sesi\xF3n de Dropbox expir\xF3, reconecta en ⚙️ Config');
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
  }, 3);
}

function dbxUpload(path, content) {
  return _retryBackoff(function() {
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
        if (r.status === 401) throw new Error('Tu sesi\xF3n de Dropbox expir\xF3, reconecta en ⚙️ Config');
        if (!r.ok) throw new Error('Dropbox upload error ' + r.status);
        return r.json();
      });
    });
  }, 3);
}

/* Retry a promise-returning fn with exponential backoff: 2s, 4s, 8s */
function _retryBackoff(fn, maxIntentos) {
  maxIntentos = maxIntentos || 3;
  return new Promise(function(resolve, reject) {
    var intento = 0;
    function run() {
      fn().then(resolve).catch(function(err) {
        intento++;
        var msg = String(err && err.message || err);
        // Don't retry auth/expired errors — surface immediately
        if (intento >= maxIntentos || /expir|reconecta|invalid_grant/i.test(msg)) { reject(err); return; }
        setTimeout(run, Math.pow(2, intento) * 1000);
      });
    }
    run();
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
var MESES_NUM = {'1':'ENERO','2':'FEBRERO','3':'MARZO','4':'ABRIL','5':'MAYO','6':'JUNIO',
  '7':'JULIO','8':'AGOSTO','9':'SEPTIEMBRE','10':'OCTUBRE','11':'NOVIEMBRE','12':'DICIEMBRE',
  '01':'ENERO','02':'FEBRERO','03':'MARZO','04':'ABRIL','05':'MAYO','06':'JUNIO',
  '07':'JULIO','08':'AGOSTO','09':'SEPTIEMBRE','10':'OCTUBRE','11':'NOVIEMBRE','12':'DICIEMBRE'};

function parseExcel(buf) {
  var wb = XLSX.read(buf, { type: 'array' });
  var allRows = [];
  wb.SheetNames.forEach(function(sheetName) {
    var ws = wb.Sheets[sheetName];
    var rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
    rows.forEach(function(r) { r.__sheet = sheetName; });
    allRows = allRows.concat(rows);
  });
  return allRows;
}

function parseExcelOtros(buf, mesSeleccionado) {
  var wb = XLSX.read(buf, { type: 'array' });
  var sheetTarget = null;
  // Map abbreviated month names to full names
  var MESES_ABREV = {
    'ENE':'ENERO','FEB':'FEBRERO','MAR':'MARZO','ABR':'ABRIL','MAY':'MAYO','JUN':'JUNIO',
    'JUL':'JULIO','AGO':'AGOSTO','SEP':'SEPTIEMBRE','SEPT':'SEPTIEMBRE','OCT':'OCTUBRE',
    'NOV':'NOVIEMBRE','DIC':'DICIEMBRE'
  };
  wb.SheetNames.forEach(function(name) {
    var upper = name.trim().toUpperCase();
    // Normalize by stripping digits/spaces/special chars to get the base word
    var base = upper.replace(/[^A-ZÁÉÍÓÚÑ]/g, '');
    var fullName = MESES_ABREV[base] || base;
    // Also try normalizarMes
    var normalized = normalizarMes(name.trim());
    if (upper === mesSeleccionado || normalized === mesSeleccionado ||
        fullName === mesSeleccionado || upper.indexOf(mesSeleccionado) !== -1 ||
        mesSeleccionado.indexOf(base) !== -1) {
      sheetTarget = name;
    }
  });
  var sheetsToRead = sheetTarget ? [sheetTarget] : wb.SheetNames;
  var clientes = [];
  sheetsToRead.forEach(function(sheetName) {
    var ws = wb.Sheets[sheetName];
    var raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    var nombreActual = '';
    raw.forEach(function(row) {
      var colA = String(row[0] || '').trim();
      var colC = String(row[2] || '').trim();
      var colD = String(row[3] || '').trim();
      if (colA) nombreActual = colA;
      if (!nombreActual) return;
      if (!colC && !colD) return;
      clientes.push({
        nombre:     nombreActual,
        direccion:  '',
        extintores: parseInt(colD) || 0,
        mes:        sheetTarget ? mesSeleccionado : normalizarMes(sheetName),
        local:      colC,
        marca:      colC,
        esKfc:      false
      });
    });
  });
  return clientes;
}

function normalizarMes(val) {
  var s = String(val).trim();
  if (!s || s === 'undefined' || s === 'null') return '';
  if (MESES_NUM[s]) return MESES_NUM[s];
  var up = s.toUpperCase();
  // Handle "ENE", "FEB", abbreviations
  var ABREV = {'ENE':'ENERO','FEB':'FEBRERO','MAR':'MARZO','ABR':'ABRIL','MAY':'MAYO','JUN':'JUNIO',
    'JUL':'JULIO','AGO':'AGOSTO','SEP':'SEPTIEMBRE','SEPT':'SEPTIEMBRE','OCT':'OCTUBRE',
    'NOV':'NOVIEMBRE','DIC':'DICIEMBRE'};
  if (ABREV[up]) return ABREV[up];
  // Handle "JUN-26", "JUNIO 2026", "JUNIO/2026" etc — extract first word
  var word = up.split(/[\s\-\/\.\_]/)[0].replace(/[^A-Z]/g,'');
  if (ABREV[word]) return ABREV[word];
  // Handle full names with trailing year or spaces
  var FULL = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
  for (var i = 0; i < FULL.length; i++) {
    if (up.indexOf(FULL[i]) !== -1) return FULL[i];
  }
  return up;
}

function normalizarCliente(row, esKfc) {
  var cols = Object.keys(row);
  function get() {
    for (var i = 0; i < arguments.length; i++) {
      var v = row[arguments[i]];
      if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim();
    }
    return '';
  }
  var nombre = get('NOMBRE_LOCAL','CLIENTE','Cliente','NOMBRE','Nombre',
                   'RAZON SOCIAL','Raz\xF3n Social','RAZON_SOCIAL','RAZ\xD3N SOCIAL',
                   'EMPRESA','Empresa','ESTABLECIMIENTO','Establecimiento',
                   'RAZON','Razon','DENOMINACION','Denominacion');
  if (!nombre) {
    var nameCols = cols.filter(function(c) {
      return /nombre|cliente|razon|empresa|local|establec/i.test(c);
    });
    if (nameCols.length) nombre = String(row[nameCols[0]] || '').trim();
  }
  var dir = get('UBICACI\xD3N','UBICACION','DIRECCION','Direcci\xF3n','DIRECCI\xD3N',
                'DIR','Direccion','DIREC','direccion','DOMICILIO','Domicilio');
  var ciudad = get('CIUDAD','Ciudad','ciudad','CANTON','PROVINCIA');
  var ext = get('EXTINTORES','Extintores','CAPACIDAD','CANTIDAD','Cantidad',
                'EXT','N_EXT','TOTAL','Total','NUMERO','N\xFAmero','CANT');
  var mes = get('MES_SERVICIO','MES','Mes','mes','MES_CONTRATO','PERIODO','Periodo');
  var local = get('LOCAL','Local','LOCAL_KFC','Sucursal','SUCURSAL','TIPO','Tipo','ZONA','Zona');
  var marca = get('MARCA','Marca','TIPO_EXT','TIPO EXTINTOR');
  return {
    nombre:     nombre,
    direccion:  dir + (ciudad ? (dir ? ' — ' : '') + ciudad : ''),
    extintores: parseInt(ext) || 0,
    mes:        normalizarMes(mes),
    local:      local,
    marca:      marca,
    esKfc:      !!esKfc
  };
}

function deduplicarClientes(lista) {
  var mapa = {};
  var orden = [];
  lista.forEach(function(c) {
    if (!c.nombre) return;
    var key = c.nombre.toLowerCase().trim();
    if (!mapa[key]) {
      mapa[key] = Object.assign({}, c, { tipos: [], extintores: 0 });
      orden.push(key);
    }
    mapa[key].tipos.push({ tipo: c.local || '', marca: c.marca || '', cap: c.extintores });
    if (!mapa[key].direccion && c.direccion) mapa[key].direccion = c.direccion;
    mapa[key].extintores += c.extintores;
  });
  return orden.map(function(k) { return mapa[k]; });
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

function fechaMas(dias) {
  var d = new Date();
  d.setDate(d.getDate() + dias);
  var dd = String(d.getDate()).padStart(2, '0');
  var mm = String(d.getMonth() + 1).padStart(2, '0');
  return dd + '/' + mm + '/' + d.getFullYear();
}

function mostrarCargando(show) {
  var el = document.getElementById('cargando');
  if (el) el.classList[show ? 'remove' : 'add']('hidden');
  document.body.style.overflow = show ? 'hidden' : '';
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
  btn.onclick = function() { overlay.classList.add('hidden'); document.body.style.overflow = ''; };
  actEl.appendChild(btn);
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
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
  btnCancel.onclick = function() { overlay.classList.add('hidden'); document.body.style.overflow = ''; };
  var btnOk = document.createElement('button');
  btnOk.className = 'btn-primary';
  btnOk.textContent = 'Confirmar';
  btnOk.onclick = function() {
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    if (typeof cb === 'function') cb();
  };
  actEl.appendChild(btnCancel);
  actEl.appendChild(btnOk);
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function showToast(msg) {
  _toastQueue.push(msg);
  if (_toastQueue.length > 3) _toastQueue = _toastQueue.slice(-3);
  if (!_toastShowing) _processToastQueue();
}

function _processToastQueue() {
  if (!_toastQueue.length) { _toastShowing = false; return; }
  _toastShowing = true;
  var msg = _toastQueue.shift();
  var el = document.getElementById('toast');
  if (!el) { _toastShowing = false; return; }
  el.textContent = msg;
  el.classList.add('visible');
  if (_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function() {
    el.classList.remove('visible');
    setTimeout(_processToastQueue, 350);
  }, 2800);
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
  var savedRaul = localStorage.getItem('pf_nombre_raul');
  var savedJuan = localStorage.getItem('pf_nombre_juan');
  if (savedRaul) USUARIOS.raul.nombre = savedRaul;
  if (savedJuan) USUARIOS.juan.nombre = savedJuan;

  USUARIO_ACTUAL = usuario;
  localStorage.setItem('pf_usuario', usuario);
  if (USUARIOS[usuario].esAdmin) {
    var fechaEl = document.getElementById('admin-fecha');
    if (fechaEl) fechaEl.textContent = fechaHoy();
    showScreen('sadmin');
    var mesSelect = document.getElementById('admin-mes');
    if (mesSelect) {
      var meses = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
      var mesGuardado = localStorage.getItem('pf_mes_seleccionado');
      mesSelect.value = (mesGuardado && meses.indexOf(mesGuardado) !== -1) ? mesGuardado : meses[new Date().getMonth()];
    }
    sincronizarConfig();
    sincronizarValeria();
    actualizarEstadoConexion();
    cargarClientes();
    _initAdminRutaStatus();
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
  VALERIA_CHAT = [];
  _chipHistorial = [];
  _clientesFiltro = '';
  localStorage.removeItem('pf_usuario');
  switchTab('clientes');
  showScreen('s0');
}

function _initAdminRutaStatus() {
  if (!getRefreshToken()) return;
  dbxDownloadJSON(DBX_RECORRIDOS).then(function(rec) {
    var hoy = rec[fechaHoy()];
    if (!hoy || !hoy.puntos || !hoy.puntos.length) return;
    var total = hoy.puntos.length;
    var done = hoy.puntos.filter(function(p) { return p.done; }).length;
    var el = document.getElementById('admin-ruta-status');
    if (el) {
      el.textContent = done + '/' + total;
      el.classList.remove('hidden');
    }
  }).catch(function() {});
}

/* ===================================================
   ADMIN — TABS
=================================================== */
function switchTab(tab) {
  ['clientes', 'valeria', 'seguimiento', 'config'].forEach(function(t) {
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
  if (tab === 'valeria' && VALERIA_CHAT.length === 0) {
    agregarBurbuja('valeria', 'Hola! Soy Valeria 🤖 Puedo crear rutas por voz o texto, y responder preguntas sobre el historial. \xBFQu\xE9 necesitas hoy?');
  }
}

/* ===================================================
   ADMIN — CLIENTES DEL MES
=================================================== */
function _claveMesActual() {
  var mesEl = document.getElementById('admin-mes');
  var mes = mesEl ? mesEl.value : 'JUNIO';
  return mes + '_' + new Date().getFullYear();
}

function _mostrarOverlayClientes(show) {
  var cont = document.getElementById('clientes-mes-lista');
  if (!cont) return;
  var ov = document.getElementById('clientes-loading-overlay');
  if (show) {
    cont.style.position = 'relative';
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'clientes-loading-overlay';
      ov.className = 'clientes-loading-overlay';
      ov.innerHTML = '<div class="spinner-sm"></div><span>Actualizando...</span>';
      cont.appendChild(ov);
    }
    ov.style.display = 'flex';
  } else if (ov) {
    ov.style.display = 'none';
  }
}

/* Error log — keep last 10 errors in localStorage */
function _logError(contexto, err) {
  try {
    var log = JSON.parse(localStorage.getItem('pf_error_log') || '[]');
    log.unshift({ ts: new Date().toLocaleString('es-EC'), ctx: contexto, msg: String(err && err.message || err) });
    if (log.length > 10) log = log.slice(0, 10);
    localStorage.setItem('pf_error_log', JSON.stringify(log));
  } catch(e) {}
}

function cargarClientes() {
  if (!getRefreshToken()) {
    var cont = document.getElementById('clientes-mes-lista');
    if (cont) cont.innerHTML = '<div class="no-clientes"><strong>⚠️ Conecta Dropbox primero</strong><br><small>Ve al tab ⚙️ Config y pulsa "Conectar con Dropbox".</small><br><button class="btn-primary" style="margin-top:12px" onclick="switchTab(\'config\')">Ir a Config</button></div>';
    return;
  }
  var mesEl = document.getElementById('admin-mes');
  var mes = mesEl ? mesEl.value : '';
  if (mes) localStorage.setItem('pf_mes_seleccionado', mes);

  var teniaDatos = CLIENTES_DISPONIBLES && CLIENTES_DISPONIBLES.length > 0;

  // Bug fix: when reloading (e.g. month change) keep current clients visible and
  // show a non-destructive overlay instead of clearing. Skeleton only on empty load.
  var sk = document.getElementById('skeleton-lista');
  if (teniaDatos) {
    _mostrarOverlayClientes(true);
  } else {
    if (sk) sk.style.display = 'flex';
    mostrarCargando(true);
  }

  Promise.all([
    dbxDownload(DBX_KFC_PATH).then(function(buf) { return buf ? parseExcel(buf) : []; }),
    dbxDownload(DBX_OTROS_PATH).then(function(buf) { return buf ? parseExcelOtros(buf, mes) : []; }),
    dbxDownloadJSON(DBX_VISITAS)
  ])
  .then(function(results) {
    mostrarCargando(false);
    _mostrarOverlayClientes(false);
    if (sk) sk.style.display = 'none';
    var rawKfc   = results[0];
    var rawOtros = results[1];
    var normKfc = rawKfc.map(function(r) { return normalizarCliente(r, true); });
    var kfcFiltrado = normKfc.filter(function(c) {
      if (!c.nombre) return false;
      if (!mes) return true;
      if (!c.mes) return true;
      return c.mes === mes;
    });
    var kfc   = deduplicarClientes(kfcFiltrado);
    var otros = deduplicarClientes(rawOtros.filter(function(c) { return !!c.nombre; }));
    CLIENTES_DISPONIBLES = kfc.concat(otros);
    if (CLIENTES_DISPONIBLES.length > 0) {
      try { localStorage.setItem('pf_clientes_cache', JSON.stringify(CLIENTES_DISPONIBLES)); } catch(e) {}
    } else {
      localStorage.removeItem('pf_clientes_cache');
    }
    var claveMes = _claveMesActual();
    VISITAS_MES = (results[2] || {})[claveMes] || {};
    if (!CLIENTES_DISPONIBLES.length) {
      var mesesEnKfc   = rawKfc.length   ? Array.from(new Set(rawKfc.slice(0,100).map(function(r){ return normalizarMes(r['MES_SERVICIO']||r['MES']||''); }).filter(Boolean))).slice(0,8).join(', ') : '';
      var mesesEnOtros = rawOtros.length ? Array.from(new Set(rawOtros.slice(0,100).map(function(r){ var m=r['MES']||r['Mes']||r['MES_CONTRATO']||r['PERIODO']||''; return normalizarMes(m); }).filter(Boolean))).slice(0,8).join(', ') : '';
      var cDebug = document.getElementById('clientes-mes-lista');
      var debugMsg = 'KFC: ' + rawKfc.length + ' filas — Otros: ' + rawOtros.length + ' filas'
        + '\nFiltro mes: "' + mes + '"'
        + (rawKfc.length   ? '\nColumnas KFC: '   + Object.keys(rawKfc[0]).join(', ')   : '')
        + (rawOtros.length ? '\nColumnas OTROS: '  + Object.keys(rawOtros[0]).join(', ') : '')
        + (mesesEnKfc   ? '\nMeses KFC: '   + mesesEnKfc   : '')
        + (mesesEnOtros ? '\nMeses OTROS: ' + mesesEnOtros : '')
        + '\nRuta KFC: ' + DBX_KFC_PATH
        + '\nRuta Otros: ' + DBX_OTROS_PATH;
      if (cDebug) cDebug.innerHTML = '<div class="no-clientes"><strong>Sin clientes para este mes.</strong><br><small style="white-space:pre-wrap;font-size:11px;color:#555">' + esc(debugMsg) + '</small></div>';
      return;
    }
    renderClientesMes();
    try { sugerenciaProactiva(); } catch(e) {}
  })
  .catch(function(err) {
    mostrarCargando(false);
    _mostrarOverlayClientes(false);
    if (sk) sk.style.display = 'none';
    _logError('cargarClientes', err);
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
  if (_guardarVisitasTimer) clearTimeout(_guardarVisitasTimer);
  _guardarVisitasTimer = setTimeout(function() {
    dbxDownloadJSON(DBX_VISITAS)
    .catch(function() { return {}; })
    .then(function(data) { data[_claveMesActual()] = VISITAS_MES; return dbxUpload(DBX_VISITAS, JSON.stringify(data, null, 2)); })
    .catch(function(e) { console.error('[PF] guardarVisitas error:', e); });
  }, 500);
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

function marcarTodosKfc() {
  pfConfirm('Marcar todos KFC', '\xBFMarcar todos los clientes KFC como visitados?', function() {
    CLIENTES_DISPONIBLES.forEach(function(c) {
      if (c.esKfc) VISITAS_MES[c.nombre] = { visitado: true, fecha: fechaHoy() };
    });
    renderClientesMes();
    _guardarVisitas();
    showToast('✅ Todos los KFC marcados como visitados');
  });
}

function marcarTodosOtros() {
  pfConfirm('Marcar todos Otros', '\xBFMarcar todos los clientes Otros como visitados?', function() {
    CLIENTES_DISPONIBLES.forEach(function(c) {
      if (!c.esKfc) VISITAS_MES[c.nombre] = { visitado: true, fecha: fechaHoy() };
    });
    renderClientesMes();
    _guardarVisitas();
    showToast('✅ Todos los Otros marcados como visitados');
  });
}

function exportarVisitados() {
  var visitados = CLIENTES_DISPONIBLES.filter(function(c) {
    return VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado;
  });
  if (!visitados.length) { showToast('⚠️ No hay visitados a\xFAn'); return; }
  var texto = 'Clientes visitados ' + _claveMesActual() + ':\n'
    + visitados.map(function(c) { return '- ' + c.nombre + ' (' + (VISITAS_MES[c.nombre].fecha || '') + ')'; }).join('\n');
  if (navigator.clipboard) {
    navigator.clipboard.writeText(texto).then(function() { showToast('✅ Lista copiada al portapapeles'); });
  } else {
    pfModal('Lista visitados', texto);
  }
}

var _filtroClientesTimer = null;
function filtrarClientesMes() {
  var input = document.getElementById('clientes-buscar');
  _clientesFiltro = input ? input.value.trim().toLowerCase() : '';
  if (_filtroClientesTimer) clearTimeout(_filtroClientesTimer);
  _filtroClientesTimer = setTimeout(renderClientesMes, 300);
}

function scrollToTop() {
  var lista = document.getElementById('tab-clientes');
  if (lista) lista.scrollTop = 0;
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

  var lista = CLIENTES_DISPONIBLES;
  if (_clientesFiltro) {
    lista = lista.filter(function(c) {
      return c.nombre.toLowerCase().indexOf(_clientesFiltro) !== -1
        || (c.direccion || '').toLowerCase().indexOf(_clientesFiltro) !== -1;
    });
  }

  var kfcList   = lista.filter(function(c) { return c.esKfc; });
  var otrosList = lista.filter(function(c) { return !c.esKfc; });
  var kfcVisit  = kfcList.filter(function(c) { return VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado; }).length;
  var otroVisit = otrosList.filter(function(c) { return VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado; }).length;
  var totalVisit = kfcVisit + otroVisit;
  var totalPend  = lista.length - totalVisit;

  var pctMes = lista.length > 0 ? Math.round(totalVisit / lista.length * 100) : 0;
  var mesElLbl = document.getElementById('admin-mes');
  var mesLbl = mesElLbl ? mesElLbl.value : '';

  if (stats) {
    stats.innerHTML = '<div class="mes-cargado-chip">📅 Cargado: ' + esc(mesLbl) + ' ' + new Date().getFullYear() + '</div>'
      + '<div class="mes-progress"><div class="mes-progress-bar" style="width:' + pctMes + '%"></div></div>'
      + '<div class="mes-progress-label">' + pctMes + '% del mes completado</div>'
      + '<div class="mes-stats">'
      + '<span class="mes-stat-ok">✓ ' + totalVisit + ' visitados</span>'
      + '<span class="mes-stat-pend">⏳ ' + totalPend + ' pendientes</span>'
      + '</div>'
      + '<div class="mes-stats" style="margin-top:4px">'
      + '<span class="mes-stat-kfc">KFC: ' + kfcVisit + '/' + kfcList.length + '</span>'
      + '<span class="mes-stat-otros">Otros: ' + otroVisit + '/' + otrosList.length + '</span>'
      + '</div>'
      + '<div class="mes-archivos">'
      + '📂 KFC: <code>' + esc(DBX_KFC_PATH.split('/').pop()) + '</code> &nbsp;|&nbsp; '
      + 'Otros: <code>' + esc(DBX_OTROS_PATH.split('/').pop()) + '</code>'
      + '</div>';
  }

  var visitados  = lista.filter(function(c) { return VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado; });
  var pendientes = lista.filter(function(c) { return !(VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado); });

  // Update pending count badge on Clientes tab button
  var pendBadge = document.getElementById('tab-badge-clientes');
  if (pendBadge) {
    if (pendientes.length > 0) { pendBadge.textContent = pendientes.length; pendBadge.style.display = 'inline-block'; }
    else { pendBadge.style.display = 'none'; }
  }

  var html = '';
  if (_clientesQuickFilter !== 'visitados' && pendientes.length) {
    html += '<div class="clientes-grupo-header">⏳ Pendientes (' + pendientes.length + ')</div>';
    pendientes.forEach(function(c) {
      var globalIdx = CLIENTES_DISPONIBLES.indexOf(c);
      html += renderClienteMesCard(c, globalIdx, false);
    });
  }
  if (_clientesQuickFilter !== 'pendientes' && visitados.length) {
    html += '<div class="clientes-grupo-header">✓ Visitados (' + visitados.length + ')</div>';
    visitados.forEach(function(c) {
      var globalIdx = CLIENTES_DISPONIBLES.indexOf(c);
      html += renderClienteMesCard(c, globalIdx, true);
    });
  }
  if (!html) html = '<div class="no-clientes">Sin clientes para este filtro.</div>';
  cont.innerHTML = html;
}

var _clientesQuickFilter = 'todos';
function setQuickFilter(f) {
  _clientesQuickFilter = f;
  document.querySelectorAll('.quick-filter-pill').forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-filter') === f);
  });
  renderClientesMes();
}

function renderClienteMesCard(c, idx, visitado) {
  var badge  = c.esKfc ? '<span class="badge-kfc">KFC</span>' : '';
  var fechaV = visitado && VISITAS_MES[c.nombre] ? ' \xB7 ' + VISITAS_MES[c.nombre].fecha : '';
  var tiposHtml = '';
  if (c.tipos && c.tipos.length) {
    tiposHtml = '<div class="cliente-tipos">'
      + c.tipos.map(function(t) {
          var label = [t.tipo, t.marca].filter(Boolean).join(' ');
          return '<span class="cliente-tipo-tag">' + esc(label || '—') + (t.cap ? ' \xB7 ' + t.cap : '') + '</span>';
        }).join('')
      + '</div>';
  }

  // Alerta 30 dias sin recorrido
  var alerta30 = '';
  var patron = VALERIA_MEMORIA.patrones_cliente && VALERIA_MEMORIA.patrones_cliente[c.nombre];
  if (patron && patron.ultimo_recorrido && !visitado) {
    var partes = patron.ultimo_recorrido.split('/');
    if (partes.length === 3) {
      var ultimaVisita = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
      var diasPasados = Math.floor((new Date() - ultimaVisita) / (1000 * 60 * 60 * 24));
      if (diasPasados >= 30) alerta30 = ' <span class="alerta-30d">⚠️ ' + diasPasados + 'd</span>';
    }
  }

  var historialStr = '';
  if (patron && (patron.veces_en_ruta || patron.ultimo_recorrido)) {
    historialStr = '<div class="cliente-historial">'
      + (patron.veces_en_ruta ? '📅 ' + patron.veces_en_ruta + 'x' : '')
      + (patron.ultimo_recorrido ? ' \xB7 \xDAlt: ' + patron.ultimo_recorrido : '')
      + (patron.tecnico_habitual ? ' \xB7 ' + patron.tecnico_habitual : '')
      + '</div>';
  }

  var nombreHtml = _resaltar(c.nombre, _clientesFiltro);
  var dirHtml = c.direccion ? _resaltar(c.direccion, _clientesFiltro) : '';
  var tipoBorde = c.esKfc ? ' card-kfc' : ' card-otros';
  var ultVisStr = visitado && VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].fecha
    ? '<div class="cliente-ultvisita">🗓️ Última visita: ' + esc(VISITAS_MES[c.nombre].fecha) + '</div>' : '';

  return '<div class="cliente-mes-card' + (visitado ? ' visitado' : '') + tipoBorde + '">'
    + '<div class="cliente-mes-info">'
    +   '<div class="cliente-nombre">' + badge + ' ' + nombreHtml + alerta30 + '</div>'
    +   (dirHtml ? '<div class="cliente-dir">' + dirHtml + '</div>' : '')
    +   tiposHtml
    +   '<div class="cliente-ext">🧯 Total: ' + (c.extintores || '?') + ' extintor(es)</div>'
    +   ultVisStr
    +   historialStr
    + '</div>'
    + '<button class="btn-visitado' + (visitado ? ' btn-visitado-done' : '') + '" onclick="marcarVisitado(' + idx + ')">'
    +   (visitado ? '✓' + fechaV : 'Marcar')
    + '</button>'
    + '</div>';
}

function _resaltar(texto, filtro) {
  var safe = esc(texto || '');
  if (!filtro) return safe;
  try {
    var re = new RegExp('(' + filtro.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
    return safe.replace(re, '<mark class="hl">$1</mark>');
  } catch(e) { return safe; }
}

/* ===================================================
   ADMIN — VOZ + GROQ (used by Valeria)
=================================================== */
function iniciarVoz() {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    pfModal('No disponible', 'Tu navegador no soporta reconocimiento de voz. Usa Chrome en Android o iOS.');
    return;
  }
  if (!CLIENTES_DISPONIBLES.length) {
    pfModal('Sin clientes', 'Primero carga los clientes en el tab "Clientes".');
    return;
  }
  var btn = document.getElementById('btn-mic');
  if (_currentRec) {
    _currentRec.abort();
    _currentRec = null;
    if (btn) { btn.classList.remove('grabando'); btn.innerHTML = '🎤'; }
    return;
  }
  if (btn) { btn.classList.add('grabando'); btn.innerHTML = '⏹'; }

  var rec = new SpeechRecognition();
  _currentRec = rec;
  rec.lang = 'es-EC';
  rec.continuous = false;
  rec.interimResults = false;
  rec.onresult = function(e) {
    var texto = e.results[0][0].transcript;
    var conf = Math.round((e.results[0][0].confidence || 0) * 100);
    if (btn) { btn.classList.remove('grabando'); btn.innerHTML = '🎤'; }
    _currentRec = null;
    var input = document.getElementById('valeria-input');
    if (input) input.value = '';
    agregarBurbuja('usuario', texto + (conf ? ' (' + conf + '% confianza)' : ''));
    _agregarChipHistorial(texto);
    _ultimaInstruccionVoz = texto;
    if (_esConsultaValeria(texto)) {
      consultarValeria(texto);
    } else {
      procesarInstruccionVoz(texto);
    }
  };
  rec.onerror = function(e) {
    _currentRec = null;
    if (btn) { btn.classList.remove('grabando'); btn.innerHTML = '🎤'; }
    agregarBurbuja('valeria', '⚠️ Error de micr\xF3fono: ' + e.error);
  };
  rec.onend = function() {
    _currentRec = null;
    if (btn) { btn.classList.remove('grabando'); btn.innerHTML = '🎤'; }
  };
  rec.start();
}

function procesarInstruccionVoz(texto) {
  agregarBurbuja('valeria', '⏳ Procesando con Groq AI...', 'thinking');
  _ultimaInstruccionVoz = texto;

  var clientesCtx = CLIENTES_DISPONIBLES.map(function(c, i) {
    var visitado = VISITAS_MES[c.nombre] && VISITAS_MES[c.nombre].visitado ? 'VISITADO' : 'PENDIENTE';
    var patron = VALERIA_MEMORIA.patrones_cliente && VALERIA_MEMORIA.patrones_cliente[c.nombre];
    var extraCtx = patron ? ' [veces:' + (patron.veces_en_ruta||0) + ',\xFAlt:' + (patron.ultimo_recorrido||'—') + ',tecnico:' + (patron.tecnico_habitual||'—') + ']' : '';
    return i + '. [' + (c.esKfc ? 'KFC' : 'OTRO') + '] ' + c.nombre
      + (c.local ? ' (' + c.local + ')' : '') + ' - ' + c.direccion + ' [' + visitado + ']' + extraCtx;
  }).join('\n');

  var historialCtx = (VALERIA_MEMORIA.historial_rutas || []).slice(0, 10).map(function(h) {
    return h.fecha + ': ' + (h.clientes || []).join(', ');
  }).join('\n');

  var systemMsg = 'Eres Valeria, asistente de rutas para Previfuego. '
    + 'Responde \xDANICAMENTE con un array JSON de \xEDndices num\xE9ricos. Ejemplo: [0, 3, 7]. '
    + 'No incluyas ning\xFAn texto adicional.';

  var userMsg = 'Fecha actual: ' + fechaHoy() + '\n\n'
    + '=== HISTORIAL RECIENTE ===\n' + (historialCtx || '(sin historial)') + '\n\n'
    + '=== CLIENTES DISPONIBLES ===\n' + clientesCtx + '\n\n'
    + 'Instrucci\xF3n del administrador: "' + texto + '"\n\n'
    + 'Selecciona los clientes para el recorrido seg\xFAn la instrucci\xF3n y responde solo con el array JSON de \xEDndices.';

  _llamarGroq([
    { role: 'system', content: systemMsg },
    { role: 'user', content: userMsg }
  ], 2048, 0.1)
  .then(function(d) {
    eliminarBurbujaThinking();
    if (d.error) throw new Error(d.error.message || 'Error Groq API');
    var choice = (d.choices || [])[0] || {};
    var text = (choice.message && choice.message.content ? choice.message.content : '').trim();
    // Robust array parse: match full array, or a truncated one and salvage it
    var match = text.match(/\[[\d,\s-]*\]/);
    var arrStr;
    if (match) {
      arrStr = match[0];
    } else {
      var partial = text.match(/\[[\d,\s-]*/);
      if (!partial) throw new Error('Respuesta inesperada de Groq: ' + text.slice(0, 100));
      arrStr = partial[0].replace(/[,\s]+$/, '') + ']';
    }
    var indices = JSON.parse(arrStr);
    RUTA_PREVIEW = indices
      .filter(function(i) { return Number.isInteger(i) && i >= 0 && i < CLIENTES_DISPONIBLES.length; })
      .map(function(i) { return Object.assign({}, CLIENTES_DISPONIBLES[i]); });
    if (!RUTA_PREVIEW.length) {
      agregarBurbuja('valeria', '⚠️ No encontr\xE9 clientes para esa instrucci\xF3n.');
      return;
    }
    agregarBurbuja('valeria', '✅ ' + RUTA_PREVIEW.length + ' cliente(s) seleccionados. Asigna t\xE9cnicos en la vista previa y pulsa Publicar.');
    if (RUTA_PREVIEW.length > 20) {
      agregarBurbuja('valeria', '⚠️ Aviso: la ruta tiene m\xE1s de 20 puntos. Considera dividirla.');
    }
    renderRutaPreview();
  })
  .catch(function(err) {
    eliminarBurbujaThinking();
    agregarBurbuja('valeria', '❌ Error: ' + String(err));
    console.error('[PF] Groq error:', err);
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
    var patron = VALERIA_MEMORIA.patrones_cliente && VALERIA_MEMORIA.patrones_cliente[c.nombre];
    var histHtml = patron && patron.ultimo_recorrido
      ? '<div style="font-size:0.72rem;color:#888;margin-top:2px">📅 ' + (patron.veces_en_ruta||0) + 'x \xB7 \xDAlt: ' + patron.ultimo_recorrido + (patron.tecnico_habitual ? ' \xB7 ' + patron.tecnico_habitual : '') + '</div>'
      : '';
    var tecnicoHabitual = patron && patron.tecnico_habitual ? patron.tecnico_habitual : 'Ra\xFAl';
    var tecNombres = [USUARIOS.raul.nombre, USUARIOS.juan.nombre];
    var selectOpts = tecNombres.map(function(t) {
      return '<option' + (t === tecnicoHabitual ? ' selected' : '') + '>' + esc(t) + '</option>';
    }).join('');
    html += '<div class="ruta-preview-item">'
      + '<div class="ruta-preview-num">' + (i + 1) + '</div>'
      + '<div class="ruta-preview-info" style="flex:1;min-width:0">'
      +   '<div class="cliente-nombre">' + badge + esc(c.nombre) + (c.local ? ' \xB7 ' + esc(c.local) : '') + '</div>'
      +   '<div class="cliente-dir">' + esc(c.direccion) + '</div>'
      +   histHtml
      +   '<div style="margin-top:6px;display:flex;gap:8px;flex-wrap:wrap;align-items:center">'
      +     '<select class="opts-select" id="rtecnico-' + i + '" style="width:80px;font-size:0.82rem;padding:4px">' + selectOpts + '</select>'
      +     '<input type="text" id="rnota-' + i + '" class="opts-input" placeholder="Nota..." style="flex:1;font-size:0.78rem;padding:4px 8px;min-width:80px">'
      +     '<label style="font-size:0.75rem;display:flex;align-items:center;gap:4px;cursor:pointer;white-space:nowrap">'
      +       '<input type="checkbox" id="rpriority-' + i + '"> 🔴 Urgente'
      +     '</label>'
      +   '</div>'
      + '</div>'
      + '<button onclick="quitarPuntoPreview(' + i + ')" style="background:none;border:none;cursor:pointer;color:#bbb;font-size:1.1rem;padding:4px 6px;flex-shrink:0">✕</button>'
      + '</div>';
  });
  lista.innerHTML = html;
  wrap.style.display = 'flex';
  setTimeout(function() { if (wrap.scrollIntoView) wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 100);
}

function quitarPuntoPreview(i) {
  RUTA_PREVIEW.splice(i, 1);
  if (!RUTA_PREVIEW.length) {
    var wrap = document.getElementById('ruta-preview');
    if (wrap) wrap.style.display = 'none';
    return;
  }
  renderRutaPreview();
}

function agregarPuntoManual() {
  pfModal('Agregar punto manual', 'Para agregar un cliente que no est\xE1 en la base de datos, escr\xEDbelo en el chat: "agrega [nombre] en [dirección]".');
}

function limpiarPreview() {
  RUTA_PREVIEW = [];
  var wrap = document.getElementById('ruta-preview');
  if (wrap) wrap.style.display = 'none';
  _ultimaInstruccionVoz = '';
}

function compartirRutaWhatsApp() {
  if (!RUTA_PREVIEW.length) { showToast('No hay ruta para compartir'); return; }
  var texto = 'Recorrido Previfuego ' + fechaHoy() + ':\n';
  RUTA_PREVIEW.forEach(function(c, i) {
    var tecEl = document.getElementById('rtecnico-' + i);
    var tec = tecEl ? tecEl.value : '';
    texto += (i + 1) + '. ' + c.nombre + (c.direccion ? ' - ' + c.direccion : '') + (tec ? ' [' + tec + ']' : '') + '\n';
  });
  var url = 'https://wa.me/?text=' + encodeURIComponent(texto);
  window.open(url, '_blank');
}

function publicarRutaPreview() {
  if (!RUTA_PREVIEW.length) { pfModal('Sin ruta', 'Usa el micr\xF3fono o escribe para crear la ruta primero.'); return; }
  var mananaEl = document.getElementById('chk-manana');
  var fechaPublicar = (mananaEl && mananaEl.checked) ? fechaMas(1) : fechaHoy();
  var puntos = RUTA_PREVIEW.map(function(c, i) {
    var tecnicoEl  = document.getElementById('rtecnico-' + i);
    var notaEl     = document.getElementById('rnota-' + i);
    var priorityEl = document.getElementById('rpriority-' + i);
    return {
      nombre: c.nombre, direccion: c.direccion, extintores: c.extintores,
      local: c.local || '', esKfc: c.esKfc || false, mision: 'Mantenimiento',
      tecnico: tecnicoEl ? tecnicoEl.value : 'Ra\xFAl',
      nota: notaEl ? notaEl.value.trim() : '',
      urgente: priorityEl ? priorityEl.checked : false,
      done: false, enCamino: false, horaCompletado: null, observacion: ''
    };
  });
  pfConfirm('Publicar recorrido', 'Se publicar\xE1n ' + puntos.length + ' punto(s) para el ' + fechaPublicar + '. \xBFConfirmar?', function() {
    mostrarCargando(true);
    dbxDownloadJSON(DBX_RECORRIDOS)
    .then(function(recorridos) {
      var existing = recorridos[fechaPublicar];
      var existingPuntos = (existing && existing.puntos) ? existing.puntos : [];
      puntos = puntos.map(function(p) {
        var prev = existingPuntos.filter(function(e) { return e.nombre === p.nombre; })[0];
        if (prev && prev.done) { p.done = true; p.horaCompletado = prev.horaCompletado; p.observacion = prev.observacion || ''; }
        return p;
      });
      recorridos[fechaPublicar] = { fecha: fechaPublicar, publicado: new Date().toISOString(), puntos: puntos };
      return dbxUpload(DBX_RECORRIDOS, JSON.stringify(recorridos, null, 2));
    })
    .then(function() {
      mostrarCargando(false);
      actualizarMemoriaValeria(puntos, _ultimaInstruccionVoz);
      _resumenDiarioGroq(puntos);
      limpiarPreview();
      agregarBurbuja('valeria', '✅ Recorrido publicado para ' + fechaPublicar + ' con ' + puntos.length + ' punto(s). 🚀');
      _initAdminRutaStatus();
    })
    .catch(function(err) { mostrarCargando(false); pfModal('Error', 'No se pudo publicar: ' + String(err)); });
  });
}

/* ===================================================
   ADMIN — SEGUIMIENTO
=================================================== */
function iniciarSeguimiento() {
  detenerSeguimiento();
  pfRenderSeguimiento();
  _seguimientoInterval = setInterval(pfRenderSeguimiento, _seguimientoIntervaloSeg * 1000);
}

function detenerSeguimiento() {
  if (_seguimientoInterval) { clearInterval(_seguimientoInterval); _seguimientoInterval = null; }
}

function cambiarIntervaloSeguimiento() {
  var el = document.getElementById('seg-intervalo');
  if (el) _seguimientoIntervaloSeg = parseInt(el.value) || 30;
  if (_seguimientoInterval) { detenerSeguimiento(); iniciarSeguimiento(); }
}

function pfRenderSeguimiento() {
  dbxDownloadJSON(DBX_RECORRIDOS)
  .then(function(recorridos) {
    var hoy = recorridos[fechaHoy()];
    _segPuntosCache = hoy && hoy.puntos ? hoy.puntos : [];
    aplicarFiltroSeguimiento();
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

function aplicarFiltroSeguimiento() {
  var filtroTec = document.getElementById('seg-filtro-tecnico');
  var tec = filtroTec ? filtroTec.value : '';
  var puntos = tec ? _segPuntosCache.filter(function(p) { return p.tecnico === tec; }) : _segPuntosCache.slice();
  filtrarSeguimiento(puntos);
}

function filtrarSeguimiento(puntosBase) {
  var buscar = document.getElementById('seg-buscar');
  var q = buscar ? buscar.value.trim().toLowerCase() : '';
  var puntos = puntosBase !== undefined ? puntosBase : _segPuntosCache.slice();
  if (q) {
    puntos = puntos.filter(function(p) {
      return (p.nombre || '').toLowerCase().indexOf(q) !== -1
        || (p.tecnico || '').toLowerCase().indexOf(q) !== -1;
    });
  }
  renderTablaSeguimiento(puntos);
}

function imprimirSeguimiento() {
  window.print();
}

function renderTablaSeguimiento(puntos) {
  var tbody    = document.getElementById('seg-tbody');
  var counters = document.getElementById('seg-counters');
  if (!tbody || !counters) return;
  if (!puntos || !puntos.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#aaa;padding:20px">Sin recorrido publicado hoy.</td></tr>';
    counters.innerHTML = '';
    return;
  }
  var tecnicos = {};
  puntos.forEach(function(p) {
    var t = p.tecnico || '—';
    if (!tecnicos[t]) tecnicos[t] = { done: 0, total: 0, enCamino: 0, ext: 0 };
    tecnicos[t].total++;
    if (p.done) tecnicos[t].done++;
    if (p.enCamino && !p.done) tecnicos[t].enCamino++;
    tecnicos[t].ext += (p.extintores || 0);
  });
  var cHtml = '';
  for (var tc in tecnicos) {
    if (!tecnicos.hasOwnProperty(tc)) continue;
    var s = tecnicos[tc];
    var colorBorder = tc === USUARIOS.raul.nombre ? '#3b82f6' : (tc === USUARIOS.juan.nombre ? '#f97316' : '#9e1212');
    var pct = s.total > 0 ? Math.round(s.done / s.total * 100) : 0;
    var circ = 2 * Math.PI * 18;
    var svgRing = '<svg width="44" height="44" style="position:absolute;top:8px;right:8px;flex-shrink:0"><circle cx="22" cy="22" r="18" fill="none" stroke="#eee" stroke-width="4"/><circle cx="22" cy="22" r="18" fill="none" stroke="' + colorBorder + '" stroke-width="4" stroke-dasharray="' + Math.round(circ) + '" stroke-dashoffset="' + Math.round(circ * (1 - pct / 100)) + '" stroke-linecap="round" transform="rotate(-90 22 22)"/><text x="22" y="27" text-anchor="middle" font-size="10" font-weight="bold" fill="' + colorBorder + '">' + pct + '%</text></svg>';
    cHtml += '<div class="seg-counter-card" style="border-left:4px solid ' + colorBorder + ';position:relative;padding-right:56px">'
      + '<div class="seg-counter-name">' + esc(tc) + '</div>'
      + '<div class="seg-counter-num">' + s.done + '</div>'
      + '<div class="seg-counter-total">de ' + s.total + (s.enCamino ? ' \xB7 🚗 ' + s.enCamino : '') + '</div>'
      + '<div style="font-size:0.72rem;color:#888;margin-top:2px">🛡️ ' + s.ext + ' ext.</div>'
      + svgRing
      + '</div>';
  }
  counters.innerHTML = cHtml;

  var sorted = puntos.slice().sort(function(a, b) {
    if (a.done !== b.done) return a.done ? 1 : -1;
    if (a.enCamino !== b.enCamino) return a.enCamino ? -1 : 1;
    return (a.nombre || '').localeCompare(b.nombre || '');
  });
  var tHtml = '';
  sorted.forEach(function(p) {
    var colorBorderRow = p.tecnico === USUARIOS.raul.nombre ? '3px solid #3b82f6' : (p.tecnico === USUARIOS.juan.nombre ? '3px solid #f97316' : 'none');
    var estadoBadge;
    if (p.done) {
      estadoBadge = '<span class="badge-done">✓ Listo</span>';
    } else if (p.enCamino) {
      estadoBadge = '<span class="badge-en-camino">🚗 En camino</span>';
    } else {
      estadoBadge = '<span class="badge-pending">Pendiente</span>';
    }
    var obsHtml = '—';
    if (p.observacion) {
      var claveObs = (p.nombre || '') + '|' + p.observacion;
      var badgeObs = _obsClasifCache[claveObs] ? '<div class="obs-clasif-badge">' + esc(_obsClasifCache[claveObs]) + '</div>' : '';
      obsHtml = '<div style="font-size:0.72rem;color:#666;font-style:italic">' + esc(p.observacion) + '</div>' + badgeObs;
      if (p.observacion.length > 20 && !(claveObs in _obsClasifCache)) {
        _obsClasifCache[claveObs] = '';
        clasificarObservacion(p.observacion).then(function(res) {
          if (res) { _obsClasifCache[claveObs] = res; aplicarFiltroSeguimiento(); }
        }).catch(function() {});
      }
    }
    tHtml += '<tr style="border-left:' + colorBorderRow + '">'
      + '<td>' + esc(p.nombre || '') + (p.esKfc ? ' <span class="badge-kfc-sm">KFC</span>' : '') + (p.urgente ? ' <span style="color:#e53e3e;font-weight:700">🔴</span>' : '') + (p.nota ? '<div style="font-size:0.7rem;color:#888">' + esc(p.nota) + '</div>' : '') + '</td>'
      + '<td><span class="tecnico-tag">' + esc(p.tecnico || '—') + '</span></td>'
      + '<td>' + estadoBadge + '</td>'
      + '<td>' + esc(p.horaCompletado || '—') + '</td>'
      + '<td>' + obsHtml + '</td>'
      + '</tr>';
  });
  tbody.innerHTML = tHtml;
}

/* ===================================================
   T\xC9CNICO
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
      urgente: p.urgente || false, nota: p.nota || '',
      done: e ? e.done : (p.done || false),
      enCamino: e ? (e.enCamino || false) : (p.enCamino || false),
      horaCompletado: e ? e.hora : (p.horaCompletado || null),
      observacion: e ? (e.observacion || '') : (p.observacion || '')
    };
  });
  var vacio = document.getElementById('s1-vacio');
  if (vacio) vacio.style.display = 'none';
  renderPuntos();
  actualizarProgreso();
  _initSwipeGestures();
  _initPullToRefresh();
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
    var urgBadge = p.urgente ? '<span style="color:#e53e3e;font-size:0.8rem;font-weight:700">🔴</span> ' : '';
    var notaHtml = p.nota ? '<div class="punto-card-nota">📌 ' + esc(p.nota) + '</div>' : '';
    var obsHtml  = (p.done && p.observacion) ? '<div class="punto-card-obs">📝 ' + esc(p.observacion) + '</div>' : '';

    var dirHtml = p.direccion
      ? '<a href="https://maps.google.com/?q=' + encodeURIComponent(p.direccion) + '" target="_blank" rel="noopener" class="punto-card-dir punto-card-dir-link">📍 ' + esc(p.direccion) + '</a>'
      : '';

    var hora = p.done && p.horaCompletado ? '<div class="punto-card-hora">&#10003; ' + esc(p.horaCompletado) + '</div>' : '';

    var accion;
    if (p.done) {
      accion = '<span class="btn-done-icon">&#10003;</span>';
    } else if (p.enCamino) {
      accion = '<div style="display:flex;flex-direction:column;gap:6px;align-items:center">'
        + '<span style="font-size:0.7rem;color:#f97316;font-weight:700">En camino</span>'
        + '<button class="btn-success" onclick="abrirMarcarListo(' + i + ')">&#10003; Listo</button>'
        + '</div>';
    } else {
      accion = '<div style="display:flex;flex-direction:column;gap:6px;align-items:center">'
        + '<button class="btn-en-camino" onclick="marcarEnCamino(' + i + ')" title="En camino">🚗</button>'
        + '<button class="btn-success" onclick="abrirMarcarListo(' + i + ')">&#10003; Listo</button>'
        + '</div>';
    }

    var estadoClass = p.done ? ' done' : (p.enCamino ? ' en-camino' : '');

    html += '<div class="punto-card' + estadoClass + '" id="punto-card-' + i + '" data-idx="' + i + '">'
      + '<div class="punto-card-num">' + (p.done ? '&#10003;' : (p.enCamino ? '🚗' : p.num)) + '</div>'
      + '<div class="punto-card-body">'
      +   '<div class="punto-card-nombre">' + urgBadge + kfcBadge + esc(p.nombre) + '</div>'
      +   dirHtml
      +   '<div class="punto-card-mision">' + esc(p.mision) + '</div>'
      +   notaHtml + hora + obsHtml
      + '</div>'
      + '<div class="punto-card-actions">' + accion + '</div>'
      + '</div>';
  }
  if (!count && filtro) html = '<div class="no-clientes">Sin resultados para "<strong>' + esc(filtro) + '</strong>"</div>';
  lista.innerHTML = html;
}

function _initSwipeGestures() {
  var lista = document.getElementById('lista-puntos');
  if (!lista) return;
  var touchStartX = 0;
  var touchStartY = 0;
  // Remove old listeners by replacing the element clone isn't reliable; use a flag
  lista._swipeInit = true;
  lista.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  lista.addEventListener('touchend', function(e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.5 && dx > 0) {
      var el = e.target.closest('.punto-card');
      if (el) {
        var idx = parseInt(el.getAttribute('data-idx'));
        if (!isNaN(idx) && PUNTOS[idx] && !PUNTOS[idx].done) {
          abrirMarcarListo(idx);
        }
      }
    }
  }, { passive: true });
}

var _pullStartY = 0;
var _pulling = false;
function _initPullToRefresh() {
  var lista = document.getElementById('lista-puntos');
  if (!lista) return;
  lista.addEventListener('touchstart', function(e) {
    if (lista.scrollTop === 0) { _pullStartY = e.touches[0].clientY; _pulling = true; }
  }, { passive: true });
  lista.addEventListener('touchend', function(e) {
    if (_pulling) {
      var dy = e.changedTouches[0].clientY - _pullStartY;
      if (dy > 80) { showToast('🔄 Actualizando...'); recargarRecorrido(); }
    }
    _pulling = false;
  }, { passive: true });
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

function marcarEnCamino(idx) {
  if (idx < 0 || idx >= PUNTOS.length || PUNTOS[idx].done) return;
  PUNTOS[idx].enCamino = !PUNTOS[idx].enCamino;
  _guardarEstadoLocal();
  renderPuntos();
  if (navigator.vibrate) navigator.vibrate(40);
  showToast(PUNTOS[idx].enCamino ? '🚗 En camino a ' + PUNTOS[idx].nombre : PUNTOS[idx].nombre + ' — estado cancelado');
  subirFichas();
}

function abrirMarcarListo(idx) {
  var p = PUNTOS[idx];
  if (!p) return;
  var overlay = document.getElementById('modal-overlay');
  if (!overlay) { marcarListo(idx, ''); return; }
  document.getElementById('modal-title').textContent = '✅ Completar: ' + p.nombre;
  document.getElementById('modal-msg').innerHTML = '<div style="margin-bottom:10px;font-size:0.9rem;color:#555">Observaci\xF3n opcional:</div>'
    + '<textarea id="obs-input" style="width:100%;padding:10px;border:1.5px solid #ddd;border-radius:10px;font-size:0.9rem;min-height:80px;resize:vertical;font-family:inherit" placeholder="\xBFAlguna observaci\xF3n?"></textarea>';
  var actEl = document.getElementById('modal-actions');
  actEl.innerHTML = '';
  var btnCancel = document.createElement('button');
  btnCancel.className = 'btn-ghost';
  btnCancel.textContent = 'Cancelar';
  btnCancel.onclick = function() { overlay.classList.add('hidden'); document.body.style.overflow = ''; };
  var btnOk = document.createElement('button');
  btnOk.className = 'btn-primary';
  btnOk.textContent = '✅ Marcar listo';
  btnOk.onclick = function() {
    var obs = document.getElementById('obs-input');
    var obsVal = obs ? obs.value.trim() : '';
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    marcarListo(idx, obsVal);
  };
  actEl.appendChild(btnCancel);
  actEl.appendChild(btnOk);
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(function() { var ta = document.getElementById('obs-input'); if (ta) ta.focus(); }, 100);
}

function marcarListo(idx, observacion) {
  if (idx < 0 || idx >= PUNTOS.length || PUNTOS[idx].done) return;
  var prevState = JSON.parse(JSON.stringify(PUNTOS[idx]));
  PUNTOS[idx].done = true;
  PUNTOS[idx].enCamino = false;
  var ahora = new Date();
  PUNTOS[idx].horaCompletado = String(ahora.getHours()).padStart(2,'0') + ':' + String(ahora.getMinutes()).padStart(2,'0');
  PUNTOS[idx].observacion = typeof observacion === 'string' ? observacion : '';
  _guardarEstadoLocal();
  renderPuntos();
  actualizarProgreso();
  if (navigator.vibrate) navigator.vibrate(80);

  _undoIdx = idx;
  _undoData = prevState;
  var undoBar = document.getElementById('undo-bar');
  var undoMsg = document.getElementById('undo-msg');
  if (undoBar && undoMsg) {
    undoMsg.textContent = '✓ ' + PUNTOS[idx].nombre + ' marcado como listo';
    undoBar.classList.remove('hidden');
    if (_undoTimer) clearTimeout(_undoTimer);
    _undoTimer = setTimeout(function() {
      undoBar.classList.add('hidden');
      _undoIdx = null;
      _undoData = null;
    }, 8000);
  }
  subirFichas();
}

function deshacerListo() {
  if (_undoIdx === null || !_undoData) return;
  PUNTOS[_undoIdx] = _undoData;
  _guardarEstadoLocal();
  renderPuntos();
  actualizarProgreso();
  var undoBar = document.getElementById('undo-bar');
  if (undoBar) undoBar.classList.add('hidden');
  if (_undoTimer) clearTimeout(_undoTimer);
  _undoIdx = null;
  _undoData = null;
  showToast('Acci\xF3n deshecha');
  subirFichas();
}

function _guardarEstadoLocal() {
  var estado = {};
  PUNTOS.forEach(function(p, i) {
    var clave = p.nombre || i;
    estado[clave] = { done: p.done, hora: p.horaCompletado, enCamino: p.enCamino, observacion: p.observacion };
  });
  localStorage.setItem('pf_estado_' + fechaHoy(), JSON.stringify(estado));
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
  var snapshot = PUNTOS.map(function(p) {
    return { nombre: p.nombre, done: p.done, horaCompletado: p.horaCompletado, enCamino: p.enCamino || false, observacion: p.observacion || '' };
  });
  dbxDownloadJSON(DBX_RECORRIDOS)
  .catch(function() { return {}; })
  .then(function(recorridos) {
    var hoy = recorridos[fechaHoy()];
    if (!hoy) return;
    hoy.puntos = hoy.puntos.map(function(p) {
      if (p.tecnico !== tecnico) return p;
      var match = snapshot.filter(function(s) { return s.nombre === p.nombre; })[0];
      if (match) { p.done = match.done; p.horaCompletado = match.horaCompletado; p.enCamino = match.enCamino; p.observacion = match.observacion; }
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
  // Version footer (#98)
  var verEl = document.getElementById('cfg-version');
  if (verEl) verEl.textContent = APP_VERSION;

  // Pre-warm Dropbox token (#79)
  if (getRefreshToken()) { getValidToken().catch(function() {}); }

  // FAB scroll-to-top
  var tabClientes = document.getElementById('tab-clientes');
  if (tabClientes) {
    tabClientes.addEventListener('scroll', function() {
      var fab = document.getElementById('fab-top');
      if (fab) fab.classList.toggle('hidden', tabClientes.scrollTop < 200);
    });
  }

  var oauthInProgress = handleOAuthCallback();
  if (!oauthInProgress) {
    var savedUser = localStorage.getItem('pf_usuario');
    if (savedUser && USUARIOS[savedUser]) login(savedUser);
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/previfuego-recorrido/sw.js').catch(function() {});
  }
  if (!navigator.onLine) {
    var b = document.getElementById('offline-banner');
    if (b) b.classList.remove('hidden');
  }
});
