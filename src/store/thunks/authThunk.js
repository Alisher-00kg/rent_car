import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../../api/axiosInstance";
import { PATHS } from "../../utils/constants/constants";
import { login } from "../slices/authSlice";

export const signUpThunk = createAsyncThunk(
  "auth/signUpThunk",
  async (newUser, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/register", newUser);
      console.log(data, "daaa");
      toast.success("Успешно зарегистрировались!");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const signInThunk = createAsyncThunk(
  "auth/signInThunk",
  async ({ userData, navigate }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.post("/auth", userData);
      toast.success("Успешно вошли!");
      dispatch(login(data));
      if (data.data.role === "USER") {
        navigate(PATHS.USER.PAGE);
      } else if (data.data.role === "ADMIN") {
        navigate(PATHS.ADMIN.PAGE);
      }
    } catch (error) {
      toast.error("Ошибка: " + error.message);
      return rejectWithValue(error.response?.data?.message || "Ошибка входа");
    }
  }
);


