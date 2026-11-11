/* LifePlan 1.0 RC4: only public installation assets are cached. Never cache HTML/app data or Supabase requests. */
const CACHE_NAME = 'lifeplan-public-assets-rc20';
const STATIC_ASSETS = [
  './offline.html', './manifest.webmanifest',
  './lifeplan-icon-64.png', './lifeplan-icon-192.png', './lifeplan-icon-512.png'
];
const staticPaths = new Set(STATIC_ASSETS.map(path => new URL(path, self.registration.scope).pathname));
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME)
    .then(cache => cache.addAll(STATIC_ASSETS))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(names => Promise.all(
    names.filter(name => name.startsWith('lifeplan-public-assets-') && name !== CACHE_NAME)
      .map(name => caches.delete(name))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    // Always contact the network for the app; never cache authenticated HTML.
    event.respondWith(fetch(request).catch(async () =>
      (await caches.match('./offline.html')) || Response.error()
    ));
    return;
  }
  if (!staticPaths.has(url.pathname)) return;
  // Refresh icons and manifest on each online request; fall back to cached public assets offline.
  event.respondWith(fetch(request).then(async response => {
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  }).catch(async () => (await caches.match(request, {ignoreSearch: true})) || Response.error()));
});
