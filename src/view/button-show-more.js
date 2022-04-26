import { createElement } from '../render.js';
const createButtonShowMore = () => '<button class="films-list__show-more">Show more</button>';
export default class NewButtonShowMore {
  createButton () {
    return createButtonShowMore();
  }

  getElement() {
    if(!this.element){
      this.element = createElement(this.createButton());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
