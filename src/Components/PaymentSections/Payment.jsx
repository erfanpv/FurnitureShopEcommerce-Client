import React from 'react';

const PaymentSection = () => {
  return (
    <div className="max-w-lg mx-auto  bg-white p-8 rounded-lg shadow-lg my-20">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Payment Details</h2>
      
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="cardNumber">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="expiryDate">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="MM/YY"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="cvv">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="123"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="cardHolderName">
            Card Holder Name
          </label>
          <input
            type="text"
            id="cardHolderName"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="John Doe"
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="saveCard"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="saveCard" className="ml-2 text-gray-700">
            Save this card for future payments
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentSection;
