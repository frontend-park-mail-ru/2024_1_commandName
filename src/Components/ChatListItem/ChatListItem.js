import { BaseComponent } from '../BaseComponent.js';
import { ChatAPI } from '../../utils/API/ChatAPI.js';
import { goToPage } from '../../utils/router.js';

/**
 * Рендерит компонент чата для боковой панели
 * @class Класс компонента чата
 */
export default class ChatListItem extends BaseComponent {
    templateName = 'ChatListItem';

    render() {
        super.render();

        const id = this.getConfig().id;
        const modal = this.getParent().querySelector(`#modal_${id}`);
        this.getParent()
            .querySelector(`#three_dots_${id}`)
            .addEventListener('click', () => {
                if (modal.classList.contains('hidden')) {
                    modal.classList.remove('hidden');
                } else {
                    modal.classList.add('hidden');
                }
            });
        this.getParent()
            .querySelector(`#chat_name_${id}`)
            .addEventListener('click', this.getConfig().handler);
        this.getParent()
            .querySelector(`#delete-button_${id}`)
            .addEventListener('click', () => {
                const chatAPI = new ChatAPI();
                chatAPI
                    .deleteChatById(id)
                    .then((data) => {
                        if (data.status === 200) {
                            // Обработка успешной авторизации
                            goToPage('/chat', true);
                        } else {
                            throw new Error('Пришел не 200 статус');
                        }
                    })
                    .catch((error) => {
                        alert('Что-то пошло не так');
                        console.error('delete chat failed:', error);
                    });
            });
    }
}
