// import { goToPage } from '../utils/goToPage.js';
// import LoginPage from './LoginPage.js';
// import { AuthAPI } from '../utils/API/AuthAPI.js';
import { ChatAPI } from '../utils/API/ChatAPI.js';
import { AuthAPI } from '../utils/API/AuthAPI.js';
import { goToPage } from '../utils/goToPage.js';
import LoginPage from './LoginPage.js';

/**
 * Рендерит страницу чатов
 * @class Класс страницы чатов
 */
export default class ChatPage {
    #parent;
    #activeChatContainer;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        // Создаем основной контейнер
        const app = document.createElement('div');
        app.id = 'app';

        // Создаем боковую панель
        const aside = document.createElement('aside');
        aside.innerHTML = `
            <div class="chat_list_header">
                <h2> Чаты </h2>
            </div>
            <div class="chat_list" id="chat-list-container">
            <div className="seach_container">
                <input class="search_input" placeholder="Поиск...">
            </div>
            </div>
            <div class="chat_menu">
                <div class="chat_menu_item">Пользователь</div>
            </div>
        `;
        app.appendChild(aside);

        // Создаем главный контент
        const main = document.createElement('main');
        main.innerHTML = `
            <div class="chat_header">
                <h2 id="chat_header">Выберите чат</h2>
            </div>
            <div className="chat">
                <div class="chat_width message_list" id="active-chat-container"></div>
                <div class="chat_width input_block">
                    <button class="input_attach">*скрепка*</button>
                    <input class="input_text" type="text" placeholder="Сообщение...">
                    <button class="input_send">-></button>
                </div>
            </div>
        `;
        app.appendChild(main);

        // Создаем кнопку для выхода
        const logoutButton = document.createElement('button');
        logoutButton.id = 'logout_btn';
        logoutButton.textContent = 'Выйти';
        logoutButton.addEventListener('click', this.handleLogout);

        // Добавляем кнопку выхода в конец боковой панели
        aside.appendChild(logoutButton);

        this.#parent.appendChild(app);

        // Получаем чаты с сервера и рендерим список чатов
        const chatListContainer = document.getElementById(
            'chat-list-container',
        );
        const chatAPI = new ChatAPI();
        chatAPI
            .getChats()
            .then((chats) => {
                chats.body.chats.forEach((chat) => {
                    const chatItem = document.createElement('div');
                    chatItem.className = 'chat_list_item';
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
    }

    displayActiveChat(chat) {
        // Очищаем контейнер активного чата
        const activeChatContainer = document.getElementById(
            'active-chat-container',
        );
        activeChatContainer.innerHTML = '';

        // Отображаем содержимое выбранного чата
        document.getElementById('chat_header').textContent = chat.name;

        // Отображаем сообщения в чате
        chat.messages.forEach((message) => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.textContent = message.message_text;
            activeChatContainer.appendChild(messageElement);
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
