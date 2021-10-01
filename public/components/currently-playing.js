
const DATA_FOR_SPOTIFY = `https://wpshortcuts.studio/wp-json/spotify/v1/playing/2`;

class CurrentlyPlaying extends HTMLElement {
  constructor() {
    super();
    this.template = document.createElement("template");
  }

  connectedCallback() {

    this.template.innerHTML = `
    <style>
      .spotify__container {
        display: flex
      }
      .album__cover {
        align-self: center
      }
      .text__container {
        padding-left: .4em
      }
      .album__cover {
        width: 3em
      }
    </style>

    <div id="spotify">

    </div>`;
    let counter = 0;
    setInterval(() => {
      this.renderSpotify(counter);
      counter++;
    }, 4 * 1 * 1000)

  }

  renderSpotify(counter) {
    if (counter === 0) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }

    // e.g. https://batataharra.guru
    fetch(DATA_FOR_SPOTIFY)
      .then((response) => response.json())
      .then(({ isPlaying, data }) => { // isPlaying, author, message

        if (isPlaying) {
          const albumCover = this.getImageBySize(data.album.images, 'medium');
          const albumName = data.album.name;
          const artistName = this.getArtistName(data.artists);
          const spotifyContainer = `
        <div class="spotify__container">
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
          // const track = data.items[0].track;
          // const albumCover = this.getImageBySize(track.album.images, 'small');
          // const albumName = track.album.name;
          // const artistName = this.getArtistName(track.artists);
          const spotifyContainer = `
        <p>
        Not playing
        </p>
        `;
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

customElements.define('currently-playing', CurrentlyPlaying);
