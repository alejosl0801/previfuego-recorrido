const CACHE_VERSION = '5.0';
const CACHE_NAME = 'pfrecorrido-v' + CACHE_VERSION;
const ASSETS = [
  '/previfuego-recorrido/',
  '/previfuego-recorrido/index.html',
  '/previfuego-recorrido/app.js',
  '/previfuego-recorrido/style.css',
  '/previfuego-recorrido/manifest.json',
  '/previfuego-recorrido/icon-192.png',
  '/previfuego-recorrido/icon-512.png',
  'https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js'
];
self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
));
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
  // Don't intercept external API calls — let them fail naturally
  if (url.includes('dropboxapi.com') ||
      url.includes('dropbox.com') ||
      url.includes('script.google.com') ||
      url.includes('api.groq.com')) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true })
      .then(r => r || fetch(e.request))
      .catch(() => caches.match('/previfuego-recorrido/index.html', { ignoreSearch: true }))
  );
});
