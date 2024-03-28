import { ChatAPI } from '../utils/API/ChatAPI.js';
import { AuthAPI } from '../utils/API/AuthAPI.js';
import { goToPage } from '../utils/goToPage.js';
import LoginPage from './LoginPage.js';
import ChatList from '../Components/ChatList/ChatList.js';

/**
 * Рендерит страницу контактов
 * @class Класс страницы контактов
 */
export default class ContactsPage {
    #parent;
    #chatList;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.classList = 'full-screen';

        this.#chatList = new ChatList(wrapper, {
            logoutHandler: this.handleLogout,
        });
        this.#chatList.render();

        this.#parent.appendChild(wrapper);

        const chatAPI = new ChatAPI();
        chatAPI
            .getChats()
            .then((chats) => {
                chats.body.chats.forEach((chatConfig) => {
                    //
                    this.#chatList.addChat(chatConfig, () => {
                        this.displayActiveChat(chatConfig);
                    });
                });
            })
            .catch((error) => {
                console.error('Ошибка при получении чатов:', error);
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
