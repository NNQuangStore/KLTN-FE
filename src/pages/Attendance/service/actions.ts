import { PREFIX_ACTIONS } from './constants';
import { createAction, createAsyncAction } from '../../../services/actionConfigs';
import { Evalution, TScoreboardParamReq } from './apis';
import { TableScore } from './types/_scoreboard';

const checkAttendance = createAction<{studentId: string, isCheck: boolean}>(PREFIX_ACTIONS + 'CHECK_ATTENDANCE');

const getAttendanceDetail = createAsyncAction<any>(PREFIX_ACTIONS + 'GET_ATTENDANCE');




const attendanceActions = {
  checkAttendance,
  getAttendanceDetail
};

export default attendanceActions;
