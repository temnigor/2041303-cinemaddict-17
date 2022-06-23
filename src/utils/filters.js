import dayjs from 'dayjs';
const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_FILM_COMMENT: 'ADD_FILM_COMMENT',
  DELETE_COMMENT: 'DELETE_FILM_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};
const SortType = {
  DEFAULT: 'default',
  DATA: 'date',
  RATING: 'rating'
};

const FilterType = {
  All: 'all',
  WATCH_LIST:'watchList',
  ALREADY_WATCHED:'alreadyWatched',
  FAVORITE:'favorite'
};
const ShakeClass = {
  POPUP_COMMENTS : '.film-details__comments-wrap',
  POPUP :'.film-details__inner',
  POPUP_DETAILS: '.film-details__controls'
};

const isWatchList = (film) => film.userDetails.watchlist === true;
const isAlreadyWatched = (film) => film.userDetails.alreadyWatched === true;
const isFavorite = (film) => film.userDetails.favorite === true;
const filter = {
  [FilterType.All]:(films) => [...films],
  [FilterType.WATCH_LIST]: (films) => films.filter((film) => isWatchList(film)),
  [FilterType.ALREADY_WATCHED]: (films) => films.filter((film) => isAlreadyWatched(film)),
  [FilterType.FAVORITE]: (films) => films.filter((film) => isFavorite(film))
};
const generateFilter = (films) => Object.entries(filter).map(([nameArray, filterArray]) => ({
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

const sortFilmDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};

const sortFilmRating = (a, b) => {

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
export {generateFilter, SortType, sortFilmDate, sortFilmRating, UserAction, UpdateType, FilterType, ShakeClass, filter};
