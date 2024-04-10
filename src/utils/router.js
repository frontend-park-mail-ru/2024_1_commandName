import { ROUTES, ROOT } from '../config/config.js';

function handleRouting() {
    const urlParams = new URLSearchParams(window.location.search);
    const path = window.location.pathname;
    const page = ROUTES[path] || ROUTES['*']; // Используем Page404 при неизвестном пути

    ROOT.innerHTML = '';
    new page(ROOT, urlParams);
}

export function goToPage(path, needReload = true) {
    if (needReload) {
        window.history.pushState({}, '', path);
        handleRouting();
    } else {
        window.history.pushState({}, '', path);
    }
}

// Обработка изменения URL
window.addEventListener('popstate', handleRouting);

// Вызываем функцию handleRouting при загрузке страницы
window.addEventListener('load', handleRouting);
