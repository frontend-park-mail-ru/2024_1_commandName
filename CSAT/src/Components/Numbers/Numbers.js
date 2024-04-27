import { BaseComponent } from '../BaseComponent.js';
/**
 * Рендерит TODO
 * @class Класс TODO
 */
export default class Numbers extends BaseComponent {
    templateName = 'Numbers';

    render() {
        super.render();

        const numbers = document.querySelectorAll('.csat__number');

        numbers.forEach((num, index) => {
            num.addEventListener('click', () => {
                console.log('test');
                this.getConfig().clickHandler(index + 1);
            });
        });
    }
}
