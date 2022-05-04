
import NewPopup from '../view/popup.js';
import { render } from '../render.js';
const body = document.querySelector('body')
const getNeedComment = (allFilmComments, filmsModel) => {
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

const getEventClouse = (popup, filmContener) => {
  popup.element.querySelector('.film-details__close-btn').addEventListener('click', (evt) =>{
    evt.preventDefault();
    removeElementAndEvent(popup, filmContener);
  });
  document.addEventListener('keydown', (evt)=>{
    if(evt.code === 'Escape') {
      removeElementAndEvent(popup, filmContener);
}
});
};
function removeElementAndEvent (popup, filmContener) {
  filmContener.removeChild(popup.element);
  filmContener.classList.remove('hide-overflow');
  document.removeEventListener('keydown', getEventClouse);
};

export default class NewFilmPopup {
  #filmsContainer = null;
  #filmCardModel = null;
  #filmComments = null;
  #allFilmComment = [];
  #filmComment =null;
  init = (filmContener, filmCardModel, filmComment ) => {
    this.#filmsContainer = filmContener;
    this.#filmCardModel = filmCardModel;
    this.#filmComments = filmComment;
    this.#allFilmComment = [...this.#filmComments.comments];
    this.#filmComment = getNeedComment(this.#allFilmComment, this.#filmCardModel);

    this.#renderPopup(this.#filmCardModel, this.#filmComment);
  };
  #renderPopup = (filmModel, filmComment) => {
    const popup = new NewPopup(filmModel, filmComment);
    render (popup, this.#filmsContainer)
    getEventClouse(popup, this.#filmsContainer)
  }
}
