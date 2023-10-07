import fetch from '../../../services/request';
import storage from '../../../utils/sessionStorage';

const getListLessonParent = () => {
  const ClassID = storage.get('class_id');
  return fetch({
    method: 'post',
    url: 'lesson/get-week',
    body: {ClassID}
  });
};
// api here
const apisLessonParent= {
  getListLessonParent,
};

export default apisLessonParent;
