/* MGR Hospital — service worker (offline app shell) */
const CACHE = 'mgr-hospital-v1';

const PRECACHE = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/fonts/allura-400-latin-ext.woff2",
  "assets/fonts/allura-400-latin.woff2",
  "assets/fonts/allura-400-vietnamese.woff2",
  "assets/fonts/fonts.css",
  "assets/fonts/fraunces-400-italic-latin-ext.woff2",
  "assets/fonts/fraunces-400-italic-latin.woff2",
  "assets/fonts/fraunces-400-italic-vietnamese.woff2",
  "assets/fonts/fraunces-400-latin-ext.woff2",
  "assets/fonts/fraunces-400-latin.woff2",
  "assets/fonts/fraunces-400-vietnamese.woff2",
  "assets/fonts/hanken-grotesk-400-cyrillic-ext.woff2",
  "assets/fonts/hanken-grotesk-400-latin-ext.woff2",
  "assets/fonts/hanken-grotesk-400-latin.woff2",
  "assets/fonts/hanken-grotesk-400-vietnamese.woff2",
  "assets/fonts/ibm-plex-mono-400-cyrillic-ext.woff2",
  "assets/fonts/ibm-plex-mono-400-cyrillic.woff2",
  "assets/fonts/ibm-plex-mono-400-latin-ext.woff2",
  "assets/fonts/ibm-plex-mono-400-latin.woff2",
  "assets/fonts/ibm-plex-mono-400-vietnamese.woff2",
  "assets/fonts/ibm-plex-mono-500-cyrillic-ext.woff2",
  "assets/fonts/ibm-plex-mono-500-cyrillic.woff2",
  "assets/fonts/ibm-plex-mono-500-latin-ext.woff2",
  "assets/fonts/ibm-plex-mono-500-latin.woff2",
  "assets/fonts/ibm-plex-mono-500-vietnamese.woff2",
  "assets/img/best-surgeon-in-vizag.jpg",
  "assets/img/gall-bladder-surgeon.jpg",
  "assets/img/mgr-hospital-casualty-room.jpg",
  "assets/img/mgr-hospital-deluxe-room.jpg",
  "assets/img/mgr-hospital-garden.jpg",
  "assets/img/mgr-hospital-operation-theatre.jpg",
  "assets/img/mgr-hospital-pharmacy.jpg",
  "assets/img/mgr-hospital-reception.jpg",
  "assets/icons/apple-touch-icon.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/icon-maskable-192.png",
  "assets/icons/icon-maskable-512.png"
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Add individually so one missing file can't abort the whole install.
    await Promise.allSettled(
      PRECACHE.map((url) => cache.add(new Request(url, { cache: 'reload' })))
    );
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Only manage our own origin; let wa.me / maps / youtube / etc. go straight to network.
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first, fall back to cached app shell when offline.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        const cache = await caches.open(CACHE);
        return (await cache.match(req)) || (await cache.match('index.html')) || (await cache.match('./')) || Response.error();
      }
    })());
    return;
  }

  // Static same-origin assets: cache-first, then network (and cache it).
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req);
    if (cached) return cached;
    try {
      const fresh = await fetch(req);
      if (fresh && fresh.ok && fresh.type === 'basic') cache.put(req, fresh.clone());
      return fresh;
    } catch (e) {
      return cached || Response.error();
    }
  })());
});
