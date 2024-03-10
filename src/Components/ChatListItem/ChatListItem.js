import { BaseComponent } from '../BaseComponent.js';

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
