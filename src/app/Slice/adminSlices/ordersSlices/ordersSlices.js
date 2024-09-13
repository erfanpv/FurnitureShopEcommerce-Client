import {  createSlice } from "@reduxjs/toolkit";
import { getAllordersData,ordersDataByUser } from "./ordersThunk";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    ordersDetails: [],
    orderDetailsByUser:null,
    isLoading:false,
    error:null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllordersData.pending, (state) => {        
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllordersData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersDetails = action.payload;
      })
      .addCase(getAllordersData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed";
      })
      .addCase(ordersDataByUser.pending, (state) => {        
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ordersDataByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetailsByUser = action.payload;
      })
      .addCase(ordersDataByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed";
      })

 
  },
});

export default ordersSlice.reducer;

