import React, { useEffect, useState } from "react";
import {FaUser,FaEnvelope,FaCalendarAlt,FaFlag,FaEye,FaCheckCircle,FaTimesCircle, FaExclamationCircle} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {getAllUserMessages,messageStatusUpdate} from "../../../app/Slice/adminSlices/contactSlice/contactThunk";
import Select from "react-select";

const statusOptions = [
  { value: "All", label: "All", icon: null },
  {
    value: "Pending",
    label: "Pending",
    icon: <FaExclamationCircle className="text-yellow-500" />,
  },
  {
    value: "Resolved",
    label: "Resolved",
    icon: <FaCheckCircle className="text-green-500" />,
  },
  {
    value: "Unresolved",
    label: "Unresolved",
    icon: <FaTimesCircle className="text-red-500" />,
  },
];

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "white",
    borderRadius: "12px",
    border: "2px solid #E5E7EB",
    boxShadow: "none",
    padding: "0.5rem",
    fontSize: "1rem",
    "&:hover": {
      borderColor: "#6366F1",
    },
    "&:focus": {
      borderColor: "#6366F1",
    },
  }),
  option: (base, state) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    padding: "0.75rem 1.25rem",
    backgroundColor: state.isFocused ? "#EFF6FF" : "white",
    color: state.isFocused ? "#1E3A8A" : "#4B5563",
    fontWeight: state.isSelected ? "600" : "400",
    "&:hover": {
      backgroundColor: "#DBEAFE",
      color: "#1E3A8A",
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "12px",
    marginTop: "0.5rem",
    border: "1px solid #E5E7EB",
  }),
};

const statusColors = {
  Pending: "bg-yellow-200 text-yellow-800",
  Resolved: "bg-green-200 text-green-800",
  Unresolved: "bg-red-200 text-red-800",
};

const AdminMessagesPage = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const openModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  const { contactDatas } = useSelector((state) => state.contact);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserMessages());
  }, [dispatch]);

  const handleStatusUpdate = async (messageId, newStatus) => {
    dispatch(
      messageStatusUpdate({
        messageId,
        newStatus,
        dispatch,
        setUpdatingStatus,
        closeModal,
      })
    );
  };

  const filteredMessages = contactDatas?.reduce((acc, userData) => {
    const filteredUserMessages = userData.userMessages.filter((message) => {
      if (selectedFilter === "All") return true;
      return message.messageStatus === selectedFilter;
    });

    if (filteredUserMessages.length) {
      acc.push({ ...userData, userMessages: filteredUserMessages });
    }

    return acc;
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedFilter(selectedOption.value);
  };

  const formatOptionLabel = ({ label, icon }) => (
    <div className="flex items-center space-x-2">
      {icon}
      <span>{label}</span>
    </div>
  );

  return (
    <div className="bg-white-100 min-h-screen px-4 py-10 lg:px-20 md:ml-60 sm:ml-60 lg:ml-60">
      <h1 className="text-4xl font-bold mb-10 text-indigo-800">Messages</h1>

     
      <div className="w-full mb-8">
        <label className="text-lg font-semibold text-gray-700 mr-4">
          Filter by Status:
        </label>
        <Select
          value={statusOptions.find((option) => option.value === selectedFilter)}
          onChange={handleChange}
          options={statusOptions}
          styles={customStyles}
          formatOptionLabel={formatOptionLabel}
          placeholder="Select status..."
          className="max-w-sm"
        />
      </div>

   
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMessages &&
          filteredMessages.map((userData) =>
            userData.userMessages.map((message) => (
              <div
                key={message._id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center mr-2">
                    <FaUser className="text-indigo-600" />
                  </div>
                  <h2 className="text-lg font-semibold">{message.name}</h2>
                </div>
                <p className="text-gray-500 mb-2">
                  <FaEnvelope className="inline mr-1" /> {message.subject}
                </p>
                <p className="text-gray-400 mb-2">
                  <FaCalendarAlt className="inline mr-1" />{" "}
                  {new Date(message.date).toLocaleDateString()}
                </p>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    statusColors[message.messageStatus]
                  }`}
                >
                  <FaFlag className="mr-1" />
                  {message.messageStatus}
                </span>
                <button
                  onClick={() => openModal(message)}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center"
                >
                  <FaEye className="mr-2" /> View Message
                </button>
              </div>
            ))
          )}
      </div>

     
      {isModalOpen && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Message Details</h2>
            <p>
              <strong>User:</strong> {selectedMessage.name}
            </p>
            <p>
              <strong>Contact:</strong> {selectedMessage.mobile}
            </p>
            <p>
              <strong>Email:</strong> {selectedMessage.email}
            </p>
            <p>
              <strong>Subject:</strong> {selectedMessage.subject}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedMessage.date).toLocaleDateString()}
            </p>
            <p
              className={`mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                statusColors[selectedMessage.messageStatus]
              }`}
            >
              <FaFlag className="mr-1" />
              Status: {selectedMessage.messageStatus}
            </p>
            <p className="mt-2">
              <strong>Message:</strong>
            </p>
            <p>{selectedMessage.message}</p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() =>
                  handleStatusUpdate(selectedMessage._id, "Resolved")
                }
                disabled={updatingStatus}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
              >
                {updatingStatus ? "Updating..." : "Mark as Resolved"}
              </button>
              <button
                onClick={() =>
                  handleStatusUpdate(selectedMessage._id, "Unresolved")
                }
                disabled={updatingStatus}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
              >
                {updatingStatus ? "Updating..." : "Mark as Unresolved"}
              </button>
              <button
                onClick={() => closeModal()}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessagesPage;
