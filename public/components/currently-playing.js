
const DATA_FOR_SPOTIFY = `https://wpshortcuts.studio/wp-json/spotify/v1/playing/2`;

class CurrentlyPlaying extends HTMLElement {
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
      .position-relative {
        position: relative !important;
      }
      .spotify__container {
        display: flex;
        align-items: center;
        padding: .4em .4em 0 .4em
      }
      .profile__picture {
        width: 150px;
        height: 150px;
        box-shadow: var(--box-shadow);
        border-radius: 50%;
        margin-bottom: 1em;
        position: relative;
        top: -176px;
        left: 27px;
      }
      .story {
        height: 204px;
        width: 204px;
      }
      .story svg {
        display: block;
        fill: none;
        stroke: #8a3ab8;
        stroke-width: 2px;
        stroke-dasharray: 1;
        stroke-dashoffset: 0;
        stroke-linecap: round;
        animation: loading 3000ms ease-in-out infinite alternate;
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
      .user__status__container {
        display: none;
      }
      /* desktop styles
     ========================================================================== */
      @media screen and (min-width: 450px) {
        /* desktop only feature, show currently playing song */
        .story {
          height: initial;
          width: initial;
        }
        .story > svg {
          display: none;
        }
        .profile__picture {
          width: 200px;
          height: 200px;
          margin-right: 2em;
          margin-bottom: unset;
          position: initial;
          top: initial;
          left: initial;
        }
        .user__status__container {
          display: block;
        }
        .user__status__circle__badge__container {
          bottom: 0;
          height: 38px;
          width: 38px;
          left: 100%;
          margin-bottom: 32px;
          margin-left: -90px;
          position: absolute;
          z-index: 2;
          box-shadow: var(--box-shadow);
          border-radius: 50px;
          background-color: var(--background-color);
        }
        .user__status__circle__badge__container:not(:hover) {
          display: inline-flex;
          justify-content: center;
        }
        .user__status__circle__badge__container:hover {
          border-radius: 18px;
          height: 115px;
          max-width: 544px;
          top: -70px;
          width: auto;
        }
        .user__status__circle__badge__container:not(:hover)
          .user__status__circle__badge {
          display: inline-flex;
          align-items: center;
        }
        .music__icon {
          background-image: url(../images/music-note-outline-white-bg.gif);
          background-size: cover;
          object-fit: cover;
          width: 38px;
          height: 38px;
          position: absolute;
          top: 0;
          left: 0;
        }
        .user__status__circle__badge__container:is(:hover) .music__icon:before {
          content: "Listening to";
          width: 100%;
          position: relative;
          white-space: nowrap;
          font-family: "IBM Plex Serif";
          font-size: 1rem;
          left: 2.4em;
          top: -8px;
          font-style: initial;
        }
        .dark .music__icon {
          background-image: url(../images/music-note-outline-dark-bg.gif);
        }
        .user__status__circle__badge__container .user__status__inner__wrapper {
          width: 0;
          padding-top: 1.2em !important;
          overflow: hidden;
          line-height: 0px;
          opacity: 0;
        }
        .user__status__circle__badge__container:hover .user__status__inner__wrapper {
          width: 100%;
          opacity: 1;
          line-height: 20px;
        }
      }
      @keyframes loading {
        100% {
          stroke: rgb(148 136 195 / 70%);
          stroke-dasharray: 3;
          transform: rotate(200deg);
        }
      }
    </style>
    <div class="story">
      <svg viewbox="0 0 100 100">
        <circle cx="50" cy="50" r="40" />
      </svg>
      <img class="profile__picture" src="/images/Profit_Picture.png" alt="Kevin Abou Hanna profile picture">
    </div>
    <div id="user-status" class="user__status__container position-relative">

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
    fetch(DATA_FOR_SPOTIFY)
      .then((response) => response.json())
      .then(({ isPlaying, data }) => { // isPlaying, author, message

        if (isPlaying) {
          const albumCover = this.getImageBySize(data.album.images, 'small');
          const albumName = data.album.name;
          const artistName = this.getArtistName(data.artists);
          const spotifyContainer = `
          <div class="user__status__circle__badge__container ${isLight ? ' light ' : ' dark '}">
            <div class="user__status__circle__badge">
              <i class="music__icon"></i>
              <div class="user__status__inner__wrapper">
                <div id="spotify">
                  <div class="spotify__container">
                  <img class="album__cover" title="${albumName}" src="${albumCover}" />
                  <div class="text__container">
                    <div class="song__name">${data.name}</div>
                    <div class="artist__name">${artistName}</div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        `;
          if (counter === 0) {
            this.shadowRoot.querySelector("#user-status").insertAdjacentHTML("afterbegin", spotifyContainer);
          } else {
            this.shadowRoot.querySelector("#user-status").innerHTML = spotifyContainer;
          }
        } else {
          // const track = data.items[0].track;
          // const albumCover = this.getImageBySize(track.album.images, 'small');
          // const albumName = track.album.name;
          // const artistName = this.getArtistName(track.artists);
          const spotifyContainer = ``;
          if (counter === 0) {
            this.shadowRoot.querySelector("#user-status").insertAdjacentHTML("afterbegin", spotifyContainer);
          } else {
            this.shadowRoot.querySelector("#user-status").innerHTML = spotifyContainer;
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
