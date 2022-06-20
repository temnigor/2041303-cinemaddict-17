import { RenderPosition, render, remove } from '../framework/render.js';
import NavMenu from '../view/nav-menu.js';
import { filter } from '../utils/filters.js';
import { FilterType, UpdateType } from '../utils/filters.js';

export default class NavMenuPresenter {
  #filmsCardModel = null;
  #navMenu = null;
  #navMenuPlace = null;

  getFilmsFilterLength=(films)=>{
    const filterFilms = films;
    return ({
      wishlist: filter[FilterType.WATCH_LIST](filterFilms).length,
      history: filter[FilterType.ALREADY_WATCHED](filterFilms).length,
      favorites: filter[FilterType.FAVORITE](filterFilms).length,
    });
  };

  init = (main, filterNavMenu, films) =>{
    this.#filmsCardModel = films;
    const filterLength = this.getFilmsFilterLength(this.#filmsCardModel.films);
    this.#navMenuPlace = main;
    this.filterNavMenu = filterNavMenu;
    this.#navMenu = new NavMenu (filterLength,  this.filterNavMenu);
    render(this.#navMenu, this.#navMenuPlace, RenderPosition.AFTERBEGIN);
    this.#navMenu.setClickNavHandler(this.#filterChang);
  };

  resetNavMenu = (films)=>{
    this.#filmsCardModel = films;
    const filterLength = this.getFilmsFilterLength(this.#filmsCardModel.films);
    this.#navMenu.reset(filterLength);
  };

  #filterChang =(filterType)=>{
    if( this.filterNavMenu.filters === filterType){
      return;
    }
    this.filterNavMenu.setFilter(UpdateType.MAJOR, filterType);
  };

  destroy = () => {
    remove(this.#navMenu);
  };
}


