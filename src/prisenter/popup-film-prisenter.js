
import Popup from '../view/popup.js';
import { render } from '../framework/render.js';
export default class PopupFilmPrisenter {
  #filmsContainer = null;
  #filmCardModel = null;
  #filmComments = null;
  #allFilmComment = [];
  #filmComment =null;
  #popup = null;
  #popupPlace = null;
  init = (filmContener, filmCardModel, filmComment ) => {
    this.#filmsContainer = filmContener;
    this.#filmCardModel = filmCardModel;
    this.#filmComments = filmComment;
    this.#allFilmComment = [...this.#filmComments.comments];
    this.#filmComment = this.#getNeedComment(this.#allFilmComment, this.#filmCardModel);
    this.#popup = new Popup( this.#filmCardModel, this.#filmComment);

    render (this.#popup, this.#filmsContainer);
    this.#popup.setEventClouseHandler(()=>{
      this.#filmsContainer.classList.remove('hide-overflow');
      this.#filmsContainer.removeChild(this.#popup.element);
      this.#popup.removeElement();
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
