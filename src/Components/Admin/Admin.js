import { goToPage } from '../../utils/router.js';
import { BaseComponent } from '../BaseComponent.js';

export default class Admin extends BaseComponent {
    templateName = 'Statistics';

    render() {
        super.render();

        this.getParent()
            .querySelector('#backButton')
            .addEventListener('click', () => {
                // TODO: Возврат назад
                goToPage('/chat', true);
            });
    }

    // addContact(contactConfig, handler) {
    //     const contactList = this.getParent().querySelector('#contact_list');
    //     contactConfig.handler = handler;
    //     const contact = new ContactItem(contactList, contactConfig);
    //     contact.render();
    // }
}
