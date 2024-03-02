/**
 * Рендерит страницу успешной авторизации
 * @class Класс страницы успешной авторизации
 */
export default class SuccessPage {
    #parent;
    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = 'Success Auth';
    }
}
