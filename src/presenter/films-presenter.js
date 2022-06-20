import { remove, render, } from '../framework/render.js';
import { UpdateType, UserAction } from '../utils/filters.js';
import { ControlDetailsFilmCard } from '../utils/popup-and-film-cards-utils.js';
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
    this.filmCardModel = filmModel;
    this.#filmCard = new FilmCard (this.filmCardModel);
    render(this.#filmCard,this.#filmsContainer);
    this.#filmCard.setClickOpenPopupHandler(this.#setClickPopupHandler);
    this.#filmCard.setFilmDetailsControlHandler(this.#getFilmDetailsControlButton);

  };

  destroy = () => {
    remove(this.#filmCard);
  };

  #getFilmDetailsControlButton = (evt) =>{
    while(evt.target.id){
      if(evt.target.id === 'watchListCard'){
        this.#filmCard.blockButtonControlFilmCard();
        const updateFilm = this.filmCardModel;
        updateFilm.userDetails.watchlist = !updateFilm.userDetails.watchlist;
        this.renderFilmsCard(UserAction.UPDATE_FILM, UpdateType.MINOR, updateFilm);
        break;
      }
      if(evt.target.id === 'watchedCard'){
        this.#filmCard.blockButtonControlFilmCard();
        const updateFilm = this.filmCardModel;
        updateFilm.userDetails.alreadyWatched = !updateFilm.userDetails.alreadyWatched;
        this.renderFilmsCard(UserAction.UPDATE_FILM, UpdateType.MINOR, updateFilm);
        break;
      }
      if(evt.target.id === 'favoriteCard'){
        this.#filmCard.blockButtonControlFilmCard();
        const updateFilm = {...this.filmCardModel};
        updateFilm.userDetails.favorite = !updateFilm.userDetails.favorite;
        this.renderFilmsCard(UserAction.UPDATE_FILM, UpdateType.MINOR, updateFilm);
        break;
      }
      break;
    }

  };

  #setClickPopupHandler = ()=>{
    this.#isPopupOpen();
    this.openPopup.open = new PopupFilmPresenter(this.renderFilmsCard);
    this.filmCommits.init(this.filmCardModel);
  };

  #isPopupOpen (){
    if(this.openPopup.open !== null){
      this.openPopup.open.removePopup();
      this.openPopup.open = null;
    }
  }


  initPopup=()=>{
    this.openPopup.open.init(this.body, this.filmCardModel, this.filmCommits, this.openPopup);
  };


  resetPopup =(filmInfo, disabled)=>{
    this.filmCardModel = filmInfo;
    this.#filmCard.reset(filmInfo, disabled);
    this.openPopup.open.getRenderPopup(filmInfo);
  };

  resetFilmCard=(ControlDetails, film)=>{
    switch (ControlDetails){
      case ControlDetailsFilmCard.UNBLOCK_CONTROL_PANEL:
        this.#filmCard.unblockButtonControlFilmCard();
        break;
      case ControlDetailsFilmCard.UPDATE_CONTROL_PANEL:
        this.#filmCard.reset(film);
    }
  };
}
