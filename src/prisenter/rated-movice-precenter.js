import NewFilmCard from '../view/film-card.js';
import { render } from '../render.js';
const EXTRA_MOVIE_CARD = 1;
export default class NewFilmsCatalogRated {
  init = (filmContener, moviceCardModel ) => {
    this.filmsContainer = filmContener;
    this.moviceCardModel = moviceCardModel;
    this.allMoviceModel = [...this.moviceCardModel.getMovice()];
    for(let i = 0; i<=EXTRA_MOVIE_CARD; i++){
      render(new NewFilmCard(this.allMoviceModel[i]), this.filmsContainer);
    }
  };
}
