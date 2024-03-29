import Form from '../Components/Form/Form.js';
import { goToPage } from '../utils/goToPage.js';
import { validatePassword } from '../utils/valid.js';
import ChatPage from './ChatPage.js';
import ProfilePage from './ProfilePage.js';
import { ProfileAPI } from '../utils/API/ProfileAPI.js';

/**
 * Рендерит страницу изменения пароля
 * @class Класс страницы изменения пароля
 */
export default class ChangePasswordPage {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    formCallback(event) {
        event.preventDefault();
        const oldPassword = event.target.querySelector('#oldPassword').value;
        const newPassword = event.target.querySelector('#newPassword').value;
        const error = event.target.querySelector('#error-message');
        error.textContent = '';

        if (oldPassword.length == 0) {
            error.textContent = 'Заполните поле Старый пароль';
            return;
        }
        if (newPassword.length == 0) {
            error.textContent = 'Заполните поле Новый пароль';
            return;
        }
        const valid = validatePassword(newPassword);
        if (!valid.success) {
            error.textContent = valid.message;
            return;
        }

        // Отправка данных на сервер
        const api = new ProfileAPI();
        api.changePassword(oldPassword, newPassword)
            .then((data) => {
                if (data.status === 200) {
                    // Обработка успешной авторизации
                    goToPage(ChatPage, '/chat');
                } else {
                    error.textContent = data.body.error;
                }
            })
            .catch((error) => {
                alert('Что-то пошло не так');
                console.error('Edit edit failed:', error);
            });
    }

    render() {
        const form = new Form(this.#parent, {
            header: 'Изменение пароля',
            onSubmit: this.formCallback,
            onAdditionButtonClick: () => {
                goToPage(ProfilePage, '/profile');
            },
            inputs: [
                {
                    id: 'oldPassword',
                    type: 'password',
                    placeholder: 'Старый пароль',
                    autocomplete: 'current-password',
                    required: true,
                },
                {
                    id: 'newPassword',
                    type: 'password',
                    placeholder: 'Новый пароль',
                    autocomplete: 'new-password',
                    required: true,
                },
            ],
            submitButtonText: 'Изменить',
            additionButtonText: 'Назад',
        });
        form.render();
    }
}
