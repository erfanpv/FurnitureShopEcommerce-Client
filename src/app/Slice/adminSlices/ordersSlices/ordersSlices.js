import { createSlice } from "@reduxjs/toolkit";
import { getAllordersData, ordersDataByUserForAdmin } from "./ordersThunk";

const ordersSliceByAdmin = createSlice({
  name: "orders",
  initialState: {
    ordersDetails: [],
    pagination: null,  
    orderDetailsByUser: null,
    isLoading: false,
    error: null,
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
        state.ordersDetails = action.payload.orders; 
        state.pagination = action.payload.pagination; 
      })
      .addCase(getAllordersData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch orders";
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
        state.error = action.payload || "Failed to fetch order details";
      });
  },
});

export default ordersSliceByAdmin.reducer;
