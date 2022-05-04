import { createElement } from '../render.js';
const getDomFilmsMostComment = () =>
  `<section class="films-list films-list--extra">
<h2 class="films-list__title ">Most commented</h2>
<div class="films-list__container most_commented">
</div>
</section>`;
export default class NewFilmsMostComment {
  #element = null;
  get domElement() {
    return getDomFilmsMostComment();
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.domElement);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
