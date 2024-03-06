import { makeBaseRequest } from './common.js';
import { baseUrl } from './config.js';

/**
 * API для работы с чатами
 * @class ChatAPI
 */
export class ChatAPI {
    /**
     * Получает предварительный просмотр чатов для пользователя
     * @returns {Promise<Response>} Ответ от сервера
     */
    async getChats() {
        try {
            return makeBaseRequest(`${baseUrl}/getChats`, 'GET');
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }
}
