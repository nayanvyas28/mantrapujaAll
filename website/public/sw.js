self.addEventListener('push', (event) => {
    const data = event.data?.json() || {};
    const title = data.title || 'Mantra Puja';
    const options = {
        body: data.body || 'New update available!',
        icon: '/om.png',
        badge: '/globe.svg',
        data: data.data || {},
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
