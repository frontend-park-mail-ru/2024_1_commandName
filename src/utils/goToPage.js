import { ROOT } from '../config/config.js';

export function goToPage(page) {
    const renderPage = new page(ROOT);
    renderPage.render();
}
