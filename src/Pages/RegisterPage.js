import { validatePassword, validateUsername } from '../utils/valid.js';
import { AuthAPI } from '../utils/API/AuthAPI.js';
import Form from '../Components/Form/Form.js';
import { BasePage } from './BasePage.js';
import { changeUrl } from '../utils/navigation';

/**
 * Рендерит страницу регистрации
 * @class Класс страницы регистрации
 */
export default class RegisterPage extends BasePage {
    #parent;
    // #errorMessage;
    #signupForm;

    constructor(parent) {
        super(parent);
        this.#parent = parent;
        this.render();
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
        if (password !== confirmPassword) {
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
                    changeUrl('/chat', true);
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
            header: 'Регистрация',
            onSubmit: this.formCallback,
            onAdditionButtonClick: () => {
                changeUrl('/login', true);
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
                    autocomplete: 'new-password',
                    required: true,
                },
                {
                    id: 'confirm-password',
                    type: 'password',
                    placeholder: 'Повторите пароль',
                    autocomplete: 'new-password',
                    required: true,
                },
            ],
            submitButtonText: 'Зарегистрироваться',
            additionButtonText: 'Уже есть аккаунт?',
        });
        form.render();
        this.#signupForm = form.getForm();
    }
}
