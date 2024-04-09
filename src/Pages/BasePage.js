export class BasePage {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        throw new Error('Метод render не определен');
    }

    async getData() {}
}
