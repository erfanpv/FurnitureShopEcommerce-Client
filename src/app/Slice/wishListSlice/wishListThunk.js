import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../utils/axios/axiosIntercepter";
import { addToWishlist, removeFromWishlist } from "./wishListSlice";

const id = localStorage.getItem("id");

export const loadWishList = createAsyncThunk(
  "wishlist/loadWishList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get(`users/${id}/wishlist`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch products."
      );
    }
  }
);

export const toggleWishListItem = createAsyncThunk(
  "wishlist/toggleWishListItem",
  async ({ productId }, { rejectWithValue, dispatch, getState }) => {
    try {
      const { wishlistCart } = getState().wishList;
      const isInWishlist = wishlistCart?.products?.some(
        (item) => item.productId._id === productId
      );

      const response = await http.post(`users/${id}/wishlist`, { productId });
      console.log(isInWishlist);

      if (!isInWishlist) {
        dispatch(addToWishlist(response.data.data));
      } else {
        dispatch(removeFromWishlist(productId));
      }

      dispatch(loadWishList());

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch products."
      );
    }
  }
);

