import { createElement } from '../render.js';
const getDomButtonShowMore = () => '<button class="films-list__show-more">Show more</button>';
export default class NewButtonShowMore {
  #element = null;
  get domElement() {
    return getDomButtonShowMore();
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
