
const DATA_FOR_SPOTIFY_MOBILE = `https://wpshortcuts.studio/wp-json/spotify/v1/playing/2`;
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
      .album__cover {
        align-self: center
      }
      .text__container {
        padding-left: .4em;
        white-space: nowrap
      }
      .artist__name {
        font-size: 1rem
      }
      .song__name {
        font-size: 1.4rem;
        padding-bottom: .4em
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

    // e.g. https://batataharra.guru
    fetch(DATA_FOR_SPOTIFY_MOBILE)
      .then((response) => response.json())
      .then(({ isPlaying, data }) => { // isPlaying, author, message

        if (isPlaying) {
          const albumCover = this.getImageBySize(data.album.images, 'medium');
          const albumName = data.album.name;
          const artistName = this.getArtistName(data.artists);
          const spotifyContainer = `
        <div class="spotify__container${isLight ? ' light ' : ' dark '}">
          <img class="album__cover" title="${albumName}" src="${albumCover}" />
          <div class="text__container">
            <div class="song__name">${data.name}</div>
            <div class="artist__name">${artistName}</div>
          </div>
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
      .join(', ');
  }

}

customElements.define('currently-playing-mobile', CurrentlyPlayingMobile);
