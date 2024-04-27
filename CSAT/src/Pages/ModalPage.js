import { BasePage } from './BasePage.js';
import Modal from '../Components/Modal/Modal.js';

/**
 * Рендерит TODO
 * @class Класс TODO
 */
export default class ModalPage extends BasePage {
    #parent;
    #quetions;

    constructor(parent) {
        super(parent);
        this.#parent = parent;
        this.getData().then(() => this.render());
    }

    render() {
        const modal = new Modal(this.#parent, {});
        modal.render();
    }
}
