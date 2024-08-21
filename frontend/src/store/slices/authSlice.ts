import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import authService from '../../services/auth.service';
import tokenService from '../../services/token.service';
import axios, { AxiosError } from 'axios';
import { AuthState, User, UserCredentials, UserRegister } from '../types/types';

const user: User = tokenService.getUser();
const initialState: AuthState = user.accessToken
  ? {
      isLoggedIn: true,
      user: user,
      error: ''
    }
  : {
      isLoggedIn: false,
      user: { accessToken: '', refreshToken: '' },
      error: ''
    };

export const registerAsync = createAsyncThunk<AuthState, UserRegister>(
  'auth/register',
  async (userRegister: UserRegister, thunkApi) => {
    if (userRegister.password !== userRegister.passwordConf) {
      thunkApi.dispatch(setError(`Your password doesn't match`));
      return thunkApi.rejectWithValue(`Your password doesn't match`);
    }
    try {
      const response = await authService.register(
        userRegister.email,
        userRegister.password
      );
      if (response.status === 200) {
        return response;
      }
    } catch (_error) {
      const error = _error as Error | AxiosError<any>;
      if (axios.isAxiosError(error)) {
        const resp = error.response?.data;
        thunkApi.dispatch(setError(resp?.detail?.message));
        return thunkApi.rejectWithValue(resp?.detail?.message);
      }
      thunkApi.dispatch(setError(error.message));
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginAsync = createAsyncThunk<AuthState, UserCredentials>(
  'auth/login',
  async (userCredentials: UserCredentials, thunkApi) => {
    try {
      const response = await authService.login(
        userCredentials.email,
        userCredentials.password
      );
      if (response.accessToken) {
        return response;
      }
    } catch (_error) {
      const error = _error as Error | AxiosError<any>;
      if (axios.isAxiosError(error)) {
        const resp = error.response?.data;
        thunkApi.dispatch(setError(resp?.detail?.message));
        return thunkApi.rejectWithValue(resp?.detail?.message);
      }
      thunkApi.dispatch(setError(error.message));
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    refreshToken: (state, { payload }) => {
      state.user.accessToken = payload.acessToken;
      state.user.refreshToken = payload.refreshToken;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.user = payload.user;
        state.error = '';
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.error = '';
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        console.log('app log out');
        state.isLoggedIn = false;
        state.user = { accessToken: '', refreshToken: '' };
        state.error = '';
      });
  }
});

export const { setError, refreshToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
