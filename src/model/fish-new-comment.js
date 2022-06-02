import { getActualDate } from '../utils/popup-and-film-cards-utils.js';
const getNewComment = (updateComment)=>({
  'id': 33,
  'author': 'Ilya O\'Reilly',
  'comment': updateComment.comment,
  'date': getActualDate(),
  'emotion': updateComment.emotion
});
export {getNewComment};
