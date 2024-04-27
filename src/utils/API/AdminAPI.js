import { makeBaseRequest } from './common.js';
import { CSATbaseUrl, protocol } from './config.js';

/**
 * API для работы с админкой
 * @class AdminAPI
 */
export class AdminAPI {
    async getAllQuestions() {
        try {
            return makeBaseRequest(
                `${protocol}://${CSATbaseUrl}/getAllQuestions`,
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
