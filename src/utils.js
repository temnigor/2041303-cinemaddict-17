import dayjs from 'dayjs';
const START_SLICE_DISCRIPTION = 0;
const SIZE_DISCRIPTION = 139;
const getReleaseYear = (date) => dayjs(date).format('YYYY');
const getRuntime = (min) =>{
  const hours = Math.trunc(min/60);
  const minute = Math.trunc(min%60);
  return `${hours}h ${minute}m`;
};
const getReleaseDate = (date) => dayjs(date).format('DD MMMM YYYY');
const getDateComment = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');
const getGenreList = (genre) => {
  const list = document.createElement('div');
  for(const element of genre){
    list.innerHTML = `${list.innerHTML}<span class="film-details__genre">${element}</span>`;
  }
  return list;
};
const getString = (array) => `${array.join(', ')}`;
const getNormalList = (...genre) => {
  const array = Array.from (genre);
  const result = !array.length <= 2 ? getString (array) : genre[0];
  return result;
};
const getNormalDescription = (discription) => {
  const shortDiscription = discription.slice(START_SLICE_DISCRIPTION,SIZE_DISCRIPTION);
  const descriptionForfilmCard = shortDiscription<=discription
    ? `${shortDiscription}...`
    : discription;
  return descriptionForfilmCard;
};

export {getReleaseYear, getRuntime, getReleaseDate, getGenreList, getNormalList, getNormalDescription, getDateComment};
