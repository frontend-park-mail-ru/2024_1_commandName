import { BaseComponent } from '../BaseComponent.js';
import { WebSocketManager } from '../../utils/WebSocket.js';

export default class Chat extends BaseComponent {
    templateName = 'Chat';

    render() {
        this.ws_sendMesasge = new WebSocketManager(
            'sendMessage',
            this.getConfig().getMessage,
        );
        // this.ws_sendSearch = new WebSocketManager(
        //     'sendSearch',
        //     this.getConfig().getSearch,
        // );
        super.render();
        this.getParent()
            .querySelector('#input_message')
            .addEventListener('input', this.getConfig().inputMessage);

        this.getParent()
            .querySelector('#input_message')
            .addEventListener('keydown', (event) => {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    this.getConfig().sendMessage();
                }
            });

        this.getParent()
            .querySelector('.input_send')
            .addEventListener('click', this.getConfig().sendMessage);
    }

    getMessageSocket() {
        return this.ws_sendMesasge;
    }

    getSearchSocket() {
        return this.ws_sendSearch;
    }
    setInputMessageValue(value) {
        this.getParent().querySelector('#input_message').value = value;
    }
}
