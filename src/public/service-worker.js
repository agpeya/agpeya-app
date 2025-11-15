// Service Worker voor Agpeya App - Verbeterde Versie
const CACHE_NAME = 'agpeya-v2.0.0';
const STATIC_CACHE = 'agpeya-static-v2.0.0';

// URLs om te cachen
const STATIC_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/favicon.ico'
];

// Dynamic resources die gecached kunnen worden
const DYNAMIC_URLS = [
  // Voeg belangrijke API endpoints of andere resources toe
];

// Installatie - Cache belangrijke bestanden
self.addEventListener('install', (event) => {
  console.log('🔄 Service Worker: Installatie gestart');
  
  event.waitUntil(
    (async () => {
      try {
        const staticCache = await caches.open(STATIC_CACHE);
        console.log('✅ Static cache geopend');
        
        // Voeg alle static URLs toe aan cache
        await staticCache.addAll(STATIC_URLS);
        console.log('✅ Static resources gecached');
        
        // Skip waiting om direct actief te worden
        self.skipWaiting();
      } catch (error) {
        console.error('❌ Cache installatie gefaald:', error);
      }
    })()
  );
});

// Activatie - Opruimen oude caches
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker: Activatie gestart');
  
  event.waitUntil(
    (async () => {
      try {
        // Verwijder oude caches
        const cacheKeys = await caches.keys();
        const deletePromises = cacheKeys.map((cacheKey) => {
          if (cacheKey !== CACHE_NAME && cacheKey !== STATIC_CACHE) {
            console.log('🗑️ Oude cache verwijderen:', cacheKey);
            return caches.delete(cacheKey);
          }
        });
        
        await Promise.all(deletePromises);
        console.log('✅ Oude caches opgeruimd');
        
        // Claim clients voor directe controle
        await self.clients.claim();
        console.log('✅ Service Worker actief voor alle clients');
      } catch (error) {
        console.error('❌ Cache activatie gefaald:', error);
      }
    })()
  );
});

// Fetch event handler - Slimme caching strategie
self.addEventListener('fetch', (event) => {
  // Skip niet-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension requests
  if (event.request.url.startsWith('chrome-extension://')) return;
  
  event.respondWith(handleFetch(event.request));
});

async function handleFetch(request) {
  try {
    // Probeer eerst netwerk request
    const networkResponse = await fetch(request);
    
    // Als succesvol, cache de response
    if (networkResponse.ok) {
      await cacheResponse(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (networkError) {
    console.log('🌐 Netwerk gefaald, probeer cache:', request.url);
    
    // Probeer cached response
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log('✅ Cache gevonden:', request.url);
      return cachedResponse;
    }
    
    // Fallback voor HTML requests (SPA routing)
    if (request.destination === 'document' || 
        request.headers.get('Accept')?.includes('text/html')) {
      return caches.match('/index.html');
    }
    
    // Fallback response voor andere failed requests
    return createFallbackResponse(request);
  }
}

// Cache een response
async function cacheResponse(request, response) {
  try {
    // Bepaal welke cache te gebruiken
    const cacheName = isStaticAsset(request) ? STATIC_CACHE : CACHE_NAME;
    const cache = await caches.open(cacheName);
    
    // Voeg toe aan cache
    await cache.put(request, response);
    console.log('💾 Gecached:', request.url);
    
  } catch (error) {
    console.warn('⚠️ Cache opslag gefaald:', error);
  }
}

// Check of request een static asset is
function isStaticAsset(request) {
  const url = new URL(request.url);
  
  return (
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.json') ||
    STATIC_URLS.includes(url.pathname)
  );
}

// Maak een fallback response
function createFallbackResponse(request) {
  const url = new URL(request.url);
  
  // Verschillende fallbacks voor verschillende content types
  if (request.destination === 'document' || 
      request.headers.get('Accept')?.includes('text/html')) {
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Agpeya - Offline</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              font-family: system-ui, sans-serif; 
              padding: 2rem; 
              text-align: center;
              background: linear-gradient(135deg, #fef3c7, #fed7aa);
              color: #7c2d12;
            }
            .container { max-width: 400px; margin: 0 auto; }
            .icon { font-size: 4rem; margin-bottom: 1rem; }
            h1 { margin-bottom: 1rem; }
            p { margin-bottom: 2rem; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">📵</div>
            <h1>Offline Modus</h1>
            <p>Je bent offline. Sommige functies zijn niet beschikbaar.</p>
            <p>Controleer je internetverbinding en probeer het opnieuw.</p>
          </div>
        </body>
      </html>
      `,
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
  
  // Generic fallback voor andere requests
  return new Response(
    JSON.stringify({
      error: 'Offline',
      message: 'Content niet beschikbaar offline',
      url: url.pathname,
      timestamp: new Date().toISOString()
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

// Background sync voor failed requests (optioneel)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync gestart');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implementeer background sync logica hier
  console.log('🔄 Background sync uitgevoerd');
}

// Periodieke cache cleanup (optioneel)
async function cleanupOldCaches() {
  try {
    const cacheKeys = await caches.keys();
    const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    for (const cacheKey of cacheKeys) {
      const cache = await caches.open(cacheKey);
      const requests = await cache.keys();
      
      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const dateHeader = response.headers.get('date');
          if (dateHeader && new Date(dateHeader).getTime() < weekAgo) {
            await cache.delete(request);
          }
        }
      }
    }
  } catch (error) {
    console.error('❌ Cache cleanup gefaald:', error);
  }
}