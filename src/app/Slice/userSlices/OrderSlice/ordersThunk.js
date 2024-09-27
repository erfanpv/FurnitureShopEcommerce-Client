import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../../utils/axios/axiosIntercepter";

export const ordersDataByUser = createAsyncThunk(
  "orders/ordersDataByUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await http.get(`/users/orders/${id}`);

      if (response.data.success) {
        return response.data.data.orderDetails || [];
      } else {
        return rejectWithValue(response.data.message || "No orders found.");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders."
      );
    }
  }
);
