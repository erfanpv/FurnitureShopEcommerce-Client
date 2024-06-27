import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import MyContext from "../../utils/Context";

const AddCartProduct = ({ productItem }) => {
  const navigate = useNavigate();
  const { addCart, setAddCart, isloggedIn } = useContext(MyContext);
  const userFound = localStorage.getItem("id");

  const [quantity, setQuantity] = useState(1);
  const [productItem1, setProductItem] = useState(productItem);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productItem.id) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/products/${productItem.id}`)
        .then((res) => {
          setProductItem(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product data:", err);
          setLoading(false);
        });
    }
  }, [productItem.id]);

  const updateCart = async (updatedCart) => {
    try {
      await axios.patch(`http://localhost:5000/users/${userFound}`, {
        cart: updatedCart,
      });
    } catch (err) {
      console.error("Error updating cart:", err);
      toast.error("Failed to update cart. Please try again.");
    }
  };

  const addToCart = (newItem, quantity) => {
    setAddCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === newItem.id);
      const updatedCart = existingItem
        ? prevCart.map((item) =>
            item.id === newItem.id
              ? { ...item, qty: item.qty + quantity }
              : item
          )
        : [...prevCart, { ...newItem, qty: quantity }];
      updateCart(updatedCart);
      return updatedCart;
    });
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      if (productItem1 && productItem1.id) {
        toast.success(
          `${productItem1.name} added to cart with quantity: ${quantity}`
        );
        addToCart(productItem1, quantity);
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

  if (loading) {
    return <div>Loading...</div>;
  }

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
            #{productItem1.type.toLowerCase()}
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
            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 lg:ml-64 mr-5 ml-5 md:ml-64 sm:ml-64"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCartProduct;
