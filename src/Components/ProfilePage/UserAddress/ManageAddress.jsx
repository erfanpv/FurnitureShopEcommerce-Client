import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const ManageAddresses = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      address: "123 Street, City, State, 45678",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Work",
      address: "456 Business Ave, City, State, 12345",
      phone: "987-654-3210",
    },
  ]);

  const handleAddAddress = () => {
    // Logic to add a new address
  };

  const handleEditAddress = (id) => {
    // Logic to edit an address
  };

  const handleDeleteAddress = (id) => {
    // Logic to delete an address
  };

  return (
    <div className="bg-white min-h-screen py-10 px-4 lg:px-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800">
          Manage Addresses
        </h1>

        {/* Address List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Your Addresses</h2>

          {/* Display existing addresses */}
          <ul>
            {addresses.map((address) => (
              <li
                key={address.id}
                className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    {address.name}
                  </h3>
                  <p className="text-sm text-gray-500">{address.address}</p>
                  <p className="text-sm text-gray-500">{address.phone}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEditAddress(address.id)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <FaEdit className="text-lg" />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Add New Address Button */}
          <button
            onClick={handleAddAddress}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg flex justify-center items-center space-x-2 hover:bg-indigo-700 transition"
          >
            <FaPlus />
            <span>Add New Address</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAddresses;
