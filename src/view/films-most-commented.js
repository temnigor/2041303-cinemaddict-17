import AbstractView from '../framework/view/abstract-view.js';
const getDomFilmsMostComment = () =>
  `<section class="films-list films-list--extra">
<h2 class="films-list__title ">Most commented</h2>
<div class="films-list__container most_commented">
</div>
</section>`;
export default class FilmsMostComment extends AbstractView {
  get template() {
    return getDomFilmsMostComment();
  }
}
