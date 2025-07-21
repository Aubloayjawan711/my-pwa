const CACHE_NAME = 'my-shop-cache-v2';
const urlsToCache = [
  '/my-pwa/',
  '/my-pwa/index.html',
  '/my-pwa/style.css',
  '/my-pwa/app.js',
  '/my-pwa/manifest.json',
  '/my-pwa/icon-48x48.png',
  '/my-pwa/icon-72x72.png',
  '/my-pwa/icon-96x96.png',
  '/my-pwa/icon-128x128.png',
  '/my-pwa/icon-144x144.png',
  '/my-pwa/icon-152x152.png',
  '/my-pwa/icon-192x192.png',
  '/my-pwa/icon-256x256.png',
  '/my-pwa/icon-384x384.png',
  '/my-pwa/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(
      response => response || fetch(event.request)
    )
  );
});
