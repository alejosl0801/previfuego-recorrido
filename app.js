'use strict';

var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwiIAupZxy2T33EiDHbwkLBHTw0Q2Uv98r8pc9L351b6lXwY_mOD6kI2tvfzqdIUdxG/exec";
var SHEET_ID   = "1H3OQmaJtqVWHqVrI_hX2h8ZL_-a6RRobQww7IuGMhp0";
var PF_SYNC_TOKEN = "previfuego2026";
var USUARIO_ACTUAL = null;
var PUNTOS = [];
var CLIENTES_DISPONIBLES = [];
var _seguimientoInterval = null;
var _toastTimer = null;

var USUARIOS = {
  alejandro: { nombre: "Alejandro", emoji: "👔", esAdmin: true },
  raul:      { nombre: "Raúl",      emoji: "👷" },
  juan:      { nombre: "Juan",      emoji: "👷" }
};

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
  // Reset tabs
  switchTab('crear');
  showScreen('s0');
}

/* ===================================================
   TÉCNICO
=================================================== */
function cargarRecorrido() {
  showScreen('s1');
  mostrarCargando(true);
  var vacio = document.getElementById('s1-vacio');
  if (vacio) vacio.style.display = 'none';

  var body = JSON.stringify({
    accion: 'get_recorrido',
    fecha: fechaHoy(),
    token: PF_SYNC_TOKEN,
    tecnico: USUARIOS[USUARIO_ACTUAL].nombre
  });

  fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    mostrarCargando(false);
    if (data && data.ok && Array.isArray(data.puntos) && data.puntos.length > 0) {
      procesarPuntos(data.puntos);
      localStorage.setItem('pf_puntos_' + fechaHoy(), JSON.stringify(data.puntos));
    } else {
      cargarRecorridoLocal();
    }
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
      procesarPuntos(arr);
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
      done: estadoGuardado[clave] ? estadoGuardado[clave].done : false,
      horaCompletado: estadoGuardado[clave] ? estadoGuardado[clave].hora : null
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

    html += '<div class="punto-card' + doneClass + '">'
      + '<div class="punto-card-num">' + (p.done ? '&#10003;' : esc(String(p.num))) + '</div>'
      + '<div class="punto-card-body">'
      +   '<div class="punto-card-nombre">' + esc(p.nombre) + '</div>'
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

  // Persist state
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
  var fichas = {};
  for (var i = 0; i < PUNTOS.length; i++) {
    var p = PUNTOS[i];
    fichas[p.nombre] = {
      done: p.done,
      hora: p.horaCompletado || '',
      tecnico: p.tecnico || (USUARIO_ACTUAL ? USUARIOS[USUARIO_ACTUAL].nombre : ''),
      mision: p.mision,
      direccion: p.direccion
    };
  }

  var body = JSON.stringify({
    accion: 'guardar_fichas',
    token: PF_SYNC_TOKEN,
    fecha: fechaHoy(),
    tecnico: USUARIO_ACTUAL ? USUARIOS[USUARIO_ACTUAL].nombre : '',
    fichas: fichas
  });

  fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  }).catch(function() {
    // Silent on error - offline mode
  });
}

/* ===================================================
   ADMIN — CREAR
=================================================== */
function cargarClientes() {
  var mesEl = document.getElementById('admin-mes');
  if (!mesEl) return;
  var mes = mesEl.value;

  mostrarCargando(true);
  var url = SCRIPT_URL + '?accion=extintores_mes&mes=' + encodeURIComponent(mes) + '&token=' + encodeURIComponent(PF_SYNC_TOKEN);

  fetch(url)
  .then(function(res) { return res.json(); })
  .then(function(data) {
    mostrarCargando(false);
    if (data && Array.isArray(data.clientes)) {
      CLIENTES_DISPONIBLES = data.clientes;
    } else if (data && Array.isArray(data.data)) {
      CLIENTES_DISPONIBLES = data.data;
    } else {
      CLIENTES_DISPONIBLES = [];
    }
    renderClientesLista();
  })
  .catch(function(err) {
    mostrarCargando(false);
    CLIENTES_DISPONIBLES = [];
    renderClientesLista();
    showToast('Error al cargar clientes. Verifica la conexión.');
  });
}

