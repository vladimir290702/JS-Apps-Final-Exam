import { html, render } from 'https://unpkg.com/lit-html?module';

const template = (ctx) => html`
       <form class="text-center border border-light p-5" @submit=${ctx.onLogin}>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" placeholder="Email" name="email" value="">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" placeholder="Password" name="password" value="">
            </div>
        
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
`;

class Login extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    onLogin(e) {
        e.preventDefault();

        console.log(e);
    }

    render() {
        render(template(this), this, {eventContext: this})
    }
}

export default Login;