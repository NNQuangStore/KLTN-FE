import authServiceReducer from '../../pages/AuthPage/service/reducers';
import scoreboardServiceReducer from '../../pages/ScoreboardPage/service/reducers';
import studentServiceReducer from '../../pages/StudentPage/services/reducers';
import uiServiceReducer from '../../services/UI/reducer';

const rootReducer = {
  ui: uiServiceReducer,
  auth: authServiceReducer,
  scoreboard: scoreboardServiceReducer,
  student: studentServiceReducer
};

export default rootReducer;
