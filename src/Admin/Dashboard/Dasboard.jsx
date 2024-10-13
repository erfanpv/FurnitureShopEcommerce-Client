import React from "react";
import { Link } from "react-router-dom";
import TotalCustomers from "./UserDetails/TotalCustomers";
import TotalProducts from "./TotalProducts/TotalProducts";
import TotalRevenue from "./TotalRevenue/TotalRevenue";
import TotalOrders from "./TotalOrders/TotalOrders";
import RecentOrders from "./RecentOrders/RecentOrders";
import RecentActivity from "./RecentActivity/RecentActivity";
import SalesChart from "./Charts/SalesChart/SalesChart";
import RevenueChart from "./Charts/RevenueChart/RevenueChart";
import Reports from "./Reports/Reports";
import Notifications from "./Notification/Notifications";

const DashboardStats = () => {
  return (
    <div className="bg-white-100 min-h-screen px-4 py-10 lg:px-20 md:ml-60 sm:ml-60 lg:ml-60 relative">
      {/* <div>
        <h2 className="text-4xl font-bold text-indigo-800">Admin Dashboard</h2>
        <p className="mt-2 text-gray-500">
          Comprehensive eCommerce statistics at a glance
        </p>
      </div> */}

      {/* <Notifications /> */}

      <Reports />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link
          to={"/admin/productlist"}
          className="hover:scale-105 transform transition"
        >
          <TotalProducts />
        </Link>
        <Link
          to={"/admin/userslist"}
          className="hover:scale-105 transform transition"
        >
          <TotalCustomers />
        </Link>
        <Link
          to={"/admin/allorders"}
          className="hover:scale-105 transform transition"
        >
          <TotalOrders />
        </Link>
        <Link
          to={"/admin/revenue"}
          className="hover:scale-105 transform transition"
        >
          <TotalRevenue />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-12">
        <RevenueChart />
        <SalesChart />
      </div>

      <RecentOrders />
      <RecentActivity />
    </div>
  );
};

export default DashboardStats;
