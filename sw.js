/* Service worker del Banderillero GPS: deja la app disponible sin conexión. */
const CACHE = 'banderillero-v3';
const FILES = ['.', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const esPagina = e.request.mode === 'navigate' || e.request.destination === 'document';
  if (esPagina) {
    // la página va red-primero: con internet siempre carga la última versión;
    // sin internet, sale de la caché (funciona offline igual)
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() =>
        caches.match(e.request, { ignoreSearch: true }).then(hit => hit || caches.match('.'))
      )
    );
    return;
  }
  // el resto (íconos, manifest) va caché-primero
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit =>
      hit ||
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match('.'))
    )
  );
});
