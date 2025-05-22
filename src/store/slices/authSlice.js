import { createSlice } from "@reduxjs/toolkit";
import { signInThunk, signUpThunk } from "../thunks/authThunk";
const localAuth = JSON.parse(localStorage.getItem("auth")) || {};
const roleFromStorage = localAuth?.data?.role || "GUEST";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: {},
    role: "ADMIN",
    isAuthenticated: !!true,
    isAuthInitialized: true,
    isLoading: false,
    errorMessage: null,
    token: "asdfasdf",
  },
  reducers: {
    isAuth: (state, action) => {
      state.role = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isAuthInitialized = true;
    },
    logOut: (state) => {
      state.token = null;
      state.userData = {};
      state.role = null;
      state.isAuthenticated = false;
      state.isAuthInitialized = true;
      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.role = action.payload.data.role;
        state.isAuthenticated = true;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isAuthenticated = true;
        state.role = action.payload?.data?.role;
        state.token = action.payload?.token;
      });
  },
});

export const { isAuth, logOut } = authSlice.actions;
