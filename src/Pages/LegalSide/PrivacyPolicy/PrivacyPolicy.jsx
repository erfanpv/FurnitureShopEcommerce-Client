  import React from 'react';
  import { FaLock, FaInfoCircle, FaShieldAlt, FaUserShield, FaEnvelopeOpen } from 'react-icons/fa';

  const PrivacyPolicy = () => {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12 bg-gradient-to-r from-white to-gray-50 rounded-lg  mt-10">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-lg">
            We value your privacy and are committed to protecting your personal information.
          </p>
        </header>

        {/* Sections */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <FaInfoCircle className="text-indigo-600 text-3xl mr-4" />
            <h2 className="text-3xl font-semibold text-indigo-900">Information We Collect</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We collect various types of information for different purposes to provide and improve our service. This includes 
            information you provide directly, such as when you create an account or place an order, and automatically collected 
            information like your IP address and device type.
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-600">
            <li>Personal identification information (Name, email address, phone number, etc.)</li>
            <li>Payment information (Card details, transaction history, etc.)</li>
            <li>Usage data (IP address, browser type, visit duration, etc.)</li>
          </ul>
        </section>

        <hr className="border-gray-300 my-12" />

        <section className="mb-12">
          <div className="flex items-center mb-6">
            <FaShieldAlt className="text-indigo-600 text-3xl mr-4" />
            <h2 className="text-3xl font-semibold text-indigo-900">How We Use Your Information</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We use your personal information to provide our services, process transactions, and improve your overall shopping 
            experience. This includes fulfilling orders, customer service, marketing communications, and ensuring the security 
            of our platform.
          </p>
        </section>

        <hr className="border-gray-300 my-12" />

        <section className="mb-12">
          <div className="flex items-center mb-6">
            <FaLock className="text-indigo-600 text-3xl mr-4" />
            <h2 className="text-3xl font-semibold text-indigo-900">Security of Your Information</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We take the security of your personal data seriously. Our platform uses industry-standard encryption and security measures 
            to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure, 
            so we cannot guarantee absolute security.
          </p>
        </section>

        <hr className="border-gray-300 my-12" />

        <section className="mb-12">
          <div className="flex items-center mb-6">
            <FaUserShield className="text-indigo-600 text-3xl mr-4" />
            <h2 className="text-3xl font-semibold text-indigo-900">Your Rights</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            You have the right to access, update, or delete your personal information at any time. If you would like to exercise 
            these rights, please contact us at privacy@furnitureshop.com. We are committed to responding to your requests in a timely 
            manner.
          </p>
        </section>

        <hr className="border-gray-300 my-12" />

        <section className="mb-12">
          <div className="flex items-center mb-6">
            <FaEnvelopeOpen className="text-indigo-600 text-3xl mr-4" />
            <h2 className="text-3xl font-semibold text-indigo-900">Contact Us</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions or concerns about our Privacy Policy or how we handle your data, feel free to reach out to 
            us via the following methods:
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-600">
            <li>Email: privacy@furnitureshop.com</li>
            <li>Phone: +123 456 7890</li>
          </ul>
        </section>
      </div>
    );
  };

  export default PrivacyPolicy;
