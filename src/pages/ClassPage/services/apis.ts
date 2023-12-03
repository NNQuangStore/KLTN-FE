import fetch from '../../../services/request';

const getListClass = (params?: {year: number}) => {

  return fetch({
    method: 'get',
    url: 'class',
    params: params as any,
    configs:{
      timeout: 2000
    }
  }).catch(() => {
    getListClass(params);    
  });
};


const apisClass = {
  getListClass,
};

export default apisClass;
