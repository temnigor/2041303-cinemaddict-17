const filterType = {
  WATCHLIST:'watchlist',
  ALREADY_WATCHED:'already_watched',
  FAVORITE:'favorite'
};
const isWatchlist = (element)=> element.userDetails.watchlist === true;
const isAlreadyWatched = (element) => element.userDetails.already_watched === true;
const isFavorite = (element) => element.userDetails.favorite === true;
const filter = {
  [filterType.WATCHLIST]: (filmsArray) => filmsArray.filter((film) => isWatchlist(film)),
  [filterType.ALREADY_WATCHED]: (filmsArray)=>filmsArray.filter((film) => isAlreadyWatched(film)),
  [filterType.FAVORITE]: (filmsArray)=>filmsArray.filter((film) => isFavorite(film))
};
const generateFilter = (filmsArray)=> Object.entries(filter).map(([nameArray, filterArray])=>({
  name: nameArray,
  count: filterArray(filmsArray)
})
);
export {generateFilter};
