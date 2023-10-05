import fetch from '../../../services/request';
import storage from '../../../utils/sessionStorage';

const getListLessonParent = () => {
  const class_id = storage.get('class_id');
  return fetch({
    method: 'get',
    url: `lesson/${class_id}`
  });
};
// api here
const apisLessonParent= {
  getListLessonParent,
};

export default apisLessonParent;
