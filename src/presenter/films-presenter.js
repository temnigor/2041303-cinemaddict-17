import { remove, render, } from '../framework/render.js';
import { UpdateType, UserAction } from '../utils/filters.js';
import FilmCard from '../view/film-card.js';
import PopupFilmPresenter from './popup-film-presenter.js';
export default class FilmsPresenter {
  #filmsContainer = null;
  #filmCard = null;
  constructor(filmsContainer, body, renderFilmsCard, openPopup, filmComments){
    this.#filmsContainer = filmsContainer;
    this.body = body;
    this.renderFilmsCard = renderFilmsCard;
    this.openPopup = openPopup;
    this.filmCommits = filmComments;
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
      while(evt.target.id){
        if(evt.target.id === 'watchListCard'){
          this.filmCardModel.userDetails.watchList = !this.filmCardModel.userDetails.watchList;
          this.renderFilmsCard(UserAction.UPDATE_FILMS, UpdateType.MINOR, this.filmCardModel);
          break;
        }
        if(evt.target.id === 'watchedCard'){
          this.filmCardModel.userDetails.alreadyWatched = !this.filmCardModel.userDetails.alreadyWatched;
          this.renderFilmsCard(UserAction.UPDATE_FILMS, UpdateType.MINOR, this.filmCardModel);
          break;
        }
        if(evt.target.id === 'favoriteCard'){
          this.filmCardModel.userDetails.favorite = !this.filmCardModel.userDetails.favorite;
          this.renderFilmsCard(UserAction.UPDATE_FILMS, UpdateType.MINOR, this.filmCardModel);
          break;
        }
        break;
      }
    });
  };

  #setClickPopupHandler = ()=>{
    this.#isPopupOpen();
    const filmPopupPresenter = new PopupFilmPresenter();
    this.openPopup.open = filmPopupPresenter;
    filmPopupPresenter.init(this.body, this.filmCardModel, this.filmCommits, this.renderFilmsCard, this.openPopup);
  };

  #isPopupOpen (){
    if(this.openPopup.open !== null){
      this.openPopup.open.removePopup();
      this.openPopup.open = null;
    }
  }
}
