import { RenderPosition, render, remove } from '../framework/render.js';
import ButtonShowMore from '../view/button-show-more.js';
import NoFilmCard from '../view/no-films-card.js';
import FilmsPresenter from './films-presenter.js';
import FilterModel from '../model/filter-model.js';
import { SortType, sortFilmDate, sortFilmRating, UserAction, UpdateType,ShakeClass ,filter} from '../utils/filters.js';
import NavMenuPresenter from './nav-menu-presenter.js';
import Sort from '../view/sort.js';
import Loading from '../view/loading.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { ControlDetailsFilmCard } from '../utils/popup-and-film-cards-utils.js';
const FILM_COUNT_PER_STEP = 5;
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
export default class FilmsCatalogPresenter {

  #filmsCardModel =  null;
  #openPopup = {
    open: null,
  };

  #currentSortType = SortType.DEFAULT;
  #noFilmCard = null;
  #buttonShowMore = null;
  #filmRenderCount = FILM_COUNT_PER_STEP;
  #buttonPlace = null;
  #filmCardPresenters = new Map();
  #navMenuPresenter = null;
  #filterNavMenu = null;
  #sort = null;
  #loadingView = new Loading();
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);
  constructor (filmContainer, filmsCardModel, body, filmComment){
    this.filmComment = filmComment;
    this.filmContainer = filmContainer;
    this.#filmsCardModel =  filmsCardModel;
    this.body = body;
    this.#buttonPlace = this.body.querySelector('.films-list');
    this.menuPlace = this.body.querySelector('.main');
    this.#filterNavMenu = new FilterModel();
    this.#navMenuPresenter = new NavMenuPresenter();
    this.#filmsCardModel.addObserver(this.#handleModelEvent);
    this.#filterNavMenu.addObserver(this.#handleModelEvent);
    this.filmComment.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#renderFilmsBoard();
  };

  get filmsModelsFiltered () {
    const filmsModelsBase = this.#filmsCardModel.films;
    const filterType = this.#filterNavMenu.filter;
    const filmsModelsFiltered = filter[filterType](filmsModelsBase);
    switch (this.#currentSortType) {
      case SortType.DATA:
        return [...filmsModelsFiltered].sort(sortFilmDate);

      case SortType.RATING:
        return [...filmsModelsFiltered].sort(sortFilmRating);

    }
    return filmsModelsFiltered;
  }

  #renderFilmLoading = () =>{
    render(this.#loadingView, this.filmContainer);

  };

  #renderSort=()=>{
    this.#sort = new Sort(this.#currentSortType);
    render(this.#sort, this.menuPlace, RenderPosition.AFTERBEGIN);
    this.#sort.setClickTypeSortHandler(this.#setSortTypeHandler);
  };

  #renderShowMoreButton = ()=>{
    this.#buttonShowMore = new ButtonShowMore();
    render(this.#buttonShowMore, this.#buttonPlace);
    this.#buttonShowMore.setClickMoreFilmHandler(this.clickMoreFilmsButtonHandler);
  };

  #removeButtonShowMore = ()=>{
    this.#buttonPlace.removeChild(this.#buttonShowMore.element);
    this.#buttonShowMore.removeElement();
  };

  #renderNoFilmsCards = ()=>{
    remove(this.#loadingView);
    this.#noFilmCard = new NoFilmCard(this.#filterNavMenu.filter);
    render (this.#noFilmCard, this.#buttonPlace);
  };

  clickMoreFilmsButtonHandler = () => {
    const filmsModelsLength = this.filmsModelsFiltered.length;
    const filmsModelsFiltered = this.filmsModelsFiltered;
    const newRenderFilmsModelsCount = Math.min(filmsModelsLength,this.#filmRenderCount+FILM_COUNT_PER_STEP);
    const films = filmsModelsFiltered.slice(this.#filmRenderCount, newRenderFilmsModelsCount);
    this.#renderFilms(films);
    this.#filmRenderCount = newRenderFilmsModelsCount;
    if(this.#filmRenderCount >= filmsModelsLength){

      this.#removeButtonShowMore();
    }
  };

  #renderFilms = (films) =>{
    films.forEach((film)=>{
      this.#renderFilmCard(this.filmContainer, this.body, film, this.#openPopup);
    });
  };

  #renderFilmCard = (filmContainer, body, filmModel, openPopup) => {
    const filmPresenter =  new FilmsPresenter(filmContainer, body, this.#handleViewAction, openPopup, this.filmComment);
    filmPresenter.init(filmModel);
    this. #filmCardPresenters.set(filmModel.id, filmPresenter);
  };


  reRenderFilmsCard = () =>{
    this.#clearFilmBoard();
    this.#renderFilmsBoard();
  };

  #renderFilmsBoard = ()=>{
    if(this.#isLoading){
      this.#renderFilmLoading();
      return;
    }
    const filmsModelsLength = this.filmsModelsFiltered.length;
    if(filmsModelsLength === 0) {
      this.#navMenuPresenter.init(this.menuPlace, this.#filterNavMenu, this.#filmsCardModel);
      this.#renderNoFilmsCards();

    }else {
      this.#renderSort();
      this.#navMenuPresenter.init(this.menuPlace, this.#filterNavMenu, this.#filmsCardModel);
      const films = this.filmsModelsFiltered.slice(0, Math.min(filmsModelsLength,this.#filmRenderCount));
      this.#renderFilms(films);
      if(filmsModelsLength > this.#filmRenderCount){
        this.#renderShowMoreButton();
      }
    }
  };

  #clearFilmBoard = ({resetRenderedFilmsCount = false, resetSortType = false}={}) => {
    const filmCount = this.filmsModelsFiltered.length;
    this. #filmCardPresenters.forEach((filmCard)=> filmCard.destroy());
    this. #filmCardPresenters.clear();
    remove(this.#sort);
    remove(this.#buttonShowMore);
    remove(this.#noFilmCard);
    remove(this.#loadingView);
    this.#navMenuPresenter.destroy();

    if(resetRenderedFilmsCount){
      this.#filmRenderCount = FILM_COUNT_PER_STEP;
    }else{
      this.#filmRenderCount = Math.min(filmCount, this.#filmRenderCount);
    }
    if(resetSortType){
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #setSortTypeHandler = (sortType) =>{
    if(this.#currentSortType === sortType){
      return;
    }
    this.#currentSortType = sortType;
    this.#clearFilmBoard({resetRenderedFilmsCount: true});
    this.#renderFilmsBoard();
  };

  #handleViewAction = async (actionType, updateType, update,comment) => {
    this.#uiBlocker.block();
    switch (actionType){
      case UserAction.ADD_FILM_COMMENT:
        this.#openPopup.open.getBlockPopup();
        try{
          await this.filmComment.addNewComment(update, comment);
        }catch (err){
          this.#openPopup.open.getErrorActionPopup(ShakeClass.POPUP);
        }
        break;
      case UserAction.UPDATE_FILM:
        try{
          await this.#filmsCardModel.updateFilms(updateType, update);
        }catch (err){
          if(this.#openPopup.open === null){
            this.#filmCardPresenters.get(update.id).resetFilmCard(ControlDetailsFilmCard.UNBLOCK_CONTROL_PANEL);
          }else{
            this.#openPopup.open.getErrorActionPopup(ShakeClass.POPUP_DETAILS);
          }
        }
        break;
      case UserAction.DELETE_COMMENT:
        this.#openPopup.open.getBlockPopup();
        try{
          await this.filmComment.deleteComment(updateType, update, comment);
        }catch (err){
          this.#openPopup.open.getErrorActionPopup(ShakeClass.POPUP_COMMENTS);
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, updateInfo) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmCardPresenters.get(updateInfo.id).resetPopup(updateInfo);
        break;
      case UpdateType.MINOR:
        if(this.#openPopup.open !==null){
          this.#filmCardPresenters.get(updateInfo.id).resetPopup(updateInfo);
          this.#navMenuPresenter.resetNavMenu(this.#filmsCardModel);
          this.#filmCardPresenters.get(updateInfo.id).resetFilmCard(ControlDetailsFilmCard.UPDATE_CONTROL_PANEL, updateInfo);
          return;
        }
        this.#filmCardPresenters.get(updateInfo.id).resetFilmCard(ControlDetailsFilmCard.UPDATE_CONTROL_PANEL, updateInfo);
        this.#navMenuPresenter.resetNavMenu(this.#filmsCardModel);
        break;
      case UpdateType.MAJOR:
        this.#clearFilmBoard({resetRenderedFilmsCount: true});
        this.#renderFilmsBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingView);
        this.#renderFilmsBoard();
        break;
      case UpdateType.INIT_POPUP:
        this.#filmCardPresenters.get(updateInfo.id).initPopup();
        break;

    }
  };
}
