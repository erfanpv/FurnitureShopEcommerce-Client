import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../../utils/axios/axiosIntercepter";

export const getAllUsers = createAsyncThunk(
  "userManger/getAllUsers",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await http.get(
        `/admin/users?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Users"
      );
    }
  }
);

export const toggleBlockUser = createAsyncThunk(
  "userManager/toggleBlockUser",
  async (
    { id, toast, closeModal, dispatch, page, limit },
    { rejectWithValue }
  ) => {
    try {
      const response = await http.put(`/admin/users/${id}/toggle-block`);

      toast.success(response.data.message);

      closeModal();
      dispatch(getAllUsers({ page, limit }));
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to toggle block status"
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle block status"
      );
    }
  }
);

export const searchUsers = createAsyncThunk(
  "adminProducts/searchUsers",
  async ({ query }, { rejectWithValue }) => {
    try {
      const response = await http.get(`/admin/search/users`, {
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
