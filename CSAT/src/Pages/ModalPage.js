import { BasePage } from './BasePage.js';
import Modal from '../Components/Modal/Modal.js';
// import { CsatAPI } from '../API/API.js';

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

    getData = async () => {
        // const csatAPI = new CsatAPI();
        //
        // const csatResponse = await csatAPI.getQuestions();
        //
    };

    render() {
        const modal = new Modal(this.#parent, {});
        modal.render();
    }
}
