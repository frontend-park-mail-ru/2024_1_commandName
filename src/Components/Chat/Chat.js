import { BaseComponent } from '../BaseComponent.js';

export default class Chat extends BaseComponent {
    templateName = 'Chat';

    render() {
        super.render();

        this.getParent()
            .querySelector('#input_message')
            .addEventListener('input', this.getConfig().inputMessageHandler);

        this.getParent()
            .querySelector('#input_message')
            .addEventListener('keydown', (event) => {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    this.getConfig().sendMessageHandler();
                }
            });

        this.getParent()
            .querySelector('.input_send')
            .addEventListener('click', this.getConfig().sendMessageHandler);
    }

    setInputMessageValue(value) {
        this.getParent().querySelector('#input_message').value = value;
    }
}
