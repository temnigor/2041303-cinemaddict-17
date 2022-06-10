import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../utils/filters.js';

const getDomNavMenu = (films, filterModels) =>{
  const {wishlist, history, favorites} = films;
  return (`<nav class="main-navigation">
<a href="#all" class="main-navigation__item
${(filterModels === FilterType.All) ? 'main-navigation__item--active' : '' } "
 data-filter-type = ${FilterType.All}>All movies</a>
<a href="#watchList" class="main-navigation__item
${(filterModels === FilterType.WATCH_LIST) ? 'main-navigation__item--active' : '' }"
data-filter-type = ${FilterType.WATCH_LIST}>WatchList <span class="main-navigation__item-count">${wishlist}</span></a>
<a href="#history" class="main-navigation__item
${(filterModels === FilterType.ALREADY_WATCHED) ? 'main-navigation__item--active' : '' }"
data-filter-type = ${FilterType.ALREADY_WATCHED}>History <span class="main-navigation__item-count">${history}</span></a>
<a href="#favorites" class="main-navigation__item
${(filterModels === FilterType.FAVORITE) ? 'main-navigation__item--active' : '' }"
data-filter-type = ${FilterType.FAVORITE}>Favorites <span class="main-navigation__item-count">${favorites}</span></a>
</nav>`
  );
};

export default class NavMenu extends AbstractView {
  #films = null;
  #filterModel = null;
  constructor(films, filterModel){
    super();
    this.#films = films;
    this.#filterModel = filterModel;
  }

  get template() {
    return getDomNavMenu(this.#films, this.#filterModel.filter);
  }

  setClickNavHandler = (callback)=>{
    this._callback.clickNav = callback;
    this.element.addEventListener('click', this.#clickNavMenu);
  };

  #clickNavMenu =(evt)=>{
    if(evt.target.tagName === 'A'){
      evt.preventDefault();
      this._callback.clickNav(evt.target.dataset.filterType);
    }

  };
}
