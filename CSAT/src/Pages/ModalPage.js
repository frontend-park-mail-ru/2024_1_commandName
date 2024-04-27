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
    #currentQuetion;

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

    setAnswerCSATHandler = async (answer) => {
        const csatAPI = new CSATAPI();
        await csatAPI.setAnswer(this.#currentQuetion.question_id, answer);

        // TODO: next quetions
    };

    render() {
        const modal = new Modal(this.#parent, {
            setAnswerCSATHandler: this.setAnswerCSATHandler,
        });
        modal.render();
        if (this.#quetions.length > 0) {
            this.#currentQuetion = this.#quetions[0];
            modal.setQuetions({
                title: this.#currentQuetion.question_text,
                type: this.#currentQuetion.question_type,
            });
        }
    }
}
