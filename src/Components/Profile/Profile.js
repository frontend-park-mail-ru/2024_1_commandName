import { BaseComponent } from '../BaseComponent.js';
import { goToPage } from '../../utils/goToPage.js';
import ChatPage from '../../Pages/ChatPage.js';
import ProfileEditPage from '../../Pages/ProfileEditPage.js';
import ChangePasswordPage from '../../Pages/ChangePasswordPage.js';
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
                goToPage(ChatPage);
            });
        this.getParent()
            .querySelector('#editButton')
            .addEventListener('click', () => {
                goToPage(ProfileEditPage);
            });
        this.getParent()
            .querySelector('#changePasswordButton')
            .addEventListener('click', () => {
                goToPage(ChangePasswordPage);
            });
    }
}