function renderClientesLista() {
  var cont = document.getElementById('clientes-lista');
  if (!cont) return;

  if (!CLIENTES_DISPONIBLES || CLIENTES_DISPONIBLES.length === 0) {
    cont.innerHTML = '<div class="no-clientes">No hay clientes para este mes.<br>Verifica la hoja de contratos.</div>';
    return;
  }

  var html = '';
  for (var i = 0; i < CLIENTES_DISPONIBLES.length; i++) {
    var c = CLIENTES_DISPONIBLES[i];
    var nombre   = c.nombre || c.cliente || c.CLIENTE || '';
    var dir      = c.direccion || c.dir || c.DIRECCION || '';
    var extint   = c.extintores || c.cantidad || c.EXTINTORES || '?';
    var idx      = i;

    html += '<div class="cliente-card" id="ccard-' + idx + '">'
      + '<div class="cliente-card-header">'
      +   '<input type="checkbox" class="cliente-check" id="ccheck-' + idx + '"'
      +          ' onchange="toggleClienteCheck(' + idx + ')" />'
      +   '<div class="cliente-info">'
      +     '<div class="cliente-nombre">' + esc(nombre) + '</div>'
      +     '<div class="cliente-dir">' + esc(dir) + '</div>'
      +     '<div class="cliente-ext">&#x1F9EF; ' + esc(String(extint)) + ' extintor(es)</div>'
      +   '</div>'
      + '</div>'
      + '<div class="cliente-card-opts">'
      +   '<div class="opts-row">'
      +     '<div>'
      +       '<div class="opts-label">Misión</div>'
      +       '<input type="text" class="opts-input" id="cmision-' + idx + '" value="Mantenimiento" />'
      +     '</div>'
      +     '<div>'
      +       '<div class="opts-label">Técnico</div>'
      +       '<select class="opts-select" id="ctecnico-' + idx + '">'
      +         '<option value="Raúl">Raúl</option>'
      +         '<option value="Juan">Juan</option>'
      +       '</select>'
      +     '</div>'
      +   '</div>'
      + '</div>'
      + '</div>';
  }
  cont.innerHTML = html;
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
    var c       = CLIENTES_DISPONIBLES[i];
    var nombre  = c.nombre || c.cliente || c.CLIENTE || '';
    var dir     = c.direccion || c.dir || c.DIRECCION || '';
    var extint  = c.extintores || c.cantidad || c.EXTINTORES || '';
    var misionEl  = document.getElementById('cmision-' + i);
    var tecnicoEl = document.getElementById('ctecnico-' + i);
    var mision  = misionEl  ? misionEl.value.trim()  : 'Mantenimiento';
    var tecnico = tecnicoEl ? tecnicoEl.value.trim()  : 'Raúl';

    puntos.push({
      nombre: nombre,
      direccion: dir,
      extintores: extint,
      mision: mision || 'Mantenimiento',
      tecnico: tecnico
    });
  }

  if (puntos.length === 0) {
    pfModal('Sin puntos', 'Selecciona al menos un cliente para publicar el recorrido.');
    return;
  }

  pfConfirm(
    'Publicar recorrido',
    'Se publicarán ' + puntos.length + ' punto(s) para el ' + fechaHoy() + '.\n¿Confirmar?',
    function() {
      mostrarCargando(true);
      var body = JSON.stringify({
        accion: 'publicar_recorrido',
        fecha: fechaHoy(),
        puntos: puntos,
        token: PF_SYNC_TOKEN
      });

      fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        mostrarCargando(false);
        if (data && data.ok) {
          pfModal('¡Publicado!', 'El recorrido del día ha sido publicado correctamente con ' + puntos.length + ' punto(s).');
        } else {
          pfModal('Error', 'No se pudo publicar el recorrido. ' + (data && data.error ? data.error : 'Intenta de nuevo.'));
        }
      })
      .catch(function() {
        mostrarCargando(false);
        pfModal('Error de red', 'No se pudo conectar con el servidor. Verifica tu conexión e intenta de nuevo.');
      });
    }
  );
}

