import { ChatAPI } from '../utils/API/ChatAPI.js';
import Chat from '../Components/Chat/Chat.js';
import ChatList from '../Components/ChatList/ChatList.js';
import Message from '../Components/Message/Message.js';
import { ProfileAPI } from '../utils/API/ProfileAPI.js';
import { sanitizer } from '../utils/valid.js';
import { BasePage } from './BasePage.js';
import ChatInput from '../Components/ChatInput/ChatInput.js';
import { changeUrl } from '../utils/navigation.js';

/*
 * Рендерит страницу чатов
 * @class Класс страницы чатов
 */
export default class ChatPage extends BasePage {
    #type;
    #parent;
    #chat;
    #inputBlock;
    #chatList;
    #messageDrafts = {};
    #searchDrafts = {};
    #searchDraft;
    #currentChatId;
    #profile;
    #chats = [];
    #chatsCache = {};
    #stickers;

    constructor(parent, urlParams) {
        super(parent);
        this.#parent = parent;
        this.#currentChatId = parseInt(urlParams.get('id'));
        this.#type = window.location.pathname;
        this.getData().then(() => this.render());
    }

    getData = async () => {
        try {
            const chatAPI = new ChatAPI();
            const profileAPI = new ProfileAPI();
            let chatsResponse, profileResponse;
            if (this.#type === '/chat') {
                [chatsResponse, profileResponse] = await Promise.all([
                    chatAPI.getChats(),
                    profileAPI.getProfile(),
                ]);
                this.#chats = chatsResponse.body.chats;
                if (chatsResponse.body.chats) {
                    chatsResponse.body.chats.forEach((chat) => {
                        this.#chatsCache[chat.id] = chat;
                    });
                }
            } else {
                [chatsResponse, profileResponse] = await Promise.all([
                    chatAPI.getPopularChannels(),
                    profileAPI.getProfile(),
                ]);
                this.#chats = chatsResponse.body.channels;
                if (chatsResponse.body.channels) {
                    chatsResponse.body.channels.forEach((chat) => {
                        this.#chatsCache[chat.id] = chat;
                    });
                }
            }

            if (profileResponse.status !== 200) {
                throw new Error('Пришел не 200 статус');
            }
            this.#profile = profileResponse.body.user;

            const stickersResponse = await chatAPI.getStickers();
            if (stickersResponse.status !== 200) {
                throw new Error('Пришел не 200 статус');
            }
            this.#stickers = stickersResponse.body;
            console.log(this.#stickers);

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
        this.#chatList = new ChatList(wrapper, {
            type: this.#type,
            inputSearchChats: this.searchChatsDraftHandler,
            sendSearchChats: this.searchSendHandler,
            getSearchChats: this.getWebSocketSearch,
            userId: this.#profile.id,
        });
        this.#chatList.render();
        this.#chatList.setUserName(`${this.#profile.username}`);

        this.#chat = new Chat(wrapper, {
            type: this.#type,
            inputSearchMessages: this.searchMessagesDraftsHandler,
            sendSearchMessages: this.searchSendHandler,
            getSearchMessages: this.getWebSocketSearch,
        });
        this.#chat.render();
        this.#parent.appendChild(wrapper);
        this.displayChats(this.#chats);
    }

    messageDraftHandler = (event) => {
        this.#messageDrafts[this.#currentChatId] = event.target.value;
    };

    searchChatsDraftHandler = (event) => {
        this.#searchDraft = event.target.value;
    };

    searchMessagesDraftsHandler = (event) => {
        this.#searchDrafts[this.#currentChatId] = event.target.value;
    };

    messageSendHandler = () => {
        // Контейнер активного чата
        const inputMessage = this.#parent
            .querySelector('#input_message')
            .value.trim();
        const filesMessage = this.#parent.querySelector(
            '#file_input_message',
        ).files;

        const urlParams = new URLSearchParams(window.location.search);
        const chatId = parseInt(urlParams.get('id'));
        if (filesMessage.length > 0 && chatId) {
            const sanitizedInputMessage = sanitizer(inputMessage);
            const chatAPI = new ChatAPI();
            chatAPI.sendMessage(chatId, sanitizedInputMessage, filesMessage[0]);

            // .then(() => {
            //     changeUrl(this.getConfig().path, true);
            // });
            document.querySelector('#input_message').value = '';
        } else if (inputMessage && chatId) {
            // Проверяем, что есть сообщение и ID чата
            const sanitizedInputMessage = sanitizer(inputMessage);
            const message = {
                chat_id: chatId,
                message_text: sanitizedInputMessage,
            };
            this.#inputBlock.getMessageSocket().sendRequest(message);
            document.querySelector('#input_message').value = '';
        } else {
            console.error('Нет текста сообщения, файла или ID чата.');
        }
    };

    searchSendHandler = (type) => {
        // Контейнер активного чата
        const inputSearch = this.#parent
            .querySelector(`#input_search_${type}`)
            .value.trim();
        if (inputSearch) {
            const sanitizedInputSearch = sanitizer(inputSearch);
            const search = {
                word: sanitizedInputSearch,
                search_type: type,
            };
            if (type === 'message') {
                search.chat_id = this.#currentChatId || '';
            }
            this.#chatList.getSearcher().getSocket().sendRequest(search);
        } else {
            this.displayChats(this.#chats);
        }
    };

    getWebSocketMessage = (message) => {
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
                edited: message.edited,
                message_owner: owner,
                message_id: message.id,
                message_text: message.message_text,
                file: message.file,
            });
            messageElement.render();
            this.#chatsCache[message.chat_id].messages =
                this.#chatsCache[message.chat_id].messages || [];
            this.#chatsCache[message.chat_id].messages.push(message); // Добавляем сообщение в кеш
            this.displayChats(this.#chats); // Обновляем отображение чатов
        }
    };

    getWebSocketSearch = (response) => {
        if ('chats' in response.body) {
            this.displayChats(response.body.chats || []);
        } else {
            this.displayMessages(response.body.messages || []);
        }
    };

    displayChats(chats) {
        const chatListContainer = document.getElementById(
            'chat-list-container',
        );
        chatListContainer.innerHTML = '';
        let checkChatId = false;
        let checkChatConfig = null;
        chats = chats || [];
        chats.forEach((chatConfig) => {
            if (chatConfig.id === this.#currentChatId) {
                checkChatConfig = chatConfig;
                checkChatId = true;
            }
            this.#chatList.addChat(chatConfig, (event) => {
                event.preventDefault();
                this.displayActiveChat(chatConfig);
                this.#currentChatId = chatConfig.id;
                changeUrl(this.#type + '?id=' + chatConfig.id);
            });
        });
        this.#messageDrafts[this.#currentChatId] = '';
        if (!checkChatId && !isNaN(this.#currentChatId)) {
            changeUrl('/chat');
            this.#currentChatId = null;
        }
        if (checkChatId) {
            this.displayActiveChat(checkChatConfig);
        }
    }

    displayActiveChat(chat) {
        const chatInputBlock = this.#parent.querySelector('#chat_input_block');
        chatInputBlock.innerHTML = '';
        let chatName = `${chat.name} `;
        if (!chat.type) {
            chat.type = '3';
        }
        // Если чат - канал
        if (chat.type === '3') {
            chatName = 'Канал: ' + chatName;
            // если пользователь не создатель
            if (chat.creator !== this.#profile.id) {
                // если пользователь не подписан на канал
                chat.is_member = !!(
                    chat.is_member || chat.is_member === undefined
                );
            }
        }

        this.#inputBlock = new ChatInput(chatInputBlock, {
            inputMessage: this.messageDraftHandler,
            sendMessage: this.messageSendHandler,
            getMessage: this.getWebSocketMessage,
            type: chat.type,
            is_member: chat.is_member,
            is_owner: chat.creator === this.#profile.id,
            chatId: chat.id,
            stickers: this.#stickers,
        });
        this.#inputBlock.render();

        if (chat.type !== '3' || chat.creator === this.#profile.id) {
            this.#parent.querySelector('#input_message').value =
                this.#messageDrafts[chat.id] || '';
        }

        document.getElementById('chat_header').textContent = chatName;
        const chatAPI = new ChatAPI();
        let messages = this.#chatsCache[chat.id].messages || [];
        chatAPI
            .getMessages(this.#chatsCache[chat.id].id)
            .then((response) => {
                messages = response.body.messages;
                this.#chatsCache[chat.id].messages = messages;
                this.displayMessages(messages);
            })
            .catch(() => {
                console.log('нет интернета');
                this.displayMessages(messages);
            });
        this.#chatList.setActiveChat(chat.id);
    }

    displayMessages(messages) {
        const activeChatContainer = document.getElementById(
            'active-chat-container',
        );
        activeChatContainer.innerHTML = '';
        messages = messages || [];
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
                edited: message.edited,
                file: message.file,
            });
            messageElement.render();
        });
        activeChatContainer.scrollTop = activeChatContainer.scrollHeight;
    }
}
