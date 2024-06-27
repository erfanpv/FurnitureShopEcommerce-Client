import React from "react";
import { useHistory } from "react-router-dom";

const PaymentSuccess = ({ orderDetails }) => {
  const history = useHistory();

  const handleGoToOrders = () => {
    history.push("/orders");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-20 lg:px-20">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-green-600">
          Payment Successful!
        </h2>
        <p className="mt-2 text-gray-600">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <div className="mt-4">
          <h3 className="text-lg font-medium">Order Details</h3>
          <div className="mt-2">
            <p>
              <span className="font-semibold">Order Number:</span>{" "}
              {orderDetails.orderNumber}
            </p>
            <p>
              <span className="font-semibold">Total Amount:</span> $
              {orderDetails.totalAmount}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium">Purchased Items</h3>
          <ul className="mt-2 space-y-2">
            {orderDetails.items.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">${item.price}</p>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleGoToOrders}
          className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go to My Orders
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
