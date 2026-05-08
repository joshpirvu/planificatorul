// sw.js - Service Worker pentru Notificări NATIVE
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Închide notificarea când dai click pe ea
    
    // Când dai click pe notificare, te duce înapoi pe tab-ul cu planificatorul
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes('/') && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});