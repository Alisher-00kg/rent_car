import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getInitialState = () => {
  const authUserCookie = Cookies.get("auth");

  if (authUserCookie) {
    try {
      const userData = JSON.parse(authUserCookie);
      return {
        name: userData.data.firstName || "",
        email: userData.data.email || "",
        token: userData.token || null,
        role: userData.data.role || "GUEST",
        localDate: userData.data.localDate || null,
        isAuthorized: !!userData.token,
      };
    } catch (error) {
      console.error("Error parsing auth cookie:", error);
      Cookies.remove("auth");
    }
  }

  return {
    firstName: "",
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
      state.role = action.payload.data.role;
      state.name = action.payload.data.firstName;
      state.email = action.payload.data.email;
      state.localDate = action.payload.data.localDate;
      state.token = action.payload.token;

      Cookies.set("auth", JSON.stringify(action.payload), { expires: 7 });
    },
    logOut: (state) => {
      state.isAuthorized = false;
      state.role = "GUEST";
      state.firstName = "";
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
          state.isAuthorized = !!userData.token;
          state.role = userData.data.role || "GUEST";
          state.firstName = userData.data.firstName || "";
          state.email = userData.data.email || "";
          state.localDate = userData.data.localDate || null;
          state.token = userData.token || null;
        } catch (error) {
          state.isAuthorized = false;
          state.role = "GUEST";
          state.firstName = "";
          state.email = "";
          state.localDate = null;
          state.token = null;
          Cookies.remove("auth");
        }
      }
    },
  },
});

export const { login, logOut, refreshFromCookie } = authSlice.actions;
