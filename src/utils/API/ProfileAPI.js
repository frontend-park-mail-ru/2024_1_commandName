import { makeBaseRequest } from './common.js';
import { baseUrl, protocol } from './config.js';

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
            return makeBaseRequest(
                `${protocol}://${baseUrl}/getProfileInfo`,
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

    async editProfile(newProfile, editedFieldCnt) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/updateProfileInfo`,
                'POST',
                {
                    numOfUpdatedFields: editedFieldCnt,
                    user: newProfile,
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

    async uploadAvatar(file) {
        const formData = new FormData();
        formData.append('avatar', file);
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/uploadAvatar`,
                'POST',
                formData,
                null,
            );
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
            return makeBaseRequest(
                `${protocol}://${baseUrl}/changePassword`,
                'POST',
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
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
