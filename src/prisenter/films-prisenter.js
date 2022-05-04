
import NewFilmCard from '../view/film-card.js';
import { render } from '../render.js';
export default class NewFilmsCatalog {
  #filmsContainer = null;
  #filmsCardModel =  null;
  #allFilmsModel = [];
  init = (filmContener, filmsCardModel ) => {
    this.#filmsContainer = filmContener;
    this.#filmsCardModel =  filmsCardModel;
    this.#allFilmsModel = [...this.#filmsCardModel.films];
    for(let i = 0; i<=this.#allFilmsModel.length-1; i++){
      render(new NewFilmCard(this.#allFilmsModel[i]), this.#filmsContainer);
    }
  };
}
