import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./slices/authSlice";
import { allCarsSlice } from "./slices/allCarsSlice";
// import { authApi } from "./api/auth.service";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [allCarsSlice.name]: allCarsSlice.reducer,
    // [authApi.reducerPath]: authApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(authApi.middleware),
});
