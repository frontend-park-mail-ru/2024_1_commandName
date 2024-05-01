import { BaseComponent } from '../BaseComponent.js';
import { ChatAPI } from '../../utils/API/ChatAPI.js';
import { sanitizer } from '../../utils/valid.js';

export default class Message extends BaseComponent {
    templateName = 'Message';
    #messageElement;
    #ContextMenu;
    #editMessageInput;

    render() {
        super.render();

        this.#messageElement = this.getParent().querySelector(
            `#message_id_${this.getConfig().message_id}`,
        );

        if (!this.#messageElement.classList.contains('my_message')) {
            return;
        }

        this.#ContextMenu = this.#messageElement.querySelector(`#ContextMenu`);
        this.#editMessageInput = this.#messageElement.querySelector(
            '.edit_message_input',
        );

        this.#messageElement.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            this.#ContextMenu.style.display = 'block';
        });

        this.#ContextMenu
            .querySelector('.delete-button')
            .addEventListener('click', () => {
                const chatAPI = new ChatAPI();
                chatAPI.deleteMessage(this.getConfig().message_id).then(() => {
                    this.#messageElement.style.display = 'none';
                });
            });

        this.#ContextMenu
            .querySelector('.edit-button')
            .addEventListener('click', () => {
                this.#editMessageInput.style.display = 'inline-block';
                this.#editMessageInput.value = this.getConfig().message_text;
                this.#messageElement.querySelector(
                    '.message_text',
                ).style.display = 'none';
                this.#ContextMenu.style.display = 'none';

                const editButton = document.createElement('button');
                editButton.textContent = '→';
                editButton.addEventListener('click', () => {
                    // Здесь добавьте логику для редактирования сообщения
                    const newMessageText = this.#editMessageInput.value;
                    const sanitizednewMessageText = sanitizer(newMessageText);
                    const chatAPI = new ChatAPI();
                    chatAPI
                        .editMessage(
                            this.getConfig().message_id,
                            sanitizednewMessageText,
                        )
                        .then(() => {
                            this.#editMessageInput.style.display = 'none';
                            this.#messageElement.querySelector(
                                '.message_text',
                            ).textContent = newMessageText;
                            this.#messageElement.querySelector(
                                '.message_text',
                            ).style.display = 'inline-block';
                            editButton.style.display = 'none';
                        });
                });

                this.#messageElement
                    .querySelector('.message_data')
                    .appendChild(editButton);
            });

        document.addEventListener('click', () => {
            this.#ContextMenu.style.display = 'none';
        });
    }
}
