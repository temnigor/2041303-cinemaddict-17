import FilmCard from '../view/film-card.js';
import { render } from '../framework/render.js';
const EXTRA_MOVIE_CARD = 2;

export default class MostCommentFilmsPresenter {
  #filmsContainer = null;
  #filmsCardModel = null;
  #allFilmsModel = [];

  init = (filmContainer, filmsCardModel) => {
    this.#filmsContainer = filmContainer;
    this.#filmsCardModel = filmsCardModel;
    this.#allFilmsModel = [...this.#filmsCardModel.films];
    if(+this.#allFilmsModel !== 0) {
      for(let i = 0; i<EXTRA_MOVIE_CARD; i++){
        this.#renderMostCommentFilmCards(this.#allFilmsModel[i]);
      }
    }
  };

  #renderMostCommentFilmCards = (filmModel) => {
    const filmCard = new FilmCard(filmModel);
    render(filmCard, this.#filmsContainer);
  };
}
