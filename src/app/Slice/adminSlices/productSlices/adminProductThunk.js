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
        resetForm();
      }
      return response.data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed add product"
      );
    }
  }
);

export const adminGetProductWithId = createAsyncThunk(
  "adminProducts/adminGetProductWithId",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await http.get(`admin/products/${id}`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

export const updateProducts = createAsyncThunk(
  "adminProducts/updateProducts",
  async ({ id, values, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await http.put(`admin/products/${id}`, values);
      toast.success("Product updated successfully");
      navigate("/admin/productlist");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async ({ id, toast, closeModal }, { rejectWithValue }) => {
    try {
      const response = await http.delete(`admin/products/${id}`);
      toast.success("Product Deleted successfully");
      closeModal();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const fetchUniqueProductCategories = createAsyncThunk(
  "adminProducts/fetchUniqueProductCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get(`admin/products/categorylist/unique`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch the product."
      );
    }
  }
);

export const getproductWithCategory = createAsyncThunk(
  "adminProducts/getproductWithCategory",
  async ({ category }, { rejectWithValue }) => {
    try {
      
      let categoryName =category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
      const response = await http.get(`/admin/products?categoryName=${categoryName}`);

      return response.data.productsList;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch the product."
      );
    }
  }
);

export const searchProducts = createAsyncThunk(
  "adminProducts/searchProducts",
  async ({ query }, { rejectWithValue }) => {
    try {
      const response = await http.get(`/admin/search/products`, {params: { searchQuery: query }});
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch the product."
      );
    }
  }
);
