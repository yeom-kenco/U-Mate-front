import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import userReducer from './userSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
