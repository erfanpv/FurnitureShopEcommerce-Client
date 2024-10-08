import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, searchUsers, toggleBlockUser } from "./umsThunk";

const initialState = {
  allUsers: [],
  isLoading: false,
  isBlock: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    limit: 10,
  },
};


const userMangerSlice = createSlice({
  name: "userManger",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload.data; 
        state.pagination.currentPage = action.payload.pagination.currentPage;
        state.pagination.totalPages = action.payload.pagination.totalPages;
        state.pagination.totalUsers = action.payload.pagination.totalUsers;
        state.pagination.limit = action.payload.pagination.limit;
        state.isLoading = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(toggleBlockUser.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(toggleBlockUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(toggleBlockUser.rejected, (state, action) => {
        // state.error = action.payload;
        // state.isLoading = false;
      })
      .addCase(searchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.isLoading = false;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default userMangerSlice.reducer;
