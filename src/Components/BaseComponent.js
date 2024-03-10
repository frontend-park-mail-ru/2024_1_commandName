/**
 * Базовый класс для всех компонентов, использующих шаблонизатор
 * Рендерит шаблон
 * @class Класс базового компонента
 */
export class BaseComponent {
    templateName;
    #parent;
    #config;

    /*
     * Конструктор компонента
     * @param {HTMLElement} parent - родительский элемент
     * @param {Object} config - конфигурация компонента
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /*
     * Рендерит шаблон
     */
    render() {
        // eslint-disable-next-line no-undef
        const template = Handlebars.templates[this.templateName + '.hbs'];

        const container = template(this.#config);

        this.#parent.insertAdjacentHTML('beforeend', container);
    }

    /*
     * Возвращает родителя
     */
    getParent() {
        return this.#parent;
    }

    /*
     * Возвращает конфиг
     */
    getConfig() {
        return this.#config;
    }
}
