import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import MyContext from "../../../utils/Context";

const DropdownButton = () => {
  const { render } = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        const uniqueTypes = [
          ...new Set(response.data.map((item) => item.type)),
        ];
        setItems(uniqueTypes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [render]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md  px-4 py-2 bg-white text-sm font-medium text-gray-700  focus:outline-non items-center align-middle"
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
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1 max-h-60 overflow-y-auto"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              to={`/admin/productlist`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              All
            </Link>
            {items.map((item, index) => (
              <Link
                to={`/admin/productlist/${item.toLowerCase()}`}
                key={index}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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

export default DropdownButton;
