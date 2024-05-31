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

        // Обработчик для троеточия
        this.getParent()
            .querySelector(`#three_dots_${id}`)
            .addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation(); // Останавливаем всплытие события

                this.getParent() // Close all modals
                    .querySelectorAll('.modal')
                    .forEach((element) => {
                        if (!element.classList.contains('hidden')) {
                            element.classList.add('hidden');
                        }
                    });

                if (modal.classList.contains('hidden')) {
                    modal.classList.remove('hidden');
                } else {
                    modal.classList.add('hidden');
                }
            });

        document.addEventListener('click', (event) => {
            if (
                !event.target.closest('.modal') &&
                !modal.classList.contains('hidden')
            ) {
                modal.classList.add('hidden');
            }
        });

        // Обработчик для клика на элемент чата
        this.getParent()
            .querySelector(`#chat_list_item_${id}`)
            .addEventListener('click', (event) => {
                event.preventDefault();
                this.getConfig().handler(event);
                this.switchToMobileChat();
            });

        // Обработчик для кнопки удаления
        this.getParent()
            .querySelector(`#delete-button_${id}`)
            .addEventListener('click', () => {
                chatAPI
                    .deleteChatById(id)
                    .then((data) => {
                        if (data.status === 200) {
                            // Обработка успешного удаления
                            changeUrl(this.type, true);
                        } else {
                            throw new Error('Пришел не 200 статус');
                        }
                    })
                    .catch((error) => {
                        alert('Что-то пошло не так');
                        console.error('delete chat failed:', error);
                    });
            });

        // Обработчик для кнопки редактирования
        if (this.getConfig().editEnable) {
            this.getParent()
                .querySelector(`#edit-button_${id}`)
                .addEventListener('click', () => {
                    chatAPI
                        .chatById(id)
                        .then((data) => {
                            if (data.status === 200) {
                                changeUrl(
                                    '/edit_chat?id=' + data.body.chat.id,
                                    true,
                                );
                            } else {
                                throw new Error('Пришел не 200 статус');
                            }
                        })
                        .catch((error) => {
                            alert('Что-то пошло не так');
                            console.error('edit chat failed:', error);
                        });
                });
        }
    }

    switchToMobileChat() {
        if (
            window.innerWidth <= 768 ||
            /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
                navigator.userAgent,
            )
        ) {
            document.body.classList.remove('mobile-chat-list');
            document.body.classList.add('mobile-chat');
        }
    }
}
