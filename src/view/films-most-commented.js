import { createElement } from '../render.js';
const createFilmsMostComment = () =>
  `<section class="films-list films-list--extra">
<h2 class="films-list__title ">Most commented</h2>
<div class="films-list__container most_commented">
</div>
</section>`;
export default class NewFilmsMostComment {
  createFilms() {
    return createFilmsMostComment();
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
