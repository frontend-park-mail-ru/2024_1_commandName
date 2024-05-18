import { BaseComponent } from '../BaseComponent.js';
import ChatListItem from '../ChatListItem/ChatListItem.js';
import Search from '../Search/Search.js';
import { AuthAPI } from '../../utils/API/AuthAPI.js';
import { changeUrl } from '../../utils/navigation';

/**
 * Рендерит компоненты боковой панели: заголовок, поиск, список чатов, пользователь и выйти
 * @class Класс компонента боковой панели
 */
export default class ChatList extends BaseComponent {
    templateName = 'ChatList';
    #currentActiveChatId;
    #searchChats;

    render() {
        this.getConfig().header = 'Чаты';
        if (this.getConfig().type === '/channel') {
            this.getConfig().header = 'Каналы';
        }
        this.getConfig().chatTypeFlag = this.getConfig().type === '/chat';
        super.render();
        if (this.getConfig().chatTypeFlag) {
            const createGroupBtn =
                this.getParent().querySelector(`#create_group_btn`);
            createGroupBtn.addEventListener('click', () => {
                this.getSearcher().getSocket().close();
                changeUrl('/create_group');
            });

            const pageChannelsBtn =
                this.getParent().querySelector(`#page_channel_btn`);
            pageChannelsBtn.addEventListener('click', () => {
                this.getSearcher().getSocket().close();
                changeUrl('/channel');
            });
        } else {
            const createChannelBtn =
                this.getParent().querySelector(`#create_channel_btn`);
            createChannelBtn.addEventListener('click', () => {
                this.getSearcher().getSocket().close();
                changeUrl('/create_channel');
            });

            const pageChatsBtn =
                this.getParent().querySelector(`#page_chats_btn`);
            pageChatsBtn.addEventListener('click', () => {
                this.getSearcher().getSocket().close();
                changeUrl('/chat');
            });
        }

        this.getParent()
            .querySelector('#contacts_btn')
            .addEventListener('click', () => {
                this.getSearcher().getSocket().close();
                changeUrl('/contacts');
            });

        this.getParent()
            .querySelector('#profile_btn')
            .addEventListener('click', () => {
                this.getSearcher().getSocket().close();
                changeUrl('/profile');
            });

        this.getParent()
            .querySelector('#logout_btn')
            .addEventListener('click', () => {
                this.#searchChats.getSocket().close();
                // Отправка данных на сервер
                const api = new AuthAPI();
                api.logout()
                    .then((data) => {
                        if (data.status === 200) {
                            // Обработка успешной авторизации
                            console.log('Successfully logged out');
                            changeUrl('/login');
                        } else {
                            console.log('Error logged out');
                        }
                    })
                    .catch((error) => {
                        console.error('Logout failed:', error);
                    });
            });

        const searchContainer =
            this.getParent().querySelector('.search_container');

        this.#searchChats = new Search(searchContainer, {
            type: this.getConfig().type.slice(1),
            inputSearch: this.getConfig().inputSearchChats,
            sendSearch: this.getConfig().sendSearchChats,
            getSearch: this.getConfig().getSearchChats,
        });
        this.#searchChats.render();
    }

    /*
     * Добавляет чат в список
     */
    addChat(chatConfig, handler) {
        const chatContainer = this.getParent().querySelector(
            '#chat-list-container',
        );

        chatConfig.handler = handler;
        chatConfig.userId = this.getConfig().userId;
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

    getSearcher() {
        return this.#searchChats;
    }
}
