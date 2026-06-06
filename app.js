'use strict';

/* ===================================================
   CONSTANTS — DROPBOX
=================================================== */
var DBX_KFC_PATH   = '/Previfuego/2026/BASE_DATOS_KFC (8).xlsx';
var DBX_OTROS_PATH = '/Previfuego/PRESUPUESTOS/PROYECCION INGRESOS MENSUAL 2026.xlsx';
var DBX_RECORRIDOS = '/Previfuego/recorridos.json';

/* ===================================================
   STATE
=================================================== */
var USUARIO_ACTUAL = null;
var PUNTOS = [];
var CLIENTES_DISPONIBLES = [];
var _seguimientoInterval = null;
var _toastTimer = null;

var USUARIOS = {
  alejandro: { nombre: 'Alejandro', emoji: '👔', esAdmin: true },
  raul:      { nombre: 'Ra\xFAl',   emoji: '👷' },
  juan:      { nombre: 'Juan',      emoji: '👷' }
};

/* ===================================================
   DROPBOX HELPERS
=================================================== */
function getToken() {
  return localStorage.getItem('pf_dropbox_token') || '';
}

function dbxDownload(path) {
  return fetch('https://content.dropboxapi.com/2/files/download', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Dropbox-API-Arg': JSON.stringify({ path: path })
    }
  }).then(function(r) {
    if (!r.ok) throw new Error('Dropbox error ' + r.status);
    return r.arrayBuffer();
  });
}

function dbxUpload(path, content) {
  return fetch('https://content.dropboxapi.com/2/files/upload', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + getToken(),
      'Dropbox-API-Arg': JSON.stringify({ path: path, mode: 'overwrite', autorename: false }),
      'Content-Type': 'application/octet-stream'
    },
    body: typeof content === 'string' ? content : JSON.stringify(content)
  }).then(function(r) {
    if (!r.ok) throw new Error('Upload error ' + r.status);
    return r.json();
  });
}

function dbxDownloadJSON(path) {
  return dbxDownload(path)
    .then(function(buf) {
      var text = new TextDecoder().decode(buf);
      return JSON.parse(text);
    });
}

/* ===================================================
   EXCEL PARSING (SheetJS)
=================================================== */
function parseExcel(buf) {
  var wb = XLSX.read(buf, { type: 'array' });
  var ws = wb.Sheets[wb.SheetNames[0]];
  var rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
  return rows;
}

function normalizarCliente(row, esKfc) {
  var nombre = row['CLIENTE'] || row['Cliente'] || row['NOMBRE'] || row['Nombre'] ||
               row['RAZON SOCIAL'] || row['Raz\xF3n Social'] || row['RAZON_SOCIAL'] || '';
  var dir    = row['DIRECCION'] || row['Direcci\xF3n'] || row['DIRECCI\xD3N'] || row['DIR'] ||
               row['Direccion'] || row['DIREC'] || row['direccion'] || '';
  var ciudad = row['CIUDAD'] || row['Ciudad'] || row['ciudad'] || '';
  var ext    = row['EXTINTORES'] || row['Extintores'] || row['CANTIDAD'] || row['Cantidad'] ||
               row['EXT'] || row['N_EXT'] || row['TOTAL'] || 0;
  var mes    = row['MES'] || row['Mes'] || row['mes'] || '';
  var local  = row['LOCAL'] || row['Local'] || row['LOCAL_KFC'] || row['Sucursal'] || row['SUCURSAL'] || '';
  var sector = row['SECTOR'] || row['Sector'] || '';

  return {
    nombre: String(nombre).trim(),
    direccion: String(dir).trim() + (ciudad ? ' — ' + ciudad : ''),
    extintores: parseInt(ext) || 0,
    mes: String(mes).trim().toUpperCase(),
    local: String(local).trim(),
    sector: String(sector).trim(),
    esKfc: !!esKfc,
    _raw: row
  };
}

/* ===================================================
   UTILITIES
=================================================== */
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fechaHoy() {
  var d = new Date();
  var dd = String(d.getDate()).padStart(2, '0');
  var mm = String(d.getMonth() + 1).padStart(2, '0');
  var yyyy = d.getFullYear();
  return dd + '/' + mm + '/' + yyyy;
}

function mostrarCargando(show) {
  var el = document.getElementById('cargando');
  if (!el) return;
  if (show) {
    el.classList.remove('hidden');
  } else {
    el.classList.add('hidden');
  }
}

