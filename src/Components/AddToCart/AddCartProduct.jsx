import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../../app/Slice/addCartSlice/addCartSlice";
import ProductShimmer from "../ShimmerUI/ProductShimmer/ProductShimmer";

const AddCartProduct = ({ productItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.users);
  const cartItems = useSelector((state) => state.cart.cart);
  const userFound = localStorage.getItem("id");

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      if (productItem && productItem.id) {
        toast.success(`${productItem.name} added to cart with quantity: ${quantity}`);
        
        dispatch(addToCartAsync({ ...productItem, quantity }));

        navigate("/products/cart/mycart");
      } else {
        toast.error("Product data is not fully loaded. Please try again.");
      }
    } else {
      toast.error("You have entered an invalid quantity");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
    toast.warning("You must be logged in to add items to the cart");
  };

  if (!productItem) return <ProductShimmer/>;

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden flex flex-col lg:flex-row justify-center my-5 mx-5 lg:mx-14">
      <img className="object-cover w-full lg:w-1/2 h-80 lg:h-auto" src={productItem.src} alt={productItem.name} />
      <div className="p-4 flex flex-col justify-center w-full lg:w-1/2">
        <h2 className="text-lg font-semibold text-center lg:text-left">{productItem.name}</h2>
        <p className="font-semibold text-center lg:text-left text-gray-700 text-base">{productItem.description}</p>
        <div className="py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#furniture</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#{productItem.type.toLowerCase()}</span>
        </div>
        <p className="text-gray-700 text-center lg:text-left">${productItem.price}</p>
        <div className="mt-4 flex items-center space-x-3 justify-center lg:justify-start">
          <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} min="1" className="w-16 px-2 py-1 border rounded-md" />
          <button onClick={isLoggedIn ? handleAddToCart : handleLoginRedirect} className="inline-block rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 lg:ml-64 mr-5 ml-5 md:ml-64 sm:ml-64">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default AddCartProduct;
