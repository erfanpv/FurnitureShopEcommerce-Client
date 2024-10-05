import React, { useState, useEffect } from "react";
import http from "../../../../utils/axios/axiosIntercepter";
import {  BarChart,Bar,  XAxis, YAxis, CartesianGrid,  Tooltip, ResponsiveContainer} from "recharts";

const SalesChart = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = "salesChart"
        const response = await http.get(`/admin/dashboard?year=${selectedYear}`,{ params: { action } });
        setSalesData(response.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, [selectedYear]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Sales Overview</h3>

      <div className="mb-4">
        <label htmlFor="year" className="mr-2">Select Year:</label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="p-2 border border-gray-300 rounded"
        >
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={salesData}
          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
