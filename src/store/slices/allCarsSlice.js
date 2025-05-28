import { createSlice } from "@reduxjs/toolkit";
import { getAllCars, getSingleCar } from "../thunks/allCars";

export const allCarsSlice = createSlice({
  name: "allCars",
  initialState: {
    cars: [],
    singleCar: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = action.payload;
      })
      .addCase(getAllCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getSingleCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleCar = action?.payload;
      });
  },
});

export default allCarsSlice.reducer;
