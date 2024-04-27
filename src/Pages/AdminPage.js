import { BasePage } from './BasePage.js';
import { AdminAPI } from '../utils/API/AdminAPI.js';
/**
 * Рендерит страницу админки
 * @class Класс страницы админки
 */
export default class AdminPage extends BasePage {
    #parent;
    #statistics;
    constructor(parent) {
        super(parent);
        this.#parent = parent;
        this.render();
    }

    getData = async () => {
        try {
            const adminAPI = new AdminAPI();

            const adminResponse = await adminAPI.getStatistic();

            if (adminResponse.status !== 200) {
                throw new Error('Пришел не 200 статус');
            }

            this.#statistics = adminResponse.body;

            return {
                profile: this.#statistics,
            };
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            throw error;
        }
    };
    render() {
        this.#parent.innerHTML = 'Admin Page';
        console.log(this.#statistics);
    }
}
