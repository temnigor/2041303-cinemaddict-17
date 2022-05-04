import { createElement } from '../render.js';
const getDomNavMenu = () => `<nav class="main-navigation">
<a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
<a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
<a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
<a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a></nav>`;

export default class NewNavMenu {
  #element = null;
  get domElement() {
    return getDomNavMenu();
  }

  get element() {
    if(!this.#element){
      this.#element = createElement(this.domElement);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
