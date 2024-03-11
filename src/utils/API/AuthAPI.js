import { makeBaseRequest } from './common.js';
import { baseUrl } from './config.js';

/**
 * Предоставляет методы для взаимодействия с API авторизацией
 * @class AuthAPI
 */
export class AuthAPI {
    /**
     * Выполняет запрос на сервер для для проверки авторизованности пользователя.
     * @returns {{status: Number, body: Object}} - Json ответа.
     * @throws Если произошла ошибка при выполнении запроса.
     */
    async checkAuth() {
        try {
            return makeBaseRequest(`${baseUrl}/checkAuth`, 'GET');
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }

    /**
     * Выполняет запрос на сервер для аутентификации пользователя.
     * @param username - Имя пользователя для аутентификации.
     * @param password - Пароль пользователя для аутентификации.
     * @returns {{status: Number, body: Object}} - Json ответа.
     * @throws Если произошла ошибка при выполнении запроса.
     */
    async login(username, password) {
        try {
            return makeBaseRequest(`${baseUrl}/login`, 'POST', {
                username: username,
                password: password,
            });
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }

    /**
     * Выполняет запрос на сервер для разлогин пользователя.
     * @returns {{status: Number, body: Object}} - Json ответа.
     * @throws Если произошла ошибка при выполнении запроса.
     */
    async logout() {
        try {
            return makeBaseRequest(`${baseUrl}/logout`, 'GET');
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }

    /**
     * Выполняет запрос на сервер для регистрации пользователя.
     * @param username - Имя пользователя для регистрации.
     * @param password - Пароль пользователя для регистрации.
     * @returns {{status: Number, body: Object}} - Json ответа.
     * @throws Если произошла ошибка при выполнении запроса.
     */
    async register(username, password) {
        try {
            return makeBaseRequest(`${baseUrl}/register`, 'POST', {
                username: username,
                password: password,
            });
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }
}
