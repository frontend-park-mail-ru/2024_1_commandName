import { ROOT } from '../config/config.js';

export function goToPage(page, path) {
    if (path) {
        window.history.pushState({}, '', path);
    }
    ROOT.innerHTML = '';
    const renderPage = new page(ROOT);
    renderPage.render();
}
