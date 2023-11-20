import fetch from '../../../../services/request';

const getListTeacher = () => {
  return fetch({
    method: 'get',
    url: 'teacher'
  });
};
const updateLetter = (body : any) => {
  return fetch({
    method: 'post',
    url: 'teacher/save',
    body
  });
};
// api here
const apisTeacher= {
  getListTeacher, 
  updateLetter
};

export default apisTeacher;
