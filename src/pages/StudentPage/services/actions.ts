import { createAsyncAction } from '../../../services/actionConfigs';
import { PREFIX_ACTIONS } from './constants';
import { createAction } from '@reduxjs/toolkit';

const getListStudent = createAsyncAction(PREFIX_ACTIONS + 'GET_LIST_STUDENT');
// const setCustomerListParams = createAction<ICustomerParam>(PREFIX_ACTIONS + 'SET_STUDENT_LIST_PARAMS');

const studentActions = {
  getListStudent,
  // setCustomerListParams,
};

export default studentActions;
