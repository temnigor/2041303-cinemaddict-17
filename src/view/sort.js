
import { createElement } from '../render.js';
const getDomSort = ()=> `<ul class="sort">
    <li><a href="#" class="sort__button">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button sort__button--active">Sort by rating</a></li>
  </ul>`;
export default class NewSort {
  #element = null;
  get domElement() {
    return getDomSort ();
  }

  get element() {
    if(!this.#element){
      this.#element = createElement(this.domElement);
    }
    return this.#element;
  }

  removeElement () {
    this.#element = null;
  }
}
