import dayjs from 'dayjs';
const GENRES_LENGTH = 2;
const START_SLICE_DESCRIPTION = 0;
const SIZE_DESCRIPTION = 140;
const ControlDetailsFilmCard = {
  UNBLOCK_CONTROL_PANEL: 'UNBLOCK',
  UPDATE_CONTROL_PANEL: 'UPDATE',
};
const getReleaseYear = (date) => dayjs(date).format('YYYY');
const getRuntime = (min) => {
  const hours = Math.trunc(min/60);
  const minute = Math.trunc(min%60);
  return `${hours}h ${minute}m`;
};
const getActualDate = () => dayjs().format('YYYY/MM/DD HH:mm');
const getReleaseDate = (date) => dayjs(date).format('DD MMMM YYYY');
const getDateComment = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');
const getGenreList = (genre) => {

  const list = genre.map((element) =>`<span class="film-details__genre">${element},</span>`).join('');
  return list;
};
const getString = (array) => `${array.join(', ')}`;
const getNormalList = (...genre) => {
  const genres = Array.from (genre);
  const result = !genres.length <= GENRES_LENGTH ? getString (genres) : genre[0];
  return result;
};
const getNormalDescription = (description) => {
  const shortDescription = description.slice(START_SLICE_DESCRIPTION,SIZE_DESCRIPTION);
  const descriptionForFilmCard = shortDescription.length<description.length
    ? `${shortDescription}…`
    : description;
  return descriptionForFilmCard;
};
const getFilmDetailsControlActive = (filmDetailsControlButton) =>
  filmDetailsControlButton
    ? 'film-details__control-button--active'
    : '';

const getFilmCardControlActive = (filmDetailsControlButton) =>
  filmDetailsControlButton
    ? 'film-card__controls-item--active'
    : '';


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

export {
  getReleaseYear,
  getRuntime,
  getReleaseDate,
  getGenreList,
  getNormalList,
  getNormalDescription,
  getDateComment,
  getFilmDetailsControlActive,
  ControlDetailsFilmCard,
  getFilmCardControlActive,
  getNeedComment,
  getActualDate,
};
