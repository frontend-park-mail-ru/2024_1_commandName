/**
 *
 */
export default class RegisterPage {
    #parent;
    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = 'Register';
    }
}
