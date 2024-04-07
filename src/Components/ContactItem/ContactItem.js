import { BaseComponent } from '../BaseComponent.js';
/**
 * Рендерит контакт
 * @class Класс контакта
 */
export default class ContactItem extends BaseComponent {
    templateName = 'ContactItem';
    render() {
        super.render();

        const id = this.getConfig().id;
        this.getParent()
            .querySelector(`#contact_${id}`)
            .addEventListener('click', this.getConfig().handler);
    }
}
