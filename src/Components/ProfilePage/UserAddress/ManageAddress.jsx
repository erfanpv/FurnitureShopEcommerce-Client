import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import http from "../../../utils/axios/axiosIntercepter";

const ManageAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: "",
    pincode: "",
    street: "",
    city: "",
    state: "",
    phone: "",
  });
  const userId = "USER_ID_HERE"; // Replace with the authenticated user's ID
  const [editing, setEditing] = useState(null);

  // Fetch existing addresses when component loads
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const userId = localStorage.getItem("id")
        const res = await http.get(`/address/${userId}`);
        setAddresses(res.data);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };
    fetchAddresses();
  }, [userId]);

  // Handle adding a new address
  const handleAddAddress = async () => {
    try {
      const userId = localStorage.getItem("id")

      const res = await http.post(`/address/${userId}`, newAddress);
      setAddresses([...addresses, res.data]); // Add new address to state
      setNewAddress({ name: "", pincode: "", street: "", city: "", state: "", phone: "" });
    } catch (err) {
      console.error("Error adding address:", err);
    }
  };

  // Handle editing an existing address
  const handleEditAddress = (id) => {
    const addressToEdit = addresses.find((address) => address._id === id);
    setNewAddress(addressToEdit);
    setEditing(id);
  };

  // Handle saving updated address
  const handleSaveAddress = async () => {
    try {
      const userId = localStorage.getItem("id")
      const res = await axios.put(`/address/${userId}`, newAddress);
      setAddresses(
        addresses.map((address) =>
          address._id === editing ? res.data : address
        )
      );
      setEditing(null);
      setNewAddress({ name: "", pincode: "", street: "", city: "", state: "", phone: "" });
    } catch (err) {
      console.error("Error updating address:", err);
    }
  };

  // Handle deleting an address
  const handleDeleteAddress = async (id) => {
    try {
      await http.delete(`/address/${userId}/${id}`);
      setAddresses(addresses.filter((address) => address._id !== id)); // Remove address from state
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  return (
    <div className="bg-white min-h-screen py-10 px-4 lg:px-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800">
          Manage Addresses
        </h1>

        {/* Address Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {editing ? "Edit Address" : "Add New Address"}
          </h2>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Pincode"
              value={newAddress.pincode}
              onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Street"
              value={newAddress.street}
              onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="City"
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="State"
              value={newAddress.state}
              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Phone"
              value={newAddress.phone}
              onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            onClick={editing ? handleSaveAddress : handleAddAddress}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg flex justify-center items-center space-x-2 hover:bg-indigo-700 transition"
          >
            <FaPlus />
            <span>{editing ? "Save Address" : "Add Address"}</span>
          </button>
        </div>

        {/* Address List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Your Addresses</h2>

          <ul>
            {addresses.map((address) => (
              <li
                key={address._id}
                className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-700">
                    {address.name}
                  </h3>
                  <p className="text-sm text-gray-500">{`${address.street}, ${address.city}, ${address.state}, ${address.pincode}`}</p>
                  <p className="text-sm text-gray-500">{address.phone}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEditAddress(address._id)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <FaEdit className="text-lg" />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageAddresses;
