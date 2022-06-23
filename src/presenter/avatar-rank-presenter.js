import AvatarRank from '../view/avatar-rank.js';
import { remove, render } from '../framework/render.js';
const Ranking = {
  noRank: (filmsLength, prevRank) => filmsLength === 0 ? ' ': prevRank,
  novice : (filmsLength, prevRank)=>filmsLength >= 1 && filmsLength <= 10 ? 'novice': prevRank,
  fan: (filmsLength, prevRank)=>filmsLength >= 11 && filmsLength <= 20? 'fan': prevRank,
  movieBuff: (filmsLength, prevRank)=> filmsLength >= 21 ? 'movie buff': prevRank,
};
export default class AvatarRankPresenter {
  #place = null;
  #avatarRank = null;
  constructor(place) {
    this.#place = place;
  }

  init (filmCardModel) {
    const rank = this.#rankLevel(filmCardModel.filter((film)=> film.userDetails.alreadyWatched === true).length);
    this.#avatarRank = new AvatarRank (rank);
    render( this.#avatarRank, this.#place);
  }

  destroy() {
    remove(this.#avatarRank);
  }

  #rankLevel (filmLengths) {
    let rank = '';
    for(const key in Ranking) {
      rank = Ranking[key](filmLengths,rank);
    }
    return rank;
  }
}
