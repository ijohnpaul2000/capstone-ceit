import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: sessionStorage.getItem("User") || null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = true;
      sessionStorage.clear();
    },
    resetState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      sessionStorage.clear();
    },
  },
});

export const selectUser = (state) => state.auth.user;

export const { login, logout, resetState } = authSlice.actions;
export default authSlice.reducer;
