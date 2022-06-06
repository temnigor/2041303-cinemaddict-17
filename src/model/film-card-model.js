import Observable from './framework/observable.js';
import { getSomeFilm } from './fish-film-card.js';

export default class FilmCardModel extends Observable {
  #films = Array.from({length:25}, getSomeFilm);
  get films  () {
    return this.#films;
  }

  updateFilms = (updateType, update) => {
    const index = this.#films.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addFilms = (updateType, update) => {
    this.#films = [
      update,
      ...this.#films,
    ];

    this._notify(updateType, update);
  };

  deleteFilms = (updateType, update) => {
    const index = this.#films.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
