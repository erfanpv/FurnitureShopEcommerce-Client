import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaWallet,
  FaHeart,
  FaFileAlt,
  FaSignOutAlt,
  FaAddressBook,
  FaUser,
  FaEnvelope
} from "react-icons/fa";
import { setLoggedIn } from "../../app/Slice/userSlices/usersSlice/usersSlice";

const ProfileSidebar = () => {
  const handleLogout = () => {
    localStorage.clear();
    dispatch(setLoggedIn(false));
  };
  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <aside className="w-72 bg-white  h-screen flex flex-col justify-between">
        <div className="p-6">
          {/* Navigation Links */}
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/profile/info"
                  className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition"
                >
                  <FaUser className="text-lg" />
                  <span>Account Information</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/address"
                  className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition"
                >
                  <FaAddressBook className="text-lg" />
                  <span>Manage Addresses</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/orders"
                  className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition"
                >
                  <FaBox className="text-lg" />
                  <span>My Orders</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/wishlist"
                  className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition"
                >
                  <FaHeart className="text-lg" />
                  <span>Wishlist</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/wallet"
                  className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition"
                >
                  <FaWallet className="text-lg" />
                  <span>Wallet</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/terms"
                  className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition"
                >
                  <FaFileAlt className="text-lg" />
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/privacy"
                  className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition"
                >
                  <FaFileAlt className="text-lg" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/contact"
                  className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition"
                >
                  <FaEnvelope className="text-lg" />
                  <span>Contact Us</span>
                </Link>
              </li>

              <li>
                <Link to={"/"}>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-4 text-red-600 hover:text-red-700 transition w-full"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span>Logout</span>
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 bg-white">
        {/* Outlet for rendering dynamic pages */}
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileSidebar;
