// import { validateEmail, validatePassword } from '../src/utils/valid.js';

import LoginPage from './Pages/LoginPage.js';
import RegisterPage from './Pages/RegisterPage.js';

const root = document.getElementById('root');

const login = new LoginPage(root);
const register = new RegisterPage(root);

register.render();
login.render();

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
