import { BaseComponent } from '../BaseComponent.js';
//import { WebSocketManager } from '../../utils/WebSocket.js';
import Search from '../Search/Search.js';

export default class Chat extends BaseComponent {
    templateName = 'Chat';
    #searchMessages;

    render() {
        // this.ws_sendMesasge = new WebSocketManager(
        //     'sendMessage',
        //     this.getConfig().getMessage,
        // );

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

        // this.getParent()
        //     .querySelector('#input_message')
        //     .addEventListener('input', this.getConfig().inputMessage);
        //
        // this.getParent()
        //     .querySelector('#input_message')
        //     .addEventListener('keydown', (event) => {
        //         if (event.keyCode === 13) {
        //             event.preventDefault();
        //             this.getConfig().sendMessage();
        //         }
        //     });
        //
        // this.getParent()
        //     .querySelector('.input_send')
        //     .addEventListener('click', this.getConfig().sendMessage);
    }

    // getMessageSocket() {
    //     return this.ws_sendMesasge;
    // }

    setInputMessageValue(value) {
        this.getParent().querySelector('#input_message').value = value;
    }
}
