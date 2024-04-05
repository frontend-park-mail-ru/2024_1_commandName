import { makeBaseRequest } from './common.js';
import { baseUrl } from './config.js';

/**
 * API для работы с чатами
 * @class ChatAPI
 */
export class ChatAPI {
    /**
     * Получает предварительный просмотр чатов для пользователя
     * @returns {{status: Number, body: Object}} - Json ответа.
     * @throws Если произошла ошибка при выполнении запроса.
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

    async createGroup(group) {
        try {
            return makeBaseRequest(`${baseUrl}/createGroup`, 'POST', group);
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }
}
