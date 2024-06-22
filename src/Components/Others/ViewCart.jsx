import React, { useState } from "react";
import Slide1 from "../../assets/Images/Slide-1.jpg";


const AddToCart = () => {
  const product = {
    name: "Sample Product",
    price: 19.99,
    image: Slide1,
  };
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    // Handle add to cart logic here
    alert(`${product.name} added to cart with quantity: ${quantity}`);
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-md overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src={product.image}
        alt={product.name}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-700">${product.price.toFixed(2)}</p>
        <div className="mt-4 flex items-center space-x-3">
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="w-16 px-2 py-1 border rounded-md"
          />
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

