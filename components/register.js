class Register extends HTMLElement {
    constructor() {
        super();
        console.log(`Register`);
    }

    connectedCallback() {
        this.innerHTML = 'Register component'
    }
}

export default Register;