import { ChatAPI } from '../utils/API/ChatAPI.js';
import { AuthAPI } from '../utils/API/AuthAPI.js';
import { handleRouting } from '../utils/router.js';
import Chat from '../Components/Chat/Chat.js';
import ChatList from '../Components/ChatList/ChatList.js';
import Message from '../Components/Message/Message.js';
import { ProfileAPI } from '../utils/API/ProfileAPI.js';

/**
 * Рендерит страницу чатов
 * @class Класс страницы чатов
 */
export default class ChatPage {
    #parent;
    #chat;
    #chatList;
    #messageDrafts = {};
    #currentChatId;

    constructor(parent) {
        this.#parent = parent;
        this.handleLogout = this.handleLogout.bind(this);
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.classList = 'full-screen';

        this.#chatList = new ChatList(wrapper, {
            logoutHandler: this.handleLogout,
        });
        this.#chatList.render();

        this.#chat = new Chat(wrapper, {
            inputMessaegHandler: this.messageDraftHandler,
        });
        this.#chat.render();

        this.#parent.appendChild(wrapper);

        const chatAPI = new ChatAPI();
        chatAPI
            .getChats()
            .then((chats) => {
                chats.body.chats.forEach((chatConfig) => {
                    this.#chatList.addChat(chatConfig, () => {
                        this.#currentChatId = chatConfig.id;
                        this.#chat.setInputMessageValue(
                            this.#messageDrafts[chatConfig.id] || '',
                        );
                        this.displayActiveChat(chatConfig);
                    });
                });
            })
            .catch((error) => {
                console.error('Ошибка при получении чатов:', error);
            });

        const profileAPI = new ProfileAPI();
        profileAPI
            .getProfile()
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Пришел не 200 статус');
                }
                const profile = response.body.user;
                this.#chatList.setUserName(
                    `${profile.name} ${profile.surname}`,
                );
            })
            .catch((error) => {
                console.error('Ошибка при получении профиля:', error);
            });
    }

    messageDraftHandler = (event) => {
        this.#messageDrafts[this.#currentChatId] = event.target.value;
    };

    displayActiveChat(chat) {
        // Очищаем контейнер активного чата
        const activeChatContainer = document.getElementById(
            'active-chat-container',
        );
        activeChatContainer.innerHTML = '';

        const chatInput = this.#parent.querySelector('#chat_input_block');

        let chatName = `${chat.name} `;
        switch (chat.type) {
            case 'person':
                chatName += '(Личное)';
                chatInput.style.display = 'flex';
                break;
            case 'channel':
                chatName += '(Канал)';
                chatInput.style.display = 'none';
                break;
            case 'group':
                chatName += '(Группа)';
                chatInput.style.display = 'flex';
                break;
        }
        // Отображаем содержимое выбранного чата
        document.getElementById('chat_header').textContent = chatName;

        // Отображаем сообщения в чате
        chat.messages.forEach((message) => {
            const messageElement = new Message(activeChatContainer, {
                message_text: message.message_text,
            });
            messageElement.render();
        });
    }

    handleLogout(event) {
        event.preventDefault();
        // Отправка данных на сервер
        const api = new AuthAPI();
        api.logout()
            .then((data) => {
                if (data.status === 200) {
                    // Обработка успешной авторизации
                    console.log('Successfully logged out');
                    window.history.pushState({}, '', '/login');
                    handleRouting();
                } else {
                    console.log('Error logged out');
                }
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    }
}
