import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

export const getorderThunks = createAsyncThunk(
    "orders/getOrders",
    async (_,{rejectWithValue}) => {
        try {
          const {data} =  await axiosInstance.get("/bookings") 
        
          return data
         
          
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Ошибка входа"); 
        }
    }
)