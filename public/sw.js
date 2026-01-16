// Service Worker for FNote - Aggressive caching for offline

const CACHE_NAME = 'fnote-offline-v4'
const OFFLINE_URL = '/offline.html'
const ASSETS_TO_CACHE = [
  '/',
  '/offline.html',
  '/favicon.ico',
  '/manifest.json',
  '/icon-192.svg',
  '/icon-512.svg'
]

// Install - cache critical assets
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching critical assets')
        return cache.addAll(ASSETS_TO_CACHE)
      })
      .then(() => {
        console.log('[Service Worker] Skip waiting to activate immediately')
        return self.skipWaiting()
      })
  )
})

// Activate - clean old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...')
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      console.log('[Service Worker] Claiming clients')
      return self.clients.claim()
    })
  )
})

// Fetch - network first, cache fallback
self.addEventListener('fetch', event => {
  // Skip non-GET requests and chrome extensions
  if (event.request.method !== 'GET' || 
      event.request.url.startsWith('chrome-extension://') ||
      event.request.url.includes('sockjs-node')) {
    return
  }

  // API requests - network only (will fail offline)
  if (event.request.url.includes('/api/')) {
    return
  }

  // For HTML pages - try network, then cache, then offline page
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('/')
            .then(response => {
              return response || caches.match(OFFLINE_URL)
            })
        })
    )
    return
  }

  // For other assets - cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse
        }

        return fetch(event.request)
          .then(response => {
            // Don't cache if not successful or not cacheable
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // Cache the response
            const responseToCache = response.clone()
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache)
              })

            return response
          })
          .catch(() => {
            // If it's an image, return a placeholder
            if (event.request.destination === 'image') {
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#0f2e1f"/><text x="100" y="100" font-family="Arial" font-size="14" fill="#d4af37" text-anchor="middle" dy=".3em">FNote</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              )
            }
          })
      })
  )
})

// Listen for messages from the page
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting()
  }
})
