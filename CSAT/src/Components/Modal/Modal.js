import { BaseComponent } from '../BaseComponent.js';
import Stars from '../Stars/Stars.js';

/**
 * Рендерит TODO
 * @class Класс TODO
 */
export default class Modal extends BaseComponent {
    templateName = 'Modal';

    render() {
        super.render();
        const exitButton = this.getParent().querySelector(`#csat__exit`);
        exitButton.addEventListener('click', () => {
            document.getElementById(`csat__modal`).style.display = 'none';
        });
    }

    setQuetions(quetion) {
        this.getParent().querySelector(`#csat__modal__title`).innerHTML =
            quetion.title;
        this.getParent().querySelector('#csat__input').innerHTML = '';

        // TODO:
        // if (quetion.type === 'stars') {
        //     ...
        // }

        console.log(this.getParent().querySelector('#csat__modal'));
        new Stars(this.getParent().querySelector('#csat__modal')).render();
    }
}
