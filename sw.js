const V = 'cancionero-1-c7475abf';
const ARCHIVOS = ['./', './index.html', './manifest.json', './icono-192.png', './icono-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(ARCHIVOS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks =>
  Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
// Primero la red (así llegan las canciones nuevas); sin conexión, la copia guardada.
self.addEventListener('fetch', e => { e.respondWith(fetch(e.request).then(r => {
  const copia = r.clone(); caches.open(V).then(c => c.put(e.request, copia)); return r;
}).catch(() => caches.match(e.request))); });
