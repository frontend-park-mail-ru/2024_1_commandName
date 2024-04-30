import { BaseComponent } from '../BaseComponent.js';
import ChatListItem from '../ChatListItem/ChatListItem.js';
import { WebSocketManager } from '../../utils/WebSocket.js';

/**
 * Рендерит компоненты боковой панели: заголовок, поиск, список чатов, пользователь и выйти
 * @class Класс компонента боковой панели
 */
export default class ChatList extends BaseComponent {
    templateName = 'ChatList';
    #currentActiveChatId;

    render() {
        super.render();

        this.ws_sendSearch = new WebSocketManager(
            'search',
            this.getConfig().getSearch,
        );

        this.getParent()
            .querySelector('#search_input')
            .addEventListener('input', this.getConfig().inputSearch);

        this.getParent()
            .querySelector('#search_input')
            .addEventListener('keydown', (event) => {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    this.getConfig().sendSearch();
                }
            });
    }

    /*
     * Добавляет чат в список
     */
    addChat(chatConfig, handler) {
        const chatContainer = this.getParent().querySelector(
            '#chat-list-container',
        );

        chatConfig.handler = handler;
        const chat = new ChatListItem(chatContainer, chatConfig);
        chat.render();
    }

    setActiveChat(chatId) {
        if (this.#currentActiveChatId) {
            this.getParent()
                .querySelector('#chat_list_item_' + this.#currentActiveChatId)
                .classList.remove('chat_list_item__active');
        }
        this.getParent()
            .querySelector('#chat_list_item_' + chatId)
            .classList.add('chat_list_item__active');
        this.#currentActiveChatId = chatId;
    }

    setUserName(user) {
        this.getParent().querySelector('#profile_btn').innerHTML = user;
    }

    getSearchSocket() {
        return this.ws_sendSearch;
    }
}
