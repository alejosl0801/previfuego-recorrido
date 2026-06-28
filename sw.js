const CACHE_VERSION = '8.7';
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
  )).then(() => self.clients.claim())
));
self.addEventListener('message', e => {
  const d = e.data || {};
  if (d.type === 'notify' && self.registration && self.registration.showNotification) {
    self.registration.showNotification(d.title || 'Previfuego', {
      body: d.body || '', icon: '/previfuego-recorrido/icon-192.png', badge: '/previfuego-recorrido/icon-192.png'
    });
  }
});
self.addEventListener('fetch', e => {
  const url = e.request.url;
  if (url.includes('dropboxapi.com') ||
      url.includes('dropbox.com') ||
      url.includes('googleapis.com')) return;
  const urlNoQuery = url.split('?')[0];
  const isAppFile = APP_ASSETS.some(a => urlNoQuery.endsWith(a));
  if (isAppFile) {
    e.respondWith(
      fetch(e.request).then(r => {
        if (r && r.ok) {
          const rc = r.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, rc));
        }
        return r;
      }).catch(() => caches.match(e.request, {ignoreSearch: true})
        .then(r => r || (e.request.mode === 'navigate' ? caches.match('/previfuego-recorrido/index.html', {ignoreSearch: true}) : undefined)))
    );
  } else {
    e.respondWith(
      caches.match(e.request, {ignoreSearch: true})
        .then(r => r || fetch(e.request))
        .catch(() => e.request.mode === 'navigate' ? caches.match('/previfuego-recorrido/index.html', {ignoreSearch: true}) : undefined)
    );
  }
});
