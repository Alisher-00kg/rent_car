import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

export const getAllCars = createAsyncThunk(
  "allCars/getAllCars",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/cars");
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const getSingleCar = createAsyncThunk(
  "allCars/getSingleCar",
  async (cardID, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/cars/" + cardID);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);
