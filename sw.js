const CACHE_VERSION = '8.1';
const CACHE_NAME = 'pfrecorrido-v' + CACHE_VERSION;
const APP_ASSETS = [
  '/previfuego-recorrido/',
  '/previfuego-recorrido/index.html',
  '/previfuego-recorrido/app.js',
  '/previfuego-recorrido/style.css',
  '/previfuego-recorrido/manifest.json',
  '/previfuego-recorrido/icon-192.png',
  '/previfuego-recorrido/icon-512.png',
  'https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js'
];
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(APP_ASSETS)));
});
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(
    ks.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
  )).then(() => self.clients.claim()).then(() => {
    self.clients.matchAll({type: 'window'}).then(cls => cls.forEach(c => {
      c.postMessage({type: 'sw-updated', version: CACHE_VERSION});
      if (c.navigate) c.navigate(c.url);
    }));
  })
));
self.addEventListener('message', e => {
  const d = e.data || {};
  if (d.type === 'notify' && self.registration && self.registration.showNotification) {
    self.registration.showNotification(d.title || 'Previfuego', {
      body: d.body || '', icon: '/previfuego-recorrido/icon-192.png', badge: '/previfuego-recorrido/icon-192.png'
    });
  }
  if (d.type === 'check-update') {
    self.registration.update();
  }
});
self.addEventListener('fetch', e => {
  const url = e.request.url;
  if (url.includes('dropboxapi.com') ||
      url.includes('dropbox.com') ||
      url.includes('script.google.com') ||
      url.includes('api.openai.com')) return;
  const isAppFile = APP_ASSETS.some(a => url.endsWith(a) || url.includes('/previfuego-recorrido/'));
  if (isAppFile && navigator.onLine !== false) {
    e.respondWith(
      fetch(e.request).then(r => {
        if (r && r.ok) {
          const rc = r.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, rc));
        }
        return r;
      }).catch(() => caches.match(e.request, {ignoreSearch: true})
        .then(r => r || caches.match('/previfuego-recorrido/index.html', {ignoreSearch: true})))
    );
  } else {
    e.respondWith(
      caches.match(e.request, {ignoreSearch: true})
        .then(r => r || fetch(e.request))
        .catch(() => caches.match('/previfuego-recorrido/index.html', {ignoreSearch: true}))
    );
  }
});
