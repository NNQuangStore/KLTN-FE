import { call, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import apis from './apis';
import { ISagaFunc } from '../../../services/actionConfigs';
import { IApiLoginBody, IApiLoginResData } from './types/auth';
import { setLoading } from '../../../services/UI/sagas';



const login: ISagaFunc<IApiLoginBody> = function* ({ payload }) {
  const body = payload;
  try {
    const res = yield call(apis.login, body);
    const resData = res?.data?.data as (IApiLoginResData | null);
    if (!resData) throw 'fail';

    yield put(actions.login.success(resData));


  } catch (error) {
    yield put(actions.login.fail({}));
  }
};


export default function* authServiceSaga() {
  yield takeLatest(actions.login.fetch, login);
}
