import dayjs from 'dayjs';
const SortType = {
  DEFAULT: 'default',
  DATA: 'date',
  RAITING: 'rating'
};

const FilterType = {
  WATCHLIST:'watchlist',
  ALREADY_WATCHED:'alreadyWatched',
  FAVORITE:'favorite'
};
const isWatchlist = (film)=> film.userDetails.watchlist === true;
const isAlreadyWatched = (film) => film.userDetails.alreadyWatched === true;
const isFavorite = (film) => film.userDetails.favorite === true;
const filter = {
  [FilterType.WATCHLIST]: (films) => films.filter((film) => isWatchlist(film)),
  [FilterType.ALREADY_WATCHED]: (films)=>films.filter((film) => isAlreadyWatched(film)),
  [FilterType.FAVORITE]: (films)=>films.filter((film) => isFavorite(film))
};
const generateFilter = (films)=> Object.entries(filter).map(([nameArray, filterArray])=>({
  name: nameArray,
  count: filterArray(films)
})
);

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortTaskUp = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmA.filmInfo.release.date).diff(dayjs(filmB.filmInfo.release.date));
};

const sortTaskRaiting = (a, b) => {

  if(a.filmInfo.totalRating > b.filmInfo.totalRating){
    return -1;
  }
  if (a.filmInfo.totalRating < b.filmInfo.totalRating){
    return 1;
  }
  if(a.filmInfo.totalRating === b.filmInfo.totalRating){
    return 0;
  }
};
export {generateFilter, SortType, sortTaskUp, sortTaskRaiting};
