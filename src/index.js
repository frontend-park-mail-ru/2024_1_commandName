// import { RouteInit } from './utils/Routes/Routes.js';

// RouteInit();
import LoginPage from './Pages/LoginPage.js';
import ChatPage from './Pages/ChatPage.js';
import { goToPage } from './utils/goToPage.js';
import { AuthAPI } from './utils/API/AuthAPI.js';

const api = new AuthAPI();
api.checkAuth()
    .then((data) => {
        if (data.status === 200) {
            console.log('Is auth');
            goToPage(ChatPage);
        } else {
            goToPage(LoginPage);
        }
    })
    .catch((error) => {
        console.error('Failed:', error);
    });

// eslint-disable-next-line no-undef
Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
// eslint-disable-next-line no-undef
Handlebars.registerHelper('ifNotEquals', function (arg1, arg2, options) {
    return arg1 != arg2 ? options.fn(this) : options.inverse(this);
});
