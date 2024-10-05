import React, { useState, useEffect } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer} from "recharts";
import http from "../../../../utils/axios/axiosIntercepter";

const RevenueChart = () => {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = "revenueGraph";
        const response = await http.get(`/admin/dashboard`, { params: { action } });
        setRevenueData(response.data);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Revenue Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={revenueData}
          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#34D399" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
