import { makeBaseRequest } from './common.js';
import { baseUrl } from './config.js';

/**
 * API для работы с профилями
 * @class ProfileAPI
 */
export class ProfileAPI {
    /**
     * Получает профиль пользователя
     * @returns {{status: Number, body: Object}} - Json ответа.
     * @throws Если произошла ошибка при выполнении запроса.
     */
    async getProfile() {
        try {
            return makeBaseRequest(`${baseUrl}/getProfileInfo`, 'GET');
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }
}
