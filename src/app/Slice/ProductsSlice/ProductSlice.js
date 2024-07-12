import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchSingleProducts } from "../../Thunk/Thunk";

const initialState = {
  products: [],
  singleItem: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    allProducts: (state, action) => {
      console.log(action);
    },
  },
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
    builder.addCase(fetchSingleProducts.fulfilled, (state, action) => {
      state.singleItem = action.payload;
      
      
    });
    builder.addCase(fetchSingleProducts.rejected, (state, action) => {
      console.log("Rejected");
    });
  },
});

export const { allProducts } = productSlice.actions;
export default productSlice.reducer;
