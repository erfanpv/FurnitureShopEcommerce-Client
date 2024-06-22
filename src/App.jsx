import React, { useEffect, useId, useState } from "react";
import { BrowserRouter as Router, Routes, Route, json } from "react-router-dom";
import Header from "./Components/Header/Header";
import LoginForm from "./Components/User/Login/LoginForm";
import UserRegistration from "./Components/User/Register/UserRegistration";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Products from "./Components/Products/Products";
import AddToCartPage from "./Components/AddToCart/AddToCart";
import Beds from "./Components/Products/CatogeryProduct/Beds";
import Sofas from "./Components/Products/CatogeryProduct/Sofas";
import Tables from "./Components/Products/CatogeryProduct/Tables";
import Mycart from "./Components/Cart/Mycart";
import MyContext from "./utils/Context";
import PaymentSection from "./Components/PaymentSections/Payment";
import productList from "./data/productList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

{
  /***Admin Side */
}
// import AdminPanel from "./Admin/AdminPanel/AdminPanel";
// import Dashboard from "./Admin/Dashboard.jsx/Dasboard";
// import Productsadm from "./Admin/Products/AdProductList";
// import AdminNav from "./Admin/AdminNav/AdminNav";

function App() {
  const [addCart, setAddCart] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isloggedIn, setLoggedIn] = useState(false);
  const [productItems, setProductItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState(0);

  const userFound = localStorage.getItem("id");

  useEffect(() => {
    if (userFound) {
      setLoggedIn(true);
      setUserId(userFound);
    }
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/users/" + userFound).then((res) => {
      setUser(res?.data);
    });
  }, [userFound]);

  useEffect(() => {
    axios.get("http://localhost:5000/users/" + userFound).then((res) => {
      setAddCart(res?.data?.cart);
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <MyContext.Provider
        value={{
          addCart,
          setAddCart,
          filteredItems,
          setFilteredItems,
          isloggedIn,
          setLoggedIn,
          productItems,
          setProductItems,
          cartItems,
          setCartItems,
          user,
          setUser,
          userId,
          setUserId,
        }}
      >
        <Router>
          <div className="bg-slate-100">
            {/* Conditionally render Header based on the route */}
            <Routes>
              <Route path="/" element={<Header />} />
              <Route path="/login" element={null} />
              <Route path="/register" element={null} />
              {/* <Route path={"/admin"} element={null} />
              <Route path={"/productsadm"} element={null} />
              <Route path={"/adminnav"} element={null} /> */}
              <Route path="/*" element={<Header />} />
            </Routes>

            {/* Define routes using Routes and Route components */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<UserRegistration />} />
              <Route path="/products" element={<Products />} />
              <Route path="/beds" element={<Beds />} />
              <Route path="/sofas" element={<Sofas />} />
              <Route path="/tables" element={<Tables />} />
              <Route path={"/products/cart/:id"} element={<AddToCartPage />} />
              <Route path={"/products/cart/mycart"} element={<Mycart />} />
              <Route path={"/payment"} element={<PaymentSection />} />

              {/**Admin router */}
              {/* <Route path={"/admin"} element={<AdminPanel />} />
              <Route path={"/productsadm"} element={<Productsadm />} />
              <Route path={"/adminnav"} element={<AdminNav />} /> */}
            </Routes>

            {/* Conditionally render Footer based on the route */}
            <Routes>
              <Route path="/" element={<Footer />} />
              <Route path="/login" element={null} />
              <Route path="/register" element={null} />
              <Route path={"/other"} element={null} />
              <Route path={"/dashboard"} element={null} />
              <Route path={"/productsadm"} element={null} />
              <Route path="/*" element={<Footer />} />
            </Routes>
          </div>
        </Router>
      </MyContext.Provider>
    </>
  );
}

export default App;
