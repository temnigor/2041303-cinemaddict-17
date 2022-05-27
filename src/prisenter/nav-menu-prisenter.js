import { RenderPosition, render, remove } from '../framework/render.js';
import NavMenu from '../view/nav-menu.js';

export default class NavMenuPrisenter {
  #filmsCardModel = null;
  #navMenu = null;
  #navMenuPlace = null;
  init = (filmsCardModel, main) =>{
    this.#filmsCardModel = filmsCardModel;
    this.#navMenuPlace = main;
    this.#navMenu = new NavMenu (this.#filmsCardModel);
    render(this.#navMenu, this.#navMenuPlace, RenderPosition.AFTERBEGIN);
  };

  destroy = () => {
    remove(this.#navMenu);
  };
}


