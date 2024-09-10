import React from "react";

const CartShimmer = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-6 lg:space-y-0">
      {/* left */}
      <div className="flex-1 bg-white p-4 shadow-md rounded-lg space-y-3">
        <div className="h-6 w-1/3 bg-gray-400 mb-4 rounded animate-pulse"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 mb-3 shadow-md">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-24 h-24 bg-gray-400 rounded animate-pulse"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-3/4 bg-gray-400 rounded animate-pulse"></div>
                  <div className="h-5 w-1/2 bg-gray-400 rounded animate-pulse"></div>
                  <div className="h-5 w-1/4 bg-gray-400 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="w-full lg:w-1/3 bg-white p-4 shadow-md rounded-lg">
        <div className="h-6 w-1/3 bg-gray-400 mb-4 rounded animate-pulse"></div>
        <div className="h-5 w-full bg-gray-400 rounded animate-pulse mb-2"></div>
        <div className="h-5 w-full bg-gray-400 rounded animate-pulse mb-2"></div>
        <div className="h-5 w-full bg-gray-400 rounded animate-pulse mb-2"></div>
        <div className="h-5 w-full bg-gray-400 rounded animate-pulse mb-2"></div>
        <div className="h-5 w-full bg-gray-400 rounded animate-pulse mb-4"></div>
        <div className="h-10 w-full bg-gray-400 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default CartShimmer;
