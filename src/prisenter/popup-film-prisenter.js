
import Popup from '../view/popup.js';
import { render } from '../framework/render.js';
import { getToggleTrueFalse } from '../utils/popup-and-film-cards-utils.js';
import FilmCardModel from '../model/film-card-model.js';
import NavMenuPrisenter from './nav-menu-prisenter.js';
export default class PopupFilmPrisenter {
  #filmsContainer = null;
  #filmComments = null;
  #allFilmComment = [];
  #filmComment =null;
  #popup = null;

  init = (filmContener, filmCardModel, filmComment, renderFilmsCard) => {
    this.#filmsContainer = filmContener;
    this.filmCardModel = filmCardModel;
    this.#filmComments = filmComment;
    this.renderFilmsCard = renderFilmsCard;
    this.#allFilmComment = [...this.#filmComments.comments];
    this.#filmComment = this.#getNeedComment(this.#allFilmComment, this.filmCardModel);
    this.#popup = new Popup( this.filmCardModel, this.#filmComment);
    this.chengFilmCardModal = new FilmCardModel();
    this.chengNavMenu = new NavMenuPrisenter();
    render (this.#popup, this.#filmsContainer);
    this.#popup.setEventClouseHandler(()=>{
      this.#filmsContainer.classList.remove('hide-overflow');
      this.#filmsContainer.removeChild(this.#popup.element);
      this.#popup.removeElement();
    });
    this.#getFilmDetaeilsControlButton();
  };

  #getRenderPopup = () => {
    this.removePopup();
    this.#popup = new Popup( this.filmCardModel, this.#filmComment);
    render (this.#popup, this.#filmsContainer);
    this.#popup.setEventClouseHandler(()=>{
      this.#filmsContainer.classList.remove('hide-overflow');
      this.removePopup();
    });
    this.#getFilmDetaeilsControlButton();
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

  #getFilmDetaeilsControlButton = () =>{
    this.#popup.setFilmDetaeilsControlHandler((evt)=>{
      while(Boolean(evt.target.id) === true){
        if(evt.target.id === 'watchlist'){
          this.filmCardModel.userDetails.watchlist = getToggleTrueFalse(this.filmCardModel.userDetails.watchlist);
          this.renderFilmsCard(this.filmCardModel);
          this.#getRenderPopup();
          break;
        }
        if(evt.target.id === 'watched'){
          this.filmCardModel.userDetails.alreadyWatched = getToggleTrueFalse(this.filmCardModel.userDetails.alreadyWatched);
          this.renderFilmsCard(this.filmCardModel);
          this.#getRenderPopup();
          break;
        }
        if(evt.target.id === 'favorite'){
          this.filmCardModel.userDetails.favorite = getToggleTrueFalse(this.filmCardModel.userDetails.favorite);
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
