import { BaseComponent } from '../BaseComponent.js';

/**
 * Рендерит компонент чата для боковой панели
 * @class Класс компонента чата
 */
export default class ChatListItem extends BaseComponent {
    templateName = 'ChatListItem';

    render() {
        super.render();

        const id = this.getConfig().id;
        this.getParent()
            .querySelector(`#chat_list_item_${id}`)
            .addEventListener('click', this.getConfig().handler);
    }
}
