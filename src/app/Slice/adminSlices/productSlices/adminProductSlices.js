import { createSlice } from "@reduxjs/toolkit";
import { adminGetAllProducts,addProducts,updateProducts } from "./adminProductThunk";

const initialState = {
  products: [],
  productStatus: null,
  productWithCategory:[],
  uniqueProductCategories:[],
  isLoading: false,
  error: null,
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
        state.isLoading = true;
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
        state.isLoading = true;
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
        state.isLoading = true;
        state.error = action.payload;
      })
      // .addCase(fetchUniqueProductCategories.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(fetchUniqueProductCategories.fulfilled, (state, action) => {
      //   state.uniqueProductCategories = action.payload;
      //   state.isLoading = false;
      // })
      // .addCase(fetchUniqueProductCategories.rejected, (state, action) => {
      //   state.isLoading = true;
      //   state.error = action.payload;
      // })
      // .addCase(searchProductsUsers.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(searchProductsUsers.fulfilled, (state, action) => {
      //   state.products = action.payload;
      //   state.isLoading = false;
      // })
      // .addCase(searchProductsUsers.rejected, (state, action) => {
      //   state.isLoading = true;
      //   state.error = action.payload;
      // })
  },
});

export default adminProductSlice.reducer;
