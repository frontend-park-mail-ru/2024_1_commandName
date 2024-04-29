import { goToPage } from '../../utils/router.js';
import { BaseComponent } from '../BaseComponent.js';
import ContactItem from '../ContactItem/ContactItem.js';

/**
 * Рендерит список контактов
 * @class Класс списока контактов
 */
export default class Contacts extends BaseComponent {
    templateName = 'Contacts';

    render() {
        super.render();

        this.getParent()
            .querySelector('#backButton')
            .addEventListener('click', () => {
                goToPage('/chat', true);
            });

        this.getParent()
            .querySelector('#search_input')
            .addEventListener('input', this.getConfig().inputSearchHandler);

        this.getParent()
            .querySelector('#search_input')
            .addEventListener('keydown', (event) => {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    this.getConfig().sendSearchHandler();
                }
            });
    }

    addContact(contactConfig, handler) {
        const contactList = this.getParent().querySelector('#contact_list');
        contactConfig.handler = handler;
        const contact = new ContactItem(contactList, contactConfig);
        contact.render();
    }
}
