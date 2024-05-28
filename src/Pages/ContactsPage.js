import { ContactsAPI } from '../utils/API/ContactsAPI.js';
import { ChatAPI } from '../utils/API/ChatAPI.js';
import Contacts from '../Components/Contacts/Contacts.js';
import { BasePage } from './BasePage.js';
import { sanitizer } from '../utils/valid.js';
import { changeUrl } from '../utils/navigation.js';
import { SearchAPI } from '../utils/API/SearchAPI.js';

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
        });
        this.#contactsList.render();
        this.displayContacts(this.#contacts);
    }
    searchDraftHandler = (event) => {
        this.#searchDraft = event.target.value;
    };

    searchSendHandler = (type) => {
        const searchAPI = new SearchAPI();
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
            searchAPI.search(search).then((response) => {
                if (response.status === 200) {
                    this.displayContacts(response.body.contacts || []);
                } else {
                    console.error('Ошибка поиска');
                }
            });
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
                        changeUrl('/chat?id=' + response.body.chat_id, true);
                    }
                });
            });
        });
    }
}
