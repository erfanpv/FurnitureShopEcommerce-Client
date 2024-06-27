import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const UserProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const userFound = localStorage.getItem("id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${userFound}`
        );
        const data = response.data;
        setUserDetails(data);
        setWishlist(data.cart);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    if (userFound) {
      fetchUserData();
    }
  }, [userFound]);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold mb-8 text-indigo-900">User Profile</h2>

      {userDetails && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border-l-4 border-indigo-900">
          <h3 className="text-xl font-semibold mb-4 text-rose-600">Personal Information</h3>
          <p className="mb-2">
            <span className="font-medium text-indigo-900">Name:</span> {userDetails.fnName} {userDetails.lastName}
          </p>
          <p>
            <span className="font-medium text-indigo-900">Email:</span> {userDetails.email}
          </p>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-indigo-900">
        <h3 className="text-xl font-semibold mb-4 text-rose-600">Wishlist</h3>
        {wishlist.length > 0 ? (
          <ul className="space-y-2">
            {wishlist.map((item) => (
              <li key={item.itemId} className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-sm">
                <img src={item.src} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                <div>
                  <p className="font-medium text-indigo-900">{item.name}</p>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No items saved in wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
