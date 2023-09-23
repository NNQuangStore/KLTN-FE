import { all } from 'redux-saga/effects';
import authServiceSaga from '../../pages/AuthPage/service/sagas';
import scoreboardServiceSaga from '../../pages/ScoreboardPage/service/sagas';
import studentServiceSaga from '../../pages/StudentPage/services/sagas';

export default function* rootSaga() {
  yield all([
    // define module saga here
    authServiceSaga(),
    scoreboardServiceSaga(),
    studentServiceSaga()
  ]);
}
