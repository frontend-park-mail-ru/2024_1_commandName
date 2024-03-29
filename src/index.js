import LoginPage from './Pages/LoginPage.js';
import ChatPage from './Pages/ChatPage.js';
import { goToPage } from './utils/goToPage.js';
import { AuthAPI } from './utils/API/AuthAPI.js';

const api = new AuthAPI();
api.checkAuth()
    .then((data) => {
        if (data.status === 200) {
            console.log('Is auth');
            goToPage(ChatPage, '/chat');
        } else {
            goToPage(LoginPage, '/login');
        }
    })
    .catch((error) => {
        console.error('Failed:', error);
    });
