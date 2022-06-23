import AbstractView from '../framework/view/abstract-view.js';
const getDomButtonShowMore = () => '<button class="films-list__show-more">Show more</button>';

export default class ButtonShowMore extends AbstractView {
  get template() {
    return getDomButtonShowMore();
  }

  #setClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setClickMoreFilmHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#setClickHandler);
  };
}
