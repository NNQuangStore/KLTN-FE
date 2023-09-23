import { AxiosResponse } from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import { default as apis, default as apisStudent } from './apis';
import { PATH_LOADING } from './constants';
import { setLoading } from '../../../services/UI/sagas';

const data = [
  {
    MaHocSinh__c: '123',
    Name: 'Nhật Nam',
    birth__c: '2021/12/23',
    gender__c: true,
  },
  {
    MaHocSinh__c: '123',
    Name: 'Nhật Nam',
    birth__c: '2021/12/23',
    gender__c: true,
  },
  {
    MaHocSinh__c: '123',
    Name: 'Nhật Nam',
    birth__c: '2021/12/23',
    gender__c: true,
  },
  {
    MaHocSinh__c: '123',
    Name: 'Nhật Nam',
    birth__c: '2021/12/23',
    gender__c: true,
  }
];

const getListStudents = function* () {
  try {
    yield setLoading(PATH_LOADING.getListStudents, true);
    const res: AxiosResponse<{ data: any[] }> = yield call(apis.getListStudent);
    console.log(res?.data?.data[0].Student);
    
    if (res?.data?.data) {
      const studentList = res?.data?.data[0].Student;
      yield put(actions.getListStudent.success(studentList));
    } else {
      throw 'fail';
    }
  } catch (error) {
    yield put(actions.getListStudent.fail({}));
  } finally {
    yield setLoading(PATH_LOADING.getListStudents, false);
  }
};

// const getStudentDetail: ISagaFunc<string> = function* ({ payload }) {
//   const param = payload;
//   try {
//     yield setLoading(PATH_LOADING.getStudentDetail, true);
//     const res: AxiosResponse<{ data: IStudentDetailResData }> = yield call(apisStudent.getStudentDetail, param);
//     if (res?.data?.data) {
//       const StudentDetail = res.data.data;
//       yield put(actions.getStudentDetail.success(StudentDetail));
//     } else {
//       throw 'fail';
//     }
//   } catch (error) {
//     yield put(actions.getStudentDetail.fail({}));
//   } finally {
//     yield setLoading(PATH_LOADING.getStudentDetail, false);
//   }
// };

export default function* studentServiceSaga() {

  yield takeLatest(actions.getListStudent.fetch, getListStudents);
  // yield takeLatest(actions.getStudentDetail.fetch, getStudentDetail);
  // yield takeLatest(actions.setStudentListParams, setStudentListParams);
}
