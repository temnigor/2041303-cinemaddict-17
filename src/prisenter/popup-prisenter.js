
import NewPopup from '../view/popup.js';
import { render } from '../render.js';
const getNeedComment = (allFilmComments, moviceModel) => {
  const keyMoviceComments = moviceModel[0].comments;
  const needComments = [];
  keyMoviceComments.forEach((oneKey)=>{
    for(const comment of allFilmComments){
      if(oneKey === Number(comment.id)){
        needComments.push(comment);
      }
    }
  });
  return needComments;
};
export default class NewFilmPopup {
  init = (filmContener, moviceCardModel, filmComment ) => {
    this.filmsContainer = filmContener;
    this.moviceCardModel = moviceCardModel;
    this.allMoviceModel = [...this.moviceCardModel.getMovice()];
    this.filmComments = filmComment;
    this.allFilmComment = [...this.filmComments.getComments()];
    this.filmComment = getNeedComment(this.allFilmComment, this.allMoviceModel);

    return render(new NewPopup(this.allMoviceModel[0], this.filmComment), this.filmsContainer);

  };
}
