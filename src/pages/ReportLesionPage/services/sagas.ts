import { AxiosResponse } from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import { default as apis, default as apisStudent } from './apis';
import uiActions from '../../../services/UI/actions';

const getListLesion = function* () {
  yield put(uiActions.setLoadingPage(true));

  try {
    const res: AxiosResponse<{ data: any[] }> = yield call(apis.getListLesion);
    console.log(res?.data?.data[0].Student);
    
    if (res?.data?.data) {      
      const studentList = res?.data?.data;
      yield put(actions.getListLesion.success(studentList));
    } else {
      throw 'fail';
    }
  } catch (error) {
    yield put(actions.getListLesion.fail({}));
  } finally {
  yield put(uiActions.setLoadingPage(false));

  }
};

// const getDetailStudent: ISagaFunc<string> = function* ({ payload }) {
//   yield put(uiActions.setLoadingPage(true));

//   const param = payload;
//   try {
//     const res: AxiosResponse<any> = yield call(apisStudent.getDetailStudent, param);
//     if (res?.data?.data) {
//       const StudentDetail = res.data.data[0];
//       console.log(StudentDetail);
      
//       yield put(actions.getDetailStudent.success(StudentDetail));
//     } else {
//       throw 'fail';
//     }
//   } catch (error) {
//     yield put(actions.getDetailStudent.fail({}));
//   } finally {
//   yield put(uiActions.setLoadingPage(false));

//   }
// };

export default function* lesionServiceSaga() {

  // yield takeLatest(actions.getListStudent.fetch, getListStudents);
  yield takeLatest(actions.getListLesion.fetch, getListLesion);
  // yield takeLatest(actions.setStudentListParams, setStudentListParams);
}
