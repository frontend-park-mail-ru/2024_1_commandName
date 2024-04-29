import { ContactsAPI } from '../utils/API/ContactsAPI.js';
import { ChatAPI } from '../utils/API/ChatAPI.js';
import Contacts from '../Components/Contacts/Contacts.js';
import { BasePage } from './BasePage.js';
import { goToPage } from '../utils/router.js';
import { websocketManager } from '../utils/WebSocket.js';
import { sanitizer } from '../utils/valid.js';

/**
 * Рендерит страницу чатов
 * @class Класс страницы чатов
 */
export default class ContactsPage extends BasePage {
    #parent;
    #contacts;
    #contactsList;
    #searchDraft;

    constructor(parent) {
        super(parent);
        this.#parent = parent;
        websocketManager.connect(['search']);
        websocketManager.setMessageHandler(
            'search',
            this.handleWebSocketSearch,
        );
        this.getData().then(() => this.render());
    }

    getData = async () => {
        try {
            const contactsAPI = new ContactsAPI();

            const contactsResponse = await contactsAPI.getContacts();

            if (contactsResponse.status !== 200) {
                throw new Error('Пришел не 200 статус');
            }
            this.#contacts = contactsResponse.body.contacts;

            return {
                contacts: this.#contacts,
            };
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            throw error;
        }
    };

    render() {
        this.#contactsList = new Contacts(this.#parent, {
            inputSearchHandler: this.searchDraftHandler,
            sendSearchHandler: this.searchSendHandler,
        });
        this.#contactsList.render();
        this.displayContacts(this.#contacts);
    }
    handleWebSocketSearch = (response) => {
        this.displayContacts(response.body.contacts);
    };

    searchDraftHandler = (event) => {
        this.#searchDraft = event.target.value;
    };

    searchSendHandler = () => {
        // Контейнер активного чата
        const inputSearch = this.#parent
            .querySelector(`#search_input`)
            .value.trim();
        if (inputSearch) {
            const sanitizedInputSearch = sanitizer(inputSearch);
            const search = {
                word: sanitizedInputSearch,
                search_type: 'contact',
            };
            websocketManager.sendMessage('search', search);
            document.querySelector(`#search_input`).value = '';
        } else {
            console.error('Нет текста для поиска');
        }
    };

    displayContacts(contacts) {
        const contactsListContainer = document.getElementById('contact_list');
        contactsListContainer.innerHTML = '';
        const chatAPI = new ChatAPI();
        contacts.forEach((contactConfig) => {
            this.#contactsList.addContact(contactConfig, () => {
                chatAPI.chatByUserId(contactConfig.id).then((response) => {
                    if (response.status === 200) {
                        goToPage('/chat?id=' + response.body.chat_id, true);
                    }
                });
            });
        });
    }
}
