import Popup from '../view/popup.js';
import { render } from '../framework/render.js';
import { UserAction, UpdateType} from '../utils/filters.js';
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

  getRenderPopup = (filmInfo) => {
    this.filmCardModel = filmInfo;
    this.#popup.reset(this.filmCardModel);
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
          this.#popup.getBlockPopup();
          const updateFilm = this.filmCardModel;
          updateFilm.userDetails.watchList = !updateFilm.userDetails.watchList;
          this.#renderFilmsCard(UserAction.UPDATE_FILM, UpdateType.MINOR, updateFilm);
          break;
        }
        if(evt.target.id === 'watched'){
          this.#popup.getBlockPopup();
          const updateFilm = this.filmCardModel;
          updateFilm.userDetails.alreadyWatched = ! updateFilm.userDetails.alreadyWatched;
          this.#renderFilmsCard(UserAction.UPDATE_FILM, UpdateType.MINOR,  updateFilm);
          break;
        }
        if(evt.target.id === 'favorite'){
          this.#popup.getBlockPopup();
          const updateFilm = this.filmCardModel;
          updateFilm.userDetails.favorite = !updateFilm.userDetails.favorite;
          this.#renderFilmsCard(UserAction.UPDATE_FILM, UpdateType.MINOR, updateFilm);
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

  getBlockPopup =()=>{
    this.#popup.getBlockPopup();
  };

  getErrorActionPopup =(shakeClass)=>{
    const unblockPopup = this.#popup.getUnblockPopup();
    this.#popup.shake(unblockPopup, shakeClass);
  };

  deleteCommentFilm =(deleteCommentId)=> {
    this.filmCardModel.comments = this.filmCardModel.comments.filter((comment)=>comment !== deleteCommentId);
    this.#renderFilmsCard(UserAction.DELETE_COMMENT, UpdateType.PATCH, this.filmCardModel, deleteCommentId);

  };

  submitComment =(filmInfo, newCommentInfo )=>{
    this.#renderFilmsCard(UserAction.ADD_FILM_COMMENT, UpdateType.PATCH, filmInfo, newCommentInfo);
  };


}
