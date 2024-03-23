import Form from '../Components/Form/Form.js';
import { ProfileAPI } from '../utils/API/ProfileAPI.js';
import { goToPage } from '../utils/goToPage.js';
import ProfilePage from './ProfilePage.js';
import { validateUsername, validateEmail } from '../utils/valid.js';

/**
 * Рендерит страницу редактирования профиля
 * @class Класс страницы редактирования профиля
 */
export default class LoginPage {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    formCallback(event) {
        const target = event.target;
        event.preventDefault();
        const profileFields = {
            username: target.querySelector('#username').value,
            email: target.querySelector('#email').value,
            name: target.querySelector('#name').value,
            surname: target.querySelector('#surname').value,
            about: target.querySelector('#about').value,
        };
        const error = event.target.querySelector('#error-message');
        error.textContent = '';

        if (profileFields.username) {
            const valid = validateUsername(profileFields.username);
            if (!valid.success) {
                error.textContent = valid.message;
                return;
            }
        }

        if (profileFields.email) {
            const valid = validateEmail(profileFields.email);
            if (!valid.success) {
                error.textContent = valid.message;
                return;
            }
        }

        // Отправка данных на сервер
        const api = new ProfileAPI();
        api.editProfile(profileFields)
            .then((data) => {
                if (data.status === 200) {
                    // Обработка успешной авторизации
                    goToPage(ProfilePage);
                } else {
                    error.textContent = data.body.error;
                }
            })
            .catch((error) => {
                alert('Что-то пошло не так');
                console.error('Edit profile failed:', error);
            });
    }

    render() {
        const form = new Form(this.#parent, {
            header: 'Редактировать профиль',
            onSubmit: this.formCallback,
            onAdditionButtonClick: () => {
                goToPage(ProfilePage);
            },
            inputs: [
                {
                    id: 'avatar',
                    type: 'file',
                    placeholder: 'Фотография',
                }, // TODO: не работает
                {
                    id: 'username',
                    type: 'text',
                    placeholder: 'Имя пользователя',
                },
                {
                    id: 'email',
                    type: 'email',
                    placeholder: 'Email',
                },
                {
                    id: 'name',
                    type: 'text',
                    placeholder: 'Имя',
                },
                {
                    id: 'surname',
                    type: 'text',
                    placeholder: 'Фамилия',
                },
                {
                    id: 'about',
                    type: 'text',
                    placeholder: 'О себе',
                },
            ],
            submitButtonText: 'Редактировать',
            additionButtonText: 'Назад',
        });
        form.render();
    }
}
