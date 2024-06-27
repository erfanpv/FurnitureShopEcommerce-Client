import axios from "axios";
import React, { useEffect, useState } from "react";

const TotalProducts = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => {
      setTotalProducts(res.data);
    });
  }, []);
  return (
    <div className="flex w-72">
      <div className="flex w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
        <div className="p-3 relative">
          <div className="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr from-gray-700 to-gray-400 text-center text-white shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-4 h-7 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div className="pt-1 text-right">
            <p className="text-sm font-light capitalize">Products</p>
            <h4 className="text-2xl font-semibold tracking-tighter xl:text-2xl">
              {totalProducts.length}
            </h4>
          </div>
        </div>
        <hr className="opacity-50" />
        <div className="p-4">
          <p className="font-light">
            {/* <span className="text-sm font-bold text-green-600">+22% </span> */}
            Total Store Products
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalProducts;
