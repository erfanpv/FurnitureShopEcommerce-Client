import React from "react";
import TotalCustomers from "./UserDetails/TotalCustomers";
import TotalProducts from "./TotalProducts/TotalProducts";
import TotalStocks from "./TotalStocks/TotalStocks";
import TotalRevenue from "./TotalRevenue/TotalRevenue";
import TotalOrders from "./TotalOrders/TotalOrders";
import { Link } from "react-router-dom";

const DashboardStats = () => {
  return (
    <div className="flex flex-wrap gap-x-4 lg:gap-x-16 gap-y-12 bg-white px-4 py-10 lg:px-20  mr-5 ml-5 md:ml-64 sm:ml-64 lg:ml-64">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-indigo-800 sm:text-4xl">
          E-commerce Furniture Store
        </h2>

        <p className="mt-4 text-gray-500 sm:text-xl mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          dolores laborum labore provident impedit esse recusandae facere libero
          harum sequi.
        </p>
      </div>
      
      <Link to={"/admin/productlist"}>
        <TotalProducts />
      </Link>

     
      <Link to={"/admin/userslist"}>
        <TotalCustomers />
      </Link>

      <TotalRevenue />

      <Link to={"/admin/productlist"}>
        <TotalStocks />
      </Link>

      <Link to={"/admin/allorders"}>
        <TotalOrders />
      </Link>
    </div>
  );
};

export default DashboardStats;
