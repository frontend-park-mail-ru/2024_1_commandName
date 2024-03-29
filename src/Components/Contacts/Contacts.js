import ChatPage from '../../Pages/ChatPage.js';
import { goToPage } from '../../utils/goToPage.js';
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
                goToPage(ChatPage);
            });
    }

    addContacts(contacts) {
        console.log(contacts);
        const contactList = this.getParent().querySelector('#contact_list');
        contacts.forEach((con) => {
            const conItem = new ContactItem(contactList, con);
            conItem.render();
        });
    }
}
