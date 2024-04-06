import { makeBaseRequest } from './common.js';
import { baseUrl } from './config.js';

/**
 * API для работы с контактами
 * @class ContactsAPI
 */
export class ContactsAPI {
    /**
     * Получает контакты
     * @returns {{status: Number, body: Object}} - Json ответа.
     * @throws Если произошла ошибка при выполнении запроса.
     */
    async getContacts() {
        try {
            return makeBaseRequest(`http://${baseUrl}/getContacts`, 'GET');
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }
}
