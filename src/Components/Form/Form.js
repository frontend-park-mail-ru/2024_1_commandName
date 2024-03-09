import { BaseComponent } from '../BaseComponent.js';

export default class Form extends BaseComponent {
    templateName = 'Form';
    render() {
        super.render();
        this.getForm().addEventListener('submit', this.getConfig().onSubmit);
        this.getForm()
            .querySelector('#additionButton')
            .addEventListener('click', this.getConfig().onAdditionButtonClick);
    }
    getForm() {
        return this.getParent().querySelector('#form');
    }
}
