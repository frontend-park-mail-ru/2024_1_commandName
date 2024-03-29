import { BaseComponent } from '../BaseComponent.js';
import { handleRouting } from '../../utils/router.js';
/**
 * Рендерит форму для логина или регистрации
 * @class Класс компонента формы
 */
export default class Profile extends BaseComponent {
    templateName = 'Profile';

    render() {
        super.render();

        this.getParent()
            .querySelector('#backButton')
            .addEventListener('click', () => {
                // TODO: Возврат назад
                window.history.pushState({}, '', '/chat');
                handleRouting();
            });
        this.getParent()
            .querySelector('#editButton')
            .addEventListener('click', () => {
                window.history.pushState({}, '', '/profile/edit');
                handleRouting();
            });
        this.getParent()
            .querySelector('#changePasswordButton')
            .addEventListener('click', () => {
                window.history.pushState({}, '', '/profile/password');
                handleRouting();
            });
    }
}
