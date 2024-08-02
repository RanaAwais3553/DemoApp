import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

const initialState = {
  searchResult: {},
};

export const searchFormSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    UpdateSearchForm: (state, {payload}: PayloadAction<any>) => {
      console.log('UserActionTypes.UpdateUser:payLoad:', state, payload);

      return payload;
    },
    ResetSearchForm: state => {
      return initialState;
    },
  },
});
export const {UpdateSearchForm, ResetSearchForm} = searchFormSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const searchFormData = (state: RootState) => state?.searchResult;
export default searchFormSlice.reducer;
