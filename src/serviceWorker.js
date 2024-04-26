const CACHE_NAME = 'cache-v1';

self.addEventListener('fetch', (event) => {
    event.respondWith(
        // Проверяем наличие интернета
        fetch(event.request)
            .then(function (response) {
                // Если есть ответ от сети, кладем его в кэш
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(event.request, responseToCache);
                });
                return response;
            })
            .catch(function () {
                // Если нет ответа от сети, ищем в кэше
                return caches.match(event.request);
            }),
    );
});

self.addEventListener('activate', () => {
    //console.log('Активирован');
});
