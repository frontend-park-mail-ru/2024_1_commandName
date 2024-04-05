import { BaseComponent } from '../BaseComponent.js';
import { goToPage } from '../../utils/router.js';
/**
 * Рендерит профиль
 * @class Класс компонента профиля
 */
export default class Profile extends BaseComponent {
    templateName = 'Profile';

    render() {
        super.render();

        this.getParent()
            .querySelector('#backButton')
            .addEventListener('click', () => {
                // TODO: Возврат назад
                goToPage('/chat');
            });
        this.getParent()
            .querySelector('#editButton')
            .addEventListener('click', () => {
                goToPage('/edit');
            });
        this.getParent()
            .querySelector('#changePasswordButton')
            .addEventListener('click', () => {
                goToPage('/password');
            });
    }
}
