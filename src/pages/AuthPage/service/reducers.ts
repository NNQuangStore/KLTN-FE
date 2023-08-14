import { createSlice } from '@reduxjs/toolkit';
import { NAME_REDUCER } from './constants';
import { IState } from './types/reducer';
import actions from './actions';
import { IApiLoginResData } from './types/auth';

const initialState: IState = {
  access_token: '',
  user_data: {}

};

export const Slice = createSlice({
  name: NAME_REDUCER,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(actions.login.success, (state, { payload }) => {
      const data: IApiLoginResData = payload;
      state.access_token = data?.token ?? null;
      state.user_data = data;
    });
  },
});
const authServiceReducer = Slice.reducer;
export default authServiceReducer;
