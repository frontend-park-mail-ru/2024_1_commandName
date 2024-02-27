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