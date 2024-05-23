import { makeBaseRequest } from './common.js';
import { baseUrl, protocol } from './config.js';

/**
 * API для работы с уведомлениями
 * @class FirebaseAPI
 */
export class FirebaseAPI {
    async setToken(token) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/setFirebaseToken`,
                'POST',
                {
                    token: token,
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
