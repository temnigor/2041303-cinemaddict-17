import { getSomeComment } from './fish-film-comment.js';
import { getNewCommentFish } from './fish-new-comment.js';
export default class FilmCommentModel {
  #newComment = null;
  #comments = Array.from({length:3}, getSomeComment);
  get comments () {
    return this.#comments;
  }

  addNewComment =(updateComment)=>{
    this.#comments.push(updateComment);
    return this.#comments;
  };

  getNewComment=(addComment)=>{
    this.#newComment = null;
    this.#newComment = getNewCommentFish(addComment);
    return this.#newComment;
  };

  deleteComment =(deleteCommentId)=>{
    this.#comments = this.#comments.filter((comment)=> comment.id !== deleteCommentId);
  };

}
