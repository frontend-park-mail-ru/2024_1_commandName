import { ChatAPI } from '../utils/API/ChatAPI.js';
import { AuthAPI } from '../utils/API/AuthAPI.js';
import { goToPage } from '../utils/goToPage.js';
import LoginPage from './LoginPage.js';
import Chat from '../Components/Chat/Chat.js';
import ChatList from '../Components/ChatList/ChatList.js';

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

        // TODO: очистить список чатов, получать их потом
        const chatList = new ChatList(wrapper, {
            chats: [
                { username: 'test' },
                { username: 'test2' },
                { username: 'test3' },
            ],
        });
        chatList.render();

        const chat = new Chat(wrapper, {});
        chat.render();

        this.#parent.appendChild(wrapper);
        // Создаем кнопку для выхода
        // const logoutButton = document.createElement('button');
        // logoutButton.id = 'logout_btn';
        // logoutButton.textContent = 'Выйти';
        // logoutButton.addEventListener('click', this.handleLogout);

        // // Добавляем кнопку выхода в конец боковой панели
        // aside.appendChild(logoutButton);

        // this.#parent.appendChild(app);

        // Получаем чаты с сервера и рендерим список чатов
        // const chatListContainer = document.getElementById(
        //     'chat-list-container',
        // );
        // const chatAPI = new ChatAPI();
        // chatAPI
        //     .getChats()
        //     .then((chats) => {
        //         chats.body.chats.forEach((chat) => {
        //             const chatItem = document.createElement('div');
        //             chatItem.className = 'chat_list_item';
        //             chatItem.textContent = chat.name;

        //             // Обработчик клика на чат
        //             chatItem.addEventListener('click', () => {
        //                 this.displayActiveChat(chat);
        //             });

        //             chatListContainer.appendChild(chatItem);
        //         });
        //     })
        //     .catch((error) => {
        //         console.error('Ошибка при получении чатов:', error);
        //     });
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
