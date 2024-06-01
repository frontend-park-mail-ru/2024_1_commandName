import { BaseComponent } from '../BaseComponent.js';
import { ChatAPI } from '../../utils/API/ChatAPI.js';
import { TextAPI } from '../../utils/API/TextAPI.js';
import { sanitizer } from '../../utils/valid.js';

export default class Message extends BaseComponent {
    templateName = 'Message';
    #messageElement;
    #ContextMenu;
    #editMessageInput;
    #editingMode = false;
    #messageTextField;
    #viewOriginalBtn;

    render() {
        super.render();

        this.#messageElement = this.getParent().querySelector(
            `#message_id_${this.getConfig().message_id}`,
        );
        this.#messageTextField =
            this.#messageElement.querySelector('.message_text');

        this.#ContextMenu = this.#messageElement.querySelector(`.messageModal`);

        this.#messageElement.addEventListener('contextmenu', (event) => {
            event.preventDefault();

            this.getParent() // Close all modals
                .querySelectorAll('.messageModal')
                .forEach((element) => {
                    if (!element.classList.contains('hidden')) {
                        element.classList.add('hidden');
                    }
                });

            if (!this.#editingMode) {
                if (this.#ContextMenu.classList.contains('hidden')) {
                    this.openModal();
                } else {
                    this.closeModal();
                }
            }
        });

        document.addEventListener('click', (event) => {
            if (
                !event.target.closest('.messageModal') &&
                !this.#ContextMenu.classList.contains('hidden')
            ) {
                this.#ContextMenu.classList.add('hidden');
            }
        });

        if (this.#messageElement.classList.contains('my_message')) {
            this.configMyMessage();
        } else {
            this.configMessage();
        }
    }

    configMessage() {
        this.#viewOriginalBtn =
            this.#messageElement.querySelector('.origin-button');
        this.#ContextMenu
            .querySelector('.translate-button')
            .addEventListener('click', () => {
                const textAPI = new TextAPI();
                textAPI
                    .translate(this.#messageTextField.innerHTML)
                    .then((res) => {
                        this.#messageTextField.innerHTML =
                            res.body.translations[0].text;
                        this.closeModal();
                        this.#viewOriginalBtn.classList.remove('hidden');
                    });
            });

        this.#ContextMenu
            .querySelector('.shortly-button')
            .addEventListener('click', () => {
                const textAPI = new TextAPI();
                textAPI
                    .short(
                        this.#messageTextField.innerHTML,
                        this.getConfig().username,
                    )
                    .then((res) => {
                        this.#messageTextField.innerHTML =
                            res.body.translations[0].text;
                        this.closeModal();
                        this.#viewOriginalBtn.classList.remove('hidden');
                    });
            });

        this.#viewOriginalBtn.addEventListener('click', () => {
            this.viewOriginalMessage();
        });
    }

    configMyMessage() {
        this.#editMessageInput = this.#messageElement.querySelector(
            '.edit_message_input',
        );

        this.#ContextMenu
            .querySelector('.delete-button')
            .addEventListener('click', () => {
                const chatAPI = new ChatAPI();
                chatAPI.deleteMessage(this.getConfig().message_id).then(() => {
                    this.closeModal();
                });
            });

        this.#ContextMenu
            .querySelector('.edit-button')
            .addEventListener('click', () => {
                if (!this.#editingMode) {
                    this.#editingMode = true;
                    this.#editMessageInput.style.display = 'inline-block';
                    this.#editMessageInput.value =
                        this.getConfig().message_text;
                    this.#messageElement.querySelector(
                        '.message_text',
                    ).style.display = 'none';
                    this.#ContextMenu.style.display = 'none';

                    const editButton = document.createElement('button');
                    editButton.textContent = '→';
                    editButton.addEventListener('click', () => {
                        const newMessageText = this.#editMessageInput.value;
                        const sanitizedNewMessageText =
                            sanitizer(newMessageText);
                        const chatAPI = new ChatAPI();
                        chatAPI
                            .editMessage(
                                this.getConfig().message_id,
                                sanitizedNewMessageText,
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
                                this.#editingMode = false;
                                const messageData =
                                    this.#messageElement.querySelector(
                                        '.message_data',
                                    );
                                const status = document.createElement('text');
                                status.className = 'time';
                                status.textContent = 'изменено';
                                messageData.appendChild(status);
                            });
                    });

                    this.#messageElement
                        .querySelector('.message_data')
                        .appendChild(editButton);
                }
            });
    }

    viewOriginalMessage() {
        this.#messageTextField.innerHTML = this.getConfig().message_text;
        this.#viewOriginalBtn.classList.add('hidden');
    }

    closeModal() {
        this.#ContextMenu.classList.add('hidden');
    }
    openModal() {
        this.#ContextMenu.classList.remove('hidden');
    }
}
