import {  createSlice } from "@reduxjs/toolkit";
import { getorderThunks } from "../thunks/ordersThunks";
const initialState = {
    order: [],
    isLoading: false,
    error: null,
  };

  export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
   
      updateOrderStatus(state, action) {
        const { id, newStatus } = action.payload;
        const order = state.order.find((o) => o.id === id);
        if (order) {
          order.status = newStatus;
        }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getorderThunks.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(getorderThunks.fulfilled, (state, action) => {
          state.isLoading = false;
          state.order = action.payload;
        })
        .addCase(getorderThunks.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
    },
  });
  
 
  export const { updateOrderStatus } = orderSlice.actions;
  export default orderSlice.reducer;