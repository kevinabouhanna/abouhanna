class Footer extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
        <footer id="contact" class="accent__bg">
          <div class="contact__inner wrapper">
            <h2 class="contact__heading">let's build something together</h2>
            <div>
              <p>I’m always up for a chat.</p>
              <p><a href="mailto:kevin@abouhanna.com">Drop me an email</a> at
                kevin@abouhanna.com</p>
            </div>
          </div>
        </footer>`;
  }
}

customElements.define('footer-component', Footer);
