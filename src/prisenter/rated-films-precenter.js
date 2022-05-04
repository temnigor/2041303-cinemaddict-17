import NewFilmCard from '../view/film-card.js';
import { render } from '../render.js';
const EXTRA_MOVIE_CARD = 2;
export default class NewFilmsCatalogRated {
  #filmsContainer = null;
  #filmsCardModel = null;
  #allFilmsModel = [];
  init = (filmContener, filmsCardModel ) => {
    this.#filmsContainer = filmContener;
    this.#filmsCardModel = filmsCardModel;
    this.#allFilmsModel = [...this.#filmsCardModel.films];
    for(let i = 0; i<EXTRA_MOVIE_CARD; i++){
      render(new NewFilmCard(this.#allFilmsModel[i]), this.#filmsContainer);
    }
  };
}
