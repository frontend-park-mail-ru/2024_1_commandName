//import { handleRouting } from './utils/router.js'; // Импортируем функцию handleRouting из router.js
import { AuthAPI } from './utils/API/AuthAPI.js';

const api = new AuthAPI();
api.checkAuth()
    .then((data) => {
        if (data.status === 200) {
            console.log('Is auth');
            //window.history.pushState({}, '', '/chat'); // Изменяем URL на /chat при успешной авторизации
        } else {
            console.log('Not auth');
            window.history.pushState({}, '', '/login'); // Изменяем URL на /login при отсутствии авторизации
        }
        //handleRouting(); // Вызываем handleRouting для обработки изменения URL
    })
    .catch((error) => {
        console.error('Failed:', error);
    });
