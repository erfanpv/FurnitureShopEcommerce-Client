import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductbyId, fetchProductsWithCategory, fetchUniqueProductCategories } from "./productThunk.js";
import { searchProductsUsers } from "./productThunk.js";

const initialState = {
  products: [],
  productItem: null,
  productWithCategory:[],
  uniqueProductCategories:[],
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
      })
      .addCase(fetchProductsWithCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsWithCategory.fulfilled, (state, action) => {
        state.productWithCategory = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProductsWithCategory.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      })
      .addCase(fetchUniqueProductCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUniqueProductCategories.fulfilled, (state, action) => {
        state.uniqueProductCategories = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUniqueProductCategories.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      })
      .addCase(searchProductsUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProductsUsers.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(searchProductsUsers.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      })
  },
});

export default productSlice.reducer;
