import FilmCard from '../view/film-card.js';
import { render } from '../framework/render.js';
const EXTRA_MOVIE_CARD = 2;
export default class RatedFilmsPrisenter {
  #filmsContainer = null;
  #filmsCardModel = null;
  #allFilmsModel = [];
  init = (filmContener, filmsCardModel ) => {
    this.#filmsContainer = filmContener;
    this.#filmsCardModel = filmsCardModel;
    this.#allFilmsModel = [...this.#filmsCardModel.films];
    if(+this.#allFilmsModel !== 0) {
      for(let i = 0; i<EXTRA_MOVIE_CARD; i++){
        this.#renderFilmsRated(this.#allFilmsModel[i]);
      }
    }
  };

  #renderFilmsRated = (filmsModel) => {
    const filmCard = new FilmCard(filmsModel);
    render(filmCard, this.#filmsContainer);
  };
}
