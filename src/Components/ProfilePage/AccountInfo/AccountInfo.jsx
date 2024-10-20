import React, { useState, useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import http from "../../../utils/axios/axiosIntercepter";

const AccountInfo = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = localStorage.getItem("id");
        const response = await http.get(`users/profile/${id}`);
        setUserInfo(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    const phonePattern = /^[0-9]{10}$/;
    if (formData.phone && !phonePattern.test(formData.phone)) {
      errors.phone = "Invalid phone number (must be 10 digits)";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const id = localStorage.getItem("id");
      const response = await http.put(`users/profile/${id}`, formData);
      setUserInfo(response.data);
      setIsEditing(false);
      setValidationErrors({});
    } catch (error) {
      setError("Failed to update user data");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white min-h-screen py-10 px-4 lg:px-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800">
          Account Information
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Your Account</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                First Name
              </label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                  />
                  {validationErrors.firstName && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.firstName}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-2 text-gray-600">{userInfo.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Last Name
              </label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                  />
                  {validationErrors.lastName && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.lastName}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-2 text-gray-600">{userInfo.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Email
              </label>
              {isEditing ? (
                <>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.email}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-2 text-gray-600">{userInfo.email}</p>
              )}
            </div>

             <div>
              <label className="block text-gray-700 text-sm font-medium">
                Phone
              </label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                  />
                  {validationErrors.phone && (
                    <p className="text-red-500 text-sm">
                      {validationErrors.phone}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-2 text-gray-600">{userInfo.phone}</p>
              )}
            </div>

            {/* Edit / Save Button */}
            <div className="flex justify-end space-x-4">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition"
                >
                  <FaUserEdit />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
