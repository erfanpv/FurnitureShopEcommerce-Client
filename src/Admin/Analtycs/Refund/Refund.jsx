import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import http from "../../../utils/axios/axiosIntercepter"; 

const RefundPage = () => {
  const [refunds, setRefunds] = useState([]);
  const [selectedRefund, setSelectedRefund] = useState(null);

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const response = await http.get("/admin/orders");
        const allOrders = response.data.data;

        const refundedOrders = allOrders.filter(
          (order) => order.orderDetails.refundedAt || order.orderDetails.isRefunded
        );

        setRefunds(refundedOrders);
      } catch (error) {
        console.error("Failed to fetch refund data:", error);
      }
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
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-800">Refund Analytics</h1>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead>
            <tr>
              {["No","Order ID", "User Email", "Amount", "Status", "Refund Date", "Actions"].map((heading) => (
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
            {refunds.map((refund,index) => (
              <tr key={refund._id} className="hover:bg-gray-100 transition duration-200">
                <td className="py-4 px-6 border-b border-gray-200">{index + 1}</td>
                <td className="py-4 px-6 border-b border-gray-200">{refund.orderDetails.orderId}</td>
                <td className="py-4 px-6 border-b border-gray-200">{refund.orderDetails.orderUsermail}</td>
                <td className="py-4 px-6 border-b border-gray-200">${refund.orderDetails.total?.toFixed(2)}</td>
                <td className={`py-4 px-6 border-b border-gray-200 text-green-600`}>Refunded</td>
                <td className="py-4 px-6 border-b border-gray-200">{new Date(refund.orderDetails.refundedAt).toLocaleDateString()}</td>
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
            <p><strong className="text-gray-600">Order ID:</strong> {selectedRefund.orderDetails.orderId}</p>
            <p><strong className="text-gray-600">User Email:</strong> {selectedRefund.orderDetails.orderUsermail}</p>
            <p><strong className="text-gray-600">Total Amount:</strong> ${selectedRefund.orderDetails.total.toFixed(2)}</p>
            <p><strong className="text-gray-600">Status:</strong> Refunded</p>
            <p><strong className="text-gray-600">Refund Date:</strong> {new Date(selectedRefund.orderDetails.refundedAt).toLocaleDateString()}</p>
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
