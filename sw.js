/* Service worker del Banderillero GPS: deja la app disponible sin conexión. */
const CACHE = 'banderillero-v8';
const FILES = ['.', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png',
               'icon-maskable-192.png', 'icon-maskable-512.png'];

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

/* Archivo compartido desde otra app (Gmail, WhatsApp, Drive): Android manda un
   POST acá. Se guarda el archivo en una caché aparte y se abre la app, que lo
   levanta sola. */
const BUZON = 'banderillero-compartido';

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method === 'POST' && url.pathname.endsWith('/compartir')) {
    e.respondWith((async () => {
      try {
        const fd = await e.request.formData();
        const f = fd.get('archivo');
        if (f && f.size) {
          const c = await caches.open(BUZON);
          await c.put('/__compartido', new Response(f, {
            headers: { 'x-nombre': encodeURIComponent(f.name || 'mapa.kml') }
          }));
          return Response.redirect('./?compartido=1', 303);
        }
      } catch (err) { /* si algo falla, se abre la app igual */ }
      return Response.redirect('./', 303);
    })());
    return;
  }
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
