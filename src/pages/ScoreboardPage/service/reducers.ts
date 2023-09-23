import { createSlice } from '@reduxjs/toolkit';
import { NAME_REDUCER } from './constants';
import { IState } from './types/reducer';
import actions from './actions';
import { IScoreboard, IScoreboardAttr } from './types/scoreboard';
import { roundNumber } from '../../../utils/unit';

const initialState: IState = {
  scoreboard:  [
    {
      stt: '1',
      studentCode: '1234',
      spokenExamScore:[],
      _15MExamScore: [],
      _1SessionExamScore: [],
      semesterCore: 0,
      finalScore: 0,
    },
    {
      stt: '2',
      studentCode: '2314',
      spokenExamScore:[],
      _15MExamScore: [],
      _1SessionExamScore: [],
      semesterCore: 0,
      finalScore: 0,

    },
  ]
};



export const Slice = createSlice({
  name: NAME_REDUCER,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(actions.setColScoreboard, (state, { payload }) => {
      const {row, col, value} = payload;
      const rowData = state.scoreboard.find(o => o.studentCode === row);
      const [name, index] = col;      
      if(!rowData) return;
      // @ts-ignore
      index !== undefined ? rowData[name][index] = value : rowData[name] = value;
    });
  },
});
const scoreboardServiceReducer = Slice.reducer;
export default scoreboardServiceReducer;
