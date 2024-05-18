import { AuthAPI } from '../utils/API/AuthAPI.js';
import Form from '../Components/Form/Form.js';
import { BasePage } from './BasePage.js';

/**
 * Рендерит страницу авторизации
 * @class Класс страницы авторизации
 */
export default class LoginPage extends BasePage {
    #parent;
    // #errorMessage;
    #signinForm;

    constructor(parent) {
        super(parent);
        this.#parent = parent;
        this.render();
    }

    formCallback(event) {
        event.preventDefault();
        const username = event.target.querySelector('#username').value;
        const password = event.target.querySelector('#password').value;
        const error = event.target.querySelector('#error-message');
        error.textContent = '';

        if (username.length === 0) {
            error.textContent = 'Заполните поле Имя пользователя';
            return;
        }
        if (password.length === 0) {
            error.textContent = 'Заполните поле Пароль';
            return;
        }

        // Отправка данных на сервер
        const api = new AuthAPI();
        api.login(username, password)
            .then((data) => {
                if (data.status === 200) {
                    // Обработка успешной авторизации
                    window.history.push('/chat');
                } else {
                    error.textContent = data.body.error;
                }
            })
            .catch((error) => {
                alert('Что-то пошло не так');
                console.error('Login failed:', error);
            });
    }

    render() {
        const form = new Form(this.#parent, {
            header: 'Авторизация',
            onSubmit: this.formCallback,
            onAdditionButtonClick: () => {
                window.history.push('/register');
                window.dispatchEvent(new Event('popstate'));
            },
            inputs: [
                {
                    id: 'username',
                    type: 'text',
                    placeholder: 'Имя пользователя',
                    autocomplete: 'username',
                    required: true,
                },
                {
                    id: 'password',
                    type: 'password',
                    placeholder: 'Пароль',
                    autocomplete: 'current-password',
                    required: true,
                },
            ],
            submitButtonText: 'Войти',
            additionButtonText: 'Еще нет аккаунта?',
        });
        form.render();
        this.#signinForm = form.getForm();
    }
}
