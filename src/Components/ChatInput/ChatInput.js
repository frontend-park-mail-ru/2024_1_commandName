import { ChatAPI } from '../../utils/API/ChatAPI.js';
import { WebSocketManager } from '../../utils/WebSocket.js';
import { changeUrl } from '../../utils/navigation';
import { BaseComponent } from '../BaseComponent.js';
import Sticker from '../Sticker/Sticker.js';

/**
 * Рендерит поиск
 * @class Класс компонента поиска
 */
export default class ChatInput extends BaseComponent {
    templateName = 'ChatInput';
    fillStickers() {
        const stickersBlock = this.getParent().querySelector(
            '.popup_stickers_body',
        );
        this.getConfig().stickers.forEach((sticker) => {
            const stickerBlock = new Sticker(stickersBlock, sticker);
            stickerBlock.render();
        });
        stickersBlock.addEventListener('click', (event) => {
            const target = event.target;

            const stickerId = parseInt(target.id.match(/\d+$/)[0]);
            this.getConfig().stickerSendHandler(stickerId);
        });
    }

    render() {
        if (this.getConfig().ws_sendMessage === '') {
            this.ws_sendMessage = new WebSocketManager(
                'sendMessage',
                this.getConfig().getMessage,
            );
        } else {
            this.ws_sendMessage = this.getConfig().ws_sendMessage;
        }
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

            const stickersBlock = this.getParent().querySelector(
                '#popup_stickers_block',
            );
            const stickersBlockBtn = this.getParent().querySelector(
                '.input_text_block_stickers_btn',
            );
            const stickersBgc = this.getParent().querySelector(
                '.popup_stickers_bgc',
            );

            stickersBlockBtn.addEventListener('click', (e) => {
                e.preventDefault();
                stickersBgc.classList.add('is_opened');
                stickersBlock.classList.add('is_opened');
            });

            stickersBgc.addEventListener('click', (e) => {
                e.preventDefault();
                if (
                    !e.target.closest('#popup_stickers_block') &&
                    !e.target.closest('.input_text_block_stickers_btn')
                ) {
                    stickersBgc.classList.remove('is_opened');
                    stickersBlock.classList.remove('is_opened');
                }
            });
            this.fillStickers();
        }
    }

    getMessageSocket() {
        return this.ws_sendMessage;
    }
}
