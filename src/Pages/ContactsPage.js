import { ContactsAPI } from '../utils/API/ContactsAPI.js';
import Contacts from '../Components/Contacts/Contacts.js';

/**
 * Рендерит страницу чатов
 * @class Класс страницы чатов
 */
export default class ContactsPage {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        const contactsAPI = new ContactsAPI();

        const contacts = new Contacts(this.#parent, {});
        contacts.render();

        contactsAPI
            .getContacts()
            .then((responce) => {
                if (responce.status !== 200) {
                    throw new Error('Пришел не 200 статус');
                }
                const contactsConfig = responce.body.contacts;
                contacts.setContacts(contactsConfig);
            })
            .catch((error) => {
                console.error('Ошибка при получении профиля:', error);
            });
    }
}
