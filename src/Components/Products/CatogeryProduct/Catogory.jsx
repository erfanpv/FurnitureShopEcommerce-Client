import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUniqueProductCategories } from "../../../app/Slice/ProductsSlice/productThunk";

const CategoryDropdown = ({ isMobile, onCloseMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { uniqueProductCategories } = useSelector((state) => state.productsAll);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUniqueProductCategories());
  }, [dispatch]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (isMobile && onCloseMenu) {
      onCloseMenu(); 
    }
    setIsOpen(false); 
  };

  return (
    <div className={`relative inline-block text-left ${isMobile ? "-mx-3" : ""}`}>
      <div>
        <button
          type="button"
          className={`${
            isMobile
              ? "flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              : "inline-flex justify-center w-full rounded-md px-4 bg-white text-sm font-medium text-black focus:outline-none items-center align-middle"
          }`}
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          Categories
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.707a1 1 0 011.414 0L10 11.086l3.293-3.379a1 1 0 111.414 1.414l-4 4.104a1 1 0 01-1.414 0l-4-4.104a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className={`${
            isMobile ? "mt-2 space-y-2" : "origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          } focus:outline-none z-10`}
        >
          <div
            className="py-1 max-h-60 overflow-y-auto"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              to={`/products`}
              onClick={handleLinkClick}
              className={`${
                isMobile
                  ? "block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              }`}
              role="menuitem"
            >
              All
            </Link>
            {uniqueProductCategories.map((item, index) => (
              <Link
                to={`/products/${item.toLowerCase()}`}
                onClick={handleLinkClick}
                key={index}
                className={`${
                  isMobile
                    ? "block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                }`}
                role="menuitem"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
