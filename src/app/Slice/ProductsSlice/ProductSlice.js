import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductbyId } from "./productThunk.js";

const initialState = {
  products: [],
  productItem: null,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      })
      .addCase(fetchProductbyId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductbyId.fulfilled, (state, action) => {
        state.productItem = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProductbyId.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
