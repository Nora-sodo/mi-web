/* LifePlan service worker — static public assets only. No user data or API responses are cached. */
const CACHE_NAME = 'lifeplan-public-assets-v1';
const STATIC_ASSETS = [
  './offline.html',
  './manifest.webmanifest',
  './lifeplan-icon-64.png',
  './lifeplan-icon-192.png',
  './lifeplan-icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(
      names.filter(name => name.startsWith('lifeplan-public-assets-') && name !== CACHE_NAME)
        .map(name => caches.delete(name))
    )).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    // Never store index.html or authenticated pages in Cache Storage.
    event.respondWith(fetch(request).catch(async () =>
      (await caches.match('./offline.html')) || Response.error()
    ));
    return;
  }
  const publicPaths = STATIC_ASSETS.map(path => new URL(path, self.registration.scope).pathname);
  if (publicPaths.includes(url.pathname)) {
    event.respondWith(caches.match(request, {ignoreSearch:true}).then(cached => cached || fetch(request)));
  }
});
