import AbstractView from '../framework/view/abstract-view.js';
const getDomFilmsRatedList = () =>
  `<section class="films-list films-list--extra ">
<h2 class="films-list__title">Top rated</h2>
<div class="films-list__container rated">
</div>
</section>`;

export default class NewFilmsRated extends AbstractView {
  get template() {
    return getDomFilmsRatedList();
  }
}
