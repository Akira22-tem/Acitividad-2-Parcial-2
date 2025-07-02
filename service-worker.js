const CACHE_NAME = 'facturacion-cache_v1';
const archivosParaCachear = ['./', './index.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(archivosParaCachear);
    })
  );
});
