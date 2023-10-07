import { PREFIX_ACTIONS } from './constants';
import { createAction, createAsyncAction } from '../../../services/actionConfigs';
import { IScoreboardAttr } from './types/scoreboard';
import { Evalution, TScoreboardParamReq } from './apis';

const setColScoreboard = createAction<IScoreboardAttr>(PREFIX_ACTIONS + 'SET_SCOREBOARD');

const setParam = createAction<{evaluation: keyof typeof Evalution}>(PREFIX_ACTIONS + 'SET_PARAM');

const getScoreboard = createAsyncAction<TScoreboardParamReq>(PREFIX_ACTIONS + 'GET_SCOREBOARD');

const scoreboardActions = {
  setColScoreboard,
  getScoreboard,
  setParam
};

export default scoreboardActions;
