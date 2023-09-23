import { PREFIX_ACTIONS } from './constants';
import { createAction, createAsyncAction } from '../../../services/actionConfigs';
import { IScoreboardAttr } from './types/scoreboard';

const setColScoreboard = createAction<IScoreboardAttr>(PREFIX_ACTIONS + 'SET_SCOREBOARD');

const scoreboardActions = {
  setColScoreboard,
};

export default scoreboardActions;
