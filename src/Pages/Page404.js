import { BasePage } from './BasePage.js';
/**
 * Рендерит страницу ошибки 404
 * @class Класс страницы 404 ошибки
 */
export default class Page404 extends BasePage {
    #parent;
    constructor(parent) {
        super(parent);
        this.#parent = parent;
        this.render();
    }

    render() {
        this.#parent.innerHTML = '404';
    }
}
