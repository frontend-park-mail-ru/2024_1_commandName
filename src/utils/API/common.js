import { changeUrl } from '../navigation';

/**
 * Базовый запрос для API
 * @return {Promise<Response>} - Json ответа
 * @throws Если произошла ошибка при выполнении запроса.
 */
export async function makeBaseRequest(
    url,
    method,
    body,
    contentType = 'application/json',
) {
    const options = {
        method: method,
        credentials: 'include',
    };
    if (body && method.toLowerCase() !== 'GET') {
        options.body = body;
    }
    if (contentType) {
        options.headers = new Headers({
            'Content-Type': contentType,
        });
        options.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    // Проверяем, разрешено ли перенаправление, и статус ответа
    if (json.status === 401 && window.location.pathname !== '/register') {
        changeUrl('/login');
    } else if (json.status === 401) {
        throw new Error('Ошибка авторизации: необходимо перелогиниться.');
    }
    return json;
}
