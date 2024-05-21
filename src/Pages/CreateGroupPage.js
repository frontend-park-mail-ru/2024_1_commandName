import Form from '../Components/Form/Form.js';
import { ChatAPI } from '../utils/API/ChatAPI.js';
import { ContactsAPI } from '../utils/API/ContactsAPI.js';
import { BasePage } from './BasePage.js';
import { changeUrl } from '../utils/navigation';

/**
 * Рендерит страницу создания группы
 * @class Класс страницы создания группы
 */
export default class CreateGroupPage extends BasePage {
    #parent;
    #contacts;
    #userListItems;

    constructor(parent) {
        super(parent);
        this.#parent = parent;
        const type = window.location.pathname;
        if (type === '/create_group') {
            this.getData().then(() => this.render());
        } else {
            this.render();
        }
    }

    getData = async () => {
        try {
            const contactsApi = new ContactsAPI();

            const contactsResponse = await contactsApi.getContacts();

            if (contactsResponse.status !== 200) {
                throw new Error('Пришел не 200 статус');
            }
            this.#contacts = contactsResponse.body.contacts;
            this.#userListItems = this.#contacts.map((contact) => ({
                id: contact.id,
                label: `${contact.surname} ${contact.name} @${contact.username}`,
            }));

            return {
                contacts: this.#contacts,
                userListItems: this.#userListItems,
            };
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            throw error;
        }
    };

    formCallback(event) {
        event.preventDefault();
        const error = event.target.querySelector('#error-message');
        const type = window.location.pathname;

        if (type === '/create_group') {
            const userList = event.target.querySelectorAll(
                '#user_list input[type=checkbox]',
            );
            const userIds = Array.from(userList)
                .filter((item) => {
                    return item.checked;
                })
                .map((item) => {
                    return Number(item.value.replace('user_list_', ''));
                }, this);
            const group = {
                description: event.target
                    .querySelector('#description')
                    .value.trim(),
                group_name: event.target.querySelector('#name').value.trim(),
                user_ids: userIds,
            };
            if (group.group_name.length === 0) {
                error.textContent = 'Заполните поле Название';
                return;
            }

            if (group.user_ids.length === 0) {
                error.textContent = 'Добавьте пользователей';
                return;
            }

            const chatAPI = new ChatAPI();
            chatAPI
                .createGroup(group)
                .then((data) => {
                    if (data.status === 200) {
                        // Обработка успешной авторизации
                        changeUrl('/chat?id=' + data.body.chat_id, true);
                    } else {
                        error.textContent = data.body.error;
                    }
                })
                .catch((error) => {
                    alert('Что-то пошло не так');
                    console.error('createGroup failed:', error);
                });
        } else {
            const description = event.target
                .querySelector('#description')
                .value.trim();
            const name = event.target.querySelector('#name').value.trim();

            if (name.length === 0) {
                error.textContent = 'Заполните поле Название';
                return;
            }
            const chatAPI = new ChatAPI();
            chatAPI
                .createChannel(name, description)
                .then((data) => {
                    if (data.status === 200) {
                        // Обработка успешной авторизации
                        changeUrl('/channel?id=' + data.body.chat_id, true);
                    } else {
                        error.textContent = data.body.error;
                    }
                })
                .catch((error) => {
                    alert('Что-то пошло не так');
                    console.error('createGroup failed:', error);
                });
        }
    }

    render() {
        const type = window.location.pathname;
        let header = 'Создать канал';
        let page = '/channel';
        const inputs = [
            {
                id: 'name',
                type: 'text',
                placeholder: 'Название',
                required: true,
            },
            {
                id: 'description',
                type: 'text',
                placeholder: 'Описание',
                required: true,
            },
        ];
        if (type === '/create_group') {
            header = 'Создать чат';
            page = '/chat';
            inputs.push({
                id: 'user_list',
                list_name: 'user_list',
                type: 'checkbox_list',
                placeholder: 'Участники',
                items: this.#userListItems,
            });
        }
        const form = new Form(this.#parent, {
            header: header,
            onSubmit: this.formCallback,
            onAdditionButtonClick: () => {
                changeUrl(page, true);
            },
            inputs: inputs,
            submitButtonText: 'Создать',
            additionButtonText: 'Назад',
        });
        form.render();
    }
}
