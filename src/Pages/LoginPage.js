import { validatePassword, validateUsername } from '../utils/valid.js';
import SuccessPage from '../Pages/SuccessPage.js';
import { goToPage } from '../utils/goToPage.js';
import { AuthAPI } from '../utils/API/AuthAPI.js';
import RegisterPage from './RegisterPage.js';

/**
 * Рендерит страницу авторизации
 * @class Класс страницы авторизации
 */
export default class LoginPage {
    #parent;
    #errorMessage;
    #signinForm;

    constructor(parent) {
        this.#parent = parent;
    }

    // TODO: create setError method

    formCallback(event) {
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
                if (data.status === 200) {
                    // Обработка успешной авторизации
                    console.log('Successfully logged in');
                    goToPage(SuccessPage);
                } else {
                    error.textContent = data.body.error;
                }
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
    }

    addEventListeners(signinForm) {
        signinForm.addEventListener('submit', this.formCallback);
    }

    render() {
        // Создаем элемент div с классом signin-container
        const signinContainer = document.createElement('div');
        signinContainer.className = 'signin-container';

        // Создаем элемент form с id signin-form
        const signinForm = document.createElement('form');
        signinForm.id = 'signin-form';

        const header = document.createElement('h3');
        header.textContent = 'Авторизация';

        // Создаем элементы input, button и p
        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.id = 'username';
        usernameInput.placeholder = 'Имя пользователя';
        usernameInput.required = true;

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.id = 'password';
        passwordInput.placeholder = 'Пароль';
        passwordInput.required = true;

        const signinButton = document.createElement('button');
        signinButton.type = 'submit';
        signinButton.textContent = 'Войти';

        this.#errorMessage = document.createElement('p');
        this.#errorMessage.id = 'error-message';

        const notExistsAccountButton = document.createElement('button');
        notExistsAccountButton.textContent = 'Еще нет аккаунта?';
        notExistsAccountButton.onclick = () => {
            goToPage(RegisterPage);
        };

        // Добавляем элементы input и button в форму
        signinForm.appendChild(header);
        signinForm.appendChild(usernameInput);
        signinForm.appendChild(passwordInput);
        signinForm.appendChild(signinButton);
        signinForm.appendChild(notExistsAccountButton);
        signinForm.appendChild(this.#errorMessage);

        // Добавляем форму в контейнер
        signinContainer.appendChild(signinForm);

        // Добавляем контейнер в body
        this.#parent.appendChild(signinContainer);

        this.addEventListeners(signinForm);
    }
}
