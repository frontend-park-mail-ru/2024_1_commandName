import { validatePassword, validateUsername } from '../utils/valid.js';
import { goToPage } from '../utils/goToPage.js';
import { AuthAPI } from '../utils/API/AuthAPI.js';
import SuccessPage from '../Pages/SuccessPage.js';
import LoginPage from './LoginPage.js';

/**
 *
 */
export default class RegisterPage {
    #parent;
    #errorMessage;

    constructor(parent) {
        this.#parent = parent;
    }

    formCallback(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword =
            document.getElementById('confirm-password').value;
        const error = document.getElementById('error-message');
        error.textContent = '';

        // Валидация данных
        if (password != confirmPassword) {
            error.textContent = 'Пароли не совпадают';
            return;
        }
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
        api.register(username, password)
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

    addEventListeners(signupForm) {
        signupForm.addEventListener('submit', this.formCallback);
    }

    render() {
        // Создаем элемент div с классом signup-container
        const signupContainer = document.createElement('div');
        signupContainer.className = 'signup-container';

        // Создаем элемент form с id signup-form
        const signupForm = document.createElement('form');
        signupForm.id = 'signup-form';

        const header = document.createElement('h3');
        header.textContent = 'Регистрация';

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

        const confirmPasswordInput = document.createElement('input');
        confirmPasswordInput.type = 'password';
        confirmPasswordInput.id = 'confirm-password';
        confirmPasswordInput.placeholder = 'Повторите пароль';
        confirmPasswordInput.required = true;

        const signupButton = document.createElement('button');
        signupButton.type = 'submit';
        signupButton.textContent = 'Зарегистрироваться';

        this.#errorMessage = document.createElement('p');
        this.#errorMessage.id = 'error-message';

        const existsAccountButton = document.createElement('button');
        existsAccountButton.textContent = 'Уже есть аккаунт?';
        existsAccountButton.onclick = () => {
            goToPage(LoginPage);
        };

        // Добавляем элементы input и button в форму
        signupForm.appendChild(header);
        signupForm.appendChild(usernameInput);
        signupForm.appendChild(passwordInput);
        signupForm.appendChild(confirmPasswordInput);
        signupForm.appendChild(signupButton);
        signupForm.appendChild(existsAccountButton);
        signupForm.appendChild(this.#errorMessage);

        // Добавляем форму в контейнер
        signupContainer.appendChild(signupForm);

        this.#parent.appendChild(signupContainer);

        this.addEventListeners(signupForm);
    }
}
