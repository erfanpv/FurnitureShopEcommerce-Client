import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProductsUsers } from "../../../app/Slice/ProductsSlice/productThunk";

const SearchWithSuggestions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { products, } = useSelector((state) => state.productsAll);  
  const dispatch = useDispatch()

  
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      dispatch(searchProductsUsers({query}))
      setSuggestions(
        products.filter((item) => item.productName.toLowerCase().includes(query))
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.productName);
    setShowSuggestions(false);
  };

  return (
    <div className="relative mx-10">
      <div>
        <label htmlFor="Search" className="sr-only">
          {" "}
          Search{" "}
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          id="Search"
          placeholder="Search for..."
          className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm border-2 pl-3"
        />
        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="button" className="text-gray-600 hover:text-gray-700">
            <span className="sr-only">Search</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto z-10">
            {suggestions.map((suggestion) => (
              <Link to={`/products/cart/${suggestion._id}`} key={suggestion._id}>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                  onClick={() => {
                    handleSuggestionClick(suggestion);
                    setSearchQuery("");
                  }}
                >
                  {suggestion.productName}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
      <div>

      </div>
    </div>
  );
};

export default SearchWithSuggestions;
