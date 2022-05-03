import NewFilmCard from '../view/film-card.js';
import { render } from '../render.js';
const EXTRA_MOVIE_CARD = 3;
export default class NewFilmsCatalogMostComment {
  init = (filmContener, ) => {
this.filmsContainer = filmContener;
for(let i = 1; i<EXTRA_MOVIE_CARD; i++){
  render(new NewFilmCard(), this.filmsContainer);
}
  }
}
