import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../../utils/Context";
import axios from "axios";
import { toast } from "react-toastify";

const OrderSummary = () => {
  const navigate = useNavigate();
  const { addCart, setProductItems, cartItems, setCartItems } =
    useContext(MyContext);

  const userFound = localStorage.getItem("id");

  useEffect(() => {
    if (userFound) {
      axios
        .get(`http://localhost:5000/users/${userFound}`)
        .then((res) => setCartItems(res.data.cart))
        .catch((err) => console.error("Error fetching cart items:", err));
    }
  }, [userFound, addCart]);

  useEffect(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
    setProductItems(totalItems);
  }, [cartItems, setProductItems]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const estimatedTax = totalPrice * 0.1;
  const orderTotal = totalPrice + estimatedTax;

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md">
      <h2 className="font-bold text-xl mb-4 text-gray-800">Order Summary</h2>
      <div className="flex justify-between mb-3 text-sm text-gray-700">
        <span>Items ({totalItems}):</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-3 text-sm text-gray-700">
        <span>Shipping & handling:</span>
        <span>$0.00</span>
      </div>
      <div className="flex justify-between mb-3 border-t border-gray-200 pt-3 text-sm text-gray-700">
        <span>Total before tax:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-3 text-sm text-gray-700">
        <span>Estimated tax (10%):</span>
        <span>${estimatedTax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-3 text-gray-900">
        <span>Order total:</span>
        <span>${orderTotal.toFixed(2)}</span>
      </div>
      <button
        className="w-full py-3 rounded-md mt-4 bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-800"
        onClick={() =>
          orderTotal > 0
            ? navigate(`/payment/${userFound}`)
            : toast.info("Your Cart is Empty")
        }
      >
        Place your order
      </button>
    </div>
  );
};

export default OrderSummary;
