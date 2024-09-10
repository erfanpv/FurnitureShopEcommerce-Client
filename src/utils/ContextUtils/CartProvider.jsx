import React, { useEffect, useState } from "react";
import MyContext from "../Context";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoggedIn as setAsLoggedIn } from "../../app/Slice/usersSlice/usersSlice";
import { fetchProducts } from "../../app/Slice/ProductsSlice/productThunk.js";
import { fetchCart } from "../../app/Slice/addCartSlice/cartThunk.js";

const CartProvider = ({ children }) => {
  const [addCart, setAddCart] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isloggedIn, setLoggedIn] = useState(false);
  const [productItems, setProductItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState(0);
  const [render, setRender] = useState(0);
  const [TotalAmount, setTotlalAmount] = useState(0);
  const [searchfilteredItems, setSearchFilteredItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterUser, setFilteUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchFilter = (searchValue) => {
    const filtered = searchfilteredItems.filter((product) => {
      return product.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    const filteredUsers = filterUser.filter((user) => {
      const name = user.fnName + user.lastName;
      return name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setUsers(filteredUsers);
    setFilteredItems(filtered);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => {
      setFilteredItems(res?.data);
      setSearchFilteredItems(res?.data);
    });
  }, []);

  useEffect(() => {
    if (userFound) {
      axios.get("http://localhost:5000/users/" + userFound).then((res) => {
        setUser(res?.data);
        setAddCart(res?.data?.cart);
      });
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await axios.get("http://localhost:5000/users");
        setFilteUser(data.data);
        setUsers(data.data);
      } catch (error) {
        console.log("users fetch failed", error);
      }
    };

    fetchUsers();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add("overflow-y-hidden");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("overflow-y-hidden");
  };

  const dispatch = useDispatch();
  const userFound = localStorage.getItem("id");

  useEffect(() => {
    dispatch(fetchProducts());
    if (userFound) {
      dispatch(setAsLoggedIn(true));
      dispatch(fetchCart(userFound));
      setUserId(userFound);
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        openModal,
        closeModal,
        users,
        setUsers,
        searchFilter,
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
        render,
        setRender,
        TotalAmount,
        setTotlalAmount,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default CartProvider;
