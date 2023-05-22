
const DATA_FOR_SPOTIFY_MOBILE = `https://wpshortcuts.mystagingwebsite.com/wp-json/spotify/v1/playing/2`;
class CurrentlyPlayingMobile extends HTMLElement {
  constructor() {
    super();
    this.template = document.createElement("template");
  }

  connectedCallback() {

    this.template.innerHTML = `
    <style>
      :root {
        --background-color: hsl(0, 0%, 93%);
        --box-shadow: 0px 0px 0.3rem rgb(148 136 195 / 70%);
      }
      .dark {
        --background-color: hsl(0, 0%, 17%);
      }
      *:before,
      *:after {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
      .spotify__container {
        justify-content: center;
        display: flex;
        width: 100%;
        flex-wrap: wrap;
      }
      .song__name, .artist__name {
        font-weight: 700
      }
      .spotify__container__text {
        margin: 0;
      }
      .spotify__container__text--primary {
        padding: 2.5em 1.25em 0.25em;
      }
      .spotify__container__text--secondary {
        padding: 1.25em;
      }
      .album__cover {
        align-self: center
      }
      .video__icon__wrapper {
        display: flex;
        align-items: self-end;
      }
      .video__icon {
        position: relative;
        width: 50px;
        left: 6px;
        top: 10px;
      }
      .video__icon .circle--outer {
        border: 1px solid #e50040;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 0 auto 5px;
        position: relative;
        opacity: 0.8;
        -webkit-animation: circle 2s ease-in-out infinite;
        animation: circle 2s ease-in-out infinite;
      }
      .video__icon .circle--inner {
        background: #e50040;
        left: 15px;
        top: 10px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        opacity: 0.8;
      }
      .video__icon .circle--inner:after {
        content: "";
        display: block;
        border: 2px solid #e50040;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        top: -4px;
        left: -4px;
        position: absolute;
        opacity: 0.8;
        -webkit-animation: circle 2s ease-in-out 0.2s infinite;
        animation: circle 2s ease-in-out 0.2s infinite;
      }
      .video__icon p {
        color: #000;
        text-align: center;
      }
      .live__text {
        padding: 0 0 0.2em 0.5em;
        text-transform: uppercase;
        font-size: 16px;
        font-family: sans-serif;
      }
      @-webkit-keyframes circle {
        from {
          -webkit-transform: scale(1);
          transform: scale(1);
        }

        to {
          -webkit-transform: scale(1.5);
          transform: scale(1.5);
          opacity: 0;
        }
      }
      @keyframes circle {
        from {
          -webkit-transform: scale(1);
          transform: scale(1);
        }

        to {
          -webkit-transform: scale(1.5);
          transform: scale(1.5);
          opacity: 0;
        }
      }
      </style>
      <div id="spotify">

      </div>`;
    let counter = 0;
    this.renderSpotify(counter);
    counter++;
    setInterval(() => {
      this.renderSpotify(counter);
      counter++;
    }, 20 * 60 * 1000)

  }

  renderSpotify(counter) {
    if (counter === 0) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }

    const myDate = new Date();
    let hrs = myDate.getHours();
    let isLight = hrs >= 4 && hrs <= 17;

    fetch(DATA_FOR_SPOTIFY_MOBILE)
      .then((response) => response.json())
      .then(({ isPlaying, data }) => { // isPlaying, author, message

        if (isPlaying) {
          const albumCover = this.getImageBySize(data.album.images, 'medium');
          const albumName = data.album.name;
          const artistName = this.getArtistName(data.artists);
          const spotifyContainer = `
          <div class="video__icon__wrapper">
            <div class="video__icon">
              <div class="circle--outer"></div>
              <div class="circle--inner"></div>
            </div>
            <span class="live__text">live</span>
          </div>
          <div class="spotify__container${isLight ? ' light ' : ' dark '}">
            <p class="spotify__container__text spotify__container__text--primary">
              While working I usually listen to music.
            </p>
            <p class="spotify__container__text spotify__container__text--secondary">
              Now listening to<span class="song__name"> ${data.name} </span>by<span class="artist__name"> ${artistName} </span>
            </p>
            <img class="album__cover" title="${albumName}" src="${albumCover}" />
          </div>
          `;
          if (counter === 0) {
            this.shadowRoot.querySelector("#spotify").insertAdjacentHTML("afterbegin", spotifyContainer);
          } else {
            this.shadowRoot.querySelector("#spotify").innerHTML = spotifyContainer;
          }
        } else {
          const spotifyContainer = ``;
          if (counter === 0) {
            this.shadowRoot.querySelector("#spotify").insertAdjacentHTML("afterbegin", spotifyContainer);
          } else {
            this.shadowRoot.querySelector("#spotify").innerHTML = spotifyContainer;
          }
        }

      });
  }

  /**
 *
 * @param {*} images
 * @param {*} size small | medium | large
 * @returns
 */
  getImageBySize(images, size) {

    const sizes = [
      {
        width: 64,
        label: 'small'
      },
      {
        width: 300,
        label: 'medium'
      },
      {
        width: 640,
        label: 'large'
      }
    ]
    const selectedSizeWidth = sizes.find(_size => (_size.label === size))?.width || 64;

    return images.find(({ width }) => width === selectedSizeWidth)?.url || 'No Album Cover';
  }

  /**
 *
 * @param {*} artists
 * @returns
 */
  getArtistName(artists) {
    return artists
      .map(artist => artist.name)
      .join(' and ');
  }

}

customElements.define('currently-playing-mobile', CurrentlyPlayingMobile);
