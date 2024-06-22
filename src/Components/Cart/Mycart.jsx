import React, { useState, useContext, useEffect } from "react";
import MyContext from "../../utils/Context";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const MyCart = () => {
  const navigate = useNavigate();

  const {
    addCart,
    setAddCart,
    productItems,
    setProductItems,
    cartItems,
    setCartItems,
  } = useContext(MyContext);

  const userFound = localStorage.getItem("id");

  const updateCart = async (updatedCart) => {
    try {
      await axios.patch(`http://localhost:5000/users/${userFound}`, {
        cart: updatedCart,
      });
    } catch (err) {
      console.log("Error updating cart:", err);
    }
  };

  useEffect(() => {
    if (userFound) {
      axios
        .get(`http://localhost:5000/users/${userFound}`)
        .then((res) => setCartItems(res.data.cart))
        .catch((err) => console.log("Error fetching cart items:", err));
    }
  }, [userFound, addCart]);

  useEffect(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
    setProductItems(totalItems);
  }, [cartItems, setProductItems]);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    setAddCart(updatedCart);
    updateCart(updatedCart);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const estimatedTax = totalPrice * 0.1;
  const orderTotal = totalPrice + estimatedTax;

  return (
    <div className="max-w-5xl px-6 mt-5 mb-24 mx-auto">
      <h1 className="font-bold text-2xl mb-6">Review your order</h1>

      <div className="grid grid-cols-1 md:grid-cols-[1fr,350px] gap-3">
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-300 rounded-lg p-4 mb-3"
            >
              {/*Cart Details*/}
              <div className="text-green-700 font-bold text-lg mb-6">
                Your Cart Product
              </div>
              <div className="grid grid-cols-[100px,1fr,1fr] gap-6 md:grid-cols-[100px,1fr] md:gap-3">
                <img
                  className="max-w-full max-h-30 mx-auto"
                  src={item.src}
                  alt={item.name}
                />
                <div className="space-y-2">
                  <div className="font-bold">{item.name}</div>
                  <div className="text-red-700 font-bold">${item.price}</div>
                  <div className="flex items-center space-x-1">
                    <span>
                      Quantity: <span className="font-bold">{item.qty}</span>
                    </span>
                    <Link to={`/products/cart/:${item.id}`}>
                      <span className="text-blue-600 cursor-pointer">
                        Update
                      </span>
                    </Link>
                    <span
                      className="text-blue-600 cursor-pointer"
                      onClick={() => removeItem(item.id)}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*Order Details*/}
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="font-bold text-lg mb-3">Order Summary</div>
          <div className="flex justify-between mb-2 text-sm">
            <div>Items ({totalItems}):</div>
            <div>${totalPrice.toFixed(2)}</div>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <div>Shipping & handling:</div>
            <div>$0.00</div>
          </div>
          <div className="flex justify-between mb-2 border-t border-gray-300 pt-2 text-sm">
            <div>Total before tax:</div>
            <div>${totalPrice.toFixed(2)}</div>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <div>Estimated tax (10%):</div>
            <div>${estimatedTax.toFixed(2)}</div>
          </div>
          <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-3">
            <div>Order total:</div>
            <div>${orderTotal.toFixed(2)}</div>
          </div>
          <button
            className="w-full py-3 rounded-md mt-2 mb-4 bg-blue-600 text-white font-semibold"
            onClick={() =>
              orderTotal > 0
                ? navigate("/payment")
                : toast.warning("Your Cart is Empty")
            }
          >
            Place your order
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
