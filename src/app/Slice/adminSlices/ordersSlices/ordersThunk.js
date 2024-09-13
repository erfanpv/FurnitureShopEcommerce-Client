import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../../utils/axios/axiosIntercepter";


export const getAllordersData = createAsyncThunk(
  "orders/getAllordersData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get(`/admin/orders`);

      return response.data.data
      
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed "
      );
    }
  }
);

export const ordersDataByUser = createAsyncThunk(
  "orders/ordersDataByUser",
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await http.get(`/admin/orders/${id}`);
      return response.data.data.orderDetails
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);
