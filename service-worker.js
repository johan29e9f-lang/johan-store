self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('jstore-cache').then((cache) => {
      return cache.addAll([
        '/johan-store/',
        '/johan-store/index.html',
        '/johan-store/style.css',
        '/johan-store/script.js',
        '/johan-store/assets/icon.png',
        '/johan-store/assets/keyboard.png',
        '/johan-store/assets/mouse.png',
        '/johan-store/assets/gpu.png',
        '/johan-store/assets/ram.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
