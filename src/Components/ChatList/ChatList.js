import { BaseComponent } from '../BaseComponent.js';
import ChatListItem from '../ChatListItem/ChatListItem.js';

export default class ChatList extends BaseComponent {
    templateName = 'ChatList';

    render() {
        super.render();

        this.getParent()
            .querySelector('#logout_btn')
            .addEventListener('click', this.getConfig().logoutHandler);
    }

    addChat(chatConfig, handler) {
        const chatContainer = this.getParent().querySelector(
            '#chat-list-container',
        );

        chatConfig.handler = handler;
        const chat = new ChatListItem(chatContainer, chatConfig);
        chat.render();
    }
}
