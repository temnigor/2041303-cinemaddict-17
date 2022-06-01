
import Popup from '../view/popup.js';
import { render } from '../framework/render.js';
import FilmCardModel from '../model/film-card-model.js';
import NavMenuPresenter from './nav-menu-presenter.js';
export default class PopupFilmPresenter {
  #filmsContainer = null;
  #filmComments = null;
  #allFilmComment = [];
  #filmComment =null;
  #popup = null;

  init = (filmContainer, filmCardModel, filmComment, renderFilmsCard, openPopup) => {
    this.#filmsContainer = filmContainer;
    this.filmCardModel = filmCardModel;
    this.#filmComments = filmComment;
    this.renderFilmsCard = renderFilmsCard;
    this.openPopup = openPopup;
    this.#allFilmComment = [...this.#filmComments.comments];
    this.#filmComment = this.#getNeedComment(this.#allFilmComment, this.filmCardModel);
    this.#popup = new Popup( this.filmCardModel, this.#filmComment);
    this.changFilmCardModal = new FilmCardModel();
    this.changNavMenu = new NavMenuPresenter();
    render (this.#popup, this.#filmsContainer);
    this.#filmsContainer.classList.add('hide-overflow');
    this.#popup.setEventCloseHandler(()=>{
      this.#filmsContainer.classList.remove('hide-overflow');
      this.#filmsContainer.removeChild(this.#popup.element);
      this.#popup.removeElement();
      this.openPopup.open = null;
    });
    this.#getFilmDetailsControlButton();
  };

  #getRenderPopup = () => {
    this.removePopup();
    this.#popup = new Popup( this.filmCardModel, this.#filmComment);
    this.openPopup.open =  this.#popup;
    render (this.#popup, this.#filmsContainer);
    this.#filmsContainer.classList.add('hide-overflow');
    this.#popup.setEventCloseHandler(()=>{
      this.#filmsContainer.classList.remove('hide-overflow');
      this.openPopup.open = null;
      this.removePopup();
    });
    this.#getFilmDetailsControlButton();
  };

  #getNeedComment = (allFilmComments, filmsModel) => {
    const keyFilmsComments = filmsModel.comments;
    const needComments = [];
    keyFilmsComments.forEach((oneKey)=>{
      for(const comment of allFilmComments){
        if(oneKey === Number(comment.id)){
          needComments.push(comment);
        }
      }
    });
    return needComments;
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

}
