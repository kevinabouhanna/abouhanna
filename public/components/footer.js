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
                kevin@abouhanna.com<br>or give me a shout on social media.</p>
              <div class="contact__social">
                <a class="linkedin__icon" rel="noopener" href="https://www.linkedin.com/in/kevinabouhanna/">
                LinkedIn<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                </svg></a>
                <a class="github__icon" rel="noopener" href="https://github.com/kevinabouhanna">
                  Github<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path
                      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg></a>
              </div>
            </div>
          </div>
        </footer>
        <div class="webring">
        <p class="batata__harra text-align-center">
          <span class="stage__zero__text">A proud member of Stage Zero Webring</span>
          <a title="Visit gabykaram.com" aria-label="visit Gaby Karam Dot Com" class="text-decoration-none p-1" href="https://gabykaram.com">
            <i class="icon-chevron-left"></i>
          </a>
          <a rel="noopener" title="Stage Zero Webring" aria-label="Visit Stage Zero Webring" class="text-decoration-none m-1" href="https://batataharra.guru">
              <span class="batata"><svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.96077 1.5H4.65505L4.37372 1.61965C3.47636 2.00128 2.72577 2.59373 2.21364 3.42373C1.70769 4.24371 1.5 5.18884 1.5 6.1778C1.5 7.22759 1.94512 8.35804 2.56861 9.47713L2.56869 9.47727L5.45798 14.6619H3.20284H1.70284V16.1619V18.7763V20.2763H3.20284H9.17529H9.64895L10.0367 20.0043C10.3506 19.7841 10.6271 19.5387 10.8681 19.271V20.2763H12.3681H21H22.5V18.7763V16.1619V14.6619H21H18.0794L22.3151 6.31572L22.4775 5.99573V5.6369V3V1.5H20.9775H12.3681H11.8698H10.8681H10.3698H4.96077ZM10.894 11.6955L8.4332 7.20451H10.3698H10.8681H11.8698H12.3681H15.2459L11.8846 13.8418C11.6527 13.1548 11.3032 12.4307 10.894 11.6955Z" fill="white" stroke="black" stroke-width="3"/>
              <path d="M12 11L13.7321 8H10.2679L12 11Z" fill="black"/>
              <path d="M11.5 17.5L18 5.5H5.5L11.5 17.5Z" fill="black"/>
              </svg>
              </span>
          </a>
          <a title="Visit andoinedebes.com" aria-label="visit Antoine Debes Dot Com" class="text-decoration-none p-1" href="https://antoinedebes.com">
            <i class="icon-chevron-right"></i>
          </a>
        </p>
      </div>`;
  }
}

customElements.define('footer-component', Footer);
