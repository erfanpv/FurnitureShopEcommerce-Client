import { createSlice } from "@reduxjs/toolkit";
import { getWalletData } from "./walletThunk";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    loading: false,
    error: null,
    walletData:null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWalletData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWalletData.fulfilled, (state, action) => {
        state.loading = false;
        state.walletData = action.payload
      })
      .addCase(getWalletData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default walletSlice.reducer