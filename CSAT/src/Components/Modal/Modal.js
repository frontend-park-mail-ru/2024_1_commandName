import { BaseComponent } from '../BaseComponent.js';
/**
 * Рендерит TODO
 * @class Класс TODO
 */
export default class Modal extends BaseComponent {
    templateName = 'Modal';

    setQuetions(quetion) {
        this.getParent().querySelector('#csat__modal__title').innerHTML =
            quetion.title;
    }
}
