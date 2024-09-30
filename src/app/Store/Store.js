import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../Slice/addCartSlice/addCartSlice";
import productSlice from "../Slice/userSlices/ProductsSlice/ProductSlice";
import usersSlice from "../Slice/userSlices/usersSlice/usersSlice";
import wishListSlice from "../Slice/userSlices/wishListSlice/wishListSlice";
import dashBoardSlices from "../Slice/adminSlices/dashBoardSlices/dashBoardSlices";
import adminProductSlices from "../Slice/adminSlices/productSlices/adminProductSlices";
import userMangerSlice from "../Slice/adminSlices/userMangementSlices/umsSlices";
import ordersSliceByAdmin from "../Slice/adminSlices/ordersSlices/ordersSlices";
import ordersSlice from "../Slice/userSlices/OrderSlice/ordersSlice";
import paymentSlice from "../Slice/userSlices/paymentSlice/paymentSlice";
import contactSlice from "../Slice/adminSlices/contactSlice/contactSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    productsAll: productSlice,
    users: usersSlice,
    wishList: wishListSlice,
    dashboard: dashBoardSlices,
    adminProducts: adminProductSlices,
    userManger: userMangerSlice,
    orders: ordersSliceByAdmin,
    payment: paymentSlice,
    ordersByUser: ordersSlice,
    contact: contactSlice,
  },
});

export default store;
