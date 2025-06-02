import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";
import { toast } from "react-toastify";

export const getAllCars = createAsyncThunk(
  "allCars/getAllCars",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/cars");
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

export const postNewCarCard = createAsyncThunk(
  "allCars/postNewCarCard",
  async (newCarData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/cars", newCarData);
      console.log(data);
      toast.success("Карточка успешно добавлено!");
      return data;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);
export const postNewCarImages = createAsyncThunk(
  "allCars/postNewCarImages",
  async (newCarImages, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/uploads", newCarImages);
      console.log(data);
      toast.success("Карточка успешно добавлено!");
      return data;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const updateFavoriteStatus = createAsyncThunk(
  "allCars/updateFavoriteStatus",
  async ({ currentFavorite, carID }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.patch("/cars/" + carID, {
        isFavorite: currentFavorite,
      });
      console.log(currentFavorite, carID);
      dispatch(getAllCars());
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);
