import { makeBaseRequest } from './common.js';
import { baseUrl } from './config.js';
/**
 * Рендерит страницу ошибки 404
 * @class Класс страницы 404 ошибки
 */
export class AuthAPI {
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
