import { html, render } from 'https://unpkg.com/lit-html?module';

import { getUserData } from '../services/authServices.js';

const template = (ctx) => html`
<navigation-component></navigation-component>


<form class="text-center border border-light p-5" action="#" method="" @submit=${ctx.editMovie}>
            <h1>Edit Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input type="text" class="form-control" placeholder="Movie Title" value="" name="title">
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea class="form-control" placeholder="Movie Description..." name="description"></textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input type="text" class="form-control" placeholder="Image Url" value="" name="imageUrl">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
</form>
`;

class EditMovie extends HTMLElement {
    constructor() {
        super();
        this.user = getUserData();
    }

    connectedCallback() {

        this.render();

    }

    render() {
        render(template(this), this, { eventContext: this });
    }
}

export default EditMovie;