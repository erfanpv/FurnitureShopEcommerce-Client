import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import http from "../../../utils/axios/axiosIntercepter";

const PaymentActivity = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [pagination, setPagination] = useState({ totalPages: 0 });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPaymentDetails = async (page) => {
      try {
        const response = await http.get(`/admin/payment-activity?page=${page}`);
        setPaymentDetails(response.data.payments);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("Failed to fetch payment activity:", error);
      }
    };

    fetchPaymentDetails(currentPage);
  }, [currentPage]);

  const openModal = (payment) => {
    setSelectedPayment(payment);
  };

  const closeModal = () => {
    setSelectedPayment(null);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white-100 min-h-screen px-4 py-10 lg:px-20 md:ml-60 sm:ml-60 lg:ml-60">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-800">
        Payment Analytics
      </h1>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead>
            <tr>
              {[
                "No",
                "Payment ID",
                "Order ID",
                "User",
                "Amount",
                "Payment Method",
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
            {paymentDetails.map((payment, index) => (
              <tr
                key={payment.paymentId}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="py-4 px-6 border-b border-gray-200 text-sm break-all">
                  {index + 1 + (currentPage - 1) * 10}{" "}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 text-sm break-all">
                  {payment.paymentId}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 text-sm break-all">
                  {payment.transactionId}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 whitespace-nowrap">
                  {payment.user}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  ${payment.amount.toFixed(2)}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {payment.method}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
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

      {pagination?.totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <ul className="inline-flex -space-x-px">
            {Array.from({ length: pagination.totalPages }, (_, index) => (
              <li key={index} className="px-2">
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-2 leading-tight border ${
                    currentPage === index + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700"
                  } rounded-md`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedPayment && (
        <Modal
          isOpen={!!selectedPayment}
          onRequestClose={closeModal}
          ariaHideApp={false}
          className="relative p-8 bg-white rounded-lg shadow-lg mx-auto mt-10 max-w-2xl"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-700 border-b pb-3">
            Payment Details
          </h2>
          <div className="space-y-4">
            <p>
              <strong className="text-gray-600">Payment ID:</strong>{" "}
              {selectedPayment.paymentId}
            </p>
            <p>
              <strong className="text-gray-600">Transaction ID:</strong>{" "}
              {selectedPayment.transactionId}
            </p>
            <p>
              <strong className="text-gray-600">Customer Name:</strong>{" "}
              {selectedPayment.user}
            </p>
            <p>
              <strong className="text-gray-600">Payment Date:</strong>{" "}
              {new Date(selectedPayment.date).toLocaleDateString()}
            </p>
            <p>
              <strong className="text-gray-600">Total Amount:</strong> $
              {selectedPayment.amount.toFixed(2)}
            </p>
            <p>
              <strong className="text-gray-600">Payment Method:</strong>{" "}
              {selectedPayment.method}
            </p>
            <p>
              <strong className="text-gray-600">Status:</strong> Completed
            </p>
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
