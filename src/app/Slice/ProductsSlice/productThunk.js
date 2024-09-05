import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let userBaseUrl = import.meta.env.VITE_USER_API;
let adminBaseUrl = import.meta.env.VITE_ADMIN_API; 


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${userBaseUrl}/products`);      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch products.");
    }
  }
);

export const fetchProductbyId = createAsyncThunk(
  "products/fetchProductById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${userBaseUrl}/products/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch the product.");
    }
  }
);
