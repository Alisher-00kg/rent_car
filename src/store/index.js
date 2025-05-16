import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { allCarsSlice } from "./slices/allCarsSlice";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [allCarsSlice.name]: allCarsSlice.reducer,
  },
});
