// Cambia este número cada vez que subas una versión nueva
const CACHE_VERSION = 'flujo-caja-v8';

self.addEventListener('install', e => {
    self.skipWaiting(); // activa inmediatamente sin esperar
});

self.addEventListener('activate', e => {
    // Borra cachés viejos
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
        ).then(() => self.clients.claim()) // toma control de todas las pestañas
    );
});

self.addEventListener('fetch', e => {
    // Siempre va a la red primero, caché solo como fallback
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
