const cacheName = "kss-v1";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/nota.html",
  "/hitung.html",
  "/syarat.html",
  "/hukum.html",
  "/pertanyaan.html",
];

// Install Service Worker
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets);
    }),
  );
});

// Fetching assets
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cacheRes) => {
      return cacheRes || fetch(e.request);
    }),
  );
});
