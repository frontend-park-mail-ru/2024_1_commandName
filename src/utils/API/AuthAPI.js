import 'dotenv/config';

/**
 * Рендерит страницу ошибки 404
 * @class Класс страницы 404 ошибки
 */
export class AuthAPI {
    constructor() {
        this.baseUrl =
            process.env.NODE_ENV === 'production'
                ? 'http://109.120.180.60/api/v1'
                : 'http://localhost:8080';
    }

    async checkAuth() {
        try {
            const response = await fetch(`${this.baseUrl}/checkAuth`, {
                method: 'GET',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                credentials: 'include',
            });

            // TODO: бэк возвращает 401 неавторизованным
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            const json = await response.json();
            return json;
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
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                credentials: 'include',
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            const json = await response.json();
            return json;
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
            const response = await fetch('http://localhost:8080/logout', {
                method: 'GET',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                credentials: 'include',
            });

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            const json = await response.json();
            return json;
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
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                credentials: 'include',
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            const json = await response.json();
            return json;
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }
}
