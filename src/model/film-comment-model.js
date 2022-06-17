import Observable from '../framework/observable.js';
import { UpdateType } from '../utils/filters.js';
export default class FilmCommentModel extends Observable {
  #newComment = null;
  #comments = [];
  #apiServes = null;
  constructor(api){
    super();
    this.#apiServes= api;
  }

  get comments () {
    return this.#comments;
  }

  init = async (film) =>{
    try{
      const comments = await this.#apiServes.getComments(film.id);
      this.#comments = comments;
    } catch (err) {
      throw new Error('Not comment');
    }
    this._notify(UpdateType.INIT_POPUP, film);
  };

  addNewComment =(updateComment)=>{
    this.#comments.push(updateComment);
    return this.#comments;
  };

  getNewComment=(addComment)=>{
    this.#newComment = null;
    this.#newComment =(addComment);
    return this.#newComment;
  };

  deleteComment =(deleteCommentId)=>{
    this.#comments = this.#comments.filter((comment)=> comment.id !== deleteCommentId);
  };

}
