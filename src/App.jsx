import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import HomePage from "./Pages/HomePage/HomePage";
import ProductStore from "./Pages/ProductStore/Products";
import ViewProduct from "./Pages/SingleProduct/ViewProduct";
import UserCart from "./Pages/MyCart/UserCart";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import LoginForm from "./Components/User/Login/LoginForm";
import UserRegistration from "./Components/User/Register/UserRegistration";
import CatogoryCard from "./Components/Products/CatogeryProduct/CatogoryCard";
import UserProfilePage from "./Components/ProfilePage/UserProfilePage";
import ClientOrders from "./Pages/ClientOrders/ClientOrders";
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

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/*---User Side---*/}
          <Route path="/" element={<Home />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductStore />} />
            <Route path={"/products/cart/:id"} element={<ViewProduct />} />
            <Route path={"/products/cart/mycart"} element={<UserCart />} />
            <Route path={"/products/:type"} element={<CatogoryCard/>} />
            <Route path={"/profile/"} element={<UserProfilePage/>} />
            <Route path={"/orders/:id"} element={<ClientOrders/>} />


          </Route>
          <Route path={"/payment/:id"} element={<PaymentPage />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<UserRegistration />} />

          {/*---Admin Side---*/}
          <Route path="admin" element={<AdminLayout />}> 
            <Route index element={<Dashboard />} />
            <Route path="/admin/productlist" element={<AdminProducts />} />
            <Route path={"/admin/productlist/addproduct"} element={<AddProduct/>} />
            <Route path={"/admin/userslist"} element={<UserList/>} />
            <Route path={"/admin/userslist/viewcart/:id"} element={<CustomerCart/>} />
            <Route path={"/admin/userslist/orders/:id"} element={<UserOrders/>} />
            <Route path={"/admin/productlist/update/:id"} element={<EditProduct/>} />
            <Route path={"/admin/productlist/:type"} element={<FurnitureType/>} />
            <Route path={"/admin/allorders"} element={<Allorders/>} />
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
  Protected Component
  Google signup mail automatically 
  otp system
  buynow button seperate cart
  
  add wishlist
  Admin Side
  Including search to All orders dertails
  Including Message  reply option
  Navbar fixed at top mobile menu
  */
}
