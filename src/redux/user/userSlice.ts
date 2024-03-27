import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    signupFailure: (state) => {
      state.loading = false;
    },
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    googleSignInStart: (state) => {
      state.loading = true;
    },
    googleSignInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    googleSignInFailure: (state) => {
      state.loading = false;
    },
    profileUpdateStart: (state) => {
      state.loading = true;
    },
    profileUpdateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    profileUpdateFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  signupStart,
  signupSuccess,
  signupFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  googleSignInStart,
  googleSignInSuccess,
  googleSignInFailure,
  profileUpdateStart,
  profileUpdateSuccess,
  profileUpdateFailure,
} = userSlice.actions;

export default userSlice.reducer;
