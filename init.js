import { Router } from 'https://unpkg.com/@vaadin/router';
import { logout } from './services/authServices.js';

import Home from './components/homeComponent.js';
import Register from './components/registerComponent.js';
import Login from './components/loginComponent.js';

customElements.define('home-component', Home);
customElements.define('register-component', Register)
customElements.define('login-component', Login);

const root = document.getElementById('root');
const router = new Router(root);

router.setRoutes([
    {
        path: '/',
        component: 'home-component',
    },
    {
        path: '/register',
        component: 'register-component',
    },
    {
        path: '/login',
        component: 'login-component',
    },
    {
        path: '/logout',
        action: (context, commands) => {
            logout();

            return commands.redirect('/');
        }
    }
])
