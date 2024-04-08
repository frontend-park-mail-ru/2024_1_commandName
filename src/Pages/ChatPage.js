import { ChatAPI } from '../utils/API/ChatAPI.js';
import { AuthAPI } from '../utils/API/AuthAPI.js';
import { goToPage } from '../utils/router.js';
import Chat from '../Components/Chat/Chat.js';
import ChatList from '../Components/ChatList/ChatList.js';
import Message from '../Components/Message/Message.js';
import { ProfileAPI } from '../utils/API/ProfileAPI.js';
import { websocketManager } from '../utils/WebSocket.js';
import { sanitizer } from '../utils/valid.js';
import { BasePage } from './BasePage.js';

/*
 * Рендерит страницу чатов
 * @class Класс страницы чатов
 */
export default class ChatPage extends BasePage {
    #parent;
    #chat;
    #chatList;
    #messageDrafts = {};
    #currentChatId;
    #profile;
    #chats;

    constructor(parent, urlParams) {
        super(parent);
        this.#parent = parent;
        this.#currentChatId = parseInt(urlParams.get('id'));
        websocketManager.connect();
        websocketManager.setMessageHandler(this.handleWebSocketMessage);
        this.getData().then(() => this.render());
    }

    getData = async () => {
        try {
            const chatAPI = new ChatAPI();
            const profileAPI = new ProfileAPI();

            const [chatsResponse, profileResponse] = await Promise.all([
                chatAPI.getChats(),
                profileAPI.getProfile(),
            ]);

            this.#chats = chatsResponse.body.chats;
            if (profileResponse.status !== 200) {
                throw new Error('Пришел не 200 статус');
            }
            this.#profile = profileResponse.body.user;

            return {
                chats: this.#chats,
                profile: this.#profile,
            };
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            throw error;
        }
    };

    render() {
        const wrapper = document.createElement('div');
        wrapper.classList = 'full-screen';

        this.#chatList = new ChatList(wrapper, {
            logoutHandler: this.handleLogout,
        });
        this.#chatList.render();
        this.#chatList.setUserName(`${this.#profile.username}`);

        this.#chat = new Chat(wrapper, {
            inputMessageHandler: this.messageDraftHandler,
            sendMessageHandler: this.messageSendHandler,
        });
        this.#chat.render();

        this.#parent.appendChild(wrapper);
        this.displayChats(this.#chats);
    }

    messageDraftHandler = (event) => {
        this.#messageDrafts[this.#currentChatId] = event.target.value;
    };

    messageSendHandler = () => {
        // Контейнер активного чата
        const inputMessage = this.#parent
            .querySelector('#input_message')
            .value.trim();
        const urlParams = new URLSearchParams(window.location.search);
        const chatId = parseInt(urlParams.get('id'));
        if (inputMessage && chatId) {
            // Проверяем, что есть сообщение и ID чата
            const sanitizedInputMessage = sanitizer(inputMessage);
            websocketManager.sendMessage(chatId, sanitizedInputMessage);
            document.querySelector('#input_message').value = '';
        } else {
            console.error('Нет текста сообщения или ID чата.');
        }
    };

    handleWebSocketMessage = (message) => {
        if (message.chat_id === this.#currentChatId) {
            // Сообщение принадлежит текущему чату, выводим его
            const activeChatContainer = document.getElementById(
                'active-chat-container',
            );
            const owner =
                message.user_id === this.#profile.id ? 'my_message' : 'message';
            const messageElement = new Message(activeChatContainer, {
                message_owner: owner,
                message_text: message.message_text,
            });
            messageElement.render();
        }
    };

    displayChats(chats) {
        let checkChatId = false;
        chats.forEach((chatConfig) => {
            if (chatConfig.id === this.#currentChatId) {
                checkChatId = true;
                this.displayActiveChat(chatConfig);
            }
            this.#chatList.addChat(chatConfig, () => {
                this.#chat.setInputMessageValue(
                    this.#messageDrafts[chatConfig.id] || '',
                );
                this.displayActiveChat(chatConfig);
                this.#currentChatId = chatConfig.id;
                goToPage('/chat?id=' + chatConfig.id, false);
            });
        });
        if (!checkChatId && !isNaN(this.#currentChatId)) {
            goToPage('/chat', false);
            this.#currentChatId = null;
        }
    }

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
            if (this.#profile.id === message.user_id) {
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
                    goToPage('/login', true);
                } else {
                    console.log('Error logged out');
                }
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    }
}
