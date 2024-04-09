import { ROUTES } from '../config/config.js';

function handleRouting() {
    const urlParams = new URLSearchParams(window.location.search);
    const path = window.location.pathname;
    const page = ROUTES[path] || ROUTES['*']; // Используем Page404 при неизвестном пути

    const rootNode = document.getElementById('root');
    rootNode.innerHTML = '';
    new page(rootNode, urlParams);
}

export function goToPage(path, needReload) {
    if (needReload) {
        window.history.pushState({}, '', path);
        handleRouting();
    } else {
        window.history.replaceState({}, '', path);
    }
}

// Обработка изменения URL
window.addEventListener('popstate', handleRouting);

// Вызываем функцию handleRouting при загрузке страницы
window.addEventListener('load', handleRouting);
