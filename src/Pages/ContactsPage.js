import { ContactsAPI } from '../utils/API/ContactsAPI.js';
import { ChatAPI } from '../utils/API/ChatAPI.js';
import Contacts from '../Components/Contacts/Contacts.js';
import { BasePage } from './BasePage.js';
import { goToPage } from '../utils/router.js';

/**
 * Рендерит страницу чатов
 * @class Класс страницы чатов
 */
export default class ContactsPage extends BasePage {
    #parent;
    #contacts;
    #contactsList;

    constructor(parent) {
        super(parent);
        this.#parent = parent;
        this.getData().then(() => this.render());
    }

    getData = async () => {
        try {
            const contactsAPI = new ContactsAPI();

            const contactsResponse = await contactsAPI.getContacts();

            if (contactsResponse.status !== 200) {
                throw new Error('Пришел не 200 статус');
            }
            this.#contacts = contactsResponse.body.contacts;

            return {
                contacts: this.#contacts,
            };
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            alert('Похоже, вы не подключены к интернету');
            this.render();
            throw error;
        }
    };

    render() {
        const chatAPI = new ChatAPI();
        this.#contactsList = new Contacts(this.#parent, {});
        this.#contactsList.render();
        this.#contacts.forEach((contactConfig) => {
            this.#contactsList.addContact(contactConfig, () => {
                chatAPI.chatByUserId(contactConfig.id).then((response) => {
                    if (response.status === 200) {
                        goToPage('/chat?id=' + response.body.chat_id, true);
                    }
                });
            });
        });
    }
}
