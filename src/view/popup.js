import { createElement} from '../framework/render.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {
  getRuntime,
  getReleaseDate,
  getGenreList,
  getNormalList,
  getDateComment,
  getFilmDetailsControlActive,
  EMOJI
} from '../utils/popup-and-film-cards-utils.js';
const KeyForSubmit = [
  'ControlLeft',
  'Enter',
  'Command'
]
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


const getDomPopup = (filmInfo, comments, emoji) => {
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
const {
  smile,
  sleeping,
  puke,
  angry,
} = emoji;
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
      <button type="button" class="film-details__control-button ${getFilmDetailsControlActive(userDetails.alreadyWatched)} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
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
        <div class="film-details__add-emoji-label">
        </div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${smile} >
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" alt="emoji" width="30" height="30">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${sleeping}>
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" alt="emoji" width="30" height="30">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${puke}>
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" alt="emoji" width="30" height="30">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${angry}>
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
const addImagEmojiChios = (imgInfo) =>{
  return `<img src=${imgInfo.src} alt=${imgInfo.alt} width="55" height="55"></img>`
}

export default class Popup extends AbstractStatefulView {
  #filmInfo = null;
  #allFilmComment = null;
  #filmAddEmoji= null;
  #filmEmojiList = null;
  #filmComment = null;
  #keyPressedForSubmit = new Set();
  constructor(filmInfo, filmComment) {
    super();
    this.#filmInfo = [filmInfo];
    this.#filmComment = filmComment;
    this._state.comments = Popup.parseAllCommentsToState(this.#filmComment.comments);
    this._state.filmInfo = Popup.parseAllCommentsToState(this.#filmInfo);
    this._state.emoji = EMOJI;
    this.#allFilmComment = this.#getNeedComment(this._state.comments,  this._state.filmInfo[0]) ;
    this.buttonFilmDetailsControls = this.element.querySelector('.film-details__close-btn');
    this.#filmAddEmoji = this.element.querySelector('.film-details__add-emoji-label');
    this.#filmEmojiList = this.element.querySelector('.film-details__emoji-list');
  }

  get template() {
    return getDomPopup(this._state.filmInfo[0], this.#allFilmComment, this._state.emoji);
  }

  #getEmojiTemplate =(evtTarget)=>{
  return addImagEmojiChios(evtTarget)
}

  #getNeedComment = (allFilmComments, filmsModel) => {
    console.log(allFilmComments)
  const keyFilmsComments = filmsModel.comments;
  const needComments = [];
  keyFilmsComments.forEach((oneKey)=>{
    for(const comment of allFilmComments){
      if(oneKey === Number(comment.id)){
        needComments.push(comment);
      }
    }
  });
  return needComments;
};

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
    document.removeEventListener('keydown', this.#submitHandler);
    document.removeEventListener('keyup', this.#deleteUpKey);

  };

  setFilmDetailsControlHandler = (callback)=>{
    this._callback.clickFilmDetailsControl = callback;
    this.element.querySelector('.film-details__controls').addEventListener('click', this.#addDetailsControl);
  };

  #addDetailsControl = (evt)=>{
    evt.preventDefault();
    this._callback.clickFilmDetailsControl(evt);
  };

#submitHandler = (evt)=>{
  evt.preventDefault();
  this.#keyPressedForSubmit.add(evt.code);
  let pressedKeys = Array.from(this.#keyPressedForSubmit);
    if (pressedKeys[0] === KeyForSubmit[0] && pressedKeys[1] === KeyForSubmit[1]
      || pressedKeys[0] === KeyForSubmit[3] && pressedKeys[1] === KeyForSubmit[1]) {
      this.#keyPressedForSubmit.clear();
      pressedKeys = Array.from(this.#keyPressedForSubmit);

      console.log(this._state)
      alert('ok')
      return;
    }
  }

#deleteUpKey = (evt)=>{
  this.#keyPressedForSubmit.delete(evt.code);
};

  setCommitCatalogHandler =(callback)=>{
    this._callback.emoji = callback;
    document.addEventListener('keydown', this.#submitHandler);
    document.addEventListener('keyup', this.#deleteUpKey);
    this.element.querySelector('.film-details__comments-list').addEventListener('click', this.#deleteComment);
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#chiosEmoji);
  };

  #chiosEmoji = (evt) =>{
    evt.preventDefault();
    const x = evt.target.parentElement.control.value
    console.log(this._state.emoji[toString(x)])
    console.log(evt.target.parentElement.control.value)
    //console.log(this.#filmEmojiList.querySelector('input:checked'));
    if(this.#filmAddEmoji.querySelector('img')){
      this.#filmAddEmoji.removeChild(this.#filmAddEmoji.querySelector('img'));
    }
    this.#filmAddEmoji.appendChild(createElement(this.#getEmojiTemplate(evt.target)));
    return
  };

  #deleteComment =(evt)=>{
    if(evt.target.localName === 'button'){
      evt.preventDefault();
    console.log(evt.target.localName);
  }
  }

  static parseAllCommentsToState = (allComments) => [...allComments];

  static parseStateToAllComments = (state) => [...state];
}


