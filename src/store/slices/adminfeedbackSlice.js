import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFeedbackMessages,
  sendFeedbackReply,
} from "../thunks/adminfeedbackThunks";

export const adminfeedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    messages: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbackMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeedbackMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action?.payload;
      })
      .addCase(fetchFeedbackMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(sendFeedbackReply.fulfilled, (state, action) => {
        const { id, response } = action.payload;
        const message = state.messages.find((msg) => msg.id === id);
        if (message) {
          message.response = response;
        }
      });
  },
});
