import { AuthAPI } from './utils/API/AuthAPI.js';

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .getRegistrations()
            .then(function (registrations) {
                if (registrations.length === 0) {
                    return navigator.serviceWorker.register(
                        new URL('./serviceWorker.js', import.meta.url),
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

// eslint-disable-next-line no-undef
Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});
// eslint-disable-next-line no-undef
Handlebars.registerHelper('ifNotEquals', function (arg1, arg2, options) {
    return arg1 !== arg2 ? options.fn(this) : options.inverse(this);
});
// eslint-disable-next-line no-undef
Handlebars.registerHelper({
    and: (v1, v2) => v1 && v2,
    or: (v1, v2) => v1 || v2,
    not: (v) => !v,
});
