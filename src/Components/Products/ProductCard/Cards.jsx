import React from "react";
import { useNavigate } from "react-router-dom";

const FurnitureCard = ({ productItem }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm rounded-md overflow-hidden shadow-lg  mb-10 bg-white ">
      <img
        className="w-96 h-60 "
        style={{ objectFit: "cover" }}
        src={productItem.src}
        alt="Furniture"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{productItem.name}</div>
        <p className="text-gray-700 text-base">{productItem.description}</p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          #furniture
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          #{productItem.type.toLowerCase()}
        </span>
      </div>
      <div className="px-4 py-2">
        {/* Border */}

        <div
          onClick={() => navigate(`/products/cart/:${productItem.id}`)}
          className="inline-block rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
        >
          <span className="sr-only"> Download </span>

          <svg
            className="size-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FurnitureCard;
