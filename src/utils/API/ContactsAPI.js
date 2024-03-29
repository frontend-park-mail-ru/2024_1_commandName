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
        // try {
        //     return makeBaseRequest(`${baseUrl}/TODO`, 'GET');
        // } catch (error) {
        //     console.error(
        //         'There was a problem with the fetch operation:',
        //         error,
        //     );
        //     throw error;
        // }

        return new Promise((resolve) => {
            return resolve({
                status: 200,
                body: {
                    contacts: [
                        {
                            name: 'Иван',
                            surname: 'Наумов',
                            username: 'ivan_naum',
                        },
                        {
                            name: 'Артём',
                            surname: 'Жук',
                            username: 'artm_zhuk',
                        },
                        {
                            name: 'Артём',
                            surname: 'Черников',
                            username: 'ArtemkaChernikov',
                        },
                    ],
                },
            });
        });
    }
}
