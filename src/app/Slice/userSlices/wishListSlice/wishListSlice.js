import {  createSlice } from "@reduxjs/toolkit";
import { loadWishList,toggleWishListItem } from "./wishListThunk";

const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    wishlistCart: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlistCart = action.payload;
    },
    removeFromWishlist: (state, action) => {
      state.wishlistCart.products = state.wishlistCart.products.filter(
        (item) => item.productId._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistCart = action.payload;
      })
      .addCase(loadWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleWishListItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleWishListItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleWishListItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToWishlist, removeFromWishlist } = wishListSlice.actions;

export default wishListSlice.reducer;
  