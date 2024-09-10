import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../../utils/axios/axiosIntercepter";

export const adminGetAllProducts = createAsyncThunk(
  "adminProducts/adminGetAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get(`admin/products`);
      return response.data.productsList;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch the products"
      );
    }
  }
);

export const addProducts = createAsyncThunk(
  "adminProducts/addProducts",
  async ({ values, toast, resetForm }, { rejectWithValue }) => {
    try {      
      const response = await http.post(`admin/products`, { values });
      if (response.data.success) {
        toast.success("Product Successfully added");
        resetForm()
      }
      return response.data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed add product"
      );
    }
  }
);


export const updateProducts = createAsyncThunk(
  "adminProducts/updateProducts",
  async ({ values, toast, resetForm }, { rejectWithValue }) => {
    try {      
      const response = await http.put(`admin/products`, { values });
      console.log(response.data);
      
      if (response.data.success) {
        toast.success("Product Successfully added");
        resetForm()
      }
      return response.data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed update product"
      );
    }
  }
);
