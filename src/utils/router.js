import { ROUTES } from '../config/config.js';

export function handleRouting() {
    const path = window.location.pathname;
    const page = ROUTES[path] || ROUTES['*']; // Используем Page404 при неизвестном пути

    const rootNode = document.getElementById('root');
    rootNode.innerHTML = '';
    const renderPage = new page(rootNode);
    renderPage.render();
}

// Обработка изменения URL
window.addEventListener('popstate', handleRouting);

// Вызываем функцию handleRouting при загрузке страницы
window.addEventListener('load', handleRouting);
