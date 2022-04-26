import { createElement } from '../render.js';
const createFilmsRatedList = () =>
  `<section class="films-list films-list--extra ">
<h2 class="films-list__title">Top rated</h2>
<div class="films-list__container rated">
</div>
</section>`;

export default class NewFilmsRated {
  createFilms() {
    return createFilmsRatedList();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.createFilms());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
