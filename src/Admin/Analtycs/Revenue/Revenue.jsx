import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const PaymentActivity = () => {
  const [paymentDetails] = useState([
    { paymentId: 'P001', transactionId: 'T001', user: 'John Doe', amount: 150.00, method: 'Credit Card', status: 'Completed', date: '2024-09-10' },
    { paymentId: 'P002', transactionId: 'T002', user: 'Jane Smith', amount: 200.00, method: 'PayPal', status: 'Pending', date: '2024-09-11' },
    { paymentId: 'P003', transactionId: 'T003', user: 'Alice Johnson', amount: 75.50, method: 'Debit Card', status: 'Failed', date: '2024-09-12' },
    { paymentId: 'P004', transactionId: 'T004', user: 'Bob Brown', amount: 120.00, method: 'Bank Transfer', status: 'Completed', date: '2024-09-13' },
    // Add more dummy data as needed
  ]);
  
  const [selectedPayment, setSelectedPayment] = useState(null);

  const openModal = (payment) => {
    setSelectedPayment(payment);
  };

  const closeModal = () => {
    setSelectedPayment(null);
  };

  return (
    <div className="bg-white-100 min-h-screen px-4 py-10 lg:px-20 md:ml-60 sm:ml-60 lg:ml-60">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-800">
        Payment Activity
      </h1>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead>
            <tr>
              {[
                "Payment ID",
                "Transaction ID",
                "User",
                "Amount",
                "Payment Method",
                "Status",
                "Date",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="py-4 px-6 border-b-2 border-gray-200 bg-gray-50 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paymentDetails.map((payment) => (
              <tr key={payment.paymentId} className="hover:bg-gray-100 transition duration-200">
                <td className="py-4 px-6 border-b border-gray-200">{payment.paymentId}</td>
                <td className="py-4 px-6 border-b border-gray-200">{payment.transactionId}</td>
                <td className="py-4 px-6 border-b border-gray-200">{payment.user}</td>
                <td className="py-4 px-6 border-b border-gray-200">${payment.amount.toFixed(2)}</td>
                <td className="py-4 px-6 border-b border-gray-200">{payment.method}</td>
                <td className={`py-4 px-6 border-b border-gray-200 ${payment.status === 'Completed' ? 'text-green-600' : payment.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {payment.status}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">{new Date(payment.date).toLocaleDateString()}</td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <button
                    onClick={() => openModal(payment)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Payment Details */}
      {selectedPayment && (
        <Modal
          isOpen={!!selectedPayment}
          onRequestClose={closeModal}
          ariaHideApp={false}
          className="relative p-8 bg-white rounded-lg shadow-lg mx-auto mt-10 max-w-2xl"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-700 border-b pb-3">Payment Details</h2>
          <div className="space-y-4">
            <p><strong className="text-gray-600">Payment ID:</strong> {selectedPayment.paymentId}</p>
            <p><strong className="text-gray-600">Transaction ID:</strong> {selectedPayment.transactionId}</p>
            <p><strong className="text-gray-600">Customer Name:</strong> {selectedPayment.user}</p>
            <p><strong className="text-gray-600">Payment Date:</strong> {new Date(selectedPayment.date).toLocaleDateString()}</p>
            <p><strong className="text-gray-600">Total Amount:</strong> ${selectedPayment.amount.toFixed(2)}</p>
            <p><strong className="text-gray-600">Payment Method:</strong> {selectedPayment.method}</p>
            <p><strong className="text-gray-600">Status:</strong> {selectedPayment.status}</p>
          </div>

          <button
            onClick={closeModal}
            className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default PaymentActivity;
