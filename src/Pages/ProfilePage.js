import Profile from '../Components/Profile/Profile.js';
import { ProfileAPI } from '../utils/API/ProfileAPI.js';

/**
 * Рендерит страницу пользователя
 * @class Класс страницы пользователя
 */
export default class ProfilePage {
    #parent;
    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        const profileAPI = new ProfileAPI();

        profileAPI
            .getProfile()
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Пришел не 200 статус');
                }

                const profileConfig = response.body.user;
                const profile = new Profile(this.#parent, profileConfig);
                profile.render();
            })
            .catch((error) => {
                console.error('Ошибка при получении профиля:', error);
            });
    }
}
