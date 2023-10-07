import { createSlice } from '@reduxjs/toolkit';
import { NAME_REDUCER } from './constants';
import { IState } from './types/reducer';
import actions from './actions';
import { IScoreboard, IScoreboardAttr } from './types/scoreboard';
import { roundNumber } from '../../../utils/unit';
import { Evalution } from './apis';

const initialState: IState = {
  scoreboard: null,
  params: {
    evaluation: 'GIUA_HK_1'
  }
};



export const Slice = createSlice({
  name: NAME_REDUCER,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    // .addCase(actions.setColScoreboard, (state, { payload }) => {
    //   const {row, col, value} = payload;
    //   const rowData = state.scoreboard.find(o => o.studentCode === row);
    //   if(!rowData) return;
    //   // @ts-ignore
    //   index !== undefined ? rowData[name][index] = value : rowData[name] = value;
    // })
    .addCase(actions.getScoreboard.success, (state, { payload }) => {      
      state.scoreboard = payload;
    })
    .addCase(actions.setParam, (state, { payload }) => {     
      console.log('ffff');
      
      console.log(payload);
       
      state.params = payload;
    });
  },
});
const scoreboardServiceReducer = Slice.reducer;
export default scoreboardServiceReducer;
