/**
 * API для работы с чатами
 * @class ChatAPI
 */
export class ChatAPI {
    constructor() {}

    /**
     * Получает предварительный просмотр чатов для пользователя
     * @returns {Promise<Response>} Ответ от сервера
     */
    async getChats() {
        try {
            const response = await fetch('http://localhost:8080/GetChats', {
                method: 'GET',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

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
