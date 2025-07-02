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
//esta parte interpeta peticiones
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // retorna la respuesta cacheada si es que está disponible claro
      if (cachedResponse) {
        console.log(
          `[Service Worker] Sirviendo desde cache: ${event.request.url}`
        );
        return cachedResponse;
      }

      // si no está en cache, hace la peticon ala red
      return fetch(event.request)
        .then((response) => {
          // si esque da una respuesta válida, se cachea para futuras peticiones
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // si falla la red y nos ubicamos en una página HTML, lanza  la página en offline
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('./index.html');
          }
        });
    })
  );
});
