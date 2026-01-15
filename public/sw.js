// Service Worker for FNote - Offline Support
const CACHE_NAME = 'fnote-v3'
const OFFLINE_URL = '/offline.html'

// Files to cache immediately
const urlsToCache = [
  '/',
  OFFLINE_URL,
  '/favicon.ico',
  // Cache your main pages
  '/dashboard',
  '/goals',
  '/planner',
  '/notebook',
  '/thoughts',
  '/learned-today'
]

// Install event
self.addEventListener('install', event => {
  console.log('[Service Worker] Install - caching pages')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app pages')
        return cache.addAll(urlsToCache)
      })
  )
  self.skipWaiting()
})

// Activate event
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate')
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event with network-first for HTML, cache-first for assets
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url)
  
  // Skip non-GET requests and chrome extensions
  if (event.request.method !== 'GET' || requestUrl.protocol === 'chrome-extension:') {
    return
  }

  // Handle navigation requests (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the page if it's successful
          const responseClone = response.clone()
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseClone))
          return response
        })
        .catch(() => {
          // Offline - try to get from cache
          return caches.match(event.request)
            .then(response => {
              // Return cached page or offline page
              return response || caches.match(OFFLINE_URL)
            })
        })
    )
    return
  }

  // Handle API requests - network only
  if (requestUrl.pathname.startsWith('/api/')) {
    event.respondWith(fetch(event.request))
    return
  }

  // For static assets (JS, CSS, images) - cache first
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse
        }
        
        return fetch(event.request)
          .then(response => {
            // Don't cache if not a successful response
            if (!response || response.status !== 200) {
              return response
            }
            
            // Cache the asset
            const responseToCache = response.clone()
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache))
            
            return response
          })
      })
  )
})

// Background sync for offline actions (future enhancement)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-notes') {
    console.log('[Service Worker] Background sync for notes')
    // You can implement background sync here later
  }
})
