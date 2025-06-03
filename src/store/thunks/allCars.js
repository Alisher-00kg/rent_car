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
      await axiosInstance.patch("/cars/" + carID, {
        isFavorite: currentFavorite,
      });
      dispatch(getAllCars());
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);
export const clearAllFavorites = createAsyncThunk(
  "allCars/clearAllFavorites",
  async (_, { getState, rejectWithValue, dispatch }) => {
    const { cars } = getState().allCars;

    const favoriteCars = cars.filter((car) => car.isFavorite === true);

    try {
      const updatePromises = favoriteCars.map((car) =>
        axiosInstance.patch("/cars/" + car.id, {
          isFavorite: false,
        })
      );

      await Promise.all(updatePromises);

      dispatch(getAllCars());
    } catch (error) {
      return rejectWithValue(error?.message || "Ошибка при очистке избранного");
    }
  }
);

export const postBookingCar = createAsyncThunk(
  "allCars/postBookingCar",
  async (booking, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/bookings", booking);
    } catch (error) {
      return rejectWithValue(error?.message || "Не удалось забронировать!");
    }
  }
);
export const postFeedBack = createAsyncThunk(
  "allCars/postFeedBack",
  async (feedBack, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/feedbacks", feedBack);
      toast.success("Обращение успешно отправлено!");
    } catch (error) {
      return rejectWithValue(
        error?.message || "Не удалось отправить обращение!"
      );
    }
  }
);
