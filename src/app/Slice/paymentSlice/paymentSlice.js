import { createSlice } from "@reduxjs/toolkit";
import { stripePaymentSuccess } from "./paymentThunk";

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
      .addCase(stripePaymentSuccess.pending, (state,action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(stripePaymentSuccess.fulfilled, (state, action) => {
        state.paymentStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(stripePaymentSuccess.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
    }
  })

  export default paymentSlice.reducer