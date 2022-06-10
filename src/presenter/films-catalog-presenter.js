import { RenderPosition, render, remove } from '../framework/render.js';
import ButtonShowMore from '../view/button-show-more.js';
import NoFilmCard from '../view/no-films-card.js';
import FilmsPresenter from './films-presenter.js';
import FilterModel from '../model/filter-model.js';
import { SortType, sortFilmDate, sortFilmRating, UserAction, UpdateType, filter} from '../utils/filters.js';
import NavMenuPresenter from './nav-menu-presenter.js';
import Sort from '../view/sort.js';
import FilmCommentModel from '../model/film-comment-model.js';
const FILM_COUNT_PER_STEP = 5;
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
  constructor (filmContainer, filmsCardModel, body){
    this.filmComment = new FilmCommentModel();
    this.filmContainer = filmContainer;
    this.#filmsCardModel =  filmsCardModel;
    this.body = body;
    this.#buttonPlace = this.body.querySelector('.films-list');
    this.menuPlace = this.body.querySelector('.main');
    this.#filterNavMenu = new FilterModel();
    this.#navMenuPresenter = new NavMenuPresenter(this.#filmsCardModel);
    this.#filmsCardModel.addObserver(this.#handleModelEvent);
    this.#filterNavMenu.addObserver(this.#handleModelEvent);
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
    this.#noFilmCard = new NoFilmCard(this.#filterNavMenu.filter);
    render (this.#noFilmCard, this.#buttonPlace);
  };

  clickMoreFilmsButtonHandler = () => {
    const filmsModelsLength = this.filmsModelsFiltered.length;
    const newRenderFilmsModelsCount = Math.min(filmsModelsLength,this.#filmRenderCount+FILM_COUNT_PER_STEP);
    const films = this.filmsModelsFiltered.slice(this.#filmRenderCount, newRenderFilmsModelsCount);
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
    const filmsModelsLength = this.filmsModelsFiltered.length;
    if(filmsModelsLength === 0) {
      this.#renderNoFilmsCards();

    }else {
      this.#renderSort();
      this.#navMenuPresenter.init(this.menuPlace, this.#filterNavMenu);
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

  #handleViewAction = (actionType, updateType, update, commentInfo, {newComment = false, deleteComment = false}={}) => {

    this.updateFilmCardModel = update;
    if(newComment){
      const comment = this.filmComment.getNewComment(commentInfo);
      this.filmComment.addNewComment(comment);
      this.updateFilmCardModel.comments.push(comment.id);
    }
    if(deleteComment){
      this.filmComment.deleteComment(commentInfo);
      this.updateFilmCardModel = this.#filmsCardModel.deleteCommentId(update, commentInfo);
    }

    switch (actionType){
      case UserAction.ADD_FILMS:
        this.#filmsCardModel.addFilms(updateType, this.updateFilmCardModel);
        break;
      case UserAction.UPDATE_FILMS:
        this.#filmsCardModel.updateFilms(updateType, this.updateFilmCardModel);
        break;
      case UserAction.DELETE_FILM:
        this.#filmsCardModel.deleteFilms(updateType, this.updateFilmCardModel);
        break;
    }

  };

  #handleModelEvent = (updateType, updateInfo) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmCardPresenters.get(updateInfo.id).resetPopup(updateInfo, this.filmComment);
        break;
      case UpdateType.MINOR:
        this.#clearFilmBoard({resetRenderedFilmsCount: true, resetSortType: true});
        this.#renderFilmsBoard();
        if(this.#openPopup.open !==null){
          this.#openPopup.open.getRenderPopup(updateInfo, this.filmComment);
        }
        break;
      case UpdateType.MAJOR:
        this.#clearFilmBoard({resetRenderedFilmsCount: true});
        this.#renderFilmsBoard();
        break;
    }
  };
}
