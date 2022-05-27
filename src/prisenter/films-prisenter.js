import { remove, render, } from '../framework/render.js';
import FilmCard from '../view/film-card.js';
import PopupFilmPrisenter from './popup-film-prisenter.js';
import FilmCommentModel from '../model/film-coment-model.js';
import { getToggleTrueFalse } from '../utils/popup-and-film-cards-utils.js';
export default class FilmsPrisenter {
  #filmsContainer = null;
  #filmCard = null;
  constructor(filmsContainer, body, renderFilmsCard, openPopup){
    this.#filmsContainer = filmsContainer;
    this.body = body;
    this.renderFilmsCard = renderFilmsCard;
    this.openPopup = openPopup;
  }


  init = (filmModel) => {
    const prevfilmCard = this.#filmCard;
    this.filmCardModel = filmModel;
    this.#filmCard = new FilmCard (this.filmCardModel);
    if(prevfilmCard === null){
      this.#filmCard.setClikcOpenPopupHandler(this.#setClickPopupHandler);
      render(this.#filmCard,this.#filmsContainer);
      this.#getFilmDetaeilsControlButton();
    }
  };

  destroy = () => {
    remove(this.#filmCard);
  };

  #getFilmDetaeilsControlButton = () =>{
    this.#filmCard.setFilmDetaeilsControlHandler((evt)=>{
      while(Boolean(evt.target.id) === true){
        if(evt.target.id === 'watchlistCard'){
          this.filmCardModel.userDetails.watchlist = getToggleTrueFalse(this.filmCardModel.userDetails.watchlist);
          this.renderFilmsCard(this.filmCardModel);
          break;
        }
        if(evt.target.id === 'watchedCard'){
          this.filmCardModel.userDetails.alreadyWatched = getToggleTrueFalse(this.filmCardModel.userDetails.alreadyWatched);
          this.renderFilmsCard(this.filmCardModel);
          break;
        }
        if(evt.target.id === 'favoriteCard'){
          this.filmCardModel.userDetails.favorite = getToggleTrueFalse(this.filmCardModel.userDetails.favorite);
          this.renderFilmsCard(this.filmCardModel);
          break;
        }
        break;
      }
    });
  };

  #setClickPopupHandler = ()=>{
    if(this.openPopup.open !== null){
      this.openPopup.open.removePopup();
    }
    const filmPopupPrisenter = new PopupFilmPrisenter();
    const filmCommentPrisenter = new FilmCommentModel();
    this.openPopup.open = filmPopupPrisenter;
    this.body.classList.add('hide-overflow');
    filmPopupPrisenter.init(this.body, this.filmCardModel, filmCommentPrisenter, this.renderFilmsCard);
  };
}
