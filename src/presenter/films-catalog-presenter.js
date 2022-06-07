import { RenderPosition, render, remove } from '../framework/render.js';
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
  #currentSortType = null;
  #noFilmCard = null;
  #buttonShowMore = null;
  #filmRenderCount = FILM_COUNT_PER_STEP;
  #buttonPlace = null;
  #filmCardPresenters = new Map();
  #navMenuPresenter = new NavMenuPresenter();
  #actualSortType = SortType.DEFAULT;
  #sort = null;
  constructor (filmContainer, filmsCardModel, body){
    this.filmComment = new FilmCommentModel();
    this.filmContainer = filmContainer;
    this.#filmsCardModel =  filmsCardModel;
    this.#filmsCardModel.addObserver(this.#handleModelEvent)
    this.body = body;
    this.#buttonPlace = this.body.querySelector('.films-list');
    this.menuPlace = this.body.querySelector('.main');
  }

  init = () => {
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

  #renderSort=()=>{
    this.#sort = new Sort(this.#currentSortType);
    render(this.#sort, this.menuPlace, RenderPosition.AFTERBEGIN);
    this.#sort.setClickTypeSortHandler(this.#setSortTypeHandler);
  }
  #renderShowMoreButton = ()=>{
    this.#buttonShowMore = new ButtonShowMore();
    render(this.#buttonShowMore, this.#buttonPlace);
    this.#buttonShowMore.setClickMoreFilmHandler(this.clickMoreFilmsButtonHandler);
  }
  #removeButtonShowMore = ()=>{
    this.#buttonPlace.removeChild(this.#buttonShowMore.element);
    this.#buttonShowMore.removeElement();
  }
  #renderNoFilmsCards = ()=>{
    this.#noFilmCard = new NoFilmCard();
    render (this.#noFilmCard, this.#buttonPlace);
  }
  clickMoreFilmsButtonHandler = () => {
    const filmsModelsLength = this.filmsModels.length;
    const newRenderFilmsModelsCount = Math.min(filmsModelsLength-1 ,this.#filmRenderCount+FILM_COUNT_PER_STEP)
    const films = this.filmsModels.slice(filmsModelsLength, newRenderFilmsModelsCount)
    this.#renderFilms(films);
    this.#filmRenderCount = newRenderFilmsModelsCount
    if(this.#filmRenderCount >= filmsModelsLength){
    this.#removeButtonShowMore()
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
    const filmsModelsLength = this.filmsModels.length;
    if(filmsModelsLength === 0) {
      this.#renderNoFilmsCards();
      return;
    }else {
      this.#renderSort();
      this.#navMenuPresenter.init(this.filmsModels, this.menuPlace);
      const films = this.filmsModels.slice(0, Math.min(filmsModelsLength-1 ,this.#filmRenderCount))
      this.#renderFilms(films);
      if(filmsModelsLength > this.#filmRenderCount){
      this.#renderShowMoreButton()
      }
    }
  };

  #clearFilmBoard = ({resetRenderedFilmsCount = false, resetSortType = false}={}) => {
    const filmCount = this.filmsModels.length;
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

  #handleViewAction = (actionType, updateType, update, commentInfo {newComment = false, deleteComment = false}={}) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    if(newComment){
    const comment = this.filmComment.getNewComment(commentInfo);
    this.filmComment.addNewComment(comment);
    this.updateFilmCardModel = update;
    this.updateFilmCardModel.comments.push(comment.id);
    };
    if(deleteComment){
      this.filmComment = newComment.updateDeleteComment();
    };
    this.updateFilmCardModel = update;
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
        this.#clearFilmBoard({resetRenderedFilmsCount: true, resetSortType: true});
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
