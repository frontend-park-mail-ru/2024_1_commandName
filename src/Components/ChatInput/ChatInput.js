import { BaseComponent } from '../BaseComponent.js';
import { WebSocketManager } from '../../utils/WebSocket.js';
import { ChatAPI } from '../../utils/API/ChatAPI.js';
import { changeUrl } from '../../utils/navigation';

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
        this.getConfig().isChannel = true; //является ли каналом
        if (this.getConfig().type !== '3') {
            this.getConfig().isChannel = false;
        }
        this.getConfig().path = window.location.pathname;
        super.render();
        if (this.getConfig().is_owner || !this.getConfig().isChannel) {
            this.getParent().querySelector('#input_message').focus();
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
        if (this.getConfig().isChannel && !this.getConfig().is_owner) {
            if (this.getConfig().is_member) {
                this.getParent()
                    .querySelector(`#leave_channel`)
                    .addEventListener('click', () => {
                        const chatAPI = new ChatAPI();
                        chatAPI
                            .deleteChatById(this.getConfig().chatId)
                            .then(() => {
                                changeUrl(this.getConfig().path, true);
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
                                changeUrl(
                                    this.getConfig().path +
                                        '?id=' +
                                        this.getConfig().chatId,
                                    true,
                                );
                            });
                    });
            }
        }

        if (
            !this.getConfig().isChannel ||
            (this.getConfig().isChannel && this.getConfig().is_owner)
        ) {
            const fileInput = this.getParent().querySelector(
                '#file_input_message',
            );
            fileInput.onchange = () => {
                const [file] = fileInput.files;
                const previewBlock = this.getParent().querySelector(
                    '.input_attach_preview',
                );
                const previewTitle = this.getParent().querySelector(
                    '.input_attach_preview_title',
                );

                if (file) {
                    previewBlock.style.display = 'flex';
                    previewTitle.innerHTML = file.name;
                } else {
                    previewBlock.style.display = 'none';
                    previewTitle.innerHTML = '';
                }
            };
        }

        const stickersBlock = this.getParent().querySelector(
            '#popup_stickers_block',
        );
        const stickersBlockBtn = this.getParent().querySelector(
            '.input_text_block_stickers_btn',
        );

        stickersBlockBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stickersBlock.classList.add('is_opened');
        });

        document.addEventListener('click', (e) => {
            e.preventDefault();
            if (
                !e.target.closest('#popup_stickers_block') &&
                !e.target.closest('.input_text_block_stickers_btn')
            ) {
                stickersBlock.classList.remove('is_opened');
            }
        });
    }

    getMessageSocket() {
        return this.ws_sendMesasge;
    }
}
