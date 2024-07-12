import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../Slice/addCartSlice/addCartSlice";
import productSlice from "../Slice/ProductsSlice/ProductSlice";
import usersSlice from "../Slice/usersSlice/usersSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    productsAll: productSlice,
    users: usersSlice,
  },
});

export default store;
