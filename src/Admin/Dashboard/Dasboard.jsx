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

const notifications = [
  { id: 1, message: "Low stock on product XYZ", date: "2024-09-18" },
  { id: 2, message: "New user registration", date: "2024-09-17" },
];

const DashboardStats = () => {
  return (
    <div className="bg-white-100 min-h-screen px-4 py-10 lg:px-20 md:ml-60 sm:ml-60 lg:ml-60">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-indigo-800">Admin Dashboard</h2>
        <p className="mt-2 text-gray-500">
          Comprehensive eCommerce statistics at a glance
        </p>
      </div>

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
        <TotalRevenue />
      </div>

      <div className="grid grid-cols-1  gap-8 mb-12">
        <RevenueChart />
        <SalesChart />
      </div>

      <RecentOrders />
      <RecentActivity />

      {/* Notifications Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">
          Notifications
        </h3>
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className="text-gray-600">
              {notification.message}{" "}
              <span className="text-gray-400">({notification.date})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardStats;
