import { BasePage } from './BasePage.js';
/**
 * Рендерит страницу админки
 * @class Класс страницы админки
 */
export default class AdminPage extends BasePage {
    #parent;
    constructor(parent) {
        super(parent);
        this.#parent = parent;
        this.render();
    }

    render() {
        this.#parent.innerHTML = 'Admin Page';
    }
}
