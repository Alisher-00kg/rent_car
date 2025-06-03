import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./slices/authSlice";
import { allCarsSlice } from "./slices/allCarsSlice";
import { orderSlice } from "./slices/ordersSlice";
import { usersSlice } from "./slices/userSlice";
// import { authApi } from "./api/auth.service";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [allCarsSlice.name]: allCarsSlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
    // [authApi.reducerPath]: authApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(authApi.middleware),
});
