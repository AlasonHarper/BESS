import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import paramReducer from './slices/parameterSlice';
import resultReducer from './slices/resultSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    result: resultReducer,
    param: paramReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
