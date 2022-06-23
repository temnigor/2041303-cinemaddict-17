import Observable from '../framework/observable.js';
import { FilterType } from '../utils/filters.js';

export default class FilterModel extends Observable {

  #filter = FilterType.All;
  get filter () {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}
