import { call, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import apis, { TScoreboardParamReq } from './apis';
import { ISagaFunc } from '../../../services/actionConfigs';
// import { setLoading } from '../../../services/UI/sagas';
import uiActions from '../../../services/UI/actions';
import storage from '../../../utils/sessionStorage';


const getScoreboard: ISagaFunc<TScoreboardParamReq> = function* ({ payload }) {
  yield put(uiActions.setLoadingPage(true));
  const param = payload;
  
  try {
    
    const res = yield call(apis.getScoreboard, param);    

    if(res?.data?.data) {console.log(res.data.data);
    
      yield put(actions.getScoreboard.success(res.data.data));
    }


  } catch (error) {
    yield put(actions.getScoreboard.fail({}));
  } finally {
    yield put(uiActions.setLoadingPage(false));
  }
};

// const login: ISagaFunc<IApiLoginBody> = function* ({ payload }) {
//   yield put(uiActions.setLoadingPage(true));
//   const body = payload;
  
//   try {
    
//     const res = yield call(apis.login, body);    
//     const resData = res?.data as (IApiLoginResData | null);
//     if (!resData) throw 'fail';

//     storage.set('token', resData.token);
//     yield put(actions.login.success(resData));


//   } catch (error) {
//     yield put(actions.login.fail({}));
//   } finally {
//     yield put(uiActions.setLoadingPage(false));
//   }
// };


export default function* scoreboardServiceSaga() {
  yield takeLatest(actions.getScoreboard.fetch, getScoreboard);
  // yield takeLatest(actions.login.fetch, login);
}
