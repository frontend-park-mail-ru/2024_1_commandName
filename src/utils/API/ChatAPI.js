import { makeBaseRequest } from './common.js';

/**
 * API для работы с чатами
 * @class ChatAPI
 */
export class ChatAPI {
    constructor() {
        // Устанавливаем базовый URL в зависимости от режима
        this.baseUrl =
            process.env.NODE_ENV === 'production'
                ? 'http://109.120.180.60/api/v1'
                : 'http://localhost:8080';
    }

    /**
     * Получает предварительный просмотр чатов для пользователя
     * @returns {Promise<Response>} Ответ от сервера
     */
    async getChats() {
        try {
            return makeBaseRequest(`${this.baseUrl}/getChats`, 'GET');
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }
}
