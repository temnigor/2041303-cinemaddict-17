
import NewFilmCard from '../view/film-card.js';
import NewFilmPopup from './popup-prisenter.js';
import NewComment from '../model/film-coment-model.js';
import { render } from '../render.js';
const footer = document.querySelector('.footer');
export default class NewFilmsCatalog {
  #filmsContainer = null;
  #filmsCardModel =  null;
  #allFilmsModel = [];
  init = (filmContener, filmsCardModel ) => {
    this.#filmsContainer = filmContener;
    this.#filmsCardModel =  filmsCardModel;
    this.#allFilmsModel = [...this.#filmsCardModel.films];
    for(let i = 0; i<=this.#allFilmsModel.length-1; i++){
      this.#renderFilmCards(this.#allFilmsModel[i]);
    }
  };
  #renderFilmCards = (filmModel) => {
  const filmCard = new NewFilmCard (filmModel);
  filmCard.element.querySelector('.film-card__link').addEventListener('click', ()=>{
    const filmPopupPrisenter = new NewFilmPopup();
    const filmCommentPrisenter = new NewComment();
    filmPopupPrisenter.init(footer, filmModel, filmCommentPrisenter);
  })
  filmCard.element.querySelector('.film-card__poster').addEventListener('click', ()=>{
    const filmPopupPrisenter = new NewFilmPopup();
    const filmCommentPrisenter = new NewComment();
    filmPopupPrisenter.init(footer, filmModel, filmCommentPrisenter);
  })

  render(filmCard, this.#filmsContainer);
  }
}
