import LoginPage from '../Pages/LoginPage.js';
import RegisterPage from '../Pages/RegisterPage.js';
import ChatPage from '../Pages/ChatPage.js';
import Page404 from '../Pages/Page404.js';
import ProfilePage from '../Pages/ProfilePage.js';
import ProfileEditPage from '../Pages/ProfileEditPage.js';
import ChangePasswordPage from '../Pages/ChangePasswordPage.js';
import ContactsPage from '../Pages/ContactsPage.js';
import CreateGroupPage from '../Pages/CreateGroupPage.js';
import EditGroupPage from '../Pages/EditGroupPage.js';
import AdminPage from '../Pages/AdminPage.js';

export const ROOT = document.getElementById('root');

export const ROUTES = {
    '/': ChatPage,
    '/login': LoginPage,
    '/register': RegisterPage,
    '/chat': ChatPage,
    '/profile': ProfilePage,
    '/edit': ProfileEditPage,
    '/password': ChangePasswordPage,
    '/contacts': ContactsPage,
    '/create_group': CreateGroupPage,
    '/edit_group': EditGroupPage,
    '/admin': AdminPage,
    '*': Page404,
};
