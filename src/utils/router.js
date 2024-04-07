import { ROUTES } from '../config/config.js';

function handleRouting() {
    const urlParams = new URLSearchParams(window.location.search);
    const path = window.location.pathname;
    const page = ROUTES[path] || ROUTES['*']; // Используем Page404 при неизвестном пути

    const rootNode = document.getElementById('root');
    rootNode.innerHTML = '';
    const renderPage = new page(rootNode, urlParams);
    renderPage.render();
}

export function goToPage(path) {
    window.history.pushState({}, '', path);

    if (window.location.pathname !== path.split('?')[0]) {
        handleRouting();
    }
}

// Обработка изменения URL
window.addEventListener('popstate', handleRouting);

// Вызываем функцию handleRouting при загрузке страницы
window.addEventListener('load', handleRouting);
