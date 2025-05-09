import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: {},
    role: "GUEST",
    isAuthenticated: false,
    isLoading: false,
    errorMessage: null,
    token: null,
  },
  reducers: {
    isAuth: (state, action) => {
      state.role = action.payload;
    },
    logOut: (state) => {
      state.token = null;
      state.userData = {};
      state.role = null;
      localStorage.removeItem("auth");
    },
  },
  extraReducers: () => {},
});

export const { isAuth, logOut } = authSlice.actions;
