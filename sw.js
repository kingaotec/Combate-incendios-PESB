const CACHE_NAME = 'pesb-monitor-v1';

// Arquivos estáticos da interface que serão salvos no celular (Cache offline)
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './assets/logo.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Arquivos em cache com sucesso.');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Interceptação de requisições de rede
self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // IMPORTANTE: Nunca fazer cache das APIs de Clima e Focos de Calor.
  // Queremos que o aplicativo sempre busque o vento e o fogo em tempo real quando houver sinal.
  if (url.includes('api.open-meteo.com') || url.includes('firms.modaps.eosdis.nasa.gov')) {
    return; // Deixa passar direto para tentar buscar na rede
  }

  // Para a interface (HTML, mapa, logo), tenta usar o arquivo salvo no celular primeiro
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});