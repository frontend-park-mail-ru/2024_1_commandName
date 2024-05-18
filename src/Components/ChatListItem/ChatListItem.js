import { BaseComponent } from '../BaseComponent.js';
import { ChatAPI } from '../../utils/API/ChatAPI.js';
import { changeUrl } from '../../utils/navigation';

/**
 * Рендерит компонент чата для боковой панели
 * @class Класс компонента чата
 */
export default class ChatListItem extends BaseComponent {
    templateName = 'ChatListItem';
    type;

    render() {
        this.type = window.location.pathname;
        this.getConfig().editEnable = false;
        if (
            (this.getConfig().type === '2' || this.getConfig().type === '3') &&
            this.getConfig().creator === this.getConfig().userId
        ) {
            this.getConfig().editEnable = true;
        }
        super.render();
        const chatAPI = new ChatAPI();
        const id = this.getConfig().id;
        const modal = this.getParent().querySelector(`#modal_${id}`);
        this.getParent()
            .querySelector(`#three_dots_${id}`)
            .addEventListener('click', (event) => {
                event.preventDefault();
                if (modal.classList.contains('hidden')) {
                    modal.classList.remove('hidden');
                } else {
                    modal.classList.add('hidden');
                }
            });
        this.getParent()
            .querySelector(`#chat_list_item_${id}`)
            .addEventListener('click', this.getConfig().handler);
        this.getParent()
            .querySelector(`#delete-button_${id}`)
            .addEventListener('click', () => {
                chatAPI
                    .deleteChatById(id)
                    .then((data) => {
                        if (data.status === 200) {
                            // Обработка успешной авторизации
                            changeUrl(this.type);
                        } else {
                            throw new Error('Пришел не 200 статус');
                        }
                    })
                    .catch((error) => {
                        alert('Что-то пошло не так');
                        console.error('delete chat failed:', error);
                    });
            });
        if (this.getConfig().editEnable) {
            this.getParent()
                .querySelector(`#edit-button_${id}`)
                .addEventListener('click', () => {
                    chatAPI
                        .chatById(id)
                        .then((data) => {
                            if (data.status === 200) {
                                changeUrl('/edit_chat?id=' + data.body.chat.id);
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
}
