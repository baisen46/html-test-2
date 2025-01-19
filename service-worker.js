const CACHE_NAME = "cat-info-cache-v1";
const urlsToCache = [
  "./index.html",
  "./map.html",
  "./style.css",
  "./script.js",
  "./icon-192x192.png",
  "./icon-512x512.png",
];

// インストールイベント
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("キャッシュを作成中...");
      return cache.addAll(urlsToCache);
    })
  );
});

// フェッチイベント
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// アクティベートイベント（古いキャッシュの削除）
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("古いキャッシュを削除:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
