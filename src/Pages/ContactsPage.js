import { ContactsAPI } from '../utils/API/ContactsAPI.js';
import { ChatAPI } from '../utils/API/ChatAPI.js';
import Contacts from '../Components/Contacts/Contacts.js';
import { goToPage } from '../utils/router.js';

/**
 * Рендерит страницу чатов
 * @class Класс страницы чатов
 */
export default class ContactsPage {
    #parent;
    #contactsList;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        const contactsAPI = new ContactsAPI();
        const chatAPI = new ChatAPI();

        this.#contactsList = new Contacts(this.#parent, {});
        this.#contactsList.render();

        contactsAPI
            .getContacts()
            .then((response) => {
                if (response.body.contacts.length === 0) {
                    this.#contactsList.innerHTML = 'У Вас ещё нет контактов';
                } else {
                    response.body.contacts.forEach((contactConfig) => {
                        this.#contactsList.addContact(contactConfig, () => {
                            chatAPI
                                .chatByUserId(contactConfig.id)
                                .then((response) => {
                                    if (response.status === 200) {
                                        goToPage(
                                            '/chat?id=' + response.body.chat_id,
                                        );
                                    }
                                });
                        });
                    });
                }
            })
            .catch((error) => {
                console.error('Ошибка при получении профиля:', error);
            });
    }

    getChatByName(name) {
        let checkChatId = false;
        const chatAPI = new ChatAPI();
        chatAPI
            .getChats()
            .then((chats) => {
                chats.body.chats.forEach((chatConfig) => {
                    if (chatConfig.name === name) {
                        checkChatId = true;
                        goToPage('/chat?id=' + chatConfig.id);
                    }
                });
                if (!checkChatId) {
                    goToPage('/chat');
                }
            })
            .catch((error) => {
                console.error('Ошибка при получении чатов:', error);
            });
    }
}
