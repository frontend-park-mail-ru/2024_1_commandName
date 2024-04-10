import Form from '../Components/Form/Form.js';
import { ChatAPI } from '../utils/API/ChatAPI.js';
import { ContactsAPI } from '../utils/API/ContactsAPI.js';
import { goToPage } from '../utils/router.js';

/**
 * Рендерит страницу создания группы
 * @class Класс страницы создания группы
 */
export default class CreateGroupPage {
    #parent;
    #contacts;
    #userListItems;

    constructor(parent) {
        this.#parent = parent;
        this.getData().then(() => this.render());
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
            description: event.target.querySelector('#group_description').value,
            group_name: event.target.querySelector('#group_name').value,
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
                    goToPage('/chat', true);
                } else {
                    error.textContent = data.body.error;
                }
            })
            .catch((error) => {
                alert('Что-то пошло не так');
                console.error('createGroup failed:', error);
            });
    }

    render() {
        const form = new Form(this.#parent, {
            header: 'Создать группу',
            onSubmit: this.formCallback,
            inputs: [
                {
                    id: 'group_name',
                    type: 'text',
                    placeholder: 'Название',
                    required: true,
                },
                {
                    id: 'group_description',
                    type: 'text',
                    placeholder: 'Описание',
                    required: true,
                },
                {
                    id: 'user_list',
                    list_name: 'user_list',
                    type: 'checkbox_list',
                    placeholder: 'Участники',
                    items: this.#userListItems,
                },
            ],
            submitButtonText: 'Создать',
        });
        form.render();
    }
}
