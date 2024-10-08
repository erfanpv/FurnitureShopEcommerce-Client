import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadWishList, toggleWishListItem } from "../../../app/Slice/userSlices/wishListSlice/wishListThunk";
import { toast } from "react-toastify";
import { fetchCart } from "../../../app/Slice/addCartSlice/cartThunk";

const FurnitureCard = ({ productItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlistCart } = useSelector((state) => state.wishList);
  const { isLoggedIn } = useSelector((state) => state.users);

  if (isLoggedIn) {
    useEffect(() => {
      dispatch(loadWishList());
    }, [dispatch]);
  }
 

  const isInWishlist = wishlistCart?.products?.some(
    (item) => item.productId._id === productItem._id
  );

  const handleWishlistClick = (productId) => {
    dispatch(toggleWishListItem({ productId }));
  };

  return (
    <div className="max-w-sm rounded-md overflow-hidden shadow-lg mb-10 bg-white">
      <div className="relative">
        <img
          className="w-96 h-60 object-cover"
          src={productItem.image}
          alt="Furniture"
        />
        <div
          onClick={() =>
            isLoggedIn
              ? handleWishlistClick(productItem?._id)
              : (toast.info("Please login"), navigate("/login"))
          }
          className={`absolute top-2 right-2 inline-block rounded-full border border-rose-600 p-2 ${
            isInWishlist ? "bg-rose-600 text-white" : "bg-white text-rose-600"
          } hover:bg-rose-600 hover:text-white focus:outline-none focus:ring transition-colors duration-300 cursor-pointer`}
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
        <div className="font-bold text-xl mb-2">{productItem?.productName}</div>
        <p className="text-lg font-bold mb-2">${productItem?.price}</p>
        <p className="text-gray-700 text-base">{productItem?.description}</p>
      </div>

      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          #furniture
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
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




  