import { BaseComponent } from '../BaseComponent.js';
import { WebSocketManager } from '../../utils/WebSocket.js';

/**
 * Рендерит поиск
 * @class Класс компонента поиска
 */
export default class ChatInput extends BaseComponent {
    templateName = 'ChatInput';
    render() {
        this.ws_sendMesasge = new WebSocketManager(
            'sendMessage',
            this.getConfig().getMessage,
        );
        this.getConfig().TypeFlag = true; //является ли каналом
        console.log(this.getConfig().type);
        if (this.getConfig().type !== '3') {
            this.getConfig().TypeFlag = false;
        }
        super.render();
        console.log(this.getConfig().TypeFlag);
        if (this.getConfig().is_owner || !this.getConfig().TypeFlag) {
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
    }

    getMessageSocket() {
        return this.ws_sendMesasge;
    }

    setInputMessageValue(value) {
        this.getParent().querySelector('#input_message').value = value;
    }
}