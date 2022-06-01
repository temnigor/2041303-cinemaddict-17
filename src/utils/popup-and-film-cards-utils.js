import dayjs from 'dayjs';
const START_SLICE_DESCRIPTION = 0;
const SIZE_DESCRIPTION = 139;
const EMOJI =  {
  'smile': '',
  'sleeping': '',
  'puke': '',
  'angry': ''
};
const getReleaseYear = (date) => dayjs(date).format('YYYY');
const getRuntime = (min) =>{
  const hours = Math.trunc(min/60);
  const minute = Math.trunc(min%60);
  return `${hours}h ${minute}m`;
};
const getReleaseDate = (date) => dayjs(date).format('DD MMMM YYYY');
const getDateComment = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');
const getGenreList = (genre) => {

  const list = genre.map((element)=>`<span class="film-details__genre">${element},</span>`).join('');
  return list;
};
const getString = (array) => `${array.join(', ')}`;
const getNormalList = (...genre) => {
  const array = Array.from (genre);
  const result = !array.length <= 2 ? getString (array) : genre[0];
  return result;
};
const getNormalDescription = (description) => {
  const shortDescription = description.slice(START_SLICE_DESCRIPTION,SIZE_DESCRIPTION);
  const descriptionForFilmCard = shortDescription<=description
    ? `${shortDescription}...`
    : description;
  return descriptionForFilmCard;
};
const getFilmDetailsControlActive = (filmDetailsControlButton)=>{
  if(filmDetailsControlButton === true){
    return 'film-details__control-button--active';
  }

};
const getFilmCardControlActive = (filmDetailsControlButton)=>
  filmDetailsControlButton
    ? 'film-card__controls-item--active'
    : '';

export {
  getReleaseYear,
  getRuntime,
  getReleaseDate,
  getGenreList,
  getNormalList,
  getNormalDescription,
  getDateComment,
  getFilmDetailsControlActive,
  getFilmCardControlActive,
  EMOJI,
};
