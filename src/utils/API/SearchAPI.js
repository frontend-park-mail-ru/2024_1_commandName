import { makeBaseRequest } from './common.js';
import { baseUrl, protocol } from './config.js';

/**
 * API для работы с поиска
 * @class SearchAPI
 */
export class SearchAPI {
    async search(search) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/search`,
                'POST',
                search,
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
