import { getSomeComment } from './fish-film-coment.js';
export default class FilmCommentModel {
  #comments = Array.from({length:3}, getSomeComment);
  get comments () {
    return this.#comments;
  }
}