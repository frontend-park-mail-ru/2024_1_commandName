import { BasePage } from './BasePage.js';
import Modal from '../Components/Modal/Modal.js';
import { CSATAPI } from '../API/API.js';

/**
 * Рендерит TODO
 * @class Класс TODO
 */
export default class ModalPage extends BasePage {
    #parent;
    #quetions = [];

    constructor(parent) {
        super(parent);
        this.#parent = parent;
        this.getData().then(() => this.render());
    }

    getData = async () => {
        const csatAPI = new CSATAPI();
        const csatResponse = await csatAPI.getQuestions();
        this.#quetions = csatResponse.body.questions;
    };

    render() {
        const modal = new Modal(this.#parent, {});
        modal.render();
        if (this.#quetions.length > 0) {
            const question = this.#quetions[0];
            modal.setQuetions({
                title: question.question_text,
                type: question.question_type,
            });
        }
    }
}
