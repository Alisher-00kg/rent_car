import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getInitialState = () => {
  const authUserCookie = Cookies.get("auth");

  if (authUserCookie) {
    try {
      const userData = JSON.parse(authUserCookie);
      return {
        name: userData.name || "",
        email: userData.email || "",
        token: userData.token || null,
        role: userData.role || "GUEST",
        localDate: userData.role || null,
        isAuthorized: true,
      };
    } catch (error) {
      error;
    }
  }

  return {
    name: "",
    email: "",
    token: null,
    role: "GUEST",
    localDate: null,
    isAuthorized: false,
  };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    login: (state, action) => {
      state.isAuthorized = true;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.localDate = action.payload.localDate;
      state.token = action.payload.token;

      Cookies.set("auth", JSON.stringify(action.payload), { expires: 7 });
    },
    logOut: (state) => {
      state.isAuthorized = false;
      state.role = "GUEST";
      state.name = "";
      state.email = "";
      state.localDate = null;
      state.token = null;

      Cookies.remove("auth");
    },
    refreshFromCookie: (state) => {
      const authUserCookie = Cookies.get("auth");
      if (authUserCookie) {
        try {
          const userData = JSON.parse(authUserCookie);
          state.isAuthorized = true;
          state.role = userData.role;
          state.name = userData.name;
          state.email = userData.email;
          state.localDate = userData.localDate;
          state.token = userData.token;
        } catch (error) {
          error;
        }
      }
    },
  },
});

export const { login, logOut, refreshFromCookie } = authSlice.actions;
