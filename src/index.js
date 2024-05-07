import { AuthAPI } from './utils/API/AuthAPI.js';
import { handleRouting } from './utils/router.js';

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .getRegistrations()
            .then(function (registrations) {
                if (registrations.length === 0) {
                    return navigator.serviceWorker.register(
                        '/serviceWorker.js',
                    );
                } else {
                    const serviceWorker = registrations[0];
                    if (!serviceWorker.active) {
                        return serviceWorker.activate();
                    }
                }
            })
            .catch(function (err) {
                console.log(
                    'Ошибка при регистрации/активации Service Worker:',
                    err,
                );
            });
    }
}

window.addEventListener('load', function () {
    registerServiceWorker();
});

const api = new AuthAPI();
api.checkAuth()
    .then((data) => {
        if (data.status === 200) {
            console.log('Is auth');
        } else {
            console.log('Not auth');
        }
    })
    .catch((error) => {
        console.error('Failed:', error);
    });

// Обработка изменения URL
window.addEventListener('popstate', handleRouting);

// Вызываем функцию handleRouting при загрузке страницы
window.addEventListener('load', handleRouting);

// eslint-disable-next-line no-undef
Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});
// eslint-disable-next-line no-undef
Handlebars.registerHelper('ifNotEquals', function (arg1, arg2, options) {
    return arg1 !== arg2 ? options.fn(this) : options.inverse(this);
});
