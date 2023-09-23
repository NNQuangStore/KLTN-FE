import { createAsyncAction } from '../../../services/actionConfigs';
import { PREFIX_ACTIONS } from './constants';

const getListLesion = createAsyncAction(PREFIX_ACTIONS + 'GET_LIST_LESION');
const getDetailLesion = createAsyncAction<string>(PREFIX_ACTIONS + 'GET_DETAIL_LESION');
// const setCustomerListParams = createAction<ICustomerParam>(PREFIX_ACTIONS + 'SET_Lesion_LIST_PARAMS');

const lesionActions = {
  getListLesion,
  getDetailLesion
  // setCustomerListParams,
};

export default lesionActions;
