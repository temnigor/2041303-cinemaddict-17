import { nanoid } from "nanoid";
const getNewComment = (updateComment)=>({
  'id': 33,
  'author': 'Ilya O\'Reilly',
  'comment': updateComment.comment,
  'date': '2019-05-11T16:12:32.554Z',
  'emotion': updateComment.emotion
});
export {getNewComment};
