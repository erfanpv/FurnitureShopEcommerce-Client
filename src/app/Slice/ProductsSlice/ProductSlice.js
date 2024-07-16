import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./ProductSliceThunk";

const initialState = {
  products: [],
  singleItem: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      console.log("Pending");
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log("Rejected");
    });
  },
});

export default productSlice.reducer;
