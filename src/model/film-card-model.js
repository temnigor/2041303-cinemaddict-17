import { getSomeFilm } from './fish-film-card.js';
export default class NewfilmCardModel {
  #films = Array.from({length:5}, getSomeFilm);
  get films  () {
    return this.#films;
  }
}
