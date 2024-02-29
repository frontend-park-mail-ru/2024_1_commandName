// Получаем имя текущего файла
var currentFile = window.location.pathname.split('/').pop();

// Создаем элемент body
var body = document.createElement('body');

// Определяем, какой контент нужно создать в зависимости от имени файла
if (currentFile === 'signin.html') {
    // Создаем элемент div с классом signin-container
    var signinContainer = document.createElement('div');
    signinContainer.className = 'signin-container';

    // Создаем элемент form с id signin-form
    var signinForm = document.createElement('form');
    signinForm.id = 'signin-form';

    // Создаем элементы input, button и p
    var emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.placeholder = 'Email';
    emailInput.required = true;

    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.required = true;

    var signinButton = document.createElement('button');
    signinButton.type = 'submit';
    signinButton.textContent = 'Sign In';

    var errorMessage = document.createElement('p');
    errorMessage.id = 'error-message';

    // Добавляем элементы input и button в форму
    signinForm.appendChild(emailInput);
    signinForm.appendChild(passwordInput);
    signinForm.appendChild(signinButton);
    signinForm.appendChild(errorMessage);

    // Добавляем форму в контейнер
    signinContainer.appendChild(signinForm);

    // Добавляем контейнер в body
    body.appendChild(signinContainer);
} else if (currentFile === 'signup.html') {
    // Создаем элемент div с классом signup-container
    var signupContainer = document.createElement('div');
    signupContainer.className = 'signup-container';

    // Создаем элемент form с id signup-form
    var signupForm = document.createElement('form');
    signupForm.id = 'signup-form';

    // Создаем элементы input, button и p
    var emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.placeholder = 'Email';
    emailInput.required = true;

    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.required = true;

    var confirmPasswordInput = document.createElement('input');
    confirmPasswordInput.type = 'password';
    confirmPasswordInput.id = 'confirm-password';
    confirmPasswordInput.placeholder = 'Confirm Password';
    confirmPasswordInput.required = true;

    var signupButton = document.createElement('button');
    signupButton.type = 'submit';
    signupButton.textContent = 'Sign Up';

    var errorMessage = document.createElement('p');
    errorMessage.id = 'error-message';

    // Добавляем элементы input и button в форму
    signupForm.appendChild(emailInput);
    signupForm.appendChild(passwordInput);
    signupForm.appendChild(confirmPasswordInput);
    signupForm.appendChild(signupButton);
    signupForm.appendChild(errorMessage);

    // Добавляем форму в контейнер
    signupContainer.appendChild(signupForm);

    // Добавляем контейнер в body
    body.appendChild(signupContainer);
}

// Добавляем body в DOM
document.body.appendChild(body);

document.getElementById('signin-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Валидация данных
    if (!validateEmail(email) || !validatePassword(password)) {
        document.getElementById('error-message').textContent = 'Invalid email or password';
    }

    // Тут отправка данных на сервер и обработка ответа

});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    // Валидация данных
    if (!validateEmail(email) || !validatePassword(password) || password !== confirmPassword) {
        document.getElementById('error-message').textContent = 'Invalid email, password, or passwords do not match';
        return;
    }

    // Тут отправка данных на сервер и обработка ответа
});

function validateEmail(email) {
    // Простая валидация email
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePassword(password) {
    // Простая валидация пароля
    return password.length >= 6;
}