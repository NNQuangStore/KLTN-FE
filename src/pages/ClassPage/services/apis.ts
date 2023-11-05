import fetch from '../../../services/request';
import storage from '../../../utils/sessionStorage';

const getListClass = () => {

  return fetch({
    method: 'get',
    url: 'class'
    // params: { ...params, per_page: 100 },
  });
};


const apisClass = {
  getListClass,
};

export default apisClass;
