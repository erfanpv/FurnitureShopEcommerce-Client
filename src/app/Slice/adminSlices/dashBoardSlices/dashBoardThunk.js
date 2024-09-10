import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../../utils/axios/axiosIntercepter";

export const totalUsers = createAsyncThunk(
  "dashboard/totalUsers",
  async (_, { rejectWithValue }) => {
    try {
      const action = "totalUsers";
      const response = await http.get(`/admin/dashboard`, { params: { action } });
      return response.data.totalUsersCount;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);


export const totalProducts = createAsyncThunk(
  "dashboard/totalProducts",
  async (_, { rejectWithValue }) => {
    try {
      const action = "totalProducts";
      const response = await http.get(`/admin/dashboard`, { params: { action } });
      return response.data.totalProductsCount;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);


export const totalStocks = createAsyncThunk(
  "dashboard/totalStocks",
  async (_, { rejectWithValue }) => {
    try {
      const action = "totalStocks";
      const response = await http.get(`/admin/dashboard`, { params: { action } });
      return response.data.totalStockCount;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);

export const totalRevenueAmount = createAsyncThunk(
  "dashboard/totalRevenueAmount",
  async (_, { rejectWithValue }) => {
    try {
      const action = "totalSalesAmount";
      const response = await http.get(`/admin/dashboard`, { params: { action } });
      return response.data.totalSalesAmount;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);


export const getTotalSalesCount = createAsyncThunk(
  "dashboard/getTotalSalesCount",
  async (_, { rejectWithValue }) => {
    try {
      const action = "totalSalesCount";
      const response = await http.get(`/admin/dashboard`, { params: { action } });
      return response.data.totalSalesCount;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);
