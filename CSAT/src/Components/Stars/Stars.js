import { BaseComponent } from '../BaseComponent.js';
/**
 * Рендерит TODO
 * @class Класс TODO
 */
export default class Stars extends BaseComponent {
    templateName = 'Stars';

    render() {
        super.render();

        const stars = document.querySelectorAll('.csat__star');

        console.log(this.getConfig());
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                // Устанавливаем рейтинг
                const rating = index + 1;
                for (let i = 0; i < stars.length; i++) {
                    if (i < rating) {
                        stars[i].innerHTML = '★';
                    } else {
                        stars[i].innerHTML = '☆';
                    }
                }
                this.getConfig().clickHandler(rating);
            });
        });
    }
}
