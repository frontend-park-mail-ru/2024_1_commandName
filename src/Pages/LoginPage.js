import { validateEmail, validatePassword } from '../utils/valid.js';

/**
 *
 */
export default class LoginPage {
    #parent;
    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = 'Login';

        // Создаем элемент div с классом signin-container
        const signinContainer = document.createElement('div');
        signinContainer.className = 'signin-container';

        // Создаем элемент form с id signin-form
        const signinForm = document.createElement('form');
        signinForm.id = 'signin-form';

        // Создаем элементы input, button и p
        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.id = 'email';
        emailInput.placeholder = 'Email';
        emailInput.required = true;

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
        signinForm.appendChild(emailInput);
        signinForm.appendChild(passwordInput);
        signinForm.appendChild(signinButton);
        signinForm.appendChild(errorMessage);

        // Добавляем форму в контейнер
        signinContainer.appendChild(signinForm);

        // Добавляем контейнер в body
        this.#parent.innerHTML = '';
        this.#parent.appendChild(signinContainer);

        signinForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Валидация данных
            let valid = validateEmail(email);
            if (!valid.success) {
                document.getElementById('error-message').textContent =
                    valid.message;
                return;
            }
            valid = validatePassword(password);
            if (!valid.success) {
                document.getElementById('error-message').textContent =
                    valid.message;
                return;
            }

            // Отправка данных на сервер
            fetch('/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
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
