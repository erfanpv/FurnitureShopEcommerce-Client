import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const RefundPage = () => {
  const [refunds, setRefunds] = useState([]);
  const [selectedRefund, setSelectedRefund] = useState(null);

  useEffect(() => {
    const fetchRefunds = () => {
      const dummyData = [
        { id: 1, orderId: "ORD123456", userEmail: "user1@example.com", amount: 29.99, status: "Pending", date: "2024-09-10" },
        { id: 2, orderId: "ORD123457", userEmail: "user2@example.com", amount: 49.99, status: "Approved", date: "2024-09-11" },
        { id: 3, orderId: "ORD123458", userEmail: "user3@example.com", amount: 19.99, status: "Rejected", date: "2024-09-12" },
        { id: 4, orderId: "ORD123459", userEmail: "user4@example.com", amount: 39.99, status: "Pending", date: "2024-09-13" },
      ];
      setRefunds(dummyData);
    };
    fetchRefunds();
  }, []);

  const openModal = (refund) => {
    setSelectedRefund(refund);
  };

  const closeModal = () => {
    setSelectedRefund(null);
  };

  return (
    <div className="bg-white-100 min-h-screen px-4 py-10 lg:px-20 md:ml-60 sm:ml-60 lg:ml-60">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-800">Refund Management</h1>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead>
            <tr>
              {["Order ID", "User Email", "Amount", "Status", "Date", "Actions"].map((heading) => (
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
            {refunds.map((refund) => (
              <tr key={refund.id} className="hover:bg-gray-100 transition duration-200">
                <td className="py-4 px-6 border-b border-gray-200">{refund.orderId}</td>
                <td className="py-4 px-6 border-b border-gray-200">{refund.userEmail}</td>
                <td className="py-4 px-6 border-b border-gray-200">${refund.amount.toFixed(2)}</td>
                <td className={`py-4 px-6 border-b border-gray-200 ${refund.status === 'Approved' ? 'text-green-600' : refund.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                  {refund.status}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">{new Date(refund.date).toLocaleDateString()}</td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <button
                    onClick={() => openModal(refund)}
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

      {/* Modal for Refund Details */}
      {selectedRefund && (
        <Modal
          isOpen={!!selectedRefund}
          onRequestClose={closeModal}
          ariaHideApp={false}
          className="relative p-8 bg-white rounded-lg shadow-lg mx-auto mt-10 max-w-2xl"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-700 border-b pb-3">Refund Details</h2>
          <div className="space-y-4">
            <p><strong className="text-gray-600">Order ID:</strong> {selectedRefund.orderId}</p>
            <p><strong className="text-gray-600">User Email:</strong> {selectedRefund.userEmail}</p>
            <p><strong className="text-gray-600">Total Amount:</strong> ${selectedRefund.amount.toFixed(2)}</p>
            <p><strong className="text-gray-600">Status:</strong> <span className={`${selectedRefund.status === 'Approved' ? 'text-green-600' : selectedRefund.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{selectedRefund.status}</span></p>
            <p><strong className="text-gray-600">Refund Date:</strong> {new Date(selectedRefund.date).toLocaleDateString()}</p>
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

export default RefundPage;
