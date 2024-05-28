import { BaseComponent } from '../BaseComponent.js';

/**
 * Рендерит поиск
 * @class Класс компонента поиска
 */
export default class Search extends BaseComponent {
    templateName = 'Search';
    render() {
        super.render();
        this.getParent()
            .querySelector(`#input_search_${this.getConfig().type}`)
            .addEventListener('input', this.getConfig().inputSearch);

        this.getParent()
            .querySelector(`#input_search_${this.getConfig().type}`)
            .addEventListener('keydown', (event) => {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    this.getConfig().sendSearch(this.getConfig().type);
                }
            });
    }

    getSocket() {
        return this.ws_sendSearch;
    }
}
