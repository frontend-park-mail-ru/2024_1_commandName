export function changeUrl(path, needToReload) {
    window.history.pushState({}, '', path);
    if (needToReload) {
        window.dispatchEvent(new PopStateEvent('popstate'));
    }
}
