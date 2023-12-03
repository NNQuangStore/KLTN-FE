import fetch from '../../../services/request';

const getListClass = (params?: {year: number}) => {

  return fetch({
    method: 'get',
    url: 'class',
    params: params as any,
    configs:{
      timeout: 5000
    }
  }).catch(() => {
    console.log('???');
    
    getListClass(params);    
  });
};


const apisClass = {
  getListClass,
};

export default apisClass;
