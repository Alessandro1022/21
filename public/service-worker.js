const CACHE_NAME = 'empire-ai-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// ---------- INSTALL ----------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// ---------- ACTIVATE ----------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ---------- FETCH ----------
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

// ---------- PUSH NOTIFICATIONS ----------
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'Empire AI', {
      body: data.body || 'Ny notis!',
      icon: '/icon-192.png',
    })
  );
});

// ---------- BACKGROUND SYNC ----------
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-queued-actions') {
    event.waitUntil(processQueue());
  }
});

async function processQueue() {
  console.log('Background sync körs');
  // Här kan du skicka köade actions till servern
}

// ---------- PERIODIC SYNC ----------
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'fetch-latest-data') {
    event.waitUntil(fetchAndCacheData());
  }
});

async function fetchAndCacheData() {
  try {
    const resp = await fetch('/api/data'); // byt ut till din endpoint
    const data = await resp.json();
    console.log('Uppdaterar data i bakgrunden', data);
    // Här kan du cache:a eller spara i IndexedDB
  } catch (err) {
    console.error('Error vid periodic sync:', err);
  }
}
