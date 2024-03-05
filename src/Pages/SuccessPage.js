import LoginPage from './LoginPage.js';
import { AuthAPI } from '../utils/API/AuthAPI.js';
import { goToPage } from '../utils/goToPage.js';
/**
 * Рендерит страницу успешной авторизации
 * @class Класс страницы успешной авторизации
 */
export default class SuccessPage {
    #parent;
    constructor(parent) {
        this.#parent = parent;
    }

    logoutButtonCallback(event) {
        event.preventDefault();
        // Отправка данных на сервер
        const api = new AuthAPI();
        api.logout()
            .then((data) => {
                if (data.status === 200) {
                    // Обработка успешной авторизации
                    console.log('Successfully logged out');
                    goToPage(LoginPage);
                } else {
                    console.log('Error logged out');
                }
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
    }

    addEventListeners(logoutButton) {
        logoutButton.addEventListener('click', this.logoutButtonCallback);
    }

    render() {
        const title = document.createElement('h3');
        title.textContent = 'Success Auth';

        const logoutButton = document.createElement('button');
        logoutButton.id = 'logout_btn';
        logoutButton.textContent = 'Выйти';

        this.#parent.appendChild(title);
        this.#parent.appendChild(logoutButton);

        this.addEventListeners(logoutButton);
    }
}
