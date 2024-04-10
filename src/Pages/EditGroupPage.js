import Form from '../Components/Form/Form.js';
import { ChatAPI } from '../utils/API/ChatAPI.js';
import { goToPage } from '../utils/router.js';
import { BasePage } from './BasePage.js';

/**
 * Рендерит страницу изменения пароля
 * @class Класс страницы изменения пароля
 */
export default class EditGroupPage extends BasePage {
    #parent;
    #currentChatId;

    constructor(parent, urlParams) {
        super(parent);
        this.#parent = parent;
        this.#currentChatId = parseInt(urlParams.get('id'));
        if (!this.#currentChatId) {
            goToPage('/chat', true);
            return;
        }
        const chatAPI = new ChatAPI();
        chatAPI.chatById(this.#currentChatId).then((response) => {
            console.log(response);
            if (response.status !== 200 || response.body.chat.type !== '2') {
                goToPage('/chat', true);
                return;
            }
            this.render();
        });
    }

    formCallback(event) {
        event.preventDefault();
        const groupName = event.target.querySelector('#groupName').value;
        const groupDescription =
            event.target.querySelector('#groupDescription').value;
        const error = event.target.querySelector('#error-message');
        error.textContent = '';

        // Отправка данных на сервер для редактирования группы
        const urlParams = new URLSearchParams(window.location.search);
        const chatId = parseInt(urlParams.get('id'));
        const chatAPI = new ChatAPI();
        chatAPI
            .editGroup(chatId, groupName, groupDescription)
            .then((data) => {
                if (data.status === 200) {
                    goToPage('/chat?id=' + chatId, true);
                } else {
                    error.textContent = data.body.error;
                }
            })
            .catch((error) => {
                alert('Что-то пошло не так');
                console.error('Ошибка при редактировании группы:', error);
            });
    }

    render() {
        const form = new Form(this.#parent, {
            header: 'Изменение группы',
            onSubmit: this.formCallback,
            onAdditionButtonClick: () => {
                goToPage('/chat', true);
            },
            inputs: [
                {
                    id: 'groupName',
                    type: 'text',
                    placeholder: 'Название группы',
                    autocomplete: 'current-name',
                    required: true,
                },
                {
                    id: 'groupDescription',
                    type: 'text',
                    placeholder: 'Описание группы',
                    autocomplete: 'current-description',
                    required: true,
                },
            ],
            submitButtonText: 'Изменить',
            additionButtonText: 'Назад',
        });
        form.render();
    }
}
