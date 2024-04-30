import { BaseComponent } from '../BaseComponent.js';

export default class Message extends BaseComponent {
    templateName = 'Message';
    #messageElement;
    #ContextMenu;

    render() {
        super.render();

        this.#messageElement = this.getParent().querySelector(
            `#message_id_${this.getConfig().message_id}`,
        );

        if (!this.#messageElement.classList.contains('my_message')) {
            return;
        }

        this.#ContextMenu = this.#messageElement.querySelector(`#ContextMenu`);

        this.#messageElement.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            this.#ContextMenu.style.display = 'block';
        });
        this.#ContextMenu
            .querySelector('.delete-button')
            .addEventListener('click', () => {
                this.#messageElement.style.display = 'none';
                // TODO: отправка запроса на удаление
            });

        document.addEventListener('click', () => {
            this.#ContextMenu.style.display = 'none';
        });
    }
}
