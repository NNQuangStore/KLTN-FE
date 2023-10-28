import { PREFIX_ACTIONS } from './constants';
import { createAction, createAsyncAction } from '../../../services/actionConfigs';

const getAbsenceParent = createAsyncAction(PREFIX_ACTIONS + 'getAbsenceParent');


const absenceAction = {
  getAbsenceParent
};

export default absenceAction;
