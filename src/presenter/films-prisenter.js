import { remove, render, } from '../framework/render.js';
import FilmCard from '../view/film-card.js';
import PopupFilmPresenter from './popup-film-prisenter.js';
import FilmCommentModel from '../model/film-comment-model.js';
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
    const prevFilmCard = this.#filmCard;
    this.filmCardModel = filmModel;
    this.#filmCard = new FilmCard (this.filmCardModel);
    if(prevFilmCard === null){
      this.#filmCard.setClickOpenPopupHandler(this.#setClickPopupHandler);
      render(this.#filmCard,this.#filmsContainer);
      this.#getFilmDetailsControlButton();
    }
  };

  destroy = () => {
    remove(this.#filmCard);
  };

  #getFilmDetailsControlButton = () =>{
    this.#filmCard.setFilmDetailsControlHandler((evt)=>{
      while(Boolean(evt.target.id) === true){
        if(evt.target.id === 'watchListCard'){
          this.filmCardModel.userDetails.watchList = getToggleTrueFalse(this.filmCardModel.userDetails.watchList);
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
    const filmPopupPresenter = new PopupFilmPresenter();
    const filmCommentPresenter = new FilmCommentModel();
    this.openPopup.open = filmPopupPresenter;
    filmPopupPresenter.init(this.body, this.filmCardModel, filmCommentPresenter, this.renderFilmsCard);
  };
}
