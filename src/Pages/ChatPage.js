import { goToPage } from '../utils/goToPage.js';
import LoginPage from './LoginPage.js';
import { AuthAPI } from '../utils/API/AuthAPI.js';
import { ChatAPI } from '../utils/API/ChatAPI.js';

/**
 * Рендерит страницу чатов
 * @class Класс страницы чатов
 */
export default class ChatPage {
    #parent;
    #errorMessage;
    #activeChatContainer;

    constructor(parent) {
        this.#parent = parent;
    }

    setError(message) {
        this.#errorMessage.textContent = message;
    }

    render() {
        this.#parent.innerHTML = '';

        // Создаем контейнер для чата справа
        this.#activeChatContainer = document.createElement('div');
        this.#activeChatContainer.className = 'active-chat-container';
        this.#activeChatContainer.textContent =
            'Выберите чат для начала общения';

        // Создаем контейнер для списка чатов слева
        const chatListContainer = document.createElement('div');
        chatListContainer.className = 'chat-list-container';

        // Получаем чаты с сервера
        const chatAPI = new ChatAPI();
        chatAPI
            .getChats()
            .then((chats) => {
                chats.forEach((chat) => {
                    const chatItem = document.createElement('div');
                    chatItem.className = 'chat-item';
                    chatItem.textContent = chat.name;

                    // Обработчик клика на чат
                    chatItem.addEventListener('click', () => {
                        this.displayActiveChat(chat);
                    });

                    chatListContainer.appendChild(chatItem);
                });
            })
            .catch((error) => {
                console.error('Ошибка при получении чатов:', error);
            });

        // Создаем кнопку для выхода
        const logoutButton = document.createElement('button');
        logoutButton.id = 'logout_btn';
        logoutButton.textContent = 'Выйти';
        logoutButton.addEventListener('click', this.handleLogout.bind(this));

        // Добавляем кнопку выхода
        chatListContainer.appendChild(logoutButton);

        // Создаем контейнер для чата и кнопки выхода
        const chatContainer = document.createElement('div');
        chatContainer.className = 'chat-container';
        chatContainer.appendChild(chatListContainer);
        chatContainer.appendChild(this.#activeChatContainer);

        // Добавляем контейнер чата в родительский элемент
        this.#parent.appendChild(chatContainer);
    }

    displayActiveChat(chat) {
        // Очищаем контейнер активного чата
        this.#activeChatContainer.innerHTML = '';

        // Отображаем содержимое выбранного чата
        const chatName = document.createElement('h2');
        chatName.textContent = chat.name;
        this.#activeChatContainer.appendChild(chatName);

        // Отображаем сообщения в чате
        chat.messages.forEach((message) => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message-item';
            messageElement.textContent = message.message_text;

            // Обработчик клика на сообщение
            messageElement.addEventListener('click', () => {
                this.displayMessage(message);
            });

            this.#activeChatContainer.appendChild(messageElement);
        });
    }

    displayMessage(message) {
        // Отображаем содержимое выбранного сообщения
        this.#activeChatContainer.textContent = `Сообщение: ${message.message_text}`;
    }

    handleLogout(event) {
        event.preventDefault();
        // Отправка данных на сервер
        const api = new AuthAPI();
        api.logout()
            .then((data) => {
                console.log(data);
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
