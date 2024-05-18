import { ContactsAPI } from '../utils/API/ContactsAPI.js';
import { ChatAPI } from '../utils/API/ChatAPI.js';
import Contacts from '../Components/Contacts/Contacts.js';
import { BasePage } from './BasePage.js';
import { sanitizer } from '../utils/valid.js';
import { changeUrl } from '../utils/navigation';

/**
 * Рендерит страницу чатов
 * @class Класс страницы чатов
 */
export default class ContactsPage extends BasePage {
    #parent;
    #contacts = [];
    #contactsList;
    #searchDraft;

    constructor(parent) {
        super(parent);
        this.#parent = parent;
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
            inputSearchContacts: this.searchDraftHandler,
            sendSearchContacts: this.searchSendHandler,
            getSearchContacts: this.getWebSocketSearch,
        });
        this.#contactsList.render();
        this.displayContacts(this.#contacts);
    }
    getWebSocketSearch = (response) => {
        this.displayContacts(response.body.contacts || []);
    };

    searchDraftHandler = (event) => {
        this.#searchDraft = event.target.value;
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
                search_type: 'contact',
            };
            this.#contactsList.getSearcher().getSocket().sendRequest(search);
        } else {
            this.displayContacts(this.#contacts);
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
                        changeUrl('/chat?id=' + response.body.chat_id);
                    }
                });
            });
        });
    }
}
