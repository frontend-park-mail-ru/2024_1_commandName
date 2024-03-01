// import { validateEmail, validatePassword } from '../src/utils/valid.js';

import LoginPage from './Pages/LoginPage.js';

const root = document.getElementById('root');

const login = new LoginPage(root);
login.render();

// Получаем имя текущего файла
// const currentFile = window.location.pathname.split('/').pop();

// // Создаем элемент body

// // Определяем, какой контент нужно создать в зависимости от имени файла
// if (currentFile === 'signin.html') {
//     // Создаем элемент div с классом signin-container
//     const signinContainer = document.createElement('div');
//     signinContainer.className = 'signin-container';

//     // Создаем элемент form с id signin-form
//     const signinForm = document.createElement('form');
//     signinForm.id = 'signin-form';

//     // Создаем элементы input, button и p
//     const emailInput = document.createElement('input');
//     emailInput.type = 'email';
//     emailInput.id = 'email';
//     emailInput.placeholder = 'Email';
//     emailInput.required = true;

//     const passwordInput = document.createElement('input');
//     passwordInput.type = 'password';
//     passwordInput.id = 'password';
//     passwordInput.placeholder = 'Password';
//     passwordInput.required = true;

//     const signinButton = document.createElement('button');
//     signinButton.type = 'submit';
//     signinButton.textContent = 'Sign In';

//     const errorMessage = document.createElement('p');
//     errorMessage.id = 'error-message';

//     // Добавляем элементы input и button в форму
//     signinForm.appendChild(emailInput);
//     signinForm.appendChild(passwordInput);
//     signinForm.appendChild(signinButton);
//     signinForm.appendChild(errorMessage);

//     // Добавляем форму в контейнер
//     signinContainer.appendChild(signinForm);

//     // Добавляем контейнер в body
//     body.appendChild(signinContainer);
// } else if (currentFile === 'signup.html') {
//     // Создаем элемент div с классом signup-container
//     const signupContainer = document.createElement('div');
//     signupContainer.className = 'signup-container';

//     // Создаем элемент form с id signup-form
//     const signupForm = document.createElement('form');
//     signupForm.id = 'signup-form';

//     // Создаем элементы input, button и p
//     const emailInput = document.createElement('input');
//     emailInput.type = 'email';
//     emailInput.id = 'email';
//     emailInput.placeholder = 'Email';
//     emailInput.required = true;

//     const passwordInput = document.createElement('input');
//     passwordInput.type = 'password';
//     passwordInput.id = 'password';
//     passwordInput.placeholder = 'Password';
//     passwordInput.required = true;

//     const confirmPasswordInput = document.createElement('input');
//     confirmPasswordInput.type = 'password';
//     confirmPasswordInput.id = 'confirm-password';
//     confirmPasswordInput.placeholder = 'Confirm Password';
//     confirmPasswordInput.required = true;

//     const signupButton = document.createElement('button');
//     signupButton.type = 'submit';
//     signupButton.textContent = 'Sign Up';

//     const errorMessage = document.createElement('p');
//     errorMessage.id = 'error-message';

//     // Добавляем элементы input и button в форму
//     signupForm.appendChild(emailInput);
//     signupForm.appendChild(passwordInput);
//     signupForm.appendChild(confirmPasswordInput);
//     signupForm.appendChild(signupButton);
//     signupForm.appendChild(errorMessage);

//     // Добавляем форму в контейнер
//     signupContainer.appendChild(signupForm);

//     // Добавляем контейнер в body
//     body.appendChild(signupContainer);
// }

// // Добавляем body в DOM
// document.body.appendChild(body);

// document
//     .getElementById('signin-form')
//     .addEventListener('submit', function (event) {
//         event.preventDefault();
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;

//         // Валидация данных
//         let valid = validateEmail(email);
//         if (!valid.success) {
//             document.getElementById('error-message').textContent =
//                 valid.message;
//             return;
//         }
//         valid = validatePassword(password);
//         if (!valid.success) {
//             document.getElementById('error-message').textContent =
//                 valid.message;
//             return;
//         }

//         // Отправка данных на сервер
//         fetch('/signin', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username: email,
//                 password: password,
//             }),
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 if (data.status === 200) {
//                     // Обработка успешной авторизации
//                     console.log('Successfully logged in');
//                 } else {
//                     // Обработка ошибки авторизации
//                     console.error('Error:', data.body.error);
//                 }
//             })
//             .catch((error) => {
//                 console.error(
//                     'There was a problem with the fetch operation:',
//                     error,
//                 );
//             });
//     });

// document
//     .getElementById('signup-form')
//     .addEventListener('submit', function (event) {
//         event.preventDefault();
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         const confirmPassword =
//             document.getElementById('confirm-password').value;

//         // Валидация данных
//         if (password != confirmPassword) {
//             document.getElementById('error-message').textContent =
//                 'Пароли не совпадают';
//             return;
//         }
//         let valid = validateEmail(email);
//         if (!valid.success) {
//             document.getElementById('error-message').textContent =
//                 valid.message;
//             return;
//         }
//         valid = validatePassword(password);
//         if (!valid.success) {
//             document.getElementById('error-message').textContent =
//                 valid.message;
//             return;
//         }

//         // Отправка данных на сервер
//         fetch('/signup', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username: email,
//                 password: password,
//                 email: email,
//             }),
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 if (data.status === 200) {
//                     // Обработка успешной регистрации
//                     console.log('Successfully registered');
//                 } else {
//                     // Обработка ошибки регистрации
//                     console.error('Error:', data.body.error);
//                 }
//             })
//             .catch((error) => {
//                 console.error(
//                     'There was a problem with the fetch operation:',
//                     error,
//                 );
//             });
//     });
