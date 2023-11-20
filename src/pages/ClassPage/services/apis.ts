import fetch from '../../../services/request';
import storage from '../../../utils/sessionStorage';

const getListClass = (params?: {year: number}) => {

  return fetch({
    method: 'get',
    url: 'class',
    params: params as any,
  });
};


const apisClass = {
  getListClass,
};

export default apisClass;
