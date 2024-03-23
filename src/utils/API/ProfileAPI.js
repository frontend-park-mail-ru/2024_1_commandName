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

    async editProfile(newProfile) {
        try {
            let editedFieldCount = 0;
            Object.values(newProfile).reduce((count, value) => {
                if (value !== '') {
                    editedFieldCount++;
                }
            }, 0);

            return makeBaseRequest(`${baseUrl}/updateProfileInfo`, 'POST', {
                numOfUpdatedFields: editedFieldCount,
                user: newProfile,
            });
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }

    async changePassword(oldPassword, newPassword) {
        try {
            return makeBaseRequest(`${baseUrl}/changePassword`, 'POST', {
                oldPassword: oldPassword,
                newPassword: newPassword,
            });
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }
}
