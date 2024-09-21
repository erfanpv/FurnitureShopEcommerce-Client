import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import TotalCustomers from "./UserDetails/TotalCustomers";
import TotalProducts from "./TotalProducts/TotalProducts";
import TotalStocks from "./TotalStocks/TotalStocks";
import TotalRevenue from "./TotalRevenue/TotalRevenue";
import TotalOrders from "./TotalOrders/TotalOrders";

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4000 },
  { name: "May", sales: 3000 },
  { name: "Jun", sales: 2000 },
];

const revenueData = [
  { name: "Mon", revenue: 12000 },
  { name: "Tue", revenue: 8000 },
  { name: "Wed", revenue: 14000 },
  { name: "Thu", revenue: 11000 },
  { name: "Fri", revenue: 10000 },
];

const recentActivities = [
  { id: 1, action: "New product added", date: "2024-09-18" },
  { id: 2, action: "User Jane Doe registered", date: "2024-09-17" },
  { id: 3, action: "Order #12345 shipped", date: "2024-09-16" },
  { id: 4, action: "Order #12346 returned", date: "2024-09-15" },
];

const notifications = [
  { id: 1, message: "Low stock on product XYZ", date: "2024-09-18" },
  { id: 2, message: "New user registration", date: "2024-09-17" },
];

const DashboardStats = () => {
  return (
    <div className="bg-white-100 min-h-screen px-4 py-10 lg:px-20 md:ml-60 sm:ml-60 lg:ml-60">
      {/* Dashboard Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-indigo-800">Admin Dashboard</h2>
        <p className="mt-2 text-gray-500">Comprehensive eCommerce statistics at a glance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link to={"/admin/productlist"} className="hover:scale-105 transform transition">
          <TotalProducts />
        </Link>
        <Link to={"/admin/userslist"} className="hover:scale-105 transform transition">
          <TotalCustomers />
        </Link>
        <Link to={"/admin/allorders"} className="hover:scale-105 transform transition">
          <TotalOrders />
        </Link>
        <TotalRevenue />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Sales Chart */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#34D399" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left table-auto">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="py-2 px-4">Order ID</th>
                <th className="py-2 px-4">Customer</th>
                <th className="py-2 px-4">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-4 px-4 font-medium text-gray-900">#12345</td>
                <td className="py-4 px-4 text-gray-600">John Doe</td>
                <td className="py-4 px-4 text-green-500 font-semibold">$500</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-gray-900">#12346</td>
                <td className="py-4 px-4 text-gray-600">Jane Smith</td>
                <td className="py-4 px-4 text-green-500 font-semibold">$750</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-medium text-gray-900">#12347</td>
                <td className="py-4 px-4 text-gray-600">Bill Gates</td>
                <td className="py-4 px-4 text-green-500 font-semibold">$1,200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">Recent Activities</h3>
        <ul className="space-y-4">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="text-gray-600">
              {activity.action} <span className="text-gray-400">({activity.date})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Notifications Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">Notifications</h3>
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className="text-gray-600">
              {notification.message} <span className="text-gray-400">({notification.date})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardStats;
