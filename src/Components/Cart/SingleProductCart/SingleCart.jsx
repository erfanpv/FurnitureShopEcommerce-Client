import React, { useContext } from "react";
import MyContext from "../../../utils/Context";
import axios from "axios";
import { Link } from "react-router-dom";

const SingleCart = () => {
  const { setAddCart, cartItems, setCartItems } = useContext(MyContext);

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

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    setAddCart(updatedCart);
    updateCart(updatedCart);
    
  };

  return (
    <div>
      <div className="bg-white">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
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
                  <div className="flex items-center space-x-1">
                    <span>
                      Quantity: <span className="font-bold">{item.qty}</span>
                    </span>
                    <Link to={`/products/cart/:${item.id}`}>
                      <span className="text-indigo-600 hover:text-indigo-900">
                        Update
                      </span>
                    </Link>
                    <span
                      className="cursor-pointer text-rose-600 hover:text-red-900 ml-4"
                      onClick={() => removeItem(item.id)}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-rose-600 mt-4 font-bold text-2xl">
            Your cart is empty. <Link to="/products" className="text-indigo-700">Shop now!</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleCart;
