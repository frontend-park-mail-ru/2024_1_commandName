/**
 * Базовый запрос для API
 * @return {Promise<Response>} - Json ответа
 * @throws Если произошла ошибка при выполнении запроса.
 */
export async function makeBaseRequest(url, method, body) {
    const options = {
        method: method,
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'include',
    };

    if (body && method.toLowerCase() !== 'GET') {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const json = await response.json();
    return json;
}
