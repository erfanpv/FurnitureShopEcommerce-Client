import React from 'react';
import { FaFileContract, FaGavel, FaHandshake, FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const TermsOfService = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      {/* Page Header */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 mb-4">
          Terms of Service
        </h1>
        <p className="text-gray-600 text-xl max-w-3xl mx-auto">
          These terms govern your use of our services and your relationship with our company. Please read them carefully.
        </p>
      </header>

      {/* Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">

        {/* Introduction */}
        <div className="bg-white shadow-xl rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center mb-4">
            <FaFileContract className="text-purple-500 text-4xl mr-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            These Terms of Service outline the rules and regulations for the use of our website and services. By accessing or using the service, you agree to be bound by these terms.
          </p>
        </div>

        {/* User Responsibilities */}
        <div className="bg-white shadow-xl rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center mb-4">
            <FaRegCheckCircle className="text-indigo-500 text-4xl mr-4" />
            <h2 className="text-2xl font-semibold text-gray-800">User Responsibilities</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            You agree to provide accurate and up-to-date information when registering and to use our service in compliance with all applicable laws. Misuse or illegal activity may result in termination of your account.
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-600">
            <li>Provide valid and up-to-date information</li>
            <li>Follow all local and international laws</li>
            <li>Refrain from illegal activities on the platform</li>
          </ul>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-white shadow-xl rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center mb-4">
            <FaExclamationTriangle className="text-red-500 text-4xl mr-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Limitation of Liability</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Our service is provided "as is" without any warranties. We do not guarantee that the service will be uninterrupted, secure, or error-free. We will not be liable for any damages arising from the use or inability to use the service.
          </p>
        </div>

        {/* Termination of Service */}
        <div className="bg-white shadow-xl rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center mb-4">
            <FaGavel className="text-purple-500 text-4xl mr-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Termination of Service</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to suspend or terminate your account and access to the service at any time, for any reason, including violation of these terms. Upon termination, your right to use the service will immediately cease.
          </p>
        </div>

        {/* Dispute Resolution */}
        <div className="bg-white shadow-xl rounded-lg p-8 transform hover:scale-105 transition-transform duration-300 md:col-span-2">
          <div className="flex items-center mb-4">
            <FaHandshake className="text-indigo-500 text-4xl mr-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Dispute Resolution</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Any disputes arising out of these terms or your use of the service will be governed by the laws of the jurisdiction where our company is based. You agree to resolve disputes through arbitration or mediation.
          </p>
        </div>
      </div>

      {/* Decorative Dividers */}
      <div className="mt-16 flex justify-center space-x-8">
        <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
        <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
      </div>
    </div>
  );
};

export default TermsOfService;
