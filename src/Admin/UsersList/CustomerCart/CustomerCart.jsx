import React from "react";
import UserCartProducts from "../../../Components/UserCartProducts/UserCartProducts";
import { useNavigate } from "react-router-dom";
const UserCart = () => {
  const navigate = useNavigate()
  return (
    <div className="md:ml-64 sm:ml-64 lg:ml-64 w-1/2">
      <button
          className="inline-block rounded border border-rose-600 bg-rose-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-rose-600 focus:outline-none focus:ring active:text-rose-500 lg:ml-64 mt-5 mr-5 ml-5 md:ml-64 sm:ml-64"
          onClick={() => navigate("/admin/userslist")}
        >
          Back
        </button>
      <UserCartProducts />
    </div>
  );
};

export default UserCart;
