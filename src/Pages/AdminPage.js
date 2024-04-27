import { BasePage } from './BasePage.js';
import { AdminAPI } from '../utils/API/AdminAPI.js';
import Admin from '../Components/Admin/Admin.js';
/**
 * Рендерит страницу админки
 * @class Класс страницы админки
 */
export default class AdminPage extends BasePage {
    #parent;
    #statistics;
    #statisticsList;
    constructor(parent) {
        super(parent);
        this.#parent = parent;
        this.getData().then(() => this.render());
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
                statistics: this.#statistics,
            };
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            throw error;
        }
    };
    render() {
        this.#statisticsList = new Admin(this.#parent, {});
        this.#statisticsList.render();
        // Предположим, что у вас есть массив с данными о вопросах
        const questionsData = [
            {
                name: 'Вопрос 1',
                type: 'CSAT',
                rating: [10, 20, 30, 25, 15],
            },
            {
                name: 'Вопрос 2',
                type: 'NSP',
                rating: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
            },
            // Добавьте другие данные по необходимости
        ];
        questionsData.forEach((statisticConfig) => {
            this.#statisticsList.addStatistic(statisticConfig);
        });
        console.log(this.#statistics);
    }
}
