import { makeBaseRequest } from './common.js';
/**
 * Рендерит страницу ошибки 404
 * @class Класс страницы 404 ошибки
 */
export class AuthAPI {
    async checkAuth() {
        try {
            return makeBaseRequest('checkAuth', 'GET');
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }

    async login(username, password) {
        try {
            return makeBaseRequest('login', 'POST', {
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

    async logout() {
        try {
            return makeBaseRequest('logout', 'GET');
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }

    async register(username, password) {
        try {
            return makeBaseRequest('register', 'POST', {
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
