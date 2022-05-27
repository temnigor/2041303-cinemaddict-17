import { render } from '../framework/render.js';
import ButtonShowMore from '../view/button-show-more.js';
import NoFilmCard from '../view/no-films-card.js';
import FilmsPrisenter from './films-prisenter.js';
import { getNewAllModelCard } from '../utils/prisenter-utils.js';
import NavMenuPrisenter from './nav-menu-prisenter.js';
const FILM_COUNT_PER_STEP = 5;
export default class FilmsCatalogPrisenter {

  #filmsCardModel =  null;
  #openPopup = {
    open: null,
  };

  #allFilmsModel = [];
  #noFilmCard = new NoFilmCard();
  #buttonShowMore = new ButtonShowMore();
  #filmRenderCount = FILM_COUNT_PER_STEP;
  #buttonPlace = null;
  #filmCardPrisenter = new Map();
  #navMenuPrisenter = new NavMenuPrisenter();

  init = (filmContener, filmsCardModel, body) => {
    this.filmContener= filmContener;
    this.body = body;
    this.navMenuPlace = this.body.querySelector('.main');
    this.#filmsCardModel =  filmsCardModel;
    this.#allFilmsModel = [...this.#filmsCardModel.films];
    this.#buttonPlace = this.body.querySelector('.films-list');
    this.#renderFilmsBoard();
  };

  #renderFilmsBoard = ()=>{
    this.#navMenuPrisenter.init(this.#allFilmsModel, this.navMenuPlace);
    if(this.#allFilmsModel.length === 0) {
      render (this.#noFilmCard, this.#buttonPlace);
    }else {
      this.#renderFilms(0, Math.min(this.#allFilmsModel.length-1,FILM_COUNT_PER_STEP));
      if(this.#allFilmsModel.length>FILM_COUNT_PER_STEP){
        render(this.#buttonShowMore,this.#buttonPlace);
        this.#buttonShowMore.setClickMoreFilmHandler(this.#setClickMoreFilmsButton);
      }
    }
  };

  #setClickMoreFilmsButton = () => {
    this.#renderFilms(this.#filmRenderCount,this.#filmRenderCount+FILM_COUNT_PER_STEP);
    this.#filmRenderCount+=FILM_COUNT_PER_STEP;
    if(this.#filmRenderCount>=this.#allFilmsModel.length){
      this.#buttonPlace.removeChild(this.#buttonShowMore.element);
      this.#buttonShowMore.removeElement();
    }
  };

  #renderFilms = (from, to) =>{
    this.#allFilmsModel.slice(from, to).forEach((film)=>{
      this.#renderFilmCard(this.filmContener, this.body, film, this.reRenderFilmsCard, this.#openPopup);
    });
  };

  #renderFilmCard = (filmContener, body, filmModel, renderFilmsCard, openPopup) => {
    const filmPrisenter =  new FilmsPrisenter(filmContener, body, renderFilmsCard, openPopup);
    filmPrisenter.init(filmModel);
    this.#filmCardPrisenter.set(filmModel.id, filmPrisenter);
  };

  reRenderFilmsCard = (updateAllFilmsModel) =>{
    this.#allFilmsModel = getNewAllModelCard(updateAllFilmsModel, this.#allFilmsModel);
    this.#clearFilmBoard();
    this.#renderFilmsBoard();
  };

  #clearFilmBoard = () => {
    this.#filmCardPrisenter.forEach((filmCard)=> filmCard.destroy());
    this.#filmCardPrisenter.clear();
    this.#filmRenderCount = FILM_COUNT_PER_STEP;
    this.#navMenuPrisenter.destroy();
    this.#buttonPlace.removeChild(this.#buttonShowMore.element);
    this.#buttonShowMore.removeElement();

  };
}
