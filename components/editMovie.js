import { html, render } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';

import { getUserData } from '../services/authServices.js';
import { getOneMovie, editMovie } from '../services/movieServices.js';

const template = (ctx) => html`
<navigation-component></navigation-component>

<form class="text-center border border-light p-5" action="#" method="" @submit=${ctx.onEditMovie}>
            <h1>Edit Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input type="text" class="form-control" placeholder="Movie Title" value="${ctx.title}" name="title">
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea class="form-control" placeholder="Movie Description..." value="${ctx.description}" name="description">${ctx.description}</textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input type="text" class="form-control" placeholder="Image Url" value="${ctx.imageUrl}" name="imageUrl">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
</form>
`;

class EditMovie extends HTMLElement {
    constructor() {
        super();
        this.user = getUserData();
        this.movie = getOneMovie();
    }

    connectedCallback() {
        getOneMovie(this.location.params.id)
            .then(data => {
                console.log(data.description);
                Object.assign(this, data);
                this.render();
            })
    }

    onEditMovie(e) {
        e.preventDefault();

        let formData = new FormData(e.target);
        let title = formData.get('title');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');

        editMovie(this.location.params.id, title, description, imageUrl)
            .then(res => {
                notify('Succesfully edited movie', 'success');

                Router.go('/');
            })
            .catch(err => {
                notify(err.message, 'error');
            })
    }

    render() {
        render(template(this), this, { eventContext: this });
    }
}

export default EditMovie;