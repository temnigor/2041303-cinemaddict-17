import NewFilmCard from '../view/film-card.js';
import { render } from '../render.js';
const EXTRA_MOVIE_CARD = 2;

export default class NewFilmsCatalogMostComment {
  #filmsContainer = null;
  #filmsCardModel = null;
  #allFilmsModel = [];

  init = (filmContener, filmsCardModel) => {
    this.#filmsContainer = filmContener;
    this.#filmsCardModel = filmsCardModel;
    this.#allFilmsModel = [...this.#filmsCardModel.films];
    if(+this.#allFilmsModel !== 0) {
      for(let i = 0; i<EXTRA_MOVIE_CARD; i++){
        this.#renderMostCommentFilmCards(this.#allFilmsModel[i]);
      }
    }
  };

  #renderMostCommentFilmCards = (filmModel) => {
    const filmCard = new NewFilmCard(filmModel);
    render(filmCard, this.#filmsContainer);
  };
}
