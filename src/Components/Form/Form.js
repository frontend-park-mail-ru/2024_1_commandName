import { BaseComponent } from '../BaseComponent.js';

export default class Form extends BaseComponent {
    templateName = 'Form';
    getForm() {
        return this.getParent().querySelector('#form');
    }
}
