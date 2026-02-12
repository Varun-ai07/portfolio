// Service Worker for offline-first caching strategy
const CACHE_VERSION = 'v1.0.0';
const STATIC_CACHE = `static-cache-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dynamic-cache-${CACHE_VERSION}`;
const IMAGE_CACHE = `image-cache-${CACHE_VERSION}`;

// Cache lifetime in milliseconds
const CACHE_LIFETIME = {
    static: 365 * 24 * 60 * 60 * 1000, // 1 year
    dynamic: 7 * 24 * 60 * 60 * 1000,   // 1 week
    image: 30 * 24 * 60 * 60 * 1000,    // 1 month
};

// Files to cache on install
const STATIC_ASSETS = [
    '/',
    '/manifest.json',
    '/file.svg',
    '/globe.svg',
    '/next.svg',
    '/vercel.svg',
    '/window.svg',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            console.log('[ServiceWorker] Caching static assets');
            return cache.addAll(STATIC_ASSETS);
        }).then(() => {
            return self.skipWaiting();
        })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => {
                        // Remove old cache versions
                        return cacheName.startsWith('static-cache-') ||
                            cacheName.startsWith('dynamic-cache-') ||
                            cacheName.startsWith('image-cache-') &&
                            cacheName !== STATIC_CACHE &&
                            cacheName !== DYNAMIC_CACHE &&
                            cacheName !== IMAGE_CACHE;
                    })
                    .map((cacheName) => {
                        console.log('[ServiceWorker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip chrome extensions and other origins
    if (!url.origin.includes(self.location.origin) && !url.origin.includes('localhost')) {
        return;
    }

    // Determine caching strategy based on request type
    if (isImageRequest(request)) {
        event.respondWith(cacheFirst(request, IMAGE_CACHE));
    } else if (isStaticAsset(request)) {
        event.respondWith(cacheFirst(request, STATIC_CACHE));
    } else {
        event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    }
});

// Cache-first strategy (for static assets and images)
async function cacheFirst(request, cacheName) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            // Check if cache is expired
            const cacheDate = new Date(cachedResponse.headers.get('date'));
            const now = new Date();
            const lifetime = cacheName === IMAGE_CACHE ? CACHE_LIFETIME.image : CACHE_LIFETIME.static;

            if (now - cacheDate < lifetime) {
                return cachedResponse;
            }
        }

        // Fetch from network
        const networkResponse = await fetch(request);

        // Cache successful responses
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        // Return cached response as fallback
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        // Return offline page or error
        return new Response('Offline - Content not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });
    }
}

// Network-first strategy (for dynamic content)
async function networkFirst(request, cacheName) {
    try {
        const networkResponse = await fetch(request);

        // Cache successful responses
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        // Fallback to cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        // Return error response
        return new Response('Offline - Content not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });
    }
}

// Helper: Check if request is for an image
function isImageRequest(request) {
    const url = new URL(request.url);
    return /\.(jpg|jpeg|png|gif|svg|webp|avif|ico)$/i.test(url.pathname);
}

// Helper: Check if request is for static asset
function isStaticAsset(request) {
    const url = new URL(request.url);
    return url.pathname.startsWith('/_next/static/') ||
        url.pathname.startsWith('/static/') ||
        /\.(js|css|woff|woff2|ttf|eot)$/i.test(url.pathname);
}

// Message handler for cache clearing
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => caches.delete(cacheName))
                );
            }).then(() => {
                return self.clients.matchAll();
            }).then((clients) => {
                clients.forEach((client) => {
                    client.postMessage({ type: 'CACHE_CLEARED' });
                });
            })
        );
    }
});
