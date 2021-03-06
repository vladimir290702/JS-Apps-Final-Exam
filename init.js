import { Router } from 'https://unpkg.com/@vaadin/router';
import { logout } from './services/authServices.js';
import { deleteMovie } from './services/movieServices.js';

import Home from './components/homeComponent.js';
import Register from './components/registerComponent.js';
import Login from './components/loginComponent.js';
import Movies from './components/movies.js';
import MovieCard from './components/movie-card.js';
import MovieDetails from './components/movie-details.js';
import AddMovie from './components/addMovie.js';
import EditMovie from './components/editMovie.js';
import Navigation from './components/navigation.js';

customElements.define('navigation-component', Navigation);
customElements.define('home-component', Home);
customElements.define('register-component', Register)
customElements.define('login-component', Login);
customElements.define('movies-component', Movies);
customElements.define('movie-card', MovieCard);
customElements.define('movie-details', MovieDetails);
customElements.define('add-movie', AddMovie);
customElements.define('edit-movie', EditMovie);

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
        path: '/details/:id',
        component: 'movie-details',
    },
    {
        path: '/addMovie',
        component: 'add-movie',
    },
    {
        path: '/edit/:id',
        component: 'edit-movie',
    },
    {
        path: '/delete/:id',
        action: (context, commands) => {
            deleteMovie();

            return commands.redirect('/');
        }
    },
    {
        path: '/logout',
        action: (context, commands) => {
            logout();
            return commands.redirect('/');
        }
    }
])
