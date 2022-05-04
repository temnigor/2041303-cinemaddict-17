import { createElement } from '../render.js';
const getDomFilms = () =>
  `<section class="films">
<section class="films-list">
<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
<div class="films-list__container">
</div>
</section>
</section>`;

export default class NewFilms {
  #element = null;
  get domElement() {
    return getDomFilms();
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
