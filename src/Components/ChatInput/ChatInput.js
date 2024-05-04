import { BaseComponent } from '../BaseComponent.js';
import { WebSocketManager } from '../../utils/WebSocket.js';
import { ChatAPI } from '../../utils/API/ChatAPI.js';
import { goToPage } from '../../utils/router.js';

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
        this.getConfig().path = window.location.pathname;
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
        if (this.getConfig().TypeFlag && !this.getConfig().is_owner) {
            if (this.getConfig().is_member) {
                this.getParent()
                    .querySelector(`#leave_channel`)
                    .addEventListener('click', () => {
                        const chatAPI = new ChatAPI();
                        chatAPI
                            .deleteChatById(this.getConfig().chatId)
                            .then(() => {
                                goToPage(this.getConfig().path, true);
                            });
                    });
            } else {
                this.getParent()
                    .querySelector(`#join_channel`)
                    .addEventListener('click', () => {
                        const chatAPI = new ChatAPI();
                        chatAPI
                            .joinChannel(this.getConfig().chatId)
                            .then(() => {
                                goToPage(
                                    this.getConfig().path +
                                        '?id=' +
                                        this.getConfig().chatId,
                                    true,
                                );
                            });
                    });
            }
        }
    }

    getMessageSocket() {
        return this.ws_sendMesasge;
    }
}
