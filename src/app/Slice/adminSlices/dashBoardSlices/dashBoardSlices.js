import {  createSlice } from "@reduxjs/toolkit";
import { totalUsers,totalProducts,totalStocks,totalRevenueAmount,getTotalSalesCount, getRecentOrders, getRecentActivity } from "./dashBoardThunk";

const dashboard = createSlice({
  name: "dashboard",
  initialState: {
    totalUsersCount:null,
    totalProductsCount:null,
    totalStockCount:null,
    totalSalesAmount:null,
    totalSalesCount:null,
    recentOrders:[],
    recentActivity:null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(totalUsers.pending, (state,) => {        
        state.isLoading = true;
        state.error = null;

      })
      .addCase(totalUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalUsersCount = action.payload;
      })
      .addCase(totalUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed";
      })
      .addCase(totalProducts.pending, (state) => {        
        state.isLoading = true;
        state.error = null;

      })
      .addCase(totalProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalProductsCount = action.payload;
      })
      .addCase(totalProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed";
      })
      .addCase(totalStocks.pending, (state) => {        
        state.isLoading = true;
        state.error = null;
      })
      .addCase(totalStocks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalStockCount = action.payload;
      })
      .addCase(totalStocks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed";
      })
      .addCase(totalRevenueAmount.pending, (state) => {        
        state.isLoading = true;
        state.error = null;
      })
      .addCase(totalRevenueAmount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalSalesAmount = action.payload;
      })
      .addCase(totalRevenueAmount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed";
      })
      .addCase(getTotalSalesCount.pending, (state) => {        
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTotalSalesCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalSalesCount = action.payload;
      })
      .addCase(getTotalSalesCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed";
      })
      .addCase(getRecentOrders.pending, (state) => {        
      })
      .addCase(getRecentOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recentOrders = action.payload;
      })
      .addCase(getRecentOrders.rejected, (state, action) => {
        state.error = action.payload || "Failed";
      })
      .addCase(getRecentActivity.pending, (state) => {        
      })
      .addCase(getRecentActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recentActivity = action.payload;
      })
      .addCase(getRecentActivity.rejected, (state, action) => {
        state.error = action.payload || "Failed";
      })

  
  },
});

export default dashboard.reducer;

