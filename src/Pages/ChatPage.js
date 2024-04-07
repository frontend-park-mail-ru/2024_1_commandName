import { ChatAPI } from '../utils/API/ChatAPI.js';
import { AuthAPI } from '../utils/API/AuthAPI.js';
import { goToPage } from '../utils/router.js';
import Chat from '../Components/Chat/Chat.js';
import ChatList from '../Components/ChatList/ChatList.js';
import Message from '../Components/Message/Message.js';
import { ProfileAPI } from '../utils/API/ProfileAPI.js';
import { websocketManager } from '../utils/WebSocket.js';

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
    userId;

    constructor(parent, urlParams) {
        this.#parent = parent;
        this.#currentChatId = parseInt(urlParams.get('id'));
        websocketManager.connect();
    }

    render() {
        const profileAPI = new ProfileAPI();
        profileAPI
            .getProfile()
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Пришел не 200 статус');
                }
                const profile = response.body.user;
                this.userId = profile.id;
                this.#chatList.setUserName(`${profile.username}`);
            })
            .catch((error) => {
                console.error('Ошибка при получении профиля:', error);
            });
        const wrapper = document.createElement('div');
        wrapper.classList = 'full-screen';

        this.#chatList = new ChatList(wrapper, {
            logoutHandler: this.handleLogout,
        });
        this.#chatList.render();

        this.#chat = new Chat(wrapper, {
            inputMessageHandler: this.messageDraftHandler,
            sendMessageHandler: this.messageSendHandler,
        });
        this.#chat.render();

        this.#parent.appendChild(wrapper);

        const chatAPI = new ChatAPI();
        if (this.#currentChatId) {
            chatAPI.chatById(this.#currentChatId).then((response) => {
                if (response.status === 200) {
                    this.displayActiveChat(response.body.chat);
                } else {
                    goToPage('/chat');
                    this.#currentChatId = null;
                }
            });
        }
        chatAPI
            .getChats()
            .then((response) => {
                response.body.chats.forEach((chatConfig) => {
                    this.#chatList.addChat(chatConfig, () => {
                        this.#chat.setInputMessageValue(
                            this.#messageDrafts[chatConfig.id] || '',
                        );
                        this.displayActiveChat(chatConfig);
                        goToPage('/chat?id=' + chatConfig.id);
                    });
                });
            })
            .catch((error) => {
                console.error('Ошибка при получении чатов:', error);
            });
    }

    messageDraftHandler = (event) => {
        this.#messageDrafts[this.#currentChatId] = event.target.value;
    };

    messageSendHandler = () => {
        const inputMessage = this.#parent
            .querySelector('#input_message')
            .value.trim();
        const chatId = this.#currentChatId; // Получаем ID текущего чата
        function escapeHTML(html) {
            return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }

        if (inputMessage && chatId) {
            // Проверяем, что есть сообщение и ID чата
            const sanitizedInputMessage = escapeHTML(inputMessage); // Фильтрация XSS
            websocketManager.sendMessage(chatId, sanitizedInputMessage);
            setTimeout(() => {
                goToPage('/chat?id=' + chatId);
            }, 200);
        } else {
            console.error('Нет текста сообщения или ID чата.');
        }
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
            // Если сообщение от акитивного юзера, то
            let owner = 'message';
            if (this.userId === message.user_id) {
                owner = 'my_message';
            }
            const messageElement = new Message(activeChatContainer, {
                message_owner: owner,
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
                    websocketManager.close();
                    goToPage('/login');
                } else {
                    console.log('Error logged out');
                }
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    }
}
