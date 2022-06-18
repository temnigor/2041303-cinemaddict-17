import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getReleaseYear, getRuntime, getNormalList, getNormalDescription, getFilmCardControlActive,} from '../utils/popup-and-film-cards-utils.js';

const getDomFilmCard = (filmInfo, isDisabled) => {
  const {
    comments,
    filmInfo:{title, totalRating, poster,
      release:{date},
      runtime,
      genre :allGenre,
      description},
    userDetails
  } = filmInfo;
  const normalGenre = getNormalList(allGenre);
  const normalDescription = getNormalDescription(description);
  const releaseDate = getReleaseYear(date);
  const runtimeHourMinute = getRuntime(runtime);
  return (  `<article class="film-card">
<a class="film-card__link">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${totalRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${releaseDate}</span>
    <span class="film-card__duration">${runtimeHourMinute}</span>
    <span class="film-card__genre">${normalGenre}</span>
  </p>
  <img src=${poster} alt="" class="film-card__poster">
  <p class="film-card__description">${normalDescription}</p>
  <span class="film-card__comments">${comments.length} comments</span>
</a>
<div class="film-card__controls">
  <button  class="film-card__controls-item film-card__controls-item--add-to-watchlist ${getFilmCardControlActive(userDetails.watchList)}" id="watchListCard" type="button" ${isDisabled ? 'disabled' : ''}>Add to watchList</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${getFilmCardControlActive(userDetails.alreadyWatched)}" id="watchedCard" type="button" ${isDisabled ? 'disabled' : ''}>Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite ${getFilmCardControlActive(userDetails.favorite)}" id="favoriteCard" type="button" ${isDisabled ? 'disabled' : ''}>Mark as favorite</button>
</div>
</article>`);
};

export default class FilmCard extends AbstractStatefulView{
  #filmInfo = null;
  #isDisabled = false;
  constructor( filmInfo) {
    super();
    this.#filmInfo = filmInfo;
  }

  get template() {
    return getDomFilmCard(this.#filmInfo, this.#isDisabled);
  }

  setClickOpenPopupHandler = (callback ) =>{
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#setClickHandler);
  };

  #setClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setFilmDetailsControlHandler = (callback)=>{
    this._callback.clickFilmDetailsControl = callback;
    this.element.querySelector('.film-card__controls').addEventListener('click', this.#addDetailsControl);
  };

  #addDetailsControl = (evt)=>{
    evt.preventDefault();
    this._callback.clickFilmDetailsControl(evt);
  };

  reset =(filmInfo, disabled=false)=>{
    this.#filmInfo = filmInfo;
    this.#isDisabled = disabled;
    this.updateElement(this.#filmInfo);

  };

  _restoreHandlers =()=>{
    this.element.querySelector('.film-card__controls').addEventListener('click', this.#addDetailsControl);
    this.element.querySelector('.film-card__link').addEventListener('click', this.#setClickHandler);
  };

}
