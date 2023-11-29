import fetch from '../../../services/request';
import storage from '../../../utils/sessionStorage';

const getListStudent = () => {

  const class_id = storage.get('class_id');

  return fetch({
    method: 'get',
    url: `class/${class_id}`
    // params: { ...params, per_page: 100 },
  });
};

const getListStudentByClass = (class_id: string, year: string) => {

  console.log(class_id);
  

  return fetch({
    method: 'get',
    url: `class/${class_id ?? 'a075j00000AkxZjAAJ'}?year=${year}`
    // params: { ...params, per_page: 100 },
  });
};

const getDetailStudent = (id: string) => {
  return fetch({
    method: 'get',
    url: `student/${id}`
    // params: { ...params, per_page: 100 },
  });
};

// const getListCustomersPaginate = (params?: any) => {
//   return fetch({
//     method: 'get',
//     url: 'api/v1/merchants/:merchant_code/customers',
//     params: { ...params },
//   });
// };


const apisStudent = {
  getListStudent,
  getDetailStudent,
  getListStudentByClass
};

export default apisStudent;
