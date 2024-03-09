// import Handlebars from 'handlebars';

export default class Form {
    #parent;
    #config;
    #container;

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }
    render() {
        // eslint-disable-next-line no-undef
        const template = Handlebars.templates['Form.hbs'];

        this.#container = document.createElement('div');
        this.#container.className = 'form-container';

        this.#container.innerHTML = template(this.#config);

        this.#parent.appendChild(this.#container);

        return this.#container.querySelector('#form');
    }
}
