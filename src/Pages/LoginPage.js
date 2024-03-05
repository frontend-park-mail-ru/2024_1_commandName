import { validatePassword, validateUsername } from '../utils/valid.js';
import { goToPage } from '../utils/goToPage.js';
import { AuthAPI } from '../utils/API/AuthAPI.js';
import RegisterPage from './RegisterPage.js';
import ChatPage from './ChatPage.js';

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
                alert('Что-то пошло не так');
                console.error('Login failed:', error);
            });
    }

    addEventListeners() {
        this.#signinForm.addEventListener('submit', this.formCallback);
    }

    render() {
        // Создаем элемент div с классом signin-container
        const signinContainer = document.createElement('div');
        signinContainer.className = 'signin-container';

        // Создаем элемент form с id signin-form
        this.#signinForm = document.createElement('form');
        this.#signinForm.id = 'signin-form';

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
        this.#errorMessage.className = 'error-message';

        const notExistsAccountButton = document.createElement('button');
        notExistsAccountButton.textContent = 'Еще нет аккаунта?';
        notExistsAccountButton.onclick = () => {
            goToPage(RegisterPage);
        };

        // Добавляем элементы input и button в форму
        this.#signinForm.appendChild(header);
        this.#signinForm.appendChild(usernameInput);
        this.#signinForm.appendChild(passwordInput);
        this.#signinForm.appendChild(signinButton);
        this.#signinForm.appendChild(notExistsAccountButton);
        this.#signinForm.appendChild(this.#errorMessage);

        // Добавляем форму в контейнер
        signinContainer.appendChild(this.#signinForm);

        // Добавляем контейнер в body
        this.#parent.appendChild(signinContainer);

        this.addEventListeners();
    }
}
