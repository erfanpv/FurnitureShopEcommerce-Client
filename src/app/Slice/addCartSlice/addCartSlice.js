import {  createSlice } from "@reduxjs/toolkit";
import { fetchCart,addToCartAsync, removeFromCartAsync,quantityIncrementAsync,quantityDecrementAsync } from "./cartThunk";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartId:null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {        
        // state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cartProduct;
        state.cartId = action.payload.cartProduct;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch the cart";
      })
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeFromCartAsync.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch the cart";
      })
      .addCase(quantityIncrementAsync.pending, (state, action) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(quantityIncrementAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(quantityDecrementAsync.pending, (state, action) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(quantityDecrementAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;

