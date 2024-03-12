import { BaseComponent } from '../BaseComponent.js';

export default class Chat extends BaseComponent {
    templateName = 'Chat';

    render() {
        super.render();

        this.getParent()
            .querySelector('#input_message')
            .addEventListener('input', this.getConfig().inputMessaegHandler);
    }

    setInputMessageValue(value) {
        this.getParent().querySelector('#input_message').value = value;
    }
}
