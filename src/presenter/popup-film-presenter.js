import { getNewComment } from '../model/fish-new-comment.js';
import Popup from '../view/popup.js';
import { render } from '../framework/render.js';
import FilmCardModel from '../model/film-card-model.js';
import NavMenuPresenter from './nav-menu-presenter.js';
export default class PopupFilmPresenter {
  #filmsContainer = null;
  #filmComments = null;
  #popup = null;

  init = (filmContainer, filmCardModel, filmComments, renderFilmsCard, openPopup) => {
    this.#filmsContainer = filmContainer;
    this.filmCardModel = filmCardModel;
    this.#filmComments = filmComments;
    this.renderFilmsCard = renderFilmsCard;
    this.openPopup = openPopup;
    this.#popup = new Popup( this.filmCardModel, this.#filmComments);
    this.changFilmCardModal = new FilmCardModel();
    this.changNavMenu = new NavMenuPresenter();
    render (this.#popup, this.#filmsContainer);
    this.#filmsContainer.classList.add('hide-overflow');
    this.#popup.setCommitCatalogHandler(this.submitComment);
    this.#popup.setDeleteCommentHandler(this.updateFilm);
    this.#popup.setEventCloseHandler(()=>{
      this.#filmsContainer.classList.remove('hide-overflow');
      this.#filmsContainer.removeChild(this.#popup.element);
      this.#popup.removeElement();
      this.openPopup.open = null;
    });
    this.#getFilmDetailsControlButton();
  };

  #getRenderPopup = () => {
    console.log(this.filmCardModel)
    this.#popup.reset(this.filmCardModel, this.#filmComments);
    this.openPopup.open =  this.#popup;
    this.#filmsContainer.classList.add('hide-overflow');
    this.#popup.setCommitCatalogHandler(this.submitComment);
    this.#popup.setDeleteCommentHandler(this.updateFilm);
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
          this.renderFilmsCard(this.filmCardModel);
          this.#getRenderPopup();
          break;
        }
        if(evt.target.id === 'watched'){
          this.filmCardModel.userDetails.alreadyWatched = !this.filmCardModel.userDetails.alreadyWatched;
          this.renderFilmsCard(this.filmCardModel);
          this.#getRenderPopup();
          break;
        }
        if(evt.target.id === 'favorite'){
          this.filmCardModel.userDetails.favorite = !this.filmCardModel.userDetails.favorite;
          this.renderFilmsCard(this.filmCardModel);
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

  updateFilm =(filmInfo, allFilmComment)=> {
    this.#filmComments.reBindComments(allFilmComment);
    this.filmCardModel = filmInfo;
    this.renderFilmsCard(this.filmCardModel);
  };

  submitComment =(newComment, filmInfo)=>{
    const comment = getNewComment(newComment);
    this.#filmComments.addNewComment(comment);
    this.filmCardModel = filmInfo;
    this.filmCardModel.comments.push(comment.id);
    console.log(this.filmCardModel)
    this.renderFilmsCard(this.filmCardModel);
    this.#getRenderPopup();
  };


}
