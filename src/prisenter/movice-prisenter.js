
import NewFilmCard from '../view/film-card.js';
import { render } from '../render.js';
export default class NewFilmsCatalog {
  init = (filmContener, moviceCardModel ) => {
this.filmsContainer = filmContener;
this.moviceCardModel = moviceCardModel;
this.allMoviceModel = [...this.moviceCardModel.getMovice()];
for(let i = 0; i<=this.allMoviceModel.length-1; i++){
render(new NewFilmCard(this.allMoviceModel[i]), this.filmsContainer);
}
  }
}
