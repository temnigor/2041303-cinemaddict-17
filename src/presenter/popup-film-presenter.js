import { getNewComment } from '../model/fish-new-comment.js';
import Popup from '../view/popup.js';
import { render } from '../framework/render.js';
import FilmCardModel from '../model/film-card-model.js';
import NavMenuPresenter from './nav-menu-presenter.js';
import { UserAction, UpdateType } from '../utils/filters.js';
export default class PopupFilmPresenter {
  #filmsContainer = null;
  #filmComments = null;
  #popup = null;
  #renderFilmsCard=null;
  constructor (renderFilmsCard){
    this.#renderFilmsCard = renderFilmsCard;
  }

  init = (filmContainer, filmCardModel, filmComments, openPopup) => {
    this.#filmsContainer = filmContainer;
    this.filmCardModel = filmCardModel;
    this.#filmComments = filmComments;
    this.openPopup = openPopup;
    this.#popup = new Popup( this.filmCardModel, this.#filmComments);
    this.changFilmCardModal = new FilmCardModel();
    this.changNavMenu = new NavMenuPresenter();
    render (this.#popup, this.#filmsContainer);
    this.#filmsContainer.classList.add('hide-overflow');
    this.#popup.setCommitCatalogHandler(this.submitComment);
    this.#popup.setDeleteCommentHandler(this.deleteCommentFilm);
    this.#popup.setEventCloseHandler(()=>{
      this.#filmsContainer.classList.remove('hide-overflow');
      this.#filmsContainer.removeChild(this.#popup.element);
      this.#popup.removeElement();
      this.openPopup.open = null;
    });
    this.#getFilmDetailsControlButton();
  };

  #getRenderPopup = () => {
    this.#popup.reset(this.filmCardModel, this.#filmComments);
    this.openPopup.open =  this.#popup;
    this.#filmsContainer.classList.add('hide-overflow');
    this.#popup.setCommitCatalogHandler(this.submitComment);
    this.#popup.setDeleteCommentHandler(this.deleteCommentFilm);
    this.#popup.setEventCloseHandler(()=>{
      this.#filmsContainer.classList.remove('hide-overflow');
      this.openPopup.open = null;
      this.removePopup();
    });
    this.#getFilmDetailsControlButton();
  };


  #getFilmDetailsControlButton = () =>{
    this.#popup.setFilmDetailsControlHandler((evt)=>{
      while(evt.target.id){
        if(evt.target.id === 'watchList'){
          this.filmCardModel.userDetails.watchList = !this.filmCardModel.userDetails.watchList;
          this.#renderFilmsCard(UserAction.UPDATE_FILMS, UpdateType.MINOR, this.filmCardModel);
          this.#getRenderPopup();
          break;
        }
        if(evt.target.id === 'watched'){
          this.filmCardModel.userDetails.alreadyWatched = !this.filmCardModel.userDetails.alreadyWatched;
          this.#renderFilmsCard(UserAction.UPDATE_FILMS, UpdateType.MINOR, this.filmCardModel);
          this.#getRenderPopup();
          break;
        }
        if(evt.target.id === 'favorite'){
          this.filmCardModel.userDetails.favorite = !this.filmCardModel.userDetails.favorite;
          this.#renderFilmsCard(UserAction.UPDATE_FILMS, UpdateType.MINOR, this.filmCardModel);
          this.#getRenderPopup();
          break;
        }
        break;
      }
    });
  };

  get popup (){
    return this.#popup.element;
  }

  removePopup = () =>{
    this.#filmsContainer.removeChild(this.#popup.element);
    this.#popup.removeElement();
  };

  deleteCommentFilm =(filmInfo, allFilmComment)=> {
    this.#renderFilmsCard(UserAction.UPDATE_FILMS,UpdateType.PATCH, filmInfo, allFilmComment);
  };

  submitComment =(newComment, filmInfo)=>{
    this.#renderFilmsCard(UserAction.UPDATE_FILMS,UpdateType.PATCH, filmInfo, newComment);
    this.#getRenderPopup();
  };


}
