import { goToPage } from '../../utils/router.js';
import { BaseComponent } from '../BaseComponent.js';
import AdminItem from '../AdminItem/AdminItem.js';

export default class Admin extends BaseComponent {
    templateName = 'Admin';

    render() {
        super.render();

        this.getParent()
            .querySelector('#backButton')
            .addEventListener('click', () => {
                // TODO: Возврат назад
                goToPage('/chat', true);
            });
    }

    addStatistic(statisticConfig) {
        const statisticsList =
            this.getParent().querySelector('#statistics_list');
        const contact = new AdminItem(statisticsList, statisticConfig);
        contact.render();
    }
}
