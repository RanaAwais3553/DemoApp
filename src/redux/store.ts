/*
 * Updated by Asad on 28 Dec 2022.[old way of redux replaced with current redux-toolkit]
 */
import {configureStore} from '@reduxjs/toolkit';
// reducers
import userReducer from './slices/user';
import searchFormReducer from './slices/searchForm';

export const store = configureStore({
  reducer: {
    user: userReducer,
    searchResult: searchFormReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
