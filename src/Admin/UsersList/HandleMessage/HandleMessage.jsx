import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaFlag,
  FaEye,
} from "react-icons/fa";

const dummyMessages = [
  {
    id: 1,
    user: "John Doe",
    subject: "Order Inquiry",
    date: "2024-09-18",
    status: "Pending",
    message: "Could you provide an update on my order status?",
  },
  {
    id: 2,
    user: "Jane Smith",
    subject: "Product Return",
    date: "2024-09-17",
    status: "Resolved",
    message: "I would like to return the product I ordered.",
  },
  {
    id: 3,
    user: "Emily Johnson",
    subject: "Feedback on Service",
    date: "2024-09-15",
    status: "Pending",
    message: "I wanted to share my experience with your service.",
  },
  {
    id: 4,
    user: "Alice Brown",
    subject: "Delivery Delay",
    date: "2024-09-16",
    status: "Unresolved",
    message: "My package hasn’t arrived yet.",
  },
];

const statusColors = {
  Pending: "bg-yellow-200 text-yellow-800",
  Resolved: "bg-green-200 text-green-800",
  Unresolved: "bg-red-200 text-red-800",
};

const AdminMessagesPage = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const openModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  const filteredMessages = dummyMessages.filter((message) => {
    const messageDate = new Date(message.date);
    const isAfterStart = startDate ? messageDate >= new Date(startDate) : true;
    const isBeforeEnd = endDate ? messageDate <= new Date(endDate) : true;
    const matchesStatus =
      statusFilter === "All" || message.status === statusFilter;
    return isAfterStart && isBeforeEnd && matchesStatus;
  });

  return (
    <div className="bg-white-100 min-h-screen px-4 py-10 lg:px-20 md:ml-60 sm:ml-60 lg:ml-60">
      <h1 className="text-4xl font-bold mb-10 text-indigo-800">Messages</h1>
      <div className="mb-4 flex items-center space-x-4">
        <div>
          <label className="block text-gray-700">Start Date:</label>
          <input
            type="date"
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">End Date:</label>
          <input
            type="date"
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
          <option value="Unresolved">Unresolved</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center mr-2">
                <FaUser className="text-indigo-600" />
              </div>
              <h2 className="text-lg font-semibold">{message.user}</h2>
            </div>
            <p className="text-gray-500 mb-2">
              <FaEnvelope className="inline mr-1" /> {message.subject}
            </p>
            <p className="text-gray-400 mb-2">
              <FaCalendarAlt className="inline mr-1" /> {message.date}
            </p>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                statusColors[message.status]
              }`}
            >
              <FaFlag className="mr-1" />
              {message.status}
            </span>
            <button
              onClick={() => openModal(message)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center"
            >
              <FaEye className="mr-2" /> View Message
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Message Details</h2>
            {selectedMessage && (
              <>
                <p>
                  <strong>User:</strong> {selectedMessage.user}
                </p>
                <p>
                  <strong>Subject:</strong> {selectedMessage.subject}
                </p>
                <p>
                  <strong>Date:</strong> {selectedMessage.date}
                </p>
                <p
                  className={`mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    statusColors[selectedMessage.status]
                  }`}
                >
                  <FaFlag className="mr-1" />
                  Status: {selectedMessage.status}
                </p>
                <p className="mt-2">
                  <strong>Message:</strong>
                </p>
                <p>{selectedMessage.message}</p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessagesPage;