function pfModal(titulo, msg) {
  var overlay = document.getElementById('modal-overlay');
  var titleEl = document.getElementById('modal-title');
  var msgEl   = document.getElementById('modal-msg');
  var actEl   = document.getElementById('modal-actions');
  if (!overlay) return;
  titleEl.textContent = titulo;
  msgEl.innerHTML = esc(msg).replace(/\n/g, '<br>');
  actEl.innerHTML = '';
  var btn = document.createElement('button');
  btn.className = 'btn-primary';
  btn.textContent = 'OK';
  btn.onclick = function() {
    overlay.classList.add('hidden');
  };
  actEl.appendChild(btn);
  overlay.classList.remove('hidden');
}

function pfConfirm(titulo, msg, cb) {
  var overlay = document.getElementById('modal-overlay');
  var titleEl = document.getElementById('modal-title');
  var msgEl   = document.getElementById('modal-msg');
  var actEl   = document.getElementById('modal-actions');
  if (!overlay) return;
  titleEl.textContent = titulo;
  msgEl.innerHTML = esc(msg).replace(/\n/g, '<br>');
  actEl.innerHTML = '';

  var btnCancel = document.createElement('button');
  btnCancel.className = 'btn-ghost';
  btnCancel.textContent = 'Cancelar';
  btnCancel.onclick = function() {
    overlay.classList.add('hidden');
  };

  var btnOk = document.createElement('button');
  btnOk.className = 'btn-primary';
  btnOk.textContent = 'Confirmar';
  btnOk.onclick = function() {
    overlay.classList.add('hidden');
    if (typeof cb === 'function') cb();
  };

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
  _toastTimer = setTimeout(function() {
    el.classList.remove('visible');
  }, 3000);
}

/* ===================================================
   NAVIGATION
=================================================== */
function showScreen(id) {
  var screens = document.querySelectorAll('.screen');
  for (var i = 0; i < screens.length; i++) {
    screens[i].classList.remove('active');
  }
  var target = document.getElementById(id);
  if (target) target.classList.add('active');
}

function login(usuario) {
  if (!USUARIOS[usuario]) return;
  USUARIO_ACTUAL = usuario;
  localStorage.setItem('pf_usuario', usuario);

  if (USUARIOS[usuario].esAdmin) {
    var fechaEl = document.getElementById('admin-fecha');
    if (fechaEl) fechaEl.textContent = fechaHoy();
    showScreen('sadmin');
    // Set correct month based on current month
    var mesSelect = document.getElementById('admin-mes');
    if (mesSelect) {
      var meses = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
      var mesActual = meses[new Date().getMonth()];
      mesSelect.value = mesActual;
    }
    // Pre-fill token field if exists
    var savedToken = getToken();
    var cfgInput = document.getElementById('cfg-token');
    if (cfgInput && savedToken) cfgInput.value = savedToken.slice(0, 20) + '...';

    cargarClientes();
  } else {
    var titleEl = document.getElementById('s1-title');
    if (titleEl) {
      titleEl.textContent = USUARIOS[usuario].emoji + ' ' + USUARIOS[usuario].nombre;
    }
    cargarRecorrido();
  }
}

function logout() {
  detenerSeguimiento();
  USUARIO_ACTUAL = null;
  PUNTOS = [];
  CLIENTES_DISPONIBLES = [];
  localStorage.removeItem('pf_usuario');
  switchTab('crear');
  showScreen('s0');
}

/* ===================================================
   ADMIN — TABS
=================================================== */
function switchTab(tab) {
  var tabs = ['crear', 'config', 'seguimiento'];
  tabs.forEach(function(t) {
    var content = document.getElementById('tab-' + t);
    var btn     = document.getElementById('tab-btn-' + t);
    if (content) content.classList.remove('active');
    if (btn)     btn.classList.remove('active');
  });

  var activeContent = document.getElementById('tab-' + tab);
  var activeBtn     = document.getElementById('tab-btn-' + tab);
  if (activeContent) activeContent.classList.add('active');
  if (activeBtn)     activeBtn.classList.add('active');

  if (tab === 'seguimiento') {
    iniciarSeguimiento();
  } else {
    detenerSeguimiento();
  }

  if (tab === 'config') {
    // Populate token field (masked)
    var savedToken = getToken();
    var cfgInput = document.getElementById('cfg-token');
    if (cfgInput && savedToken) cfgInput.value = savedToken.slice(0, 20) + '...';
  }
}

