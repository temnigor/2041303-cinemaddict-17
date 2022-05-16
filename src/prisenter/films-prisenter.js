
import NewFilmCard from '../view/film-card.js';
import NewFilmPopup from './popup-film-prisenter.js';
import NewComment from '../model/film-coment-model.js';
import { render } from '../framework/render.js';
import NewButtonShowMore from '../view/button-show-more.js';
import NewNoFilmCard from '../view/no-films-card.js';
const FILM_COUNT_PER_STEP = 5;
export default class NewFilmsCatalog {
  #filmsContainer = null;
  #filmsCardModel =  null;
  #allFilmsModel = [];
  #noFilmCard = new NewNoFilmCard();
  #buttonShowMore = new NewButtonShowMore();
  #filmRenderCount = FILM_COUNT_PER_STEP;
  #buttonPlace = null;

  init = (filmContener, filmsCardModel, body) => {
    this.#filmsContainer = filmContener;
    this.#filmsCardModel =  filmsCardModel;
    this.#allFilmsModel = [...this.#filmsCardModel.films];
    this.body = body;
    this.#buttonPlace = this.body.querySelector('.films-list');
    if(this.#allFilmsModel.length === 0) {
      render (this.#noFilmCard, this.#buttonPlace);
    }else {
      for(let i = 0; i<Math.min(this.#allFilmsModel.length-1,FILM_COUNT_PER_STEP) ; i++){
        this.#renderFilmCards(this.#allFilmsModel[i]);
      }
      if(this.#allFilmsModel.length>FILM_COUNT_PER_STEP){
        render(this.#buttonShowMore,this.#buttonPlace);
        this.#buttonShowMore.clickHandlerMoreFilm(() => {
          this.#allFilmsModel.slice(this.#filmRenderCount, this.#filmRenderCount+FILM_COUNT_PER_STEP)
            .forEach((filmModel)=> this.#renderFilmCards(filmModel));
          this.#filmRenderCount+=FILM_COUNT_PER_STEP;
          if(this.#filmRenderCount>=this.#allFilmsModel.length){
            this.#buttonPlace.removeChild(this.#buttonShowMore.element);
            this.#buttonShowMore.removeElement();
          }
        });
      }
    }
  };

  #renderFilmCards = (filmModel) => {
    const filmCard = new NewFilmCard (filmModel);
    filmCard.clikcOpenPopup(()=>{
      const filmPopupPrisenter = new NewFilmPopup();
      const filmCommentPrisenter = new NewComment();
      this.body.classList.add('hide-overflow');
      filmPopupPrisenter.init(this.body, filmModel, filmCommentPrisenter);
    });
    render(filmCard,this.#filmsContainer);
  };
}
