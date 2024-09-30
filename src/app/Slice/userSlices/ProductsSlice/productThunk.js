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


export const fetchProductsWithCategory = createAsyncThunk(
  "products/fetchProductWithCategory",
  async ({ category }, { rejectWithValue }) => {
    try {
      let categoryName =category.slice(0,1).toUpperCase()+category.slice(1).toLowerCase();      
      const response = await axios.get(`${userBaseUrl}/products/category/${categoryName}`);      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch the product.");
    }
  }
);

export const fetchUniqueProductCategories = createAsyncThunk(
  "products/fetchUniqueProductCategories ",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${userBaseUrl}/products/categorylist/unique`);     
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch the product.");
    }
  }
);


export const searchProductsUsers = createAsyncThunk(
  "products/searchProductsUsers",
  async ({ query }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${userBaseUrl}/search/products`, {
        params: { searchQuery: query },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch the product."
      );
    }
  }
);