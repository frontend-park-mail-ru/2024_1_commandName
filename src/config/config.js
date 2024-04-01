import LoginPage from '../Pages/LoginPage.js';
import RegisterPage from '../Pages/RegisterPage.js';
import ChatPage from '../Pages/ChatPage.js';
import Page404 from '../Pages/Page404.js';
import ProfilePage from '../Pages/ProfilePage.js';
import ProfileEditPage from '../Pages/ProfileEditPage.js';
import ChangePasswordPage from '../Pages/ChangePasswordPage.js';

export const ROOT = document.getElementById('root');

export const ROUTES = {
    '/': LoginPage,
    '/login': LoginPage,
    '/register': RegisterPage,
    '/chat': ChatPage,
    '/profile': ProfilePage,
    '/edit': ProfileEditPage,
    '/password': ChangePasswordPage,
    '*': Page404,
};
