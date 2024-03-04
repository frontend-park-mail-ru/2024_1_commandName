// import { RouteInit } from './utils/Routes/Routes.js';

// RouteInit();
import SuccessPage from '../Pages/SuccessPage.js';
import LoginPage from './Pages/LoginPage.js';
import { goToPage } from './utils/goToPage.js';
import { AuthAPI } from './utils/API/AuthAPI.js';

const api = new AuthAPI();
api.checkAuth()
    .then((data) => {
        console.log(data);
        if (data.status === 200) {
            console.log('Is auth');
            goToPage(SuccessPage);
        } else {
            goToPage(LoginPage);
        }
    })
    .catch((error) => {
        console.error('Login failed:', error);
    });
