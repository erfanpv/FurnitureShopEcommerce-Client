import axios from "axios";
import React, { useEffect, useState } from "react";

const TotalCustomers = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      setTotalCustomers(res.data)
    });
  }, []);
  return (
    <div className="flex w-72">
      <div className="flex w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
        <div className="p-3 relative">
          <div className="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 text-center text-white shadow-lg">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="pt-1 text-right">
            <p className="text-sm font-light capitalize">Users</p>
            <h4 className="text-2xl font-semibold tracking-tighter xl:text-2xl">
              {totalCustomers.length}
            </h4>
          </div>
        </div>
        <hr className="opacity-50" />
        <div className="p-4">
          <p className="font-light">
            {/* <span className="text-sm font-bold text-green-600">+3% </span> */}
            Total Our Customers
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalCustomers;
