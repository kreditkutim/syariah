self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("syariah-cache-v1").then((cache) => {
     return cache.addAll([
  "/syariah/data.html",
  "/syariah/manifest.json",
  "/syariah/icon-192.png",
  "/syariah/icon-512.png"
]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