/* ===================================================
   ADMIN — CONFIG (DROPBOX)
=================================================== */
function guardarToken() {
  var input  = document.getElementById('cfg-token');
  var status = document.getElementById('cfg-status');
  if (!input) return;
  var val = input.value.trim();
  if (!val || !val.startsWith('sl.')) {
    if (status) status.textContent = '⚠️ Token inv\xE1lido (debe empezar con sl.)';
    return;
  }
  localStorage.setItem('pf_dropbox_token', val);
  input.value = val.slice(0, 20) + '...';
  if (status) status.textContent = '✅ Token guardado';
}

function testDropbox() {
  var debug = document.getElementById('cfg-debug');
  if (!getToken()) {
    if (debug) debug.textContent = '⚠️ Primero guarda el token.';
    return;
  }
  if (debug) debug.textContent = 'Conectando...';

  fetch('https://api.dropboxapi.com/2/users/get_current_account', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + getToken() }
  })
  .then(function(r) { return r.json(); })
  .then(function(d) {
    if (debug) debug.textContent = '✅ Conectado como: ' + (d.email || (d.name && d.name.display_name) || JSON.stringify(d).slice(0, 100));
  })
  .catch(function(e) {
    if (debug) debug.textContent = '❌ Error: ' + String(e);
  });
}

/* ===================================================
   ADMIN — CREAR (cargar clientes desde Excel en Dropbox)
=================================================== */
function cargarClientes() {
  if (!getToken()) {
    var cont = document.getElementById('clientes-lista');
    if (cont) cont.innerHTML = '<div class="no-clientes"><strong>⚙️ Configura el token de Dropbox primero</strong><br><small>Ve al tab Config y pega tu token.</small></div>';
    return;
  }

  var mesEl = document.getElementById('admin-mes');
  var mes = mesEl ? mesEl.value : '';
  mostrarCargando(true);

  Promise.all([
    dbxDownload(DBX_KFC_PATH).then(function(buf) { return parseExcel(buf); }),
    dbxDownload(DBX_OTROS_PATH).then(function(buf) { return parseExcel(buf); })
  ])
  .then(function(results) {
    mostrarCargando(false);
    var kfcRows   = results[0];
    var otrosRows = results[1];

    var kfc   = kfcRows.map(function(r) { return normalizarCliente(r, true); })
                       .filter(function(c) { return c.nombre && (!mes || !c.mes || c.mes === mes || c.mes === ''); });
    var otros = otrosRows.map(function(r) { return normalizarCliente(r, false); })
                         .filter(function(c) { return c.nombre && (!mes || !c.mes || c.mes === mes || c.mes === ''); });

    CLIENTES_DISPONIBLES = kfc.concat(otros);

    // Cache locally
    localStorage.setItem('pf_clientes_cache', JSON.stringify(CLIENTES_DISPONIBLES));
    localStorage.setItem('pf_clientes_cache_ts', Date.now());

    renderClientesLista();
  })
  .catch(function(err) {
    mostrarCargando(false);
    console.error('[PF] cargarClientes error:', err);
    // Try cache
    var cache = localStorage.getItem('pf_clientes_cache');
    if (cache) {
      try {
        CLIENTES_DISPONIBLES = JSON.parse(cache);
        showToast('Sin conexi\xF3n — usando cach\xE9');
        renderClientesLista();
        return;
      } catch(e) {}
    }
    var cont = document.getElementById('clientes-lista');
    if (cont) cont.innerHTML = '<div class="no-clientes"><strong>Error al cargar desde Dropbox</strong><br><small>' + esc(String(err)) + '</small></div>';
  });
}

function renderClientesLista() {
  var cont = document.getElementById('clientes-lista');
  if (!cont) return;

  if (!CLIENTES_DISPONIBLES || CLIENTES_DISPONIBLES.length === 0) {
    cont.innerHTML = '<div class="no-clientes">No hay clientes para este mes.</div>';
    return;
  }

  var kfc   = CLIENTES_DISPONIBLES.filter(function(c) { return c.esKfc; });
  var otros = CLIENTES_DISPONIBLES.filter(function(c) { return !c.esKfc; });

  var html = '';

  if (kfc.length > 0) {
    html += '<div class="clientes-grupo-header">🍗 Grupo KFC (' + kfc.length + ')</div>';
    kfc.forEach(function(c) { html += renderClienteCard(c, CLIENTES_DISPONIBLES.indexOf(c)); });
  }
  if (otros.length > 0) {
    html += '<div class="clientes-grupo-header">📋 Otros Clientes (' + otros.length + ')</div>';
    otros.forEach(function(c) { html += renderClienteCard(c, CLIENTES_DISPONIBLES.indexOf(c)); });
  }

  cont.innerHTML = html;
}

