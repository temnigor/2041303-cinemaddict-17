import AbstractView from '../framework/view/abstract-view.js';

const getLoadingHtml = () => '<h2 class="films-list__title">Loading...</h2>';

export default class Loading extends AbstractView {

  get template () {
    return getLoadingHtml();
  }
}
