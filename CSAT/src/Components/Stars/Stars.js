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

        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                // Устанавливаем рейтинг
                const rating = index + 1;

                // Обновляем внешний вид звезд
                for (let i = 0; i < stars.length; i++) {
                    if (i < rating) {
                        stars[i].innerHTML = '★';
                    } else {
                        stars[i].innerHTML = '☆';
                    }
                }

                // Сохраняем рейтинг в хранилище (например, в localStorage)
                localStorage.setItem('csatRating', rating);
            });
        });
    }
}
