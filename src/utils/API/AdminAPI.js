import { makeBaseRequest } from './common.js';
import { baseUrl, protocol } from './config.js';

/**
 * API для работы с админкой
 * @class AdminAPI
 */
export class AdminAPI {
    async getStatistic() {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/getStatistic`,
                'GET',
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
