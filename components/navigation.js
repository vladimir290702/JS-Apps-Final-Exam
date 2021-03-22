import { html, render } from 'https://unpkg.com/lit-html?module';
import { getUserData, logout } from '../services/authServices.js';
import { Router } from 'https://unpkg.com/@vaadin/router';

const template = (ctx) => html`
       <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
            <a class="navbar-brand text-light" href="/">Movies</a>
            <ul class="navbar-nav ml-auto ">
                ${ctx.user.isAuthenticated
        ? html`
                <li class="nav-item">
                    <a class="nav-link">Welcome, ${ctx.user.email}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/logout" @click=${ctx.onLogout}>Logout</a>
                </li>
                `
        : html`
                 <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register">Register</a>
                </li>
                `}
            </ul>
        </nav>
`;

class Navigation extends HTMLElement {
    connectedCallback() {
        this.user = getUserData();
        this.render();
    }

    onLogout() {
        logout()
            .then(res => {
                notify('Succesfully loggedout', 'success');
            })
            .catch(err => {
                notify(err.message, 'error');
            })

        // this is just to redirect to some other page and with this logout problem is solved
        Router.go('/addMovie');
    }

    render() {
        render(template(this), this, { eventContext: this });
    }
}

export default Navigation;