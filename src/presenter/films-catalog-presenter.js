import { RenderPosition, render } from '../framework/render.js';
import ButtonShowMore from '../view/button-show-more.js';
import NoFilmCard from '../view/no-films-card.js';
import FilmsPresenter from './films-presenter.js';
import { getNewAllModelCard } from '../utils/presenter-utils.js';
import { SortType, sortFilmDate, sortFilmRating} from '../utils/filters.js';
import NavMenuPresenter from './nav-menu-presenter.js';
import Sort from '../view/sort.js';
import FilmCommentModel from '../model/film-comment-model.js';
const FILM_COUNT_PER_STEP = 5;
export default class FilmsCatalogPresenter {

  #filmsCardModel =  null;
  #openPopup = {
    open: null,
  };

  #allFilmsModel = [];
  #defaultAllFilmsModal = [];
  #noFilmCard = new NoFilmCard();
  #buttonShowMore = new ButtonShowMore();
  #filmRenderCount = FILM_COUNT_PER_STEP;
  #buttonPlace = null;
  #filmCardPresenters = new Map();
  #navMenuPresenter = new NavMenuPresenter();
  #actualSortType = SortType.DEFAULT;
  #sort = null;
  constructor (){
    this.filmComment = new FilmCommentModel();
  }

  init = (filmContainer, filmsCardModel, body) => {
    this.filmContainer= filmContainer;
    this.body = body;
    this.menuPlace = this.body.querySelector('.main');
    this.#filmsCardModel =  filmsCardModel;
    this.#allFilmsModel = [...this.#filmsCardModel.films];
    this.#defaultAllFilmsModal = [...this.#filmsCardModel.films];
    this.#sort = new Sort();

    this.#buttonPlace = this.body.querySelector('.films-list');
    render(this.#sort, this.menuPlace, RenderPosition.AFTERBEGIN);
    this.#sort.setClickTypeSortHandler(this.#setSortTypeHandler);
    this.#renderFilmsBoard();
  };

  #renderFilmsBoard = ()=>{
    this.#navMenuPresenter.init(this.#allFilmsModel, this.menuPlace);
    if(this.#allFilmsModel.length === 0) {
      render (this.#noFilmCard, this.#buttonPlace);
    }else {
      this.#renderFilms(0, Math.min(this.#allFilmsModel.length-1,FILM_COUNT_PER_STEP));
      if(this.#allFilmsModel.length>FILM_COUNT_PER_STEP){
        render(this.#buttonShowMore,this.#buttonPlace);
        this.#buttonShowMore.setClickMoreFilmHandler(this.clickMoreFilmsButtonHandler);
      }
    }
  };

  clickMoreFilmsButtonHandler = () => {
    this.#renderFilms(this.#filmRenderCount,this.#filmRenderCount+FILM_COUNT_PER_STEP);
    this.#filmRenderCount+=FILM_COUNT_PER_STEP;
    if(this.#filmRenderCount>=this.#allFilmsModel.length){
      this.#buttonPlace.removeChild(this.#buttonShowMore.element);
      this.#buttonShowMore.removeElement();
    }
  };

  #renderFilms = (from, to) =>{
    this.#allFilmsModel.slice(from, to).forEach((film)=>{
      this.#renderFilmCard(this.filmContainer, this.body, film, this.reRenderFilmsCard, this.#openPopup);
    });
  };

  #renderFilmCard = (filmContainer, body, filmModel, renderFilmsCard, openPopup) => {
    const filmPresenter =  new FilmsPresenter(filmContainer, body, renderFilmsCard, openPopup, this.filmComment);
    filmPresenter.init(filmModel);
    this. #filmCardPresenters.set(filmModel.id, filmPresenter);
  };

  reRenderFilmsCard = (updateAllFilmsModel) =>{
    this.#allFilmsModel = getNewAllModelCard(updateAllFilmsModel, this.#allFilmsModel);
    this.#defaultAllFilmsModal = getNewAllModelCard(updateAllFilmsModel, this.#defaultAllFilmsModal);
    this.#clearFilmBoard();
    this.#renderFilmsBoard();
  };

  #clearFilmBoard = () => {
    this. #filmCardPresenters.forEach((filmCard)=> filmCard.destroy());
    this. #filmCardPresenters.clear();
    this.#filmRenderCount = FILM_COUNT_PER_STEP;
    this.#navMenuPresenter.destroy();
    this.#buttonPlace.removeChild(this.#buttonShowMore.element);
    this.#buttonShowMore.removeElement();

  };

  #setSortTypeHandler = (sortType) =>{
    if(this.#actualSortType === sortType){
      return;
    }
    this.#setSortType(sortType);
    this.#clearFilmBoard();
    this.#renderFilmsBoard();
  };

  #setSortType = (sortType) =>{
    switch (sortType) {
      case SortType.DATA:
        this.#allFilmsModel = this.#allFilmsModel.sort(sortFilmDate);
        break;
      case SortType.RATING:
        this.#allFilmsModel = this.#allFilmsModel.sort(sortFilmRating);
        break;
      case SortType.DEFAULT:
        this.#allFilmsModel = [...this.#defaultAllFilmsModal];
        break;
    }
    this.#actualSortType = sortType;
  };
}
