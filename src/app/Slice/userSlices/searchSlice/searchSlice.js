import { createSlice } from "@reduxjs/toolkit";
import { searchProductsUsers } from "../ProductsSlice/productThunk";

const initialState = {
  searchProducts: [],
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(searchProductsUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProductsUsers.fulfilled, (state, action) => {
        state.searchProducts = action.payload;
        state.isLoading = false;
      })
      .addCase(searchProductsUsers.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      })
  },
});

export default searchSlice.reducer;