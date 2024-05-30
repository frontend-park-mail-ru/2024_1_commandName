const CACHE_NAME = 'cache-v1';

self.addEventListener('fetch', (event) => {
    if (event.request.method === 'POST') {
        return;
    }
    event.respondWith(
        // Проверяем наличие интернета
        fetch(event.request)
            .then((response) => {
                // Проверяем, что ответ корректен (полный) и статус 200
                if (
                    !response ||
                    response.status !== 200 ||
                    response.type !== 'basic'
                ) {
                    return response;
                }

                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            })
            .catch(() => {
                // Если нет ответа от сети, ищем в кэше
                return caches.match(event.request);
            }),
    );
});

self.addEventListener('activate', () => {});
