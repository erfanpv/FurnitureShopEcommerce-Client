import React, { useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";

const notifications = [
  { id: 1, message: "Low stock on product XYZ", date: "2024-09-18" },
  { id: 2, message: "New user registration", date: "2024-09-17" },
];

const Notifications = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="flex justify-between items-center mb-12">
      {/* <div>
        <h2 className="text-4xl font-bold text-indigo-800">Admin Dashboard</h2>
        <p className="mt-2 text-gray-500">
          Comprehensive eCommerce statistics at a glance
        </p>
      </div> */}
      {/* Notification bell */}
      <div className="relative">
        <button
          className="text-gray-500 hover:text-gray-800 focus:outline-none"
          onClick={toggleNotifications}
        >
          <BellIcon className="h-8 w-8" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 block h-2 w-2 transform translate-x-1 -translate-y-1 bg-red-600 rounded-full"></span>
          )}
        </button>

        {/* Notifications dropdown */}
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4 transition duration-200 ease-in-out transform scale-95">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Notifications
            </h3>
            {notifications.length > 0 ? (
              <ul className="space-y-2">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-600">🔔</span>
                      <span className="text-gray-600">
                        {notification.message}{" "}
                        <span className="text-gray-400 text-sm">
                          ({notification.date})
                        </span>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No notifications</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
