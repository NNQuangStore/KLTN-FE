import fetch from '../../../services/request';
import storage from '../../../utils/sessionStorage';

const getListLetter = () => {
  const class_id = storage.get('class_id');
  return fetch({
    method: 'get',
    url: `letter/${class_id}`
  });
};
const updateLetter = (body : any) => {
  return fetch({
    method: 'post',
    url: 'letter/save',
    body
  });
};
// api here
const apisLetterTeacher= {
  getListLetter, 
  updateLetter
};

export default apisLetterTeacher;
