
import NewPopup from '../view/popup.js';
import { render } from '../framework/render.js';
export default class NewFilmPopup {
  #filmsContainer = null;
  #filmCardModel = null;
  #filmComments = null;
  #allFilmComment = [];
  #filmComment =null;
  #popup = null;
  init = (filmContener, filmCardModel, filmComment ) => {
    this.#filmsContainer = filmContener;
    this.#filmCardModel = filmCardModel;
    this.#filmComments = filmComment;
    this.#allFilmComment = [...this.#filmComments.comments];
    this.#filmComment = this.#getNeedComment(this.#allFilmComment, this.#filmCardModel);
    this.#popup = new NewPopup( this.#filmCardModel, this.#filmComment);
    render (this.#popup, this.#filmsContainer);
    this.#popup.getEventClouse(()=>{
      this.#filmsContainer.classList.remove('hide-overflow');
      this.#popup.removePopup();
    });
  };

  #getNeedComment = (allFilmComments, filmsModel) => {
    const keyFilmsComments = filmsModel.comments;
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


}
