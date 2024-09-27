import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBox, FaWallet, FaFileAlt, FaBug, FaSignOutAlt, FaAddressBook } from 'react-icons/fa';

const ProfileSidebar = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 flex">
      <aside className="w-72 bg-white shadow-xl h-screen sticky top-0">
        <div className="py-10 px-8">
          {/* Profile Header */}
          <div className="mb-8 text-center">
            <img 
              src="/path-to-profile-image.jpg" 
              alt="User" 
              className="w-24 h-24 rounded-full mx-auto shadow-lg object-cover" 
            />
            <h2 className="text-2xl font-bold text-indigo-700 mt-4">Muhammed Erfan</h2>
            <p className="text-gray-500">erfan@example.com</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-8">
            {/* General Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wide">General</h3>
              <ul className="space-y-6">
                {/* <li>
                  <Link
                    to="/profile/general"
                    className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition ease-in-out duration-300"
                  >
                    <FaHome className="text-xl" />
                    <span>General</span>
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/profile/address"
                    className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition ease-in-out duration-300"
                  >
                    <FaAddressBook className="text-xl" />
                    <span>Manage Address</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile/orders"
                    className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition ease-in-out duration-300"
                  >
                    <FaBox className="text-xl" />
                    <span>Orders</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile/wallet"
                    className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition ease-in-out duration-300"
                  >
                    <FaWallet className="text-xl" />
                    <span>Wallet</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wide">Legal</h3>
              <ul className="space-y-6">
                <li>
                  <Link
                    to="/profile/terms"
                    className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition ease-in-out duration-300"
                  >
                    <FaFileAlt className="text-xl" />
                    <span>Terms of Use</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile/privacy"
                    className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition ease-in-out duration-300"
                  >
                    <FaFileAlt className="text-xl" />
                    <span>Privacy Policy</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Personal Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wide">Personal</h3>
              <ul className="space-y-6">
                <li>
                  <Link
                    to="/profile/report-bug"
                    className="flex items-center space-x-4 text-gray-600 hover:text-indigo-600 transition ease-in-out duration-300"
                  >
                    <FaBug className="text-xl" />
                    <span>Report Bug</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {/* Logout logic */}}
                    className="flex items-center space-x-4 text-red-600 hover:text-red-700 transition ease-in-out duration-300 w-full"
                  >
                    <FaSignOutAlt className="text-xl" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      {/* Content Section */}
      <main className="flex-grow p-10 bg-gray-50">
        <h1 className="text-4xl font-bold text-indigo-900 mb-6">Profile Overview</h1>
        <p className="text-gray-600 text-lg">Welcome to your profile, where you can manage your account settings, orders, and more.</p>
        {/* Add dynamic content here */}
      </main>
    </div>
  );
};

export default ProfileSidebar;
