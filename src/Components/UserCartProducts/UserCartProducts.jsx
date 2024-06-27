import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductShimmer from "../ShimmerUI/ProductShimmer/ProductShimmer";
import MyContext from "../../utils/Context";

const UserCartProducts = () => {
  const { setTotlalAmount } = useContext(MyContext);
  const [userCart, setUserCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setUserCart(response.data.cart);
        setUserName(response.data.lastName);
      } catch (error) {
        console.error("Error fetching user cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCart();
  }, [id]);

  const totalPrice = userCart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const estimatedTax = totalPrice * 0.1;
  const orderTotal = totalPrice + estimatedTax;
  
  useEffect(() => {
    setTotlalAmount(orderTotal);
  }, [orderTotal]);

  if (loading) {
    return <ProductShimmer />;
  }

  return (
    <div className="mt-8 space-y-3 px-2 py-4 sm:px-6">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">{userName}'s Cart</h1>
      {userCart.length === 0 ? (
        <h1 className="text-xl text-rose-600 font-semibold">Cart is empty</h1>
      ) : (
        userCart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src={item.src}
              alt={item.name}
            />
            <div className="flex flex-col w-full px-4 py-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">{item.name}</span>
                <span className="text-sm text-gray-500">{item.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Quantity: {item.qty}</span>
                <span className="text-lg font-bold">${item.price}</span>
              </div>
            </div>
          </div>
        ))
      )}
      
    </div>
  );
};

export default UserCartProducts;
