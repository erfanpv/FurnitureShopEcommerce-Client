import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({productId,quantity,navigate, toast}, { getState }) => {
    try {
     
    
    } catch (error) {
      console.log("Failed to add to cart:", error);
    }
  }
);
