import {  createSlice } from "@reduxjs/toolkit";
import { ordersDataByUser } from "./ordersThunk"

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orderDetailsByUser:null,
    isLoading:false,
    error:null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
    }
  })

  export default ordersSlice.reducer