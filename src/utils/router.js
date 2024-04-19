import { ROUTES, ROOT } from '../config/config.js';

export function handleRouting() {
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
