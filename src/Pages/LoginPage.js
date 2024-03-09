import { goToPage } from '../utils/goToPage.js';
import { AuthAPI } from '../utils/API/AuthAPI.js';
import RegisterPage from './RegisterPage.js';
import ChatPage from './ChatPage.js';
import Form from '../Components/Form/Form.js';

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

    formCallback(event) {
        event.preventDefault();
        const username = event.target.querySelector('#username').value;
        const password = event.target.querySelector('#password').value;
        const error = event.target.querySelector('#error-message');
        error.textContent = '';

        // Отправка данных на сервер
        const api = new AuthAPI();
        api.login(username, password)
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
        this.#signinForm.addEventListener('submit', this.formCallback);
        this.#signinForm
            .querySelector('#additionButton')
            .addEventListener('click', () => {
                goToPage(RegisterPage);
            });
    }

    render() {
        const form = new Form(this.#parent, {
            header: 'Авторизация',
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
            ],
            submitButtonText: 'Войти',
            additionButtonText: 'Еще нет аккаунта?',
        });
        this.#signinForm = form.render();
        this.addEventListeners();
    }
}
