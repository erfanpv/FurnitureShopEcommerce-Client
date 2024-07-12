import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeFromCartAsync,
  quantityIncrementAsync,
  quantityDecrementAsync,
} from "../../../app/Slice/addCartSlice/addCartSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductShimmer from "../../ShimmerUI/ProductShimmer/ProductShimmer";

const SingleCart = () => {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  const userFound = localStorage.getItem("id");

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const updateCart = async (updatedCart) => {
    try {
      await axios.patch(`http://localhost:5000/users/${userFound}`, {
        cart: updatedCart,
      });
    } catch (err) {
      console.log("Error updating cart:", err);
    }
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    dispatch(removeFromCartAsync(id));
    updateCart(updatedCart);
  };

  const incrementQuantity = (id) => {
    dispatch(quantityIncrementAsync(id));
  };

  const decrementQuantity = (id) => {
    dispatch(quantityDecrementAsync(id));
  };

  if (loading) {
    return <ProductShimmer />;
  }

  return (
    <div>
      <div className="bg-white">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item.id}
              className="border border-gray-300 rounded-lg p-4 mb-3 shadow-md"
            >
              <div className="text-green-700 font-bold text-lg mb-6">
                Your Cart Product
              </div>
              <div className="grid grid-cols-[100px,1fr,1fr] gap-6 md:grid-cols-[100px,1fr,1fr] md:gap-3">
                <img
                  className="max-w-full max-h-30 mx-auto rounded"
                  src={item.src}
                  alt={item.name}
                />
                <div className="space-y-2">
                  <div className="font-bold">{item.name}</div>
                  <div className="text-red-700 font-bold">${item.price}</div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <button
                        className="text-white bg-indigo-500 hover:bg-indigo-600 rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        onClick={() => decrementQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="mx-2 font-bold">{item.qty}</span>
                      <button
                        className="text-white bg-indigo-500 hover:bg-indigo-600 rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="text-red-600 hover:text-red-900 focus:outline-none"
                      onClick={() => removeItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-rose-600 mt-4 font-bold text-2xl">
            Your cart is empty.{" "}
            <Link to="/products" className="text-indigo-700">
              Shop now!
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleCart;
