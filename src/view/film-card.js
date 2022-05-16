import AbstractView from '../framework/view/abstract-view.js';
import { getReleaseYear, getRuntime, getNormalList, getNormalDescription} from '../utils.js';

const getDomFilmCard = (filmInfo) => {
  const {
    comments,
    filmInfo:{title, totalRating, poster,
      release:{date},
      runtime,
      genre :allGenre,
      description}
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
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
</div>
</article>`);
};

export default class NewFilmCard extends AbstractView{
  #filmInfo = null;
  constructor( filmInfo) {
    super();
    this.#filmInfo = filmInfo;
  }

  get template() {
    return getDomFilmCard(this.#filmInfo);
  }
}
