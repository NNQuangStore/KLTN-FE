import fetch from '../../../services/request';

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
