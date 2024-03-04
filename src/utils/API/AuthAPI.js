/**
 * Рендерит страницу ошибки 404
 * @class Класс страницы 404 ошибки
 */
export class AuthAPI {
    constructor() {}

    async checkAuth() {
        try {
            const response = await fetch('http://localhost:8080/checkAuth', {
                method: 'GET',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                credentials: 'include',
            });

            // TODO: бэк возвращает 401 неавторизованным
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            const json = await response.json();
            console.log('json: ', json);
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
            console.log('json: ', json);
            return json;
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }

    logout() {}

    register() {}
}
