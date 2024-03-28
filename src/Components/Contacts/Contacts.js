import { BaseComponent } from '../BaseComponent.js';
import { goToPage } from '../../utils/goToPage.js';
import ChatPage from '../../Pages/ChatPage.js';
/**
 * Рендерит форму для логина или регистрации
 * @class Класс компонента формы
 */
export default class Contacts extends BaseComponent {
    templateName = 'Contacts';

    render() {
        super.render();

        this.getParent()
            .querySelector('#backButton')
            .addEventListener('click', () => {
                // TODO: Возврат назад
                goToPage(ChatPage);
            });
    }
}
