class Home extends HTMLElement {
    constructor() {
        super();
        console.log(`Home`);
    }
    connectedCallback() {
        this.innerHTML = 'Home component'
    }
}

export default Home;