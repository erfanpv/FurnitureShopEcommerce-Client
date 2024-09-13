import { createSlice } from "@reduxjs/toolkit";
import {
  adminGetAllProducts,
  addProducts,
  updateProducts,
  adminGetProductWithId,
  deleteProduct,
  fetchUniqueProductCategories,
  getproductWithCategory,
  searchProducts,
} from "./adminProductThunk";

const initialState = {
  products: [],
  product: null,
  productStatus: null,
  productWithCategory: [],
  uniqueProductCategories: [],
  isLoading: false,
  error: null,
  deletStatus: false,
};

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(adminGetAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminGetAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(adminGetAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.productStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(adminGetProductWithId.pending, (state) => {
        // state.isLoading = true;
        state.error = null;
      })
      .addCase(adminGetProductWithId.fulfilled, (state, action) => {
        state.product = action.payload;
        // state.isLoading = false;
      })
      .addCase(adminGetProductWithId.rejected, (state, action) => {
        // state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProducts.fulfilled, (state, action) => {
        state.productStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deletStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUniqueProductCategories.pending, (state) => {
        // state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUniqueProductCategories.fulfilled, (state, action) => {
        state.uniqueProductCategories = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUniqueProductCategories.rejected, (state, action) => {
        // state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getproductWithCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getproductWithCategory.fulfilled, (state, action) => {
        state.productWithCategory = action.payload;
        state.isLoading = false;
      })
      .addCase(getproductWithCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminProductSlice.reducer;
