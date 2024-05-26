import { BaseComponent } from '../BaseComponent.js';

export default class Sticker extends BaseComponent {
    templateName = 'Sticker';

    render() {
        super.render();

        this.getParent()
            .querySelector(`#sticker_img_${this.getConfig().sticker_id}`)
            .addEventListener('click', () => {
                this.getConfig().handler(this.getConfig().sticker_id);
            });
    }
}
