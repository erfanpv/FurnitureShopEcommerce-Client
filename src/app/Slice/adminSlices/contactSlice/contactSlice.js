import { createSlice } from "@reduxjs/toolkit";
import { getAllUserMessages, getPendingContactCount } from "./contactThunk";  

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contactDatas: [],
    isLoading: false,
    error: null,
    pendingContactCount:null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;  
      })
      .addCase(getAllUserMessages.fulfilled, (state, action) => {
        state.contactDatas = action.payload;
        state.isLoading = false;  
      })
      .addCase(getAllUserMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch messages";  
      })
      .addCase(getPendingContactCount.pending, (state) => {
        state.error = null;  
      })
      .addCase(getPendingContactCount.fulfilled, (state, action) => {
        state.pendingContactCount = action.payload;
        state.isLoading = false;  
      })
      .addCase(getPendingContactCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch Count";  
      });
  },
});

export default contactSlice.reducer;
