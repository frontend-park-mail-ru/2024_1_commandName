import { AuthAPI } from './utils/API/AuthAPI.js';

const api = new AuthAPI();
api.checkAuth()
    .then((data) => {
        if (data.status === 200) {
            console.log('Is auth');
        } else {
            console.log('Not auth');
            //window.history.pushState({}, '', '/login'); // Изменяем URL на /login при отсутствии авторизации
        }
    })
    .catch((error) => {
        console.error('Failed:', error);
    });
