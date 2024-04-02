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
                goToPage('/chat');
            });
    }

    setContacts(contacts) {
        const contactList = this.getParent().querySelector('#contact_list');
        contactList.innerHTML = '';
        if (contacts.length > 0) {
            contacts.forEach((con) => {
                const conItem = new ContactItem(contactList, con);
                conItem.render();
            });
        } else {
            contactList.innerHTML = 'У Вас ещё нет контактов';
        }
    }
}
