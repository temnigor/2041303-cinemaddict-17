
import NewPopup from '../view/popup.js';
import { render } from '../render.js';
const getNeedComment = (allFilmComments, filmsModel) => {
  const keyFilmsComments = filmsModel[0].comments;
  const needComments = [];
  keyFilmsComments.forEach((oneKey)=>{
    for(const comment of allFilmComments){
      if(oneKey === Number(comment.id)){
        needComments.push(comment);
      }
    }
  });
  return needComments;
};
export default class NewFilmPopup {
  #filmsContainer = null;
  #filmsCardModel = null;
  #allFilmsModel = [];
  #filmComments = null;
  #allFilmComment = [];
  #filmComment =null;
  init = (filmContener, filmsCardModel, filmComment ) => {
    this.#filmsContainer = filmContener;
    this.#filmsCardModel = filmsCardModel;
    this.#allFilmsModel = [...this.#filmsCardModel.films];
    this.#filmComments = filmComment;
    this.#allFilmComment = [...this.#filmComments.comments];
    this.#filmComment = getNeedComment(this.#allFilmComment, this.#allFilmsModel);

    render(new NewPopup(this.#allFilmsModel[0], this.#filmComment), this.#filmsContainer);

  };
}
