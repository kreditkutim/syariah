const CACHE_NAME = 'kredit-kutim-v1';
const urlsToCache = [
  '/syariah/',
  '/syariah/data.html',
  '/syariah/style.css',
  '/syariah/script.js',
  '/syariah/icon-192x192.png',
  '/syariah/icon-512x512.png'
];

// Install service worker
self.addEventListener('install', event => {
  console.log('Service worker installing...');
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  console.log('Service worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
