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
    #chats = [];
    #chatsCache = {};

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
            chatsResponse.body.chats.forEach((chat) => {
                this.#chatsCache[chat.id] = chat;
            });
            if (profileResponse.status !== 200) {
                throw new Error('Пришел не 200 статус');
            }
            this.#profile = profileResponse.body.user;

            return {
                chats: this.#chats,
                profile: this.#profile,
            };
        } catch (error) {
            console.error('Ошибка при получении данных с сервера:', error);
            throw error;
        }
    };

    render() {
        const wrapper = document.createElement('div');
        wrapper.classList = 'full-screen';

        this.#chatList = new ChatList(wrapper, {});
        this.#chatList.render();
        this.#chatList.setUserName(`${this.#profile.username}`);

        this.#chat = new Chat(wrapper, {
            inputMessageHandler: this.messageDraftHandler,
            sendMessageHandler: this.messageSendHandler,
        });
        this.#chat.render();

        this.#parent.appendChild(wrapper);
        this.displayChats(this.#chats);

        this.#chatList
            .getParent()
            .querySelector('#logout_btn')
            .addEventListener('click', this.handleLogout);
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
        const chatIndex = this.#chats.findIndex(
            (chat) => chat.id === message.chat_id,
        );
        if (chatIndex !== -1) {
            const chat = this.#chats.splice(chatIndex, 1)[0];
            this.#chats.unshift(chat);
            const activeChatContainer = document.getElementById(
                'active-chat-container',
            );
            const owner =
                message.user_id === this.#profile.id ? 'my_message' : '';
            const messageElement = new Message(activeChatContainer, {
                message_owner: owner,
                message_id: message.id,
                message_text: message.message_text,
            });
            messageElement.render();
            this.#chats[0].messages.push(message); // Добавляем сообщение в начало массива сообщений
            this.displayChats(this.#chats); // Обновляем отображение чатов
        }
    };

    displayChats(chats) {
        const chatListContainer = document.getElementById(
            'chat-list-container',
        );
        chatListContainer.innerHTML = '';
        let checkChatId = false;
        let checkChatConfig = null;
        chats.forEach((chatConfig) => {
            if (chatConfig.id === this.#currentChatId) {
                checkChatConfig = chatConfig;
                checkChatId = true;
            }
            this.#chatList.addChat(chatConfig, (event) => {
                event.preventDefault();
                this.#chat.setInputMessageValue(
                    this.#messageDrafts[chatConfig.id] || '',
                );
                this.displayActiveChat(chatConfig);
                this.#currentChatId = chatConfig.id;
                goToPage('/chat?id=' + chatConfig.id, false);
            });
        });
        this.#messageDrafts[this.#currentChatId] = '';
        if (!checkChatId && !isNaN(this.#currentChatId)) {
            goToPage('/chat', false);
            this.#currentChatId = null;
        }
        if (checkChatId) {
            this.displayActiveChat(checkChatConfig);
        }
    }

    displayActiveChat(chat) {
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
        const chatAPI = new ChatAPI();
        chatAPI
            .getChatMessages(chat.id)
            .then((response) => {
                this.displayMessages(response.body.messages);
            })
            .catch((error) => {
                console.log('проблемы с соединением', error);
                this.displayMessages(this.#chatsCache[chat.id].messages);
            });
        this.#chatList.setActiveChat(chat.id);
    }

    displayMessages(messages) {
        // Очищаем контейнер активного чата
        const activeChatContainer = document.getElementById(
            'active-chat-container',
        );
        activeChatContainer.innerHTML = '';
        messages.forEach((message) => {
            // Форматируем время отправки сообщения
            const sentAt = new Date(message.sent_at);
            const timeString =
                sentAt.getHours().toString().padStart(2, '0') +
                ':' +
                sentAt.getMinutes().toString().padStart(2, '0');
            // Определяем класс сообщения в зависимости от отправителя
            const owner =
                message.user_id === this.#profile.id ? 'my_message' : 'message';
            const messageElement = new Message(activeChatContainer, {
                message_owner: owner,
                message_id: message.id,
                message_text: message.message_text,
                username: message.username,
                sent_at: timeString,
            });
            messageElement.render();
        });
        activeChatContainer.scrollTop = activeChatContainer.scrollHeight;
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
