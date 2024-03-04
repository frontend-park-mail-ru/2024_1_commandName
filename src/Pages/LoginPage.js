import { validatePassword, validateUsername } from '../utils/valid.js';
import SuccessPage from '../Pages/SuccessPage.js';
import { goToPage } from '../utils/goToPage.js';
import { AuthAPI } from '../utils/API/AuthAPI.js';

/**
 * Рендерит страницу авторизации
 * @class Класс страницы авторизации
 */
export default class LoginPage {
    #parent;
    #errorMessage;
    constructor(parent) {
        this.#parent = parent;
    }

    setError;

    render() {
        // Создаем элемент div с классом signin-container
        const signinContainer = document.createElement('div');
        signinContainer.className = 'signin-container';

        // Создаем элемент form с id signin-form
        const signinForm = document.createElement('form');
        signinForm.id = 'signin-form';

        // Создаем элементы input, button и p
        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.id = 'username';
        usernameInput.placeholder = 'Username';
        usernameInput.required = true;

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.id = 'password';
        passwordInput.placeholder = 'Password';
        passwordInput.required = true;

        const signinButton = document.createElement('button');
        signinButton.type = 'submit';
        signinButton.textContent = 'Sign In';

        this.#errorMessage = document.createElement('p');
        this.#errorMessage.id = 'error-message';

        // Добавляем элементы input и button в форму
        signinForm.appendChild(usernameInput);
        signinForm.appendChild(passwordInput);
        signinForm.appendChild(signinButton);
        signinForm.appendChild(this.#errorMessage);

        // Добавляем форму в контейнер
        signinContainer.appendChild(signinForm);

        // Добавляем контейнер в body
        this.#parent.innerHTML = '';
        this.#parent.appendChild(signinContainer);

        signinForm.addEventListener('submit', function (event) {
            console.log('test');
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const error = document.getElementById('error-message');
            error.textContent = '';

            // Валидация данных
            let valid = validateUsername(username);
            if (!valid.success) {
                error.textContent = valid.message;
                return;
            }
            valid = validatePassword(password);
            if (!valid.success) {
                error.textContent = valid.message;
                return;
            }

            // Отправка данных на сервер
            const api = new AuthAPI();
            api.login(username, password)
                .then((data) => {
                    console.log(data);
                    if (data.status === 200) {
                        // Обработка успешной авторизации
                        console.log('Successfully logged in');
                        goToPage(SuccessPage);
                    } else {
                        error.textContent = data.message;
                    }
                })
                .catch((error) => {
                    console.error('Login failed:', error);
                });
        });
    }
}
