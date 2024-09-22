
import React from "react";

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      id="modelConfirm"
      className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50"
    >
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-8">
        {/* Close Button */}
        <div className="absolute top-3 right-3">
          <button
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 rounded-full p-1.5"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {/* Icon */}
        <div className="flex justify-center">
          <svg
            className="w-16 h-16 text-rose-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 text-center mt-4">
          Are you sure?
        </h2>
        {/* Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
