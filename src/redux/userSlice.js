import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUser: null,
    loading: false,
    error: false,
    message: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSucess: (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload.user;
    },
    loginError: (state) => {
      state.loading = false;
      state.error = true;
    },
    signupStart: (state) => {
      state.loading = true;
    },
    signupSucess: (state, action) => {
      state.loading = false;
      //state.loggedInUser = action.payload.user;
      state.message = action.payload;
    },
    signupError: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.loggedInUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  loginStart,
  loginSucess,
  loginError,
  signupStart,
  signupSucess,
  signupError,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
