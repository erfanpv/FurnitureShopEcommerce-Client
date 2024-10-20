import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../../../utils/axios/axiosIntercepter";
import { addToWishlist, removeFromWishlist } from "./wishListSlice";


export const loadWishList = createAsyncThunk(
  "wishlist/loadWishList",
  async (_, { rejectWithValue }) => {
    try {
      const id = localStorage.getItem("id");

      if (!id) {
        return rejectWithValue("User ID not found.");
      }

      const response = await http.get(`users/${id}/wishlist`);

      if (response.status === 204) {
        return [];
      }

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist."
      );
    }
  }
);


export const toggleWishListItem = createAsyncThunk(
  "wishlist/toggleWishListItem",
  async ({ productId }, { rejectWithValue, dispatch, getState }) => {
    try {
      const id = localStorage.getItem("id");

      const { wishlistCart } = getState().wishList;
      const isInWishlist = wishlistCart?.products?.some(
        (item) => item.productId._id === productId
      );

      console.log(isInWishlist)
      const response = await http.post(`users/${id}/wishlist`, { productId });      

      if (!isInWishlist) {
        console.log("er")
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
