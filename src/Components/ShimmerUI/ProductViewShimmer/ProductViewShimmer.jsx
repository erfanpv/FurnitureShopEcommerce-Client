import React from "react";

const SingleProductShimmer = () => {
  return (
    <div className="p-5 animate-pulse">
      <main className="mt-5 pt-4">
        <div className="container mx-auto mt-5">
          <div className="flex flex-wrap lg:flex-nowrap gap-5">
            {/* Image Shimmer */}
            <div className="w-full lg:w-1/2 mb-4">
              <div className="shadow-lg rounded-lg bg-gray-300 h-96"></div>
            </div>

            {/* Product Details Shimmer */}
            <div className="w-full lg:w-1/2 mb-4">
              <div className="shadow-lg rounded-lg p-4">
                <div className="p-4 space-y-4">
                  {/* Title */}
                  <div className="h-8 bg-gray-300 rounded"></div>
                  {/* Original Price */}
                  <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
                  {/* Offer Price */}
                  <div className="h-6 w-1/2 bg-gray-300 rounded"></div>

                  {/* Description */}
                  <div className="mt-4 h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-300 rounded"></div>

                  {/* Buttons Shimmer */}
                  <div className="flex flex-col md:flex-row items-center mt-4 gap-3">
                    <div className="h-10 w-16 bg-gray-300 rounded"></div>
                    <div className="h-10 w-28 bg-gray-300 rounded"></div>
                    <div className="h-10 w-24 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Additional Details Shimmer */}
              <hr className="my-4" />
              <div className="shadow-lg rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                      <div className="mt-2 h-4 w-20 bg-gray-300 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="my-4" />
              {/* Offers Shimmer */}
              <div className="shadow-lg rounded-lg p-4 space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="ml-2 h-6 w-24 bg-gray-300 rounded"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="p-4 shadow-lg rounded-lg h-20 bg-gray-300"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SingleProductShimmer;
