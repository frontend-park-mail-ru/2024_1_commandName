import { makeBaseRequest } from './common.js';
import { baseUrl, protocol } from './config.js';

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
            return makeBaseRequest(`${protocol}://${baseUrl}/getChats`, 'GET');
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }

    async chatByUserId(UserId) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/createPrivateChat`,
                'POST',
                {
                    user_id: UserId,
                },
            );
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }

    async chatById(ChatId) {
        try {
            return makeBaseRequest(`${protocol}://${baseUrl}/getChat`, 'POST', {
                chat_id: ChatId,
            });
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }

    async deleteChatById(ChatId) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/deleteChat`,
                'POST',
                {
                    chat_id: ChatId,
                },
            );
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }
}
