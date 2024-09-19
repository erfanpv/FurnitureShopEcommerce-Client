import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { quantityIncrementAsync, removeFromCartAsync, quantityDecrementAsync } from "../../../app/Slice/addCartSlice/cartThunk";
import CartShimmer from "../../ShimmerUI/CartShimmer/CartShimmer";

const SingleCart = () => {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart); 

  const handleIncrement = (productId) => {
    if (!productId) return;
    dispatch(quantityIncrementAsync(productId));
  };

  const handleDecrement = (productId) => {
    if (!productId) return;
    dispatch(quantityDecrementAsync(productId));
  };

  const handleRemove = (productId) => {
    if (!productId) return;
    dispatch(removeFromCartAsync(productId));
  };

  if (loading) {
    return <CartShimmer/>; 
  }

 
  if (!cart || cart.length === 0) {
    return (
      <p className="text-center text-rose-600 mt-4 font-bold text-2xl">
        Your cart is empty.{" "}
        <Link to="/products" className="text-indigo-700">
          Shop now!
        </Link>
      </p>
    );
  }

  return (
    <div>
      <div className="bg-white">
        {cart.map((item,index) => (
          <div
            key={item.productId._id  || `cart-item-${index}`}
            className="border border-gray-300 rounded-lg p-4 mb-3 shadow-md"
          >
            <div className="text-green-700 font-bold text-lg mb-6">
              Your Cart Product
            </div>
            <div className="grid grid-cols-[100px,1fr,1fr] gap-6 md:grid-cols-[100px,1fr,1fr] md:gap-3">
              <img
                className="max-w-full max-h-30 mx-auto rounded"
                src={item.productId.image}
                alt={item.productId.productName}
              />
              <div className="space-y-2">
                <div className="font-bold">{item.productId.productName}</div>
                <div className="text-red-700 font-bold">${item.productId.price}</div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <button
                      className="text-white bg-indigo-500 hover:bg-indigo-600 rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      onClick={() => handleDecrement(item.productId._id)}
                    >
                      -
                    </button>
                    <span className="mx-2 font-bold">{item.quantity}</span>
                    <button
                      className="text-white bg-indigo-500 hover:bg-indigo-600 rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      onClick={() => handleIncrement(item.productId._id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="text-red-600 hover:text-red-900 focus:outline-none"
                    onClick={() => handleRemove(item.productId._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleCart;
