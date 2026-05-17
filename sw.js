/* Mike's Handyman Service service worker
   Static-asset precache + stale-while-revalidate for same-origin GETs. */

const VERSION = 'mhs-v5';
const PRECACHE = [
  '/',
  '/styles.css',
  '/script.js',
  '/manifest.webmanifest',
  '/og-image.svg',
  '/icon-192.svg',
  '/icon-512.svg',
  '/services/drywall-paint.html',
  '/services/plumbing.html',
  '/services/electrical.html',
  '/services/decks-outdoor.html',
  '/services/kitchen-bath.html',
  '/services/installs.html',
  '/privacy.html',
  '/terms.html',
  '/thanks.html',
  '/404.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* Stale-while-revalidate for same-origin GETs */
  event.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const cached = await cache.match(req);
      const network = fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          cache.put(req, res.clone());
        }
        return res;
      }).catch(() => null);

      if (cached) {
        /* Refresh in background */
        event.waitUntil(network);
        return cached;
      }
      const fresh = await network;
      if (fresh) return fresh;
      /* Offline fallback: serve the cached 404 page for navigations */
      if (req.mode === 'navigate') {
        return cache.match('/404.html') || cache.match('/');
      }
      return new Response('', { status: 504, statusText: 'Offline' });
    })
  );
});
