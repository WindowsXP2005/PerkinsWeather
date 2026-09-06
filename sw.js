// Perkins Weather - Service Worker
// Handles: (1) basic caching so the app shell loads instantly/offline,
// (2) receiving and displaying push notifications.

const CACHE_NAME = "perkins-weather-v1";

// Files that make up the "app shell" - cached on install so the app
// opens instantly even on a slow connection. Pages still fetch fresh
// content from the network first; this is just a fallback.
const APP_SHELL = [
  "index.html",
  "style.css",
  "date.js",
  "manifest.json",
  "Perkins_Weather.jpg",
  "icon-192.png",
  "icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Network-first strategy: always try to get the latest page/asset from
// the live site; only fall back to the cache if the network fails
// (e.g. no connection). This is what makes the app "auto-update" -
// it's always pulling your current website, not a frozen copy.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// ---- Push notifications ----
// Fires when a push message arrives from your notification provider
// (see pwa.js for the subscribe side).
self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: "Perkins Weather", body: event.data ? event.data.text() : "New update" };
  }

  const title = data.title || "Perkins Weather";
  const options = {
    body: data.body || "Tap for the latest forecast.",
    icon: "icon-192.png",
    badge: "icon-192.png",
    data: { url: data.url || "index.html" }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Tapping a notification opens (or focuses) the app
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data && event.notification.data.url
    ? event.notification.data.url
    : "index.html";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && "focus" in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
    })
  );
});
