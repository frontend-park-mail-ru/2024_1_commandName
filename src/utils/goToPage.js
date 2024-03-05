import { ROOT } from '../config/config.js';

export function goToPage(page) {
    ROOT.innerHTML = '';
    const renderPage = new page(ROOT);
    renderPage.render();
}
