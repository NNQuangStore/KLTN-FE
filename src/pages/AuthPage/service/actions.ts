import { PREFIX_ACTIONS } from './constants';
import { IApiLoginBody } from './types/auth';
import { createAsyncAction } from '../../../services/actionConfigs';

const login = createAsyncAction<IApiLoginBody>(PREFIX_ACTIONS + 'LOGIN');

const authActions = {
  login,
};

export default authActions;
