/**
 * Рендерит страницу ошибки 404
 * @class Класс страницы 404 ошибки
 */
export default class Page404 {
    #parent;
    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = '404';
    }
}
