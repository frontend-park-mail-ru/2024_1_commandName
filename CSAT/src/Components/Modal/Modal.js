import { BaseComponent } from '../BaseComponent.js';

/**
 * Рендерит TODO
 * @class Класс TODO
 */
export default class Modal extends BaseComponent {
    templateName = 'Modal';

    render() {
        super.render();
        this.getParent()
            .querySelector('#csat__exit')
            .addEventListener('click', function () {
                document.getElementById('csat__modal').style.display = 'none';
            });
    }

    setQuetions(quetion) {
        this.getParent().querySelector('#csat__modal__title').innerHTML =
            quetion.title;
    }
}
