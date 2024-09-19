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

// Dashboard Component
// className="flex flex-wrap gap-x-4 lg:gap-x-16 gap-y-12 bg-white px-4 py-10 lg:px-20  mr-5 ml-5 md:ml-64 sm:ml-64 lg:ml-64"
const DashboardStats = () => {
  return (
    <div className="bg-white-100 min-h-screen  px-4 py-10 lg:px-20 md:ml-60 sm:ml-60 lg:ml-60">
      {/* Dashboard Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-indigo-800">Admin Dashboard</h2>
        <p className="mt-2 text-gray-600">Real-time eCommerce statistics</p>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-x-4 lg:gap-x-16 gap-y-12  ">
      
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
      <Link to={"/admin/allorders"}>
        <TotalOrders />
      </Link>
    </div>
      {/* Charts Section */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-6">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
      <div className="mt-12 bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">Recent Orders</h3>
        <ul className="divide-y divide-gray-200">
          <li className="py-4 flex justify-between">
            <div>
              <p className="font-medium text-gray-900">Order #12345</p>
              <p className="text-gray-500">Customer: John Doe</p>
            </div>
            <p className="text-gray-600">$500</p>
          </li>
          <li className="py-4 flex justify-between">
            <div>
              <p className="font-medium text-gray-900">Order #12346</p>
              <p className="text-gray-500">Customer: Jane Smith</p>
            </div>
            <p className="text-gray-600">$750</p>
          </li>
          <li className="py-4 flex justify-between">
            <div>
              <p className="font-medium text-gray-900">Order #12347</p>
              <p className="text-gray-500">Customer: Bill Gates</p>
            </div>
            <p className="text-gray-600">$1,200</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardStats;
