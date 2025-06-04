import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchFeedbackMessages = createAsyncThunk(
    "feedback/fetchMessages",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("/feedbacks");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );
  export const sendFeedbackReply = createAsyncThunk(
    "feedback/sendReply",
    async ({ id, reply }, { rejectWithValue }) => {
      try {
        await axios.post(`/feedbacks/${id}/reply`, { reply });
        return { id, reply };
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );
