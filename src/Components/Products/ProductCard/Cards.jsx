import React from "react";
import { useNavigate } from "react-router-dom";

const FurnitureCard = ({ productItem }) => {
  const navigate = useNavigate();

  const handleWishlistClick = (id) => {
    // Handle wishlist click logic here
    console.log("Added to wishlist:",id);
  };

  // const renderRatingStars = (rating) => {
  //   const fullStar = (
  //     <svg
  //       className="w-5 h-5 text-yellow-500"
  //       fill="currentColor"
  //       viewBox="0 0 20 20"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path d="M9.049 2.927C9.327 2.073 10.673 2.073 10.951 2.927L12.267 6.866L16.633 7.14C17.558 7.202 17.948 8.299 17.237 8.9L13.936 11.611L14.785 15.861C14.954 16.766 14.054 17.439 13.264 16.984L9.999 15.004L6.736 16.984C5.946 17.439 5.046 16.766 5.215 15.861L6.064 11.611L2.763 8.9C2.052 8.299 2.442 7.202 3.367 7.14L7.733 6.866L9.049 2.927Z" />
  //     </svg>
  //   );

  //   const emptyStar = (
  //     <svg
  //       className="w-5 h-5 text-indigo-500"
  //       fill="currentColor"
  //       viewBox="0 0 20 20"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path d="M9.049 2.927C9.327 2.073 10.673 2.073 10.951 2.927L12.267 6.866L16.633 7.14C17.558 7.202 17.948 8.299 17.237 8.9L13.936 11.611L14.785 15.861C14.954 16.766 14.054 17.439 13.264 16.984L9.999 15.004L6.736 16.984C5.946 17.439 5.046 16.766 5.215 15.861L6.064 11.611L2.763 8.9C2.052 8.299 2.442 7.202 3.367 7.14L7.733 6.866L9.049 2.927Z" />
  //     </svg>
  //   );

  //   const stars = [];
  //   for (let i = 1; i <= 5; i++) {
  //     stars.push(
  //       i <= rating
  //         ? { ...fullStar, key: `full-${i}` }
  //         : { ...emptyStar, key: `empty-${i}` }
  //     );
  //   }
  //   return stars;
  // };

  return (
    <div className="relative max-w-sm rounded-lg overflow-hidden shadow-lg mb-10 bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          className="w-full h-60 object-cover rounded-t-lg"
          src={productItem.image}
          alt="Furniture"
        />
        <div
          onClick={() => handleWishlistClick(productItem?._id)}
          className="absolute top-2 right-2 inline-block rounded-full border border-rose-600 p-2 text-rose-600 bg-white hover:bg-rose-600 hover:text-white focus:outline-none focus:ring active:bg-rose-500 transition-colors duration-300 cursor-pointer"
        >
          <span className="sr-only">Add to Wishlist</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 21C12 21 6 16.5 3 12.5C1 9.5 2.5 6.5 5 5C7.5 3.5 10.5 5 12 7C13.5 5 16.5 3.5 19 5C21.5 6.5 23 9.5 21 12.5C18 16.5 12 21 12 21Z"
            />
          </svg>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900">
          {productItem?.productName}
        </div>
        <p className="text-lg text-gray-700 font-semibold mb-2">
          ${productItem?.price}
        </p>
        <p className="text-gray-700 text-base mb-2">
          {productItem?.description}
        </p>
        {/* <div className="flex items-center">
          {renderRatingStars(productItem.rating)}
        </div> */}
      </div>
      <div className="px-6 pb-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-indigo-700 mr-2">
          #furniture
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-indigo-700 mr-2">
          #{productItem?.category?.toLowerCase()}
        </span>
      </div>
      <div className="px-4 py-2 flex justify-between items-center">
        <div
          onClick={() => navigate(`/products/cart/${productItem?._id}`)}
          className="inline-block rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500 transition-colors duration-300 cursor-pointer"
        >
          <span className="sr-only">Add to Cart</span>
          <svg
            className="w-5 h-5"
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
