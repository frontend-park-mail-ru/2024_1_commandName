import { BaseComponent } from '../BaseComponent.js';
import ContactItem from '../ContactItem/ContactItem.js';
import Search from '../Search/Search.js';
import { changeUrl } from '../../utils/navigation.js';

/**
 * Рендерит список контактов
 * @class Класс списока контактов
 */
export default class Contacts extends BaseComponent {
    templateName = 'Contacts';
    #searchContacts;

    render() {
        super.render();

        this.getParent()
            .querySelector('#backButton')
            .addEventListener('click', () => {
                this.getSearcher().getSocket().close();
                changeUrl('/chat', true);
            });

        const searchContainer =
            this.getParent().querySelector('.search_container');

        this.#searchContacts = new Search(searchContainer, {
            type: 'contact',
            inputSearch: this.getConfig().inputSearchContacts,
            sendSearch: this.getConfig().sendSearchContacts,
        });
        this.#searchContacts.render();
    }

    addContact(contactConfig, handler) {
        const contactList = this.getParent().querySelector('#contact_list');
        contactConfig.handler = handler;
        const contact = new ContactItem(contactList, contactConfig);
        contact.render();
    }

    getSearcher() {
        return this.#searchContacts;
    }
}
