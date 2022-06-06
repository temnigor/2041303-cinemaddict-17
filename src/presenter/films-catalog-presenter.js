import { RenderPosition, render } from '../framework/render.js';
import ButtonShowMore from '../view/button-show-more.js';
import NoFilmCard from '../view/no-films-card.js';
import FilmsPresenter from './films-presenter.js';
import { getNewAllModelCard } from '../utils/presenter-utils.js';
import { SortType, sortFilmDate, sortFilmRating, UserAction, UpdateType} from '../utils/filters.js';
import NavMenuPresenter from './nav-menu-presenter.js';
import Sort from '../view/sort.js';
import FilmCommentModel from '../model/film-comment-model.js';
const FILM_COUNT_PER_STEP = 5;
export default class FilmsCatalogPresenter {

  #filmsCardModel =  null;
  #openPopup = {
    open: null,
  };

  #noFilmCard = new NoFilmCard();
  #buttonShowMore = new ButtonShowMore();
  #filmRenderCount = FILM_COUNT_PER_STEP;
  #buttonPlace = null;
  #filmCardPresenters = new Map();
  #navMenuPresenter = new NavMenuPresenter();
  #actualSortType = SortType.DEFAULT;
  #sort = null;
  constructor (filmContainer, filmsCardModel){
    this.filmComment = new FilmCommentModel();
    this.filmContainer = filmContainer;
    this.#filmsCardModel =  filmsCardModel;
    this.#filmsCardModel.addObserver(this.#handleModelEvent)
  }

  init = (body) => {
    this.body = body;
    this.menuPlace = this.body.querySelector('.main');
    this.#sort = new Sort();

    this.#navMenuPresenter.init(this.filmsModels, this.menuPlace);
    this.#buttonPlace = this.body.querySelector('.films-list');
    render(this.#sort, this.menuPlace, RenderPosition.AFTERBEGIN);
    this.#sort.setClickTypeSortHandler(this.#setSortTypeHandler);
    this.#renderFilmsBoard();
  };

  get filmsModels () {
    switch (SortType) {
      case SortType.DATA:
        return [...this.#filmsCardModel].sort(sortFilmDate);

      case SortType.RATING:
        return [...this.#filmsCardModel].sort(sortFilmRating);

      }
    return this.#filmsCardModel.films;
  }

  #renderFilmsBoard = ()=>{
    const filmsModelsLength = this.filmsModels.length;
    if(filmsModelsLength === 0) {
      render (this.#noFilmCard, this.#buttonPlace);
    }else {
      const films = this.filmsModels.slice(0, Math.min(filmsModelsLength-1 ,this.#filmRenderCount))
      this.#renderFilms(films);
      if(filmsModelsLength > FILM_COUNT_PER_STEP){
        render(this.#buttonShowMore, this.#buttonPlace);
        this.#buttonShowMore.setClickMoreFilmHandler(this.clickMoreFilmsButtonHandler);
      }
    }
  };

  clickMoreFilmsButtonHandler = () => {
    const filmsModelsLength = this.filmsModels.length;
    const newRenderFilmsModelsCount = Math.min(filmsModelsLength-1 ,this.#filmRenderCount+FILM_COUNT_PER_STEP)
    const films = this.filmsModels.slice(filmsModelsLength, newRenderFilmsModelsCount)
    this.#renderFilms(films);
    this.#filmRenderCount = newRenderFilmsModelsCount
    if(this.#filmRenderCount >= filmsModelsLength){
      this.#buttonPlace.removeChild(this.#buttonShowMore.element);
      this.#buttonShowMore.removeElement();
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


  reRenderFilmsCard = (updateAllFilmsModel) =>{
    //this.#allFilmsModel = getNewAllModelCard(updateAllFilmsModel, this.#allFilmsModel);
    //this.#defaultAllFilmsModal = getNewAllModelCard(updateAllFilmsModel, this.#defaultAllFilmsModal);
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
    this.#actualSortType = sortType;
    this.#clearFilmBoard();
    this.#renderFilmsBoard();
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType){
      case UserAction.ADD_FILMS:
      this.#filmsCardModel.addFilms(updateType, update);
      break;
      case UserAction.UPDATE_FILMS:
      this.#filmsCardModel.updateFilms(updateType, update);
      break;
      case UserAction.DELETE_FILM:
      this.#filmsCardModel.deleteFilms(updateType, update);
      break;
    }

  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)\
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#filmCardPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearFilmBoard();
        this.#renderFilmsBoard();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearFilmBoard();
        this.#renderFilmsBoard();
        break;
    }
  };
}
