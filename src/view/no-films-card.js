
import { createElement } from '../render.js';

const getDomNoFilmCard = () => '<h2 class="films-list__title">There are no movies in our database</h2>';
export default class NewNoFilmCard {
  #element = null;
  get domElement() {
    return getDomNoFilmCard();
  }

  get element () {
    if(!this.#element){
      this.#element = createElement(this.domElement);
    }
    return this.#element;
  }

  removeElement () {
    this.#element = null;
  }
}