/* ===================================================
   ADMIN — SEGUIMIENTO
=================================================== */
function switchTab(tab) {
  var tabCrear = document.getElementById('tab-crear');
  var tabSeg   = document.getElementById('tab-seguimiento');
  var btnCrear = document.getElementById('tab-btn-crear');
  var btnSeg   = document.getElementById('tab-btn-seguimiento');

  if (tab === 'crear') {
    tabCrear.classList.add('active');
    tabSeg.classList.remove('active');
    if (btnCrear) btnCrear.classList.add('active');
    if (btnSeg)   btnSeg.classList.remove('active');
    detenerSeguimiento();
  } else {
    tabSeg.classList.add('active');
    tabCrear.classList.remove('active');
    if (btnSeg)   btnSeg.classList.add('active');
    if (btnCrear) btnCrear.classList.remove('active');
    iniciarSeguimiento();
  }
}

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
  var body = JSON.stringify({
    accion: 'get_fichas',
    token: PF_SYNC_TOKEN,
    fecha: fechaHoy()
  });

  fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    if (data && data.data) {
      renderTablaSeguimiento(data.data);
    } else if (data && data.fichas) {
      renderTablaSeguimiento(data.fichas);
    } else {
      renderTablaSeguimiento({});
    }
  })
  .catch(function() {
    // Keep last state on error
  });
}

function renderTablaSeguimiento(fichas) {
  var tbody   = document.getElementById('seg-tbody');
  var counters = document.getElementById('seg-counters');
  if (!tbody || !counters) return;

  var hoy = fechaHoy();
  var rows = [];
  var tecnicos = {};

  // fichas format: {clienteNombre: {done, hora, tecnico, mision, ...}} OR
  // {clienteNombre: {visitas: [{fecha, hora, tipo, tecnico}]}}
  for (var nombre in fichas) {
    if (!fichas.hasOwnProperty(nombre)) continue;
    var f = fichas[nombre];

    // Handle both formats
    if (f && Array.isArray(f.visitas)) {
      // Format with visitas array
      var visitas = f.visitas;
      var hoyVisita = null;
      for (var v = 0; v < visitas.length; v++) {
        if (visitas[v].fecha === hoy) {
          hoyVisita = visitas[v];
          break;
        }
      }
      var tecName = hoyVisita ? (hoyVisita.tecnico || '') : '';
      var done = !!hoyVisita;
      var hora = hoyVisita ? (hoyVisita.hora || '') : '';
      rows.push({ nombre: nombre, tecnico: tecName, done: done, hora: hora });
      if (tecName) {
        if (!tecnicos[tecName]) tecnicos[tecName] = { done: 0, total: 0 };
        tecnicos[tecName].total++;
        if (done) tecnicos[tecName].done++;
      }
    } else {
      // Flat format
      var tec  = f.tecnico || '';
      var isDone = f.done || false;
      var h    = f.hora || '';
      rows.push({ nombre: nombre, tecnico: tec, done: isDone, hora: h });
      if (tec) {
        if (!tecnicos[tec]) tecnicos[tec] = { done: 0, total: 0 };
        tecnicos[tec].total++;
        if (isDone) tecnicos[tec].done++;
      }
    }
  }

  // Render counters
  var cHtml = '';
  if (Object.keys(tecnicos).length === 0) {
    cHtml = '<div class="no-clientes" style="width:100%">Sin datos para hoy.</div>';
  } else {
    for (var tec2 in tecnicos) {
      if (!tecnicos.hasOwnProperty(tec2)) continue;
      var stat = tecnicos[tec2];
      cHtml += '<div class="seg-counter-card">'
        + '<div class="seg-counter-name">' + esc(tec2) + '</div>'
        + '<div class="seg-counter-num">' + stat.done + '</div>'
        + '<div class="seg-counter-total">de ' + stat.total + '</div>'
        + '</div>';
    }
  }
  counters.innerHTML = cHtml;

  // Render table rows
  var tHtml = '';
  if (rows.length === 0) {
    tHtml = '<tr><td colspan="4" style="text-align:center;color:#aaa;padding:20px">Sin datos para hoy.</td></tr>';
  } else {
    // Sort: done first within each group, then alphabetically
    rows.sort(function(a, b) {
      if (a.done !== b.done) return a.done ? -1 : 1;
      return a.nombre.localeCompare(b.nombre);
    });
    for (var r = 0; r < rows.length; r++) {
      var row = rows[r];
      var badge = row.done
        ? '<span class="badge-done">&#10003; Listo</span>'
        : '<span class="badge-pending">Pendiente</span>';
      tHtml += '<tr>'
        + '<td>' + esc(row.nombre) + '</td>'
        + '<td>' + (row.tecnico ? '<span class="tecnico-tag">' + esc(row.tecnico) + '</span>' : '—') + '</td>'
        + '<td>' + badge + '</td>'
        + '<td>' + (row.hora ? esc(row.hora) : '—') + '</td>'
        + '</tr>';
    }
  }
  tbody.innerHTML = tHtml;
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
