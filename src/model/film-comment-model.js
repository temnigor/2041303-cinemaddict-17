import { getSomeComment } from './fish-film-comment.js';
export default class FilmCommentModel {
  #newComment = null;
  #comments = Array.from({length:3}, getSomeComment);
  get comments () {
    return this.#comments;
  }

updateDeleteComment = (commentsDelete)=>{
  if(commentsDelete.length === this.#comments.length){
    this.#comments = commentsDelete;
    return this.#comments;
  }
  return;
}

  addNewComment =(updateComment)=>{
    this.#comments.push(updateComment);
    return this.#comments;
  };

  getNewComment=(addComment)=>{
    return this.#newComment = getNewCommentFish(addComment)
  }

}
