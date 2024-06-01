import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  userId: '',
  auth: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      localStorage.setItem(
        'user',
        JSON.stringify({
          token: action.payload.token,
          userId: action.payload.userId,
        }),
      );
      state.auth = true;
    },
    checkUser: (state) => {
      const userStorage = JSON.parse(localStorage.getItem('user'));
      if (!userStorage || !userStorage.token) {
        state.auth = false;
        state.token = null;
        return;
      }
      state.auth = true;
      state.token = userStorage.token;
      state.userId = userStorage.userId;
    },
    logout: (state) => {
      localStorage.clear();
      state.token = null;
      state.userId = null;
      state.auth = false;
    },
  }
})

export const { setUser, checkUser, logout } = authSlice.actions;
export default authSlice.reducer;