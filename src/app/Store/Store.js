import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../Slice/addCartSlice/addCartSlice";
import productSlice from "../Slice/ProductsSlice/ProductSlice";
import usersSlice from "../Slice/usersSlice/usersSlice";
import wishListSlice from "../Slice/wishListSlice/wishListSlice";
import dashBoardSlices from "../Slice/adminSlices/dashBoardSlices/dashBoardSlices";
import adminProductSlices from "../Slice/adminSlices/productSlices/adminProductSlices";
import userMangerSlice from "../Slice/adminSlices/userMangementSlices/umsSlices";
import ordersSlices from "../Slice/adminSlices/ordersSlices/ordersSlices";
import paymentSlice from "../Slice/paymentSlice/paymentSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    productsAll: productSlice,
    users: usersSlice,
    wishList: wishListSlice,
    dashboard: dashBoardSlices,
    adminProducts: adminProductSlices,
    userManger: userMangerSlice,
    orders: ordersSlices,
    // payment:paymentSlice,
  },
});


export default store
