import AbstractView from '../framework/view/abstract-view.js';
import { generateFilter } from '../utils/filters.js';
const getDomNavMenu = (filmsArray) =>{
  const [wishlist, history, favorites] = generateFilter(filmsArray);
  return (`<nav class="main-navigation">
<a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
<a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${wishlist.count.length}</span></a>
<a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history.count.length}</span></a>
<a href"#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites.count.length}</span></a></nav>`
  );
};

export default class NewNavMenu extends AbstractView {
  #filmsArray = null;
  constructor(filmsArray){
    super();
    this.#filmsArray = filmsArray;
  }

  get template() {
    return getDomNavMenu(this.#filmsArray);
  }
}
