import { ChatAPI } from '../utils/API/ChatAPI.js';
import { AuthAPI } from '../utils/API/AuthAPI.js';
import { goToPage } from '../utils/goToPage.js';
import LoginPage from './LoginPage.js';
import Chat from '../Components/Chat/Chat.js';
import ChatList from '../Components/ChatList/ChatList.js';
import Message from '../Components/Message/Message.js';

/**
 * Рендерит страницу чатов
 * @class Класс страницы чатов
 */
export default class ChatPage {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.classList = 'full-screen';

        const chatList = new ChatList(wrapper, {
            logoutHandler: this.handleLogout,
        });
        chatList.render();

        const chat = new Chat(wrapper, {});
        chat.render();

        this.#parent.appendChild(wrapper);

        const chatAPI = new ChatAPI();
        chatAPI
            .getChats()
            .then((chats) => {
                chats.body.chats.forEach((chatConfig) => {
                    //
                    chatList.addChat(chatConfig, () => {
                        this.displayActiveChat(chatConfig);
                    });
                });
            })
            .catch((error) => {
                console.error('Ошибка при получении чатов:', error);
            });
    }

    displayActiveChat(chat) {
        // Очищаем контейнер активного чата
        const activeChatContainer = document.getElementById(
            'active-chat-container',
        );
        activeChatContainer.innerHTML = '';

        const chatInput = this.#parent.querySelector('#chat_input');

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
                    goToPage(LoginPage);
                } else {
                    console.log('Error logged out');
                }
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
    }
}
