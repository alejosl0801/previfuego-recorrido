const CACHE_VERSION = '1.0';
const CACHE_NAME = 'pfrecorrido-v' + CACHE_VERSION;
const ASSETS = [
  '/previfuego-recorrido/',
  '/previfuego-recorrido/index.html',
  '/previfuego-recorrido/app.js',
  '/previfuego-recorrido/style.css',
  '/previfuego-recorrido/manifest.json',
  '/previfuego-recorrido/icon-192.png',
  '/previfuego-recorrido/icon-512.png'
];
self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(
    ks.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
  )).then(() => self.clients.claim())
));
self.addEventListener('fetch', e => {
  if (e.request.url.includes('script.google.com')) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true })
      .then(r => r || fetch(e.request))
      .catch(() => caches.match('/previfuego-recorrido/index.html', { ignoreSearch: true }))
  );
});
