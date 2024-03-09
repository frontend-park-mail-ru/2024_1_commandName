import { validatePassword, validateUsername } from '../utils/valid.js';
import { goToPage } from '../utils/goToPage.js';
import { AuthAPI } from '../utils/API/AuthAPI.js';
import LoginPage from './LoginPage.js';
import Form from '../Components/Form/Form.js';
import ChatPage from './ChatPage.js';

/**
 *
 */
export default class RegisterPage {
    #parent;
    #errorMessage;
    #signupForm;

    constructor(parent) {
        this.#parent = parent;
    }

    formCallback(event) {
        event.preventDefault();
        const username = event.target.querySelector('#username').value;
        const password = event.target.querySelector('#password').value;
        const confirmPassword =
            event.target.querySelector('#confirm-password').value;
        const error = event.target.querySelector('#error-message');
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
                    goToPage(ChatPage);
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
        this.#signupForm.addEventListener('submit', this.formCallback);
        this.#signupForm
            .querySelector('#additionButton')
            .addEventListener('click', () => {
                goToPage(LoginPage);
            });
    }

    render() {
        const form = new Form(this.#parent, {
            header: 'Регистрация',
            inputs: [
                {
                    id: 'username',
                    type: 'text',
                    placeholder: 'Имя пользователя',
                    required: true,
                },
                {
                    id: 'password',
                    type: 'password',
                    placeholder: 'Пароль',
                    required: true,
                },
                {
                    id: 'confirm-password',
                    type: 'password',
                    placeholder: 'Повторите пароль',
                    required: true,
                },
            ],
            submitButtonText: 'Зарегистрироваться',
            additionButtonText: 'Уже есть аккаунт?',
        });
        form.render();
        this.#signupForm = form.getForm();
        this.addEventListeners();
    }
}
