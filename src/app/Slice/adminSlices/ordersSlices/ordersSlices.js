import {  createSlice } from "@reduxjs/toolkit";
import { getAllordersData,ordersDataByUserForAdmin } from "./ordersThunk";

const ordersSliceByAdmin = createSlice({
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
      .addCase(ordersDataByUserForAdmin.pending, (state) => {        
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ordersDataByUserForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetailsByUser = action.payload;
      })
      .addCase(ordersDataByUserForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed";
      })

 
  },
});

export default ordersSliceByAdmin.reducer;

