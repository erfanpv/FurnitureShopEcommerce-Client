import React, { useState } from "react";
import Modal from "react-modal";
import {
  acceptReturnOrCancelOrder,
  refundPayment,
  rejectCancelOrReturnRequest,
  updateOrderStatus,
} from "../../../app/Slice/adminSlices/ordersSlices/ordersThunk";
import { useDispatch } from "react-redux";

const CancelOrReturn = ({ order, currentPage, ordersPerPage }) => {
  const dispatch = useDispatch();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [selectedOrderForStatus, setSelectedOrderForStatus] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const openRequestModal = (order, type) => {
    setSelectedOrder(order);
    setModalType(type);
  };

  const closeRequestModal = () => {
    setSelectedOrder(null);
    setModalType(null);
  };

  const handleReject = () => {
    dispatch(
      rejectCancelOrReturnRequest({
        orderId: selectedOrder.orderDetails.orderId,
        modalType,
        currentPage,
        ordersPerPage,
        dispatch
      })
    );
    closeRequestModal();
  };
  const handleAllow = () => {
    dispatch(
      acceptReturnOrCancelOrder({
        orderId: selectedOrder.orderDetails.orderId,
        modalType,
        currentPage,
        ordersPerPage,
        dispatch
      })
    );
    closeRequestModal();
  };
  const openStatusModal = (order) => {
    setSelectedOrderForStatus(order);
    setNewStatus(order.status);
  };

  const closeStatusModal = () => {
    setSelectedOrderForStatus(null);
    setNewStatus("");
  };

  const handleStatusUpdate = () => {
    if (selectedOrderForStatus && newStatus === "Refunded") {
      dispatch(
        refundPayment({
          orderId: selectedOrderForStatus.orderId,
          currentPage,
          ordersPerPage,
          dispatch,
        })
      );
    } else if (selectedOrderForStatus && newStatus) {
      dispatch(
        updateOrderStatus({
          orderId: selectedOrderForStatus.orderId,
          status: newStatus,
          currentPage,
          ordersPerPage,
          dispatch,
        })
      )
        .then(() => {
          closeStatusModal();
        })
        .catch((err) => {
          console.error("Failed to update status", err);
        });
    }
  };

  return (
    <>
      <td className="py-4 px-6 border-b border-gray-200 w-fit">
        {order.orderDetails.status === "Returned" &&
        order.orderDetails.isCancelled ? (
          <div className="flex items-center bg-red-50 text-red-700 border border-red-500 p-2 space-x-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-label="Return Pending Icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z"
              />
            </svg>
            <button
              className="font-mono text-sm underline"
              onClick={() => openRequestModal(order, "return")}
            >
              Return Request Pending
            </button>
          </div>
        ) : order.orderDetails.status === "Cancelled" &&
          order.orderDetails.isCancelled ? (
          <div className="flex items-center bg-yellow-50 text-yellow-700 border border-yellow-500 p-2 space-x-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-label="Cancel Pending Icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z"
              />
            </svg>
            <button
              className="font-mono text-sm underline"
              onClick={() => openRequestModal(order, "cancel")}
            >
              Cancel Request Pending
            </button>
          </div>
        ) : order.orderDetails.status === "Delivered" ? (
          <p className="text-green-600  py-2 px-4">{`Order Delivered on ${new Date(
            order.orderDetails.deliveredAt
          ).toLocaleDateString()}`}</p>
        ) : order.orderDetails.status === "Refunded" ? (
          <p className="text-green-600  py-2 px-4">{`Order Refunded on ${new Date(
            order.orderDetails.refundedAt
          ).toLocaleDateString()}`}</p>
        ) : (
          <button
            onClick={() => openStatusModal(order.orderDetails)}
            className="bg-rose-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-rose-700 transition duration-200"
            aria-label="Order Actions Button"
          >
            Actions
          </button>
        )}
      </td>

      <Modal
        isOpen={!!selectedOrder}
        onRequestClose={closeRequestModal}
        contentLabel={`${modalType === "return" ? "Return" : "Cancel"} Request`}
        className="bg-white p-4 rounded-lg w-3/4 max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4">
          {modalType === "return"
            ? "Allow or Reject Return Request"
            : "Allow or Reject Cancellation Request"}
        </h2>

        <div className="mb-6 p-4 bg-gray-100 border-l-4 border-blue-600 rounded-md shadow-sm">
          <p className="font-semibold text-gray-800">User's Reason:</p>
          <p className="mt-1 text-gray-700">
            {selectedOrder?.orderDetails.reason || "No reason provided."}
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleReject}
            className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-500 transition duration-200"
          >
            Reject
          </button>
          <button
            onClick={handleAllow}
            className="bg-green-600 text-white rounded-md px-4 py-2 hover:bg-green-500 transition duration-200"
          >
            Allow
          </button>
        </div>
      </Modal>

      {selectedOrderForStatus && (
        <Modal
          isOpen={!!selectedOrderForStatus}
          onRequestClose={closeStatusModal}
          ariaHideApp={false}
          className="relative p-4 sm:p-8 bg-white rounded-lg shadow-lg mx-auto mt-4 sm:mt-10 max-w-full sm:max-w-2xl max-h-[96vh] overflow-y-auto"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-700 border-b pb-3">
            Update Order Status
          </h2>

          <div className="space-y-4 text-sm sm:text-base">
            <p>
              <strong className="text-gray-600">Order ID:</strong>{" "}
              {selectedOrderForStatus.orderId}
            </p>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Update Status:
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select</option>
                {(selectedOrderForStatus.status == "Placed" ||
                  selectedOrderForStatus.status == "Processing" ||
                  selectedOrderForStatus.status == "Shipped") && (
                  <>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </>
                )}
                {(selectedOrderForStatus.status == "Cancelled" ||
                  selectedOrderForStatus.status == "Returned") &&
                  selectedOrderForStatus.isCancelled == false && (
                    <>
                      <option value="Refunded">Refunded</option>
                    </>
                  )}
              </select>
            </div>
          </div>

          <button
            onClick={handleStatusUpdate}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 mt-4"
          >
            Update Status
          </button>

          <button
            onClick={closeStatusModal}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 mt-4 ml-4"
          >
            Close
          </button>
        </Modal>
      )}
    </>
  );
};

export default CancelOrReturn;
