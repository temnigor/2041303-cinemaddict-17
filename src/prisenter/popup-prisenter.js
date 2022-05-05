
import NewPopup from '../view/popup.js';
import { render } from '../render.js';
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
    this.#getEventClouse();
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

  #getEventClouse = () => {
    this.#popup.element.querySelector('.film-details__close-btn').addEventListener('click', (evt) =>{
      evt.preventDefault();
      this.#removeElementAndEvent();
    });
    document.addEventListener('keydown',this.#findKey);
  };

  #findKey = (evt) => {
    if(evt.code === 'Escape'){
      evt.preventDefault();
      this.#removeElementAndEvent();
    }
  };

  #removeElementAndEvent = () => {
    this.#filmsContainer.removeChild(this.#popup.element);
    this.#filmsContainer.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#findKey);
  };
}
