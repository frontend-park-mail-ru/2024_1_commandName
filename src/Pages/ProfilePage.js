import Profile from '../Components/Profile/Profile.js';
import { ProfileAPI } from '../utils/API/ProfileAPI.js';
import { BasePage } from './BasePage.js';

/**
 * Рендерит страницу пользователя
 * @class Класс страницы пользователя
 */
export default class ProfilePage extends BasePage {
    #parent;
    #profile;
    constructor(parent) {
        super(parent);
        this.#parent = parent;
        this.getData().then(() => this.render());
    }

    getData = async () => {
        try {
            const profileAPI = new ProfileAPI();

            const profileResponse = await profileAPI.getProfile();

            if (profileResponse.status !== 200) {
                throw new Error('Пришел не 200 статус');
            }
            this.#profile = profileResponse.body.user;
            return {
                profile: this.#profile,
            };
        } catch (error) {
            console.error('Ошибка при получении данных с сервера:', error);
            throw error;
        }
    };

    render() {
        const profile = new Profile(this.#parent, this.#profile);
        profile.render();
    }
}
