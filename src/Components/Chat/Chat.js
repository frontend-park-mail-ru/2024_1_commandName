import { BaseComponent } from '../BaseComponent.js';
import Search from '../Search/Search.js';

export default class Chat extends BaseComponent {
    templateName = 'Chat';
    #searchMessages;

    render() {
        this.getConfig().header = 'Выберите чат';
        if (this.getConfig().type === '/channel') {
            this.getConfig().header = 'Выберите канал';
        }
        super.render();

        const searchContainer = this.getParent().querySelector(
            `#search_container_message`,
        );

        this.#searchMessages = new Search(searchContainer, {
            type: 'message',
            inputSearch: this.getConfig().inputSearchMessages,
            sendSearch: this.getConfig().sendSearchMessages,
            getSearch: this.getConfig().getSearchMessages,
        });
        this.#searchMessages.render();
    }
}
