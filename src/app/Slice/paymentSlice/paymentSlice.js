import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 paymentStatus:false,
 isLoading:false,
 error:null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state,action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.paymentStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      })
    }
  })

  export default paymentSlice.reducer