function renderClienteCard(c, idx) {
  var badge = c.esKfc ? '<span class="badge-kfc">KFC</span>' : '';
  var local = c.local ? ' \xB7 ' + esc(c.local) : '';
  return '<div class="cliente-card" id="ccard-' + idx + '">'
    + '<div class="cliente-card-header">'
    +   '<input type="checkbox" class="cliente-check" id="ccheck-' + idx + '" onchange="toggleClienteCheck(' + idx + ')" />'
    +   '<div class="cliente-info">'
    +     '<div class="cliente-nombre">' + badge + esc(c.nombre) + local + '</div>'
    +     '<div class="cliente-dir">' + esc(c.direccion) + '</div>'
    +     '<div class="cliente-ext">🧯 ' + (c.extintores || '?') + ' extintor(es)</div>'
    +   '</div>'
    + '</div>'
    + '<div class="cliente-card-opts">'
    +   '<div class="opts-row">'
    +     '<div><div class="opts-label">Misi\xF3n</div>'
    +       '<input type="text" class="opts-input" id="cmision-' + idx + '" value="Mantenimiento" /></div>'
    +     '<div><div class="opts-label">T\xE9cnico</div>'
    +       '<select class="opts-select" id="ctecnico-' + idx + '">'
    +         '<option value="Ra\xFAl">Ra\xFAl</option>'
    +         '<option value="Juan">Juan</option>'
    +       '</select></div>'
    +   '</div>'
    + '</div>'
    + '</div>';
}

function toggleClienteCheck(idx) {
  var card  = document.getElementById('ccard-' + idx);
  var check = document.getElementById('ccheck-' + idx);
  if (!card || !check) return;
  if (check.checked) {
    card.classList.add('selected');
  } else {
    card.classList.remove('selected');
  }
}

function publicarRecorrido() {
  var puntos = [];
  for (var i = 0; i < CLIENTES_DISPONIBLES.length; i++) {
    var check = document.getElementById('ccheck-' + i);
    if (!check || !check.checked) continue;
    var c = CLIENTES_DISPONIBLES[i];
    var misionEl  = document.getElementById('cmision-' + i);
    var tecnicoEl = document.getElementById('ctecnico-' + i);
    puntos.push({
      nombre: c.nombre,
      direccion: c.direccion,
      extintores: c.extintores,
      local: c.local || '',
      esKfc: c.esKfc || false,
      mision: misionEl ? misionEl.value.trim() : 'Mantenimiento',
      tecnico: tecnicoEl ? tecnicoEl.value : 'Ra\xFAl',
      done: false,
      horaCompletado: null
    });
  }

  if (puntos.length === 0) {
    pfModal('Sin puntos', 'Selecciona al menos un cliente.');
    return;
  }

  pfConfirm('Publicar recorrido', 'Se publicar\xE1n ' + puntos.length + ' punto(s) para hoy ' + fechaHoy() + '. \xBFConfirmar?', function() {
    mostrarCargando(true);

    dbxDownloadJSON(DBX_RECORRIDOS)
    .catch(function() { return {}; })
    .then(function(recorridos) {
      recorridos[fechaHoy()] = { fecha: fechaHoy(), publicado: new Date().toISOString(), puntos: puntos };
      return dbxUpload(DBX_RECORRIDOS, JSON.stringify(recorridos, null, 2));
    })
    .then(function() {
      mostrarCargando(false);
      pfModal('\xA1Publicado!', 'Recorrido del d\xEDa publicado con ' + puntos.length + ' punto(s).');
      localStorage.setItem('pf_puntos_' + fechaHoy(), JSON.stringify(puntos));
    })
    .catch(function(err) {
      mostrarCargando(false);
      pfModal('Error', 'No se pudo publicar: ' + String(err));
    });
  });
}

