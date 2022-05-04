
import NewFilmCard from '../view/film-card.js';
import NewFilmPopup from './popup-prisenter.js';
import NewComment from '../model/film-coment-model.js';
import { render } from '../render.js';
export default class NewFilmsCatalog {
  #filmsContainer = null;
  #filmsCardModel =  null;
  #allFilmsModel = [];
  init = (filmContener, filmsCardModel, body) => {
    this.#filmsContainer = filmContener;
    this.#filmsCardModel =  filmsCardModel;
    this.#allFilmsModel = [...this.#filmsCardModel.films];
    this.body = body;
    for(let i = 0; i<=this.#allFilmsModel.length-1; i++){
      this.#renderFilmCards(this.#allFilmsModel[i]);
    }
  };
  #renderFilmCards = (filmModel) => {
  const filmCard = new NewFilmCard (filmModel);
  filmCard.element.querySelector('.film-card__link').addEventListener('click', ()=>{
    const filmPopupPrisenter = new NewFilmPopup();
    const filmCommentPrisenter = new NewComment();
    this.body.classList.add('hide-overflow')
    filmPopupPrisenter.init(this.body, filmModel, filmCommentPrisenter);
  })
  render(filmCard, this.#filmsContainer);
  }
}
