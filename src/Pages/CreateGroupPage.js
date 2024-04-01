import Form from '../Components/Form/Form.js';

/**
 * Рендерит страницу создания группы
 * @class Класс страницы создания группы
 */
export default class CreateGroupPage {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    formCallback(event) {
        event.preventDefault();
        // ...
    }

    render() {
        const form = new Form(this.#parent, {
            header: 'Создать группу',
            onSubmit: this.formCallback,
            inputs: [
                {
                    id: 'groupname',
                    type: 'text',
                    placeholder: 'Название',
                    required: true,
                },
                {
                    id: 'users',
                    list_name: 'users',
                    type: 'checkbox_list',
                    placeholder: 'Участники',
                    items: [
                        {
                            id: 1,
                            name: 'Ivan',
                            surname: 'Naumov',
                            username: 'ivan_naum',
                        },
                        {
                            id: 2,
                            name: 'test',
                            surname: 'testsur',
                            username: 'testusername',
                        },
                    ],
                },
            ],
            submitButtonText: 'Создать',
        });
        form.render();
    }
}
