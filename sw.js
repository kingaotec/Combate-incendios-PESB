const CACHE_NAME = 'pesb-monitor-v2';
const MAP_CACHE = 'pesb-map-tiles-v1';

// Arquivos da interface (App)
const ASSETS_TO_CACHE = [
  './',
'./index.html',
'./manifest.json',
'./assets/logo.png',
'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

// Instalação: Salva a interface
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Ativação: Limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== MAP_CACHE) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptação de Rede
self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // 1. DADOS TÁTICOS (FIRMS e Clima): Nunca usar cache, sempre buscar da rede.
  if (url.includes('api.open-meteo.com') || url.includes('firms.modaps.eosdis.nasa.gov')) {
    return;
  }

  // 2. TILES DO MAPA (Satélite, Topo e Ruas): Estratégia Cache-First
  if (
    url.includes('tile.openstreetmap.org') ||
    url.includes('arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile') ||
    url.includes('tile.opentopomap.org')
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Retorna do cache instantaneamente offline
        }
        // Se não tiver no cache, baixa e salva silenciosamente para o futuro
        return fetch(event.request).then((networkResponse) => {
          // Apenas salva respostas válidas
          if (networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(MAP_CACHE).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        }).catch(() => {
          // Opcional: Se estiver offline e não tiver o tile, a tela fica cinza naturalmente
        });
      })
    );
    return;
  }

  // 3. INTERFACE E ASSETS (HTML, CSS, JS): Estratégia Cache-First
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
