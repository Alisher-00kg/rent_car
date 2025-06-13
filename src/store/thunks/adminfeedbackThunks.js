import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../api/axiosInstance";
import { toast } from "react-toastify";

export const fetchFeedbackMessages = createAsyncThunk(
  "feedback/fetchFeedbackMessages",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/feedbacks");
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const sendFeedbackReply = createAsyncThunk(
  "feedback/sendFeedbackReply",
  async ({ id, response }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(`/feedbacks/${id}`, {
        response,
      });
      toast.success("Ответ добавлен!");
      return { id, response: data.response };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const deleteFeedBack = createAsyncThunk(
  "feedback/deleteFeedBack",
  async (feedbackId, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.delete("/feedbacks/" + feedbackId);
      dispatch(fetchFeedbackMessages());
      toast.success("Успешно удалено!");
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);
