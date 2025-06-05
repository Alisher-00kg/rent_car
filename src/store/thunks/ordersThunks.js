import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

export const getorderThunks = createAsyncThunk(
  "order/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/bookings");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ошибка входа");
    }
  }
);
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, newStatus }, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.patch(`/bookings/${orderId}`, {
        bookingStatus: newStatus,
      });
      dispatch(getorderThunks());
    } catch (error) {
      return rejectWithValue(
        error?.message || "Не удалось обновить статус заказа!"
      );
    }
  }
);
export const deleteBookingFromAdmin = createAsyncThunk(
  "allCars/deleteBookingFromAdmin",
  async (bookingID, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.delete("/bookings/" + bookingID);
      dispatch(getorderThunks());
    } catch (error) {
      return rejectWithValue(error?.message || "Не удалось удалить бронь!");
    }
  }
);
