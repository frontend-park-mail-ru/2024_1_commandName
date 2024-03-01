/**
 *
 */
export default class LoginPage {
    #parent;
    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = 'Login';
    }
}
