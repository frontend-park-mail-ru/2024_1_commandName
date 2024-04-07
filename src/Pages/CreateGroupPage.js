import Form from '../Components/Form/Form.js';
import { ChatAPI } from '../utils/API/ChatAPI.js';
import { ContactsAPI } from '../utils/API/ContactsAPI.js';
import { enableRedirect } from '../utils/API/common.js';
import { goToPage } from '../utils/router.js';

/**
 * Рендерит страницу создания группы
 * @class Класс страницы создания группы
 */
export default class CreateGroupPage {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

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

        const chatAPI = new ChatAPI();
        chatAPI
            .createGroup(group)
            .then((data) => {
                if (data.status === 200) {
                    // Обработка успешной авторизации
                    enableRedirect(true);
                    goToPage('/chat');
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
        const contactsAPI = new ContactsAPI();
        contactsAPI
            .getContacts()
            .then((response) => {
                const contacts = response.body.contacts;
                const userListItems = contacts.map((contact) => ({
                    id: contact.id,
                    name: contact.name,
                    surname: contact.surname,
                    username: contact.username,
                }));
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
                            items: userListItems,
                        },
                    ],
                    submitButtonText: 'Создать',
                });
                form.render();
            })
            .catch((error) => {
                console.error('Failed to fetch contacts:', error);
                // Handle error, maybe show a message to the user
            });
    }
}
