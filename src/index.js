// import { RouteInit } from './utils/Routes/Routes.js';

// RouteInit();

// import { ROOT } from './config/config.js';
import { goToPage } from './utils/goToPage.js';

import LoginPage from './Pages/LoginPage.js';
// import RegisterPage from './Pages/RegisterPage.js';
// const register = new RegisterPage(root);
// const login = new LoginPage(root);

// if (!IsAuthorized) {
//     login.render();
// } else {
//     register.render();
// }

goToPage(LoginPage);
