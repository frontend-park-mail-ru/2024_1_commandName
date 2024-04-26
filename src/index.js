import { AuthAPI } from './utils/API/AuthAPI.js';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker
            .getRegistrations()
            .then(function (registrations) {
                Promise.all(
                    registrations.map(function (registration) {
                        return registration.unregister();
                    }),
                ).then(function () {
                    navigator.serviceWorker
                        .register('/serviceWorker.js')
                        .then()
                        .catch(function (err) {
                            console.log(
                                'Ошибка при регистрации нового Service Worker:',
                                err,
                            );
                        });
                });
            });
    });
}

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
