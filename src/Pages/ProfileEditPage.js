import Form from '../Components/Form/Form.js';
import { ProfileAPI } from '../utils/API/ProfileAPI.js';
import { validateUsername, validateEmail } from '../utils/valid.js';
import { goToPage } from '../utils/router.js';
import { BasePage } from './BasePage.js';

/**
 * Рендерит страницу редактирования профиля
 * @class Класс страницы редактирования профиля
 */
export default class LoginPage extends BasePage {
    #parent;

    constructor(parent) {
        super(parent);
        this.#parent = parent;
        this.render();
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

        const avatartField = target.querySelector('#avatar');
        if (avatartField.files.length > 0) {
            const api = new ProfileAPI();
            api.uploadAvatar(avatartField.files[0])
                .then((data) => {
                    if (data.status === 200) {
                        // Обработка успешной авторизации
                        goToPage('/profile');
                    } else {
                        error.textContent = data.body.error;
                    }
                })
                .catch((error) => {
                    alert('Что-то пошло не так');
                    console.error('Edit avatar failed:', error);
                });
        }

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

        let editedFieldCnt = 0;
        Object.values(profileFields).reduce((count, value) => {
            if (value !== '') {
                editedFieldCnt++;
            }
        }, 0);

        if (editedFieldCnt === 0) {
            return;
        }
        // Отправка данных на сервер
        const api = new ProfileAPI();
        api.editProfile(profileFields, editedFieldCnt)
            .then((data) => {
                if (data.status === 200) {
                    // Обработка успешной авторизации
                    goToPage('/profile', true);
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
                goToPage('/profile', true);
            },
            inputs: [
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
                {
                    id: 'avatar',
                    type: 'file',
                    placeholder: 'Фотография',
                },
            ],
            submitButtonText: 'Редактировать',
            additionButtonText: 'Назад',
        });
        form.render();
    }
}
