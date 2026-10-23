/* Offline cache for Shadow Boxing Clock. Bump CACHE when you change any file. */
var CACHE = 'boxing-clock-v13';
var SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
var FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.clients.claim(); })
  );
});

/* Serve from cache at once, refresh the cache in the background. */
function staleWhileRevalidate(req) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(req, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
        return res;
      }).catch(function () { return hit || Response.error(); });
      return hit || net;
    });
  });
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin === location.origin) {
    if (req.mode === 'navigate') {
      e.respondWith(
        caches.match('index.html').then(function (hit) {
          var net = fetch(req).then(function (res) {
            if (res && res.ok) caches.open(CACHE).then(function (c) { c.put('index.html', res.clone()); });
            return res;
          }).catch(function () { return hit || Response.error(); });
          return hit || net;
        })
      );
      return;
    }
    e.respondWith(staleWhileRevalidate(req));
    return;
  }
  if (FONT_HOSTS.indexOf(url.hostname) !== -1) e.respondWith(staleWhileRevalidate(req));
});
