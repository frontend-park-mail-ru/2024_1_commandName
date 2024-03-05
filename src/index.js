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
        console.error('Login failed:', error);
    });
