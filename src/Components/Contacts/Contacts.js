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
                // TODO: Возврат назад
                goToPage('/chat', true);
            });
    }

    addContact(contactConfig, handler) {
        const contactList = this.getParent().querySelector('#contact_list');
        contactConfig.handler = handler;
        const contact = new ContactItem(contactList, contactConfig);
        contact.render();
    }
}