/* ===================================================
   ADMIN — SEGUIMIENTO
=================================================== */
function iniciarSeguimiento() {
  detenerSeguimiento();
  pfRenderSeguimiento();
  _seguimientoInterval = setInterval(function() {
    pfRenderSeguimiento();
  }, 30000);
}

function detenerSeguimiento() {
  if (_seguimientoInterval) {
    clearInterval(_seguimientoInterval);
    _seguimientoInterval = null;
  }
}

function pfRenderSeguimiento() {
  dbxDownloadJSON(DBX_RECORRIDOS)
  .then(function(recorridos) {
    var hoy = recorridos[fechaHoy()];
    if (!hoy || !hoy.puntos) {
      renderTablaSeguimiento([]);
      return;
    }
    renderTablaSeguimiento(hoy.puntos);
  })
  .catch(function() {
    // Keep last state
  });
}

function renderTablaSeguimiento(puntos) {
  var tbody    = document.getElementById('seg-tbody');
  var counters = document.getElementById('seg-counters');
  if (!tbody || !counters) return;

  if (!puntos || puntos.length === 0) {
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
    cHtml += '<div class="seg-counter-card">'
      + '<div class="seg-counter-name">' + esc(t) + '</div>'
      + '<div class="seg-counter-num">' + s.done + '</div>'
      + '<div class="seg-counter-total">de ' + s.total + '</div>'
      + '</div>';
  }
  counters.innerHTML = cHtml;

  var sorted = puntos.slice().sort(function(a, b) {
    if (a.done !== b.done) return a.done ? -1 : 1;
    return (a.nombre || '').localeCompare(b.nombre || '');
  });

  var tHtml = '';
  sorted.forEach(function(p) {
    var badge = p.done
      ? '<span class="badge-done">✓ Listo</span>'
      : '<span class="badge-pending">Pendiente</span>';
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
    if (!hoy || !hoy.puntos || !hoy.puntos.length) {
      cargarRecorridoLocal();
      return;
    }
    var misPuntos = hoy.puntos.filter(function(p) { return p.tecnico === tecnico; });
    if (misPuntos.length === 0) {
      mostrarVacio();
      return;
    }
    localStorage.setItem('pf_puntos_' + fechaHoy(), JSON.stringify(misPuntos));
    procesarPuntos(misPuntos);
  })
  .catch(function() {
    mostrarCargando(false);
    cargarRecorridoLocal();
  });
}

function cargarRecorridoLocal() {
  var guardados = localStorage.getItem('pf_puntos_' + fechaHoy());
  if (guardados) {
    try {
      var arr = JSON.parse(guardados);
      var tecnico = USUARIO_ACTUAL ? USUARIOS[USUARIO_ACTUAL].nombre : '';
      var misPuntos = arr.filter(function(p) { return !p.tecnico || p.tecnico === tecnico; });
      if (misPuntos.length === 0) {
        mostrarVacio();
      } else {
        procesarPuntos(misPuntos);
      }
    } catch(e) {
      mostrarVacio();
    }
  } else {
    mostrarVacio();
  }
}

function mostrarVacio() {
  PUNTOS = [];
  var lista = document.getElementById('lista-puntos');
  if (lista) lista.innerHTML = '';
  var vacio = document.getElementById('s1-vacio');
  if (vacio) vacio.style.display = 'flex';
  actualizarProgreso();
}

