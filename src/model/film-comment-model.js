import { getSomeComment } from './fish-film-comment.js';
import { getNewComment } from './fish-new-comment.js';
export default class FilmCommentModel {
  #comments = Array.from({length:3}, getSomeComment);
  get comments () {
    return this.#comments;
  }
  reBindComments (commentsArray) {
    this.#comments = commentsArray;
    return this.#comments
  }
  addNewComment =(updateComment)=>{
    this.#comments.push(updateComment)
    return this.#comments;
  }
}
