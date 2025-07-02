const CACHE_NAME = 'facturacion-cache_v1';
const archivosParaCachear = [
  './',
  './index.html',
  './clientes.html',
  './productos.html',
  './facturacion.html',
  './facturas.html',
  './public/js/app.js',
  './public/lib/bootstrap-5.3.6-dist/css/bootstrap.min.css',
  './public/lib/bootstrap-5.3.6-dist/js/bootstrap.bundle.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.1/font/bootstrap-icons.min.css',
];
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Cacheando archivos esenciales');
        return cache.addAll(archivosParaCachear);
      })
      .catch((error) => {
        console.error('[Service Worker] Error al cachear:', error);
      })
  );
});
