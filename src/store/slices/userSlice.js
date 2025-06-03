import { createSlice } from "@reduxjs/toolkit";
import {
  getAllBookings,
  getAllUsersData,
  getSingleUserData,
} from "../thunks/usersThunk";

export const usersSlice = createSlice({
  name: "allUsers",
  initialState: {
    users: [],
    user: {},
    bookings: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersData.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getSingleUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
      });
  },
});
