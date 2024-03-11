import { BaseComponent } from '../BaseComponent.js';

/**
 * Рендерит форму для логина или регистрации
 * @class Класс компонента формы
 */
export default class Form extends BaseComponent {
    templateName = 'Form';
    render() {
        super.render();
        this.getForm().addEventListener('submit', this.getConfig().onSubmit);
        this.getForm()
            .querySelector('#additionButton')
            .addEventListener('click', this.getConfig().onAdditionButtonClick);
    }

    /*
     * Возвращает форму
     */
    getForm() {
        return this.getParent().querySelector('#form');
    }
}
