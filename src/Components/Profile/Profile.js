import { BaseComponent } from '../BaseComponent.js';
import { goToPage } from '../../utils/goToPage.js';
import ChatPage from '../../Pages/ChatPage.js';
import ProfileEditPage from '../../Pages/ProfileEditPage.js';
import ChangePasswordPage from '../../Pages/ChangePasswordPage.js';
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
                goToPage(ChatPage, '/chat');
            });
        this.getParent()
            .querySelector('#editButton')
            .addEventListener('click', () => {
                goToPage(ProfileEditPage, '/profile/edit');
            });
        this.getParent()
            .querySelector('#changePasswordButton')
            .addEventListener('click', () => {
                goToPage(ChangePasswordPage, '/profile/password');
            });
    }
}
