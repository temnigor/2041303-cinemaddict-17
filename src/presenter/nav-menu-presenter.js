import { RenderPosition, render, remove } from '../framework/render.js';
import NavMenu from '../view/nav-menu.js';
import { filter } from '../utils/filters.js';
import { FilterType, UpdateType } from '../utils/filters.js';

export default class NavMenuPresenter {
  #filmsCardModel = null;
  #navMenu = null;
  #navMenuPlace = null;
  constructor(filmsCardModel){
    this. #filmsCardModel = filmsCardModel;
  }

  get filmsFilterLength () {
    const filterFilms = this.#filmsCardModel.films;
    return ({
      wishlist: filter[FilterType.WATCH_LIST](filterFilms).length,
      history: filter[FilterType.ALREADY_WATCHED](filterFilms).length,
      favorites: filter[FilterType.FAVORITE](filterFilms).length,
    });
  }

  init = (main, filterNavMenu) =>{
    const filterLength = this.filmsFilterLength;
    this.#navMenuPlace = main;
    this.filterNavMenu = filterNavMenu;
    this.#navMenu = new NavMenu (filterLength,  this.filterNavMenu);
    render(this.#navMenu, this.#navMenuPlace, RenderPosition.AFTERBEGIN);
    this.#navMenu.setClickNavHandler(this.#filterChang);
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


