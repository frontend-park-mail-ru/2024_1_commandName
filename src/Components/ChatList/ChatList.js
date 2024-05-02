import { BaseComponent } from '../BaseComponent.js';
import ChatListItem from '../ChatListItem/ChatListItem.js';
import { goToPage } from '../../utils/router.js';
import Search from '../Search/Search.js';
import { AuthAPI } from '../../utils/API/AuthAPI.js';

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
        super.render();
        if (this.getConfig().type === '/channel') {
            const createChannelBtn =
                this.getParent().querySelector(`#create_channel_btn`);
            createChannelBtn.style.display = 'block';
            createChannelBtn.addEventListener('click', () => {
                this.getSearcher().getSocket().close();
                goToPage('/create_group', true);
            });

            const pageChatsBtn =
                this.getParent().querySelector(`#page_chats_btn`);
            pageChatsBtn.style.display = 'block';
            pageChatsBtn.addEventListener('click', () => {
                this.getSearcher().getSocket().close();
                goToPage('/chat', true);
            });
        } else {
            const createGroupBtn =
                this.getParent().querySelector(`#create_group_btn`);
            createGroupBtn.style.display = 'block';
            createGroupBtn.addEventListener('click', () => {
                this.getSearcher().getSocket().close();
                goToPage('/create_group', true);
            });

            const pageChannelsBtn =
                this.getParent().querySelector(`#page_channel_btn`);
            pageChannelsBtn.style.display = 'block';
            pageChannelsBtn.addEventListener('click', () => {
                this.getSearcher().getSocket().close();
                goToPage('/channel', true);
            });
        }

        this.getParent()
            .querySelector('#contacts_btn')
            .addEventListener('click', () => {
                this.getSearcher().getSocket().close();
                goToPage('/contacts', true);
            });

        this.getParent()
            .querySelector('#profile_btn')
            .addEventListener('click', () => {
                this.getSearcher().getSocket().close();
                goToPage('/profile', true);
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
                            goToPage('/login', true);
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
            type: 'chat',
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
