import AbstractView from '../framework/view/abstract-view.js';
import {
  getRuntime,
  getReleaseDate,
  getGenreList,
  getNormalList,
  getDateComment,
  getFilmDetailsControlActive,
} from '../utils/popup-and-film-cards-utils.js';
const getComment = (comments) => {
  const commentsList = comments.map((commentInfo) => {
    const {
      author,
      comment,
      date,
      emotion
    } = commentInfo;
    const normalDate = getDateComment(date);
    const commentDom = `<li class="film-details__comment">
<span class="film-details__comment-emoji">
  <img src="./images/emoji/${emotion}.png" alt="emoji-${emotion}" width="55" height="55">
</span>
<div>
  <p class="film-details__comment-text">${comment}</p>
  <p class="film-details__comment-info">
    <span class="film-details__comment-author">${author}</span>
    <span class="film-details__comment-day">${normalDate}</span>
    <button class="film-details__comment-delete">Delete</button>
  </p>
</div>
</li>`;
    return commentDom;
  }).join(' ');
  return commentsList;
};


const getDomPopup = (filmInfo, comments) => {
  const {

    filmInfo:{title, alternativeTitle, totalRating, poster, ageRating, director,
      writers:allWriters,
      actors:allActors,
      release:{date, releaseCountry},
      runtime,
      genre,
      description
    },
    userDetails,
  } = filmInfo;
  const normalWriters = getNormalList(allWriters);
  const normalActors = getNormalList(allActors);
  const runtimeHourMinute = getRuntime(runtime);
  const normalGenre = getGenreList(genre);
  const normalDate = getReleaseDate(date);
  const commentsList = getComment(comments);
  return ( `<section class="film-details">
<form class="film-details__inner" action="" method="get">
  <div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src=${poster} alt="">

        <p class="film-details__age">${ageRating}+</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${alternativeTitle}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${totalRating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tbody><tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${normalWriters}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${normalActors}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${normalDate}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${runtimeHourMinute}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Genres</td>
            <td class="film-details__cell">
              ${normalGenre}
          </tr>
        </tbody></table>

        <p class="film-details__film-description">
          ${description}
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <button type="button" class="film-details__control-button ${getFilmDetailsControlActive(userDetails.watchList)} film-details__control-button--watchList" id="watchList" name="watchList">Add to watchlist</button>
      <button type="button" class="film-details__control-button ${getFilmDetailsControlActive(userDetails.alreadyWatched)} film-details__control-button--watched" id="watched" name="watched">Already watched!</button>
      <button type="button" class="film-details__control-button ${getFilmDetailsControlActive(userDetails.favorite)} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>

  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      <ul class="film-details__comments-list">
        ${commentsList}
      </ul>

      <div class="film-details__new-comment">
        <div class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" alt="emoji" width="30" height="30">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" alt="emoji" width="30" height="30">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" alt="emoji" width="30" height="30">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" alt="emoji" width="30" height="30">
          </label>
        </div>
      </div>
    </section>
  </div>
</form>
</section>`);
};


export default class Popup extends AbstractView {
  #filmInfo = null;
  #filmComment = null;
  constructor(filmInfo, filmComment) {
    super();
    this.#filmInfo = filmInfo;
    this.#filmComment = filmComment;
    this.buttonFilmDetailsControls = this.element.querySelector('.film-details__close-btn');
  }

  get template() {
    return getDomPopup(this.#filmInfo, this.#filmComment);
  }

  setEventCloseHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', (evt) =>{
      evt.preventDefault();
      this.#removeElementAndEvent();
    });
    document.addEventListener('keydown',this.#removeElementAndEventKeydown);
  };

  #removeElementAndEventKeydown = (evt) => {
    if(evt.code === 'Escape'){
      evt.preventDefault();
      this.#removeElementAndEvent();
    }
  };

  #removeElementAndEvent = () => {
    this._callback.click();
    document.removeEventListener('keydown', this.#removeElementAndEventKeydown);
  };

  setFilmDetailsControlHandler = (callback)=>{
    this._callback.clickFilmDetailsControl = callback;
    this.element.querySelector('.film-details__controls').addEventListener('click', this.#addDetailsControl);
  };

  #addDetailsControl = (evt)=>{
    evt.preventDefault();
    this._callback.clickFilmDetailsControl(evt);
  };
}
