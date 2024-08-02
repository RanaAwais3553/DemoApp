import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

const initialState = {
  rooms: 1,
  adults: 2,
  children: 0,
  age: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    UpdateUserForm: (state, {payload}: PayloadAction<any>) => {
      console.log('UserActionTypes.UpdateUser:payLoad:', state, payload);

      return payload;
    },
    ResetUserForm: state => {
      return null;
    },
  },
});
export const {UpdateUserForm, ResetUserForm} = userSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const userData = (state: RootState) => state.user;
export default userSlice.reducer;
