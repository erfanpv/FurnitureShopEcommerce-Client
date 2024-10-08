import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadWishList, toggleWishListItem} from "../../app/Slice/userSlices/wishListSlice/wishListThunk";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistCart, loading } = useSelector((state) => state.wishList);

  useEffect(() => {
    dispatch(loadWishList());
  }, [dispatch]);

  let isInWishlist = true;

  const handleRemoveFromWishlist = (productId) => {
    dispatch(toggleWishListItem({ productId }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8">Your Wishlist</h1>

      {loading && (
        <p className="text-lg text-gray-500 animate-pulse">Loading wishlist...</p>
      )}

      {!loading &&
        (!wishlistCart ||
          wishlistCart.length === 0 ||
          (wishlistCart.products && wishlistCart.products.length === 0)) && (
          <p className="text-lg text-gray-600 text-center">
            Your wishlist is empty!
          </p>
        )}

      {wishlistCart?.products?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistCart.products.map((item) => (
            <div
              key={item?.productId?._id}
              className="relative bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={`/products/cart/${item.productId?._id}`}>
                <img
                  src={item?.productId?.image}
                  alt={item?.productId?.productName}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 truncate">
                  {item?.productId?.productName}
                </h2>
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {item?.productId?.description}
                </p>
              </div>
              <button
                onClick={() => handleRemoveFromWishlist(item?.productId?._id)}
                className={`absolute top-2 right-2 inline-flex items-center justify-center rounded-full border border-rose-600 p-2 ${
                  isInWishlist
                    ? "bg-rose-600 text-white"
                    : "bg-white text-rose-600"
                } hover:bg-rose-600 hover:text-white focus:outline-none focus:ring active:bg-rose-500 transition-colors duration-300`}
                aria-label="Remove from Wishlist"
              >
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
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
