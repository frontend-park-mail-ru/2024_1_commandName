import { makeBaseRequest } from './common.js';
import { CSATbaseUrl, protocol } from './config.js';

/**
 * API для работы с опросами
 * @class CsatAPI
 */
export class CsatAPI {
    async checkAccess() {
        try {
            return makeBaseRequest(
                `${protocol}://${CSATbaseUrl}/checkAccess`,
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
