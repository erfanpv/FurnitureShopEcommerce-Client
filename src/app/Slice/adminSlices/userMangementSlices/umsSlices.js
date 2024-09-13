import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, searchUsers, toggleBlockUser } from "./umsThunk";

const initialState = {
  allUsers: [],
  isLoading: false,
  isBlock: false,
  error: null,
};

const userMangerSlice = createSlice({
  name: "userManger",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(toggleBlockUser.pending, (state, action) => {
        // state.isLoading = true;
        // state.error = null;
      })
      .addCase(toggleBlockUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(toggleBlockUser.rejected, (state, action) => {
        // state.error = action.payload;
        // state.isLoading = false;
      })
      .addCase(searchUsers.pending, (state, action) => {
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
