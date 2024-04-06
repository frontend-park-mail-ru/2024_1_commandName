/**
 * Функция для валидации email.
 * @param {string} email - email
 * @returns {{success: boolean, message: string}} - Объект с результатом валидации.
 * @property {boolean} success - Успешно ли прошла валидация.
 * @property {string} message - Сообщение о результате валидации.
 */
export function validateEmail(email) {
    if (email.length === 0) {
        return { success: false, message: 'Заполните поле Email' };
    }
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email)) {
        return { success: true, message: 'Email валидный' };
    } else {
        return { success: false, message: 'Email невалидный' };
    }
}

/**
 * Функция для валидации пароля.
 * @returns {{success: boolean, message: string}} - Объект с результатом валидации.
 * @property {boolean} success - Успешно ли прошла валидация.
 * @property {string} message - Сообщение о результате валидации.
 * @param password - Проверяемый пароль
 */
export function validatePassword(password) {
    if (password.length === 0) {
        return { success: false, message: 'Заполните поле Пароль' };
    }

    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharsRegex = /[~!@#$%^&*_+()[\]{}></\\|"'.,:;-]/;

    const passwordRegex = /^[a-zA-Z0-9~!@#$%^&*_+()[\]{}></\\|"'.,:;-]+$/;

    const result = { success: false, message: '' };

    // Проверка длины пароля
    if (password.length < minLength) {
        result.message = `Пароль должен содержать не менее ${minLength} символов`;
        return result;
    }

    // Проверка наличия заглавной и строчной буквы, цифры и специального символа
    if (
        !passwordRegex.test(password) ||
        !lowercaseRegex.test(password) ||
        !uppercaseRegex.test(password) ||
        !specialCharsRegex.test(password) ||
        !digitRegex.test(password)
    ) {
        result.message =
            'Пароль должен содержать состоять из латинских символов и содержать: одну заглавную, одну строчную букву,' +
            'одну цифру и один специальный символ';
        return result;
    }

    result.success = true;
    return result;
}

/**
 * Функция для валидации никнейма.
 * @param {string} username - Никнейм для валидации.
 * @returns {{success: boolean, message: string}} - Объект с результатом валидации.
 * @property {boolean} success - Успешно ли прошла валидация.
 * @property {string} message - Сообщение о результате валидации.
 */
export function validateUsername(username) {
    if (username.length === 0) {
        return { success: false, message: 'Заполните поле Имя пользователя' };
    }
    const minLength = 4;
    const allowedCharsRegex = /^[a-zA-Z0-9_]+$/;

    const result = { success: false, message: '' };

    // Проверка длины никнейма
    if (username.length < minLength) {
        result.message = `Имя пользователя должно содержать не менее ${minLength} символов`;
        return result;
    }

    // Проверка допустимых символов
    if (!allowedCharsRegex.test(username)) {
        result.message =
            'Имя пользователя может содержать только латинские буквы ' +
            'в верхнем или нижнем регистре, цифры и символ подчеркивания';
        return result;
    }

    return { success: true, message: 'Имя пользователя валидно' };
}

// Tests:
// console.log(validatePassword('Demouser123!').success == true);
// console.log(validatePassword('Demouser123').success == false);
// console.log(validatePassword('Demouser!').success == false);
// console.log(validatePassword('emouser123!').success == false);
// console.log(validatePassword('TESTSTES123!').success == false);
// console.log(validatePassword('Demouser123!ыфв').success == false);
