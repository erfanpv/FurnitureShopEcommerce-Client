import { useState } from "react";
import React from "react";
import http from "../../../utils/axios/axiosIntercepter";
import toast from "react-hot-toast";

const Reports = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportType, setReportType] = useState("orders");
  const [dateRange, setDateRange] = useState("last30days");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    if (dateRange === "custom" && new Date(startDate) > new Date(endDate)) {
      toast.success("Start date must be before end date.")
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await http.post("/admin/dashboard/create-report", {
        reportType,
        dateRange,
        startDate,
        endDate,
      }, { responseType: 'blob' }); 
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf'); 
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);  
      
      toast.success("Report generated successfully!")
  
    } catch (error) {
      toast.success("Error generating report. Please try again.")
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setReportType("orders");
      setDateRange("last30days");
      setStartDate("");
      setEndDate("");
    }
  };
  

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Create Report
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-30"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-96">
            <h3 className="text-xl font-semibold text-indigo-800 mb-4">
              Create Report
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Type
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="orders">Order Report</option>
                  <option value="customers">Customer Report</option>
                  <option value="products">Product Report</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => {
                    setDateRange(e.target.value);
                    if (e.target.value !== "custom") {
                      setStartDate("");
                      setEndDate("");
                    }
                  }}
                  className="block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="last30days">Last 30 Days</option>
                  <option value="last60days">Last 60 Days</option>
                  <option value="thisYear">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>
            {dateRange === "custom" && (
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleGenerateReport}
                className={`bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Report"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="ml-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
