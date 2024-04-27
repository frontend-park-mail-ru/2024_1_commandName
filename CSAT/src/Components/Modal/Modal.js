import { BaseComponent } from '../BaseComponent.js';
import Stars from '../Stars/Stars.js';
import Numbers from '../Numbers/Numbers.js';

/**
 * Рендерит TODO
 * @class Класс TODO
 */
export default class Modal extends BaseComponent {
    templateName = 'Modal';

    render() {
        super.render();
        this.getParent()
            .querySelector(`#csat__exit`)
            .addEventListener('click', this.getConfig().exitHandler);
    }

    setQuetions(quetion) {
        this.getParent().querySelector(`#csat__modal__title`).innerHTML =
            quetion.title;
        this.getParent().querySelector('#csat__input').innerHTML = '';

        if (quetion.type === 'CSAT') {
            new Stars(this.getParent().querySelector('#csat__input'), {
                clickHandler: this.getConfig().setAnswerHandler,
            }).render();
        } else if (quetion.type === 'NPS') {
            new Numbers(this.getParent().querySelector('#csat__input'), {
                clickHandler: this.getConfig().setAnswerHandler,
            }).render();
        }
    }
}
