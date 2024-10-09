import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.51 6.51 0 0116.5 3 5.5 5.5 0 0122 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            clipRule="evenodd"
          />
        </svg>
        <h1 className="text-2xl font-semibold text-gray-900 mt-4">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">
          Your payment was processed successfully. Thank you for your purchase!
        </p>
        <div className="mt-8 space-y-4">
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 w-full"
          >
            Back to Home
          </Link>
          
          <Link
            to="/orders"
            className="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700  w-full"
          >
            Go to Order Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
