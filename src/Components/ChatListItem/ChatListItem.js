import { BaseComponent } from '../BaseComponent.js';

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
            .addEventListener('click', this.getConfig().deleteHandler);
    }
}
