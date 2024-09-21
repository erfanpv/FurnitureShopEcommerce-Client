import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProducts } from "../../app/Slice/adminSlices/productSlices/adminProductThunk";
import { searchUsers } from "../../app/Slice/adminSlices/userMangementSlices/umsThunk";

const SearchInput = ({ userSearch }) => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    setQuery(event.target.value);
    if (!userSearch) {
      dispatch(searchProducts({ query }));
    }
  };

  const handleOnClick = (query) => {
    if (userSearch) {
      dispatch(searchUsers({ query }));
    } else {
      dispatch(searchProducts({ query }));
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleOnClick(query);
    }
  };

  return (
    <div>
      <div className="relative">
        <label htmlFor="Search" className="sr-only">
          {" "}
          Search{" "}
        </label>

        <input
          type="text"
          onChange={handleSearch}
          onKeyDown={handleKey}
          value={query}
          id="Search"
          placeholder="Search for..."
          className=" rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm  p-5 border "
        />

        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button
            onClick={() => handleOnClick(query)}
            type="button"
            className="text-gray-600 hover:text-gray-700"
          >
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
      </div>
    </div>
  );
};

export default SearchInput;
