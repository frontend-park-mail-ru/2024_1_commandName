import { BaseComponent } from '../BaseComponent.js';
import { changeUrl } from '../../utils/navigation.js';
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
                changeUrl('/chat');
            });
        this.getParent()
            .querySelector('#editButton')
            .addEventListener('click', () => {
                changeUrl('/edit');
            });
        this.getParent()
            .querySelector('#changePasswordButton')
            .addEventListener('click', () => {
                changeUrl('/password');
            });
    }
}