function procesarPuntos(arr) {
  var estadoGuardado = {};
  try {
    var raw = localStorage.getItem('pf_estado_' + fechaHoy());
    if (raw) estadoGuardado = JSON.parse(raw);
  } catch(e) {}

  PUNTOS = arr.map(function(p, i) {
    var clave = p.nombre || i;
    return {
      num: i + 1,
      nombre: p.nombre || p.cliente || '',
      direccion: p.direccion || p.dir || '',
      mision: p.mision || 'Mantenimiento',
      tecnico: p.tecnico || '',
      esKfc: p.esKfc || false,
      done: estadoGuardado[clave] ? estadoGuardado[clave].done : (p.done || false),
      horaCompletado: estadoGuardado[clave] ? estadoGuardado[clave].hora : (p.horaCompletado || null)
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
    if (filtro && p.nombre.toLowerCase().indexOf(filtro) === -1 &&
        p.direccion.toLowerCase().indexOf(filtro) === -1) {
      continue;
    }
    count++;
    var doneClass = p.done ? ' done' : '';
    var accion = p.done
      ? '<span class="btn-done-icon">&#10003;</span>'
      : '<button class="btn-success" onclick="marcarListo(' + i + ')">&#10003; Listo</button>';

    var hora = p.done && p.horaCompletado
      ? '<div class="punto-card-hora">&#10003; ' + esc(p.horaCompletado) + '</div>'
      : '';

    var kfcBadge = p.esKfc ? '<span class="badge-kfc-sm">KFC</span> ' : '';

    html += '<div class="punto-card' + doneClass + '">'
      + '<div class="punto-card-num">' + (p.done ? '&#10003;' : esc(String(p.num))) + '</div>'
      + '<div class="punto-card-body">'
      +   '<div class="punto-card-nombre">' + kfcBadge + esc(p.nombre) + '</div>'
      +   '<div class="punto-card-dir">' + esc(p.direccion) + '</div>'
      +   '<div class="punto-card-mision">' + esc(p.mision) + '</div>'
      +   hora
      + '</div>'
      + '<div class="punto-card-actions">' + accion + '</div>'
      + '</div>';
  }

  if (count === 0 && filtro) {
    html = '<div class="no-clientes">Sin resultados para "<strong>' + esc(filtro) + '</strong>"</div>';
  }

  lista.innerHTML = html;
}

function filtrarPuntos() {
  renderPuntos();
}

function actualizarProgreso() {
  var total = PUNTOS.length;
  var done  = 0;
  for (var i = 0; i < PUNTOS.length; i++) {
    if (PUNTOS[i].done) done++;
  }
  var texto = document.getElementById('prog-texto');
  var bar   = document.getElementById('prog-bar');
  if (texto) texto.textContent = done + '/' + total + ' completados';
  if (bar) bar.style.width = (total > 0 ? Math.round((done / total) * 100) : 0) + '%';
}

function marcarListo(idx) {
  if (idx < 0 || idx >= PUNTOS.length) return;
  if (PUNTOS[idx].done) return;

  PUNTOS[idx].done = true;
  var ahora = new Date();
  PUNTOS[idx].horaCompletado = ahora.getHours() + ':' + String(ahora.getMinutes()).padStart(2, '0');

  // Persist state locally
  var estado = {};
  try {
    var raw = localStorage.getItem('pf_estado_' + fechaHoy());
    if (raw) estado = JSON.parse(raw);
  } catch(e) {}
  var clave = PUNTOS[idx].nombre || idx;
  estado[clave] = { done: true, hora: PUNTOS[idx].horaCompletado };
  localStorage.setItem('pf_estado_' + fechaHoy(), JSON.stringify(estado));

  renderPuntos();
  actualizarProgreso();
  showToast('✓ ' + PUNTOS[idx].nombre + ' marcado como listo');
  subirFichas();
}

function recargarRecorrido() {
  cargarRecorrido();
}

function subirFichas() {
  var tecnico = USUARIO_ACTUAL ? USUARIOS[USUARIO_ACTUAL].nombre : '';

  dbxDownloadJSON(DBX_RECORRIDOS)
  .catch(function() { return {}; })
  .then(function(recorridos) {
    var hoy = recorridos[fechaHoy()];
    if (!hoy) return Promise.resolve();

    hoy.puntos = hoy.puntos.map(function(p) {
      if (p.tecnico !== tecnico) return p;
      var match = null;
      for (var i = 0; i < PUNTOS.length; i++) {
        if (PUNTOS[i].nombre === p.nombre) { match = PUNTOS[i]; break; }
      }
      if (match) {
        p.done = match.done;
        p.horaCompletado = match.horaCompletado;
      }
      return p;
    });
    recorridos[fechaHoy()] = hoy;
    return dbxUpload(DBX_RECORRIDOS, JSON.stringify(recorridos, null, 2));
  })
  .catch(function() {}); // silent
}

/* ===================================================
   INIT
=================================================== */
document.addEventListener('DOMContentLoaded', function() {
  // Auto-login from localStorage
  var savedUser = localStorage.getItem('pf_usuario');
  if (savedUser && USUARIOS[savedUser]) {
    login(savedUser);
  }

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/previfuego-recorrido/sw.js')
    .then(function(reg) {
      console.log('SW registered:', reg.scope);
    })
    .catch(function(err) {
      console.log('SW registration failed:', err);
    });
  }
});
