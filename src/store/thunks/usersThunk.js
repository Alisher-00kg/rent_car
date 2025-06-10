import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";
import { toast } from "react-toastify";

export const getAllUsersData = createAsyncThunk(
  "allUsers/getAllUsersData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/users");
      console.log(data, "allUsers");

      return data;
    } catch (error) {
      toast.error("Ошибка: " + error.message);
      return rejectWithValue(
        error.response?.data?.message || "Ошибка получения данных!"
      );
    }
  }
);

export const getSingleUserData = createAsyncThunk(
  "allUsers/getSingleUserData",
  async (userID, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/users/" + userID);
      console.log(data, "singleUser");
      return data;
    } catch (error) {
      toast.error("Ошибка: " + error.message);
      return rejectWithValue(
        error.response?.data?.message || "Ошибка получения данных!"
      );
    }
  }
);

export const getAllBookings = createAsyncThunk(
  "allUsers/getAllBookings",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/bookings");
      return data;
    } catch (error) {
      toast.error("Ошибка: " + error.message);
      return rejectWithValue(
        error.response?.data?.message || "Ошибка получения данных!"
      );
    }
  }
);

export const uploadDocuments = createAsyncThunk(
  "user/uploadDocuments",
  async (files, { rejectWithValue }) => {
    try {
      const uploadedUrls = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axiosInstance.post("/uploads", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        uploadedUrls.push(response.data.url);
      }

      return uploadedUrls;
    } catch (error) {
      return rejectWithValue(
        "Ошибка при загрузке документов: " + error.message
      );
    }
  }
);

export const patchUserDocuments = createAsyncThunk(
  "user/patchUserDocuments",
  async ({ userId, documentUrls }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/users/${userId}`, {
        documents: documentUrls,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        "Ошибка при обновлении пользователя: " + error.message
      );
    }
  }
);
export const editUserProfile = createAsyncThunk(
  "user/editUserProfiles",
  async ({ userId, ...rest }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.patch(`/users/${userId}`, {
        ...rest,
      });
      dispatch(getSingleUserData(userId));
      dispatch(getAllUsersData());
      return data;
    } catch (error) {
      return rejectWithValue(
        "Ошибка при обновлении пользователя: " + error.message
      );
    }
  }
);

export const deleteUserData = createAsyncThunk(
  "user/deleteUserData",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.delete("/users/" + userId);
      dispatch(getAllUsersData());
      toast.success("Успешно удалили пользователя!");
    } catch (error) {
      return rejectWithValue(
        error.message || "Ошибка при удалении пользователя!"
      );
    }
  }
);
