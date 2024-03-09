export class BaseComponent {
    templateName;
    #parent;
    #config;

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }
    render() {
        // eslint-disable-next-line no-undef
        const template = Handlebars.templates[this.templateName + '.hbs'];

        const container = template(this.#config);

        this.#parent.innerHTML += container;
    }
    getParent() {
        return this.#parent;
    }
}
