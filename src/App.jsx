import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setLoggedIn } from "./app/Slice/userSlices/usersSlice/usersSlice";
import { useDispatch } from "react-redux";

// user side
import Home from "./Pages/Home/Home";
import HomePage from "./Pages/HomePage/HomePage";
import ProductStore from "./Pages/ProductStore/Products";
import ViewProduct from "./Pages/SingleProduct/ViewProduct";
import UserCart from "./Pages/MyCart/UserCart";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import LoginForm from "./Components/User/Login/LoginForm";
import UserRegistration from "./Components/User/Register/UserRegistration";
import CatogoryCard from "./Components/Products/CatogeryProduct/CatogoryCard";
import WishList from "./Components/ProfilePage/WishList";
import ClientOrders from "./Pages/ClientOrders/ClientOrders";
import PaymentSuccess from "./Components/PaymentSections/Stripe/StripeSuccess";
import UserProtectedRoute from "./routes/userRoute/protectRouteUser";
import UserContactPage from "./Pages/ContactPage/ContactPage";
import ProfileSidebar from "./Pages/ProfilePage/ProfilePage";
import PrivacyPolicy from "./Pages/LegalSide/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./Pages/LegalSide/TermsOfService/TermsOfService";
import WalletPage from "./Components/ProfilePage/UserWallet/UserWallet";
import ManageAddresses from "./Components/ProfilePage/UserAddress/ManageAddress";
import AccountInfo from "./Components/ProfilePage/AccountInfo/AccountInfo";
import WalletPaymentPage from "./Components/PaymentSections/WalleOrderPlaced/WalletOrderPlaced";


{
  /* Import Admin Details */
}

import AdminLayout from "./Admin/AdminLayOut/AdminLayout";
import AdminProducts from "./Admin/AdminProducts/AdminProducts";
import Dashboard from "./Admin/Dashboard/Dasboard";
import AddProduct from "./Admin/AddProduct/AddProductForm/AddProductForm";
import UserList from "./Admin/UsersList/UserList";
import CustomerCart from "./Admin/UsersList/CustomerCart/CustomerCart"
import EditProduct from "./Admin/AdminProducts/AdminFurnitureCard/EditForm/EditForm";
import FurnitureType from "./Admin/FurniturTypes/FurnitureType";
import UserOrders from "./Admin/UsersList/CustomerOrders/userOrders";
import Allorders from "./Admin/Allorders/Allorders";
import AdminProtectedRoute from "./routes/AdminRoute/protectAdmin";
import RevenueDetails from "./Admin/Analtycs/Revenue/Revenue";
import RefundPage from "./Admin/Analtycs/Refund/Refund";
import AdminMessagesPage from "./Admin/UsersList/HandleMessage/HandleMessage";



const App = () => {
  let id = localStorage.getItem("id");
  const dispatch = useDispatch()
  if (id) {
  useEffect(() => {
    dispatch(setLoggedIn(true));
  },[id])
 }  
  return (
    <>
      <Router>
        <Routes>
          {/*---User Side---*/}
          <Route path="/" element={<Home />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductStore />} />
            <Route path={"/products/cart/:id"} element={<ViewProduct />} /> 
            <Route path={"/products/:category"}element={<CatogoryCard/>} />
            <Route path={"/products/cart/mycart"} element={<UserProtectedRoute element={<UserCart />} />} />
            <Route path={"/wishlist"} element={<UserProtectedRoute element={<WishList/>} />} />
            <Route path={"/orders"} element={<UserProtectedRoute element={<ClientOrders/>} />} />
            <Route path={"/contact"} element={<UserProtectedRoute element={<UserContactPage/>} />} />
            <Route path={"/privacy"} element={<PrivacyPolicy />} />
            <Route path={"/terms"} element={<TermsOfService />} />

            <Route path={"/profile"} element={<UserProtectedRoute element={<ProfileSidebar/>} />} > 
              <Route path={"wallet"} element={<UserProtectedRoute element={<WalletPage/>} />} />
              <Route path={"info"} element={<UserProtectedRoute element={<AccountInfo/>} />} />
              <Route path={"address"} element={<UserProtectedRoute element={<ManageAddresses/>} />} />
              <Route path={"wishlist"} element={<UserProtectedRoute element={<WishList/>} />} />
              <Route path={"privacy"} element={<PrivacyPolicy />} />
              <Route path={"terms"} element={<TermsOfService />} />
              <Route path={"orders"} element={<UserProtectedRoute element={<ClientOrders/>} />} />
              <Route path={"contact"} element={<UserProtectedRoute element={<UserContactPage/>} />} />

            </Route>
          </Route>
          {/* <Route path={"/payment/:id"} element={<PaymentPage />} /> */}
          <Route path={"/payment/success/payment"} element={<UserProtectedRoute element={<PaymentSuccess/>} />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<UserRegistration />} />
          

          {/*---Admin Side---*/}
          <Route element={<AdminProtectedRoute />}>
            <Route path="admin" element={<AdminLayout />}> 
              <Route index element={<Dashboard />} />
              <Route path="/admin/productlist" element={<AdminProducts />} />
              <Route path={"/admin/productlist/addproduct"} element={<AddProduct/>} />
              <Route path={"/admin/userslist"} element={<UserList/>} />
              <Route path={"/admin/userslist/viewcart/:id"} element={<CustomerCart/>} />
              <Route path={"/admin/userslist/orders/:id"} element={<UserOrders/>} />
              <Route path={"/admin/productlist/update/:id"} element={<EditProduct/>} />
              <Route path={"/admin/productlist/:category"} element={<FurnitureType/>} />
              <Route path={"/admin/allorders"} element={<Allorders/>} />
              <Route path={"/admin/revenue"} element={<RevenueDetails/>} />
              <Route path={"/admin/refund"} element={<RefundPage/>} />
              <Route path={"/admin/user-messages"} element={<AdminMessagesPage/>} />
            </Route>
         </Route>

        </Routes>
      </Router>
      <Toaster />
      <ToastContainer />
    </>
  );
};

export default App;

{
  /*
  User Profile Adding tp Edit Option and Address Option
  Google signup mail automatically 
  otp system
  buynow button seperate cart
  
  Including search to All orders dertails
  Navbar fixed at top mobile menu
  */
}
