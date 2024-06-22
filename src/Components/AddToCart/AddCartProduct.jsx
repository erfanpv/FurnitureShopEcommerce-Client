import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../utils/Context";
import { toast } from "react-toastify";
import axios from "axios";

const AddCartProduct = ({ productItem }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [productItem1, setProductItem] = useState(productItem);

  const { addCart, setAddCart, isloggedIn } = useContext(MyContext);
  const userFound = localStorage.getItem("id");

  useEffect(() => {
    if (productItem.id) {
      axios
        .get(`http://localhost:5000/products/${productItem.id}`)
        .then((res) => setProductItem(res?.data))
        .catch((err) => console.log("Error fetching product data:", err));
    }
  }, [productItem.id]);

  const updateCart = async (updatedCart) => {
    try {
      await axios.patch(`http://localhost:5000/users/${userFound}`, {
        cart: updatedCart,
      });
    } catch (err) {
      console.log("Error updating cart:", err);
    }
  };

  const addToCart = (newItem, quantity) => {
    setAddCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === newItem.id);
      const updatedCart = existingItem
        ? prevCart.map((item) =>
            item.id === newItem.id ? { ...item, qty: item.qty + quantity } : item
          )
        : [...prevCart, { ...newItem, qty: quantity }];
      updateCart(updatedCart);
      return updatedCart;
    });
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    if (Number(quantity) > 0) {
      toast.success(
        `${productItem1.name} added to cart with quantity: ${quantity}`
      );
      addToCart(productItem1, Number(quantity));
      navigate("/products/cart/mycart");
    } else {
      toast.error("You have entered an invalid quantity");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
    toast.warning("You must be logged in");
  };

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden flex flex-col lg:flex-row justify-center my-5 mx-5 lg:mx-14">
      <img
        className="object-cover w-full lg:w-1/2 h-80 lg:h-auto"
        src={productItem1.src}
        alt={productItem1.name}
      />
      <div className="p-4 flex flex-col justify-center w-full lg:w-1/2">
        <h2 className="text-lg font-semibold text-center lg:text-left">
          {productItem1.name}
        </h2>
        <p className="font-semibold text-center lg:text-left text-gray-700 text-base">
          {productItem1.description}
        </p>
        <div className="py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #furniture
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            #{productItem.type.toLowerCase()}
          </span>
        </div>
        <p className="text-gray-700 text-center lg:text-left">
          ${productItem.price}
        </p>
        <div className="mt-4 flex items-center space-x-3 justify-center lg:justify-start">
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="w-16 px-2 py-1 border rounded-md"
          />
          <button
            onClick={isloggedIn ? handleAddToCart : handleLoginRedirect}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCartProduct;
