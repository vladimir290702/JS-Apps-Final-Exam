import { Router } from 'https://unpkg.com/@vaadin/router';

import { html, render } from 'https://unpkg.com/lit-html?module';
import { addMovie } from '../services/movieServices.js';

const template = (ctx) => html`

<form class="text-center border border-light p-5" action="#" method="" @submit=${ctx.onAddMovie}>
            <h1>Add Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input type="text" class="form-control" placeholder="Title" name="title" value="">
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea class="form-control" placeholder="Description" name="description"></textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
</form>
`;

class AddMovie extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    onAddMovie(e) {
        e.preventDefault();

        let formData = new FormData(e.target);
        let title = formData.get('title');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');

        addMovie(title, description, imageUrl)
            .then(res => {
                notify('Succesfully added movie', 'success');
               
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

export default AddMovie;