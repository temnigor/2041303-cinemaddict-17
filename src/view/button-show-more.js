import AbstractView from '../framework/view/abstract-view.js';
const getDomButtonShowMore = () => '<button class="films-list__show-more">Show more</button>';
export default class NewButtonShowMore extends AbstractView {
  get template() {
    return getDomButtonShowMore();
  }

  clickHandlerMoreFilm = (callback)=>{
    this._callback = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback();
  };
}
