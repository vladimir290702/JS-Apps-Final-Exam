import { html, render } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';

import { getOneMovie, likeMovie, deleteMovie } from '../services/movieServices.js';
import { getUserData } from '../services/authServices.js';

const hasLikes = (likes, email) => {
    if (likes) {
        return Object
            .values(likes)
            .some(like => like.creator == email);
    }
}

const template = (ctx) => html`
<navigation-component></navigation-component>

        <div class="container">
            <div class="row bg-light text-dark">
            <h1>Movie title: ${ctx.movie}</h1>
                <div class="col-md-8">
                    <img class="img-thumbnail" src="${ctx.imageUrl}" alt="Movie">
                </div>
                <div class="col-md-4 text-center">
                    <h3 class="my-3 ">Movie Description</h3>
                    <p>${ctx.description}</p>
                    ${ctx.creator == ctx.user.email
        ? html`
                        <a class="btn btn-danger" href="/delete/${ctx.key}" @click=${ctx.onDeleteMovie}>Delete</a>
                        <a class="btn btn-warning" href="/edit/${ctx.key}" >Edit</a>
                    `
        : html`
        ${hasLikes(ctx.likes, ctx.user.email)
                ? html`<span class="enrolled-span">Liked ${Object.keys(ctx.likes).length}</span>`
                : html`<a class="btn btn-primary" href="#" @click=${ctx.onLike}>Like</a>`
            }`
    }          
                </div>
            </div>
        </div>
`;

class MovieDetails extends HTMLElement {
    constructor() {
        super();
        this.user = getUserData();
    }

    connectedCallback() {
        getOneMovie(this.location.params.id)
            .then(data => {
                Object.assign(this, data);
                this.render();
            })
    }

    onDeleteMovie(e) {
        e.preventDefault();

        deleteMovie(this.location.params.id)
            .then(res => {
                notify('Succesfully deleted movie', 'success');
                Router.go('/')
            })
            .catch(error => {
                notify(error.messge, 'error');
            })
    }

    onLike(e) {
        e.preventDefault();

        likeMovie(this.location.params.id, this.user.email)
            .then(res => {
                this.render();
                Router.go('/');
            })
    }

    render() {
        render(template(this), this, { eventContext: this });
    }
}

export default MovieDetails;