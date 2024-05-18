import { BaseComponent } from '../BaseComponent.js';
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
                window.history.push('/chat');
                window.dispatchEvent(new Event('popstate'));
            });
        this.getParent()
            .querySelector('#editButton')
            .addEventListener('click', () => {
                window.history.push('/edit');
                window.dispatchEvent(new Event('popstate'));
            });
        this.getParent()
            .querySelector('#changePasswordButton')
            .addEventListener('click', () => {
                window.history.push('/password');
                window.dispatchEvent(new Event('popstate'));
            });
    }
}
