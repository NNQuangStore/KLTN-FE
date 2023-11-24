import fetch from '../../../../services/request';

const getListParent = () => {
  return fetch({
    method: 'get',
    url: 'parent'
  });
};
const saveParent = (body : any) => {
  return fetch({
    method: 'post',
    url: 'parent/save',
    body
  });
};
// api here
const apisParent= {
  getListParent, 
  saveParent
};

export default apisParent;
