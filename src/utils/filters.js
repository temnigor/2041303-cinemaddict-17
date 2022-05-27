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
export {generateFilter};
