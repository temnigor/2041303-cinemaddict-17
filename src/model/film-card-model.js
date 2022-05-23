import { getSomeFilm } from './fish-film-card.js';
export default class FilmCardModel {
  #films = Array.from({length:25}, getSomeFilm);
  get films  () {
    return this.#films;
  }
}
