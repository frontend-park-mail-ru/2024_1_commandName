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

            caches.open('my-cache-v1').then(function (cache) {
                cache.put(
                    '/profile',
                    new Response(JSON.stringify(profileResponse)),
                );
            });
            return {
                profile: this.#profile,
            };
        } catch (error) {
            console.error('Ошибка при получении данных с сервера:', error);
            alert('Похоже, вы не подключены к интернету');
            try {
                const cache = await caches.open('my-cache-v1');
                const profileResponse = await cache.match('/profile');

                if (!profileResponse) {
                    return null;
                }

                const profile = await profileResponse.json();
                this.#profile = profile.body.user;
            } catch (error) {
                console.error('Ошибка при получении данных из кэша:', error);
                throw error;
            }
        }
    };
    // getData = async () => {
    //     try {
    //         const profileAPI = new ProfileAPI();
    //
    //         const profileResponse = await profileAPI.getProfile();
    //
    //         if (profileResponse.status !== 200) {
    //             throw new Error('Пришел не 200 статус');
    //         }
    //
    //         this.#profile = profileResponse.body.user;
    //
    //         if (this.#profile.avatar === '') {
    //             this.#profile.avatar = './img/avatar.jpg';
    //         }
    //
    //         return {
    //             profile: this.#profile,
    //         };
    //     } catch (error) {
    //         console.error('Ошибка при получении данных:', error);
    //         alert('Похоже, вы не подключены к интернету');
    //         this.render();
    //         throw error;
    //     }
    // };

    render() {
        const profile = new Profile(this.#parent, this.#profile);
        profile.render();
    }
}
