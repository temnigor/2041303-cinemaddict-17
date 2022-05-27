import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../utils/filters.js';
const getDomSort = ()=> `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type = ${SortType.DEFAULT} >Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type = ${SortType.DATA}>Sort by date</a></li>
    <li><a href="#" class="sort__button " data-sort-type = ${SortType.RAITING}>Sort by rating</a></li>
  </ul>`;
export default class Sort extends AbstractView {
  get template() {
    return getDomSort ();
  }

  setClickTypeSortHandler =(callback)=>{
    this._callback.click = callback;
    this.element.addEventListener('click', this.#setClickHandler);
  };

  #setClickHandler=(evt)=>{
    evt.preventDefault();
    this.#removeClassCss();
    evt.target.classList.add('sort__button--active');
    this._callback.click(evt.target.dataset.sortType);
  };

  #removeClassCss =()=>{
    const allSortButtons = Array.from(this.element.children);
    allSortButtons.forEach((button)=>{
      button.children[0].classList.remove('sort__button--active');
    });
  };
}
