// import React from "react";
// import { useNavigate } from "react-router-dom";

// const FurnitureCard = ({ productItem }) => {
//   const navigate = useNavigate();

//   const handleWishlistClick = () => {
//     // Handle wishlist click logic here
//     console.log("Added to wishlist:", productItem.id);
//   };

//   return (
//     <div className="relative max-w-sm rounded-lg overflow-hidden shadow-lg mb-10 bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300">
//       <div className="relative">
//         <img
//           className="w-full h-60 object-cover rounded-t-lg hover:opacity-90 transition-opacity duration-300"
//           src={productItem.src}
//           alt="Furniture"
//         />
//         <div
//           onClick={handleWishlistClick}
//           className="absolute top-2 right-2 inline-block rounded-full border border-rose-600 p-2 text-rose-600 bg-white hover:bg-rose-600 hover:text-white focus:outline-none focus:ring active:bg-rose-500 transition-colors duration-300 cursor-pointer"
//         >
//           <span className="sr-only">Add to Wishlist</span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             className="w-5 h-5"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 21C12 21 6 16.5 3 12.5C1 9.5 2.5 6.5 5 5C7.5 3.5 10.5 5 12 7C13.5 5 16.5 3.5 19 5C21.5 6.5 23 9.5 21 12.5C18 16.5 12 21 12 21Z"
//             />
//           </svg>
//         </div>
//       </div>
//       <div className="px-6 py-4">
//         <div className="font-bold text-xl mb-2 text-gray-900">{productItem.name}</div>
//         <p className="text-lg text-gray-700 font-semibold mb-2">${productItem.price}</p>
//         <p className="text-gray-700 text-base">{productItem.description}</p>
//       </div>
//       <div className="px-6 py-4">
//         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
//           #furniture
//         </span>
//         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
//           #{productItem.type.toLowerCase()}
//         </span>
//       </div>
//       <div className="px-4 py-2 flex justify-between items-center">
//         <div
//           onClick={() => navigate(`/products/cart/:${productItem.id}`)}
//           className="inline-block rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500 transition-colors duration-300 cursor-pointer"
//         >
//           <span className="sr-only">Add to Cart</span>
//           <svg
//             className="w-5 h-5"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M14 5l7 7m0 0l-7 7m7-7H3"
//             />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FurnitureCard;


// import React from "react";
// import { useNavigate } from "react-router-dom";

// const FurnitureCard = ({ productItem }) => {
//   const navigate = useNavigate();

//   const handleWishlistClick = () => {
//     // Handle wishlist click logic here
//     console.log("Added to wishlist:", productItem.id);
//   };

//   return (
//     <div className="relative max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300">
//       {/* Image */}
//       <div className="relative h-60 overflow-hidden">
//         <img
//           className="w-full h-full object-cover rounded-t-lg transform hover:scale-105 transition-transform duration-300"
//           src={productItem.src}
//           alt="Furniture"
//         />
//         {/* Wishlist Icon */}
//         <div
//           onClick={handleWishlistClick}
//           className="absolute top-2 right-2 flex items-center justify-center rounded-full bg-white border border-gray-300 p-2 text-gray-600 hover:text-rose-600 hover:border-rose-600 hover:bg-white transition-all duration-300 cursor-pointer"
//         >
//           <span className="sr-only">Add to Wishlist</span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 21C12 21 6 16.5 3 12.5C1 9.5 2.5 6.5 5 5C7.5 3.5 10.5 5 12 7C13.5 5 16.5 3.5 19 5C21.5 6.5 23 9.5 21 12.5C18 16.5 12 21 12 21Z"
//             />
//           </svg>
//         </div>
//       </div>
//       {/* Details */}
//       <div className="px-6 py-4">
//         {/* Title */}
//         <div className="font-bold text-xl mb-2 text-gray-900">{productItem.name}</div>
//         {/* Price */}
//         <p className="text-lg text-gray-700 font-semibold mb-2">${productItem.price}</p>
//         {/* Description */}
//         <p className="text-gray-700 text-base">{productItem.description}</p>
//       </div>
//       {/* Tags */}
//       <div className="px-6 py-4">
//         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
//           #furniture
//         </span>
//         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
//           #{productItem.type.toLowerCase()}
//         </span>
//       </div>
//       {/* Actions */}
//       <div className="px-4 py-2 flex justify-between items-center">
//         {/* Add to Cart Button */}
//         <button
//           onClick={() => navigate(`/products/cart/${productItem.id}`)}
//           className="inline-block rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 transition-colors duration-300 focus:outline-none"
//         >
//           <span className="sr-only">Add to Cart</span>
//           <svg
//             className="w-5 h-5 inline-block mr-2 -mt-1"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M14 5l7 7m0 0l-7 7m7-7H3"
//             />
//           </svg>
//           Add to Cart
//         </button>
//         {/* View Details Button */}
//         <button className="inline-block border border-indigo-600 rounded-full text-indigo-600 px-4 py-2 transition-colors duration-300 hover:bg-indigo-600 hover:text-white focus:outline-none">
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FurnitureCard;


import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishListItem } from "../../../app/Slice/wishListSlice/wishListThunk";

const FurnitureCard = ({ productItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Access the wishlist state from Redux store
  const wishlistItems = useSelector((state) => state.wishlist.items);
  
  // Check if the product is in the wishlist
  const isInWishlist = wishlistItems.some(item => item._id === productItem?._id);

  const handleWishlistClick = (productId) => {
    dispatch(toggleWishListItem({ productId }));
  };

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
          className={`absolute top-2 right-2 inline-block rounded-full border p-2 ${
            isInWishlist ? "border-rose-600 text-rose-600 bg-white hover:bg-rose-600 hover:text-white" : "border-gray-300 text-gray-400 bg-white hover:bg-gray-300"
          } focus:outline-none focus:ring active:bg-rose-500 transition-colors duration-300 cursor-pointer`}
        >
          <span className="sr-only">Toggle Wishlist</span>
          {isInWishlist ? (
            // Filled heart for item in wishlist
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 21C12 21 6 16.5 3 12.5C1 9.5 2.5 6.5 5 5C7.5 3.5 10.5 5 12 7C13.5 5 16.5 3.5 19 5C21.5 6.5 23 9.5 21 12.5C18 16.5 12 21 12 21Z"
              />
            </svg>
          ) : (
            // Outline heart for item not in wishlist
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 21C12 21 6 16.5 3 12.5C1 9.5 2.5 6.5 5 5C7.5 3.5 10.5 5 12 7C13.5 5 16.5 3.5 19 5C21.5 6.5 23 9.5 21 12.5C18 16.5 12 21 12 21Z"
              />
            </svg>
          )}
        </div>
      </div>
      {/* Rest of the component */}
    </div>
  );
};

export default FurnitureCard;
