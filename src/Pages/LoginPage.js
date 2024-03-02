import { validatePassword, validateUsername } from '../utils/valid.js';
import SuccessPage from '../Pages/SuccessPage.js';
import { goToPage } from '../utils/goToPage.js';
/**
 *
 */
export default class LoginPage {
    #parent;
    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        // Создаем элемент div с классом signin-container
        const signinContainer = document.createElement('div');
        signinContainer.className = 'signin-container';

        // Создаем элемент form с id signin-form
        const signinForm = document.createElement('form');
        signinForm.id = 'signin-form';

        // Создаем элементы input, button и p
        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.id = 'username';
        usernameInput.placeholder = 'Username';
        usernameInput.required = true;

        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.id = 'password';
        passwordInput.placeholder = 'Password';
        passwordInput.required = true;

        const signinButton = document.createElement('button');
        signinButton.type = 'submit';
        signinButton.textContent = 'Sign In';

        const errorMessage = document.createElement('p');
        errorMessage.id = 'error-message';

        // Добавляем элементы input и button в форму
        signinForm.appendChild(usernameInput);
        signinForm.appendChild(passwordInput);
        signinForm.appendChild(signinButton);
        signinForm.appendChild(errorMessage);

        // Добавляем форму в контейнер
        signinContainer.appendChild(signinForm);

        // Добавляем контейнер в body
        this.#parent.innerHTML = '';
        this.#parent.appendChild(signinContainer);

        signinForm.addEventListener('submit', function (event) {
            console.log('test');
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const error = document.getElementById('error-message');
            error.textContent = '';

            // Валидация данных
            let valid = validateUsername(username);
            if (!valid.success) {
                error.textContent = valid.message;
                return;
            }
            valid = validatePassword(password);
            if (!valid.success) {
                error.textContent = valid.message;
                return;
            }

            // Отправка данных на сервер
            fetch('http://localhost:8080/login', {
                mode: 'cors', // TODO
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.status === 200) {
                        // Обработка успешной авторизации
                        console.log('Successfully logged in');
                        goToPage(SuccessPage);
                    } else {
                        // Обработка ошибки авторизации
                        console.error('Error:', data.body.error);
                    }
                })
                .catch((error) => {
                    console.error(
                        'There was a problem with the fetch operation:',
                        error,
                    );
                });
        });
    }
}
