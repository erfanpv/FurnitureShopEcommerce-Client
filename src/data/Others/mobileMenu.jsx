import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUniqueProductCategories } from "../../app/Slice/ProductsSlice/productThunk";

const MobileCatogory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { uniqueProductCategories } = useSelector((state) => state.productsAll);
  const dispatch = useDispatch();  

  useEffect(() => {
    dispatch(fetchUniqueProductCategories());
  }, []);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="relative inline-block text-left -mx-3">
      <div>
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          Catogories
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
        <div className="mt-2 space-y-2">
          <div
            className="py-1 max-h-60 overflow-y-auto"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              to={`products`}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              role="menuitem"
            >
              All
            </Link>
            {uniqueProductCategories.map((item, index) => (
              <Link
                to={`/products/${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                key={index}
                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
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

export default MobileCatogory;
