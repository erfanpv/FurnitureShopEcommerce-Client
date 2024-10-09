import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import { cancelOrderById } from "../../../app/Slice/userSlices/OrderSlice/ordersThunk";
import Modal from "react-modal";
import { useDispatch } from "react-redux";

const ReturnOrCancel = ({ order }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [orderToCancel, setOrderToCancel] = useState(null);

  const dispatch = useDispatch();

  const handleCancelOrder = () => {
    if (cancelReason === "") {
      return toast.error("Please provide a reason.");
    }
    const action = orderToCancel.status === "Delivered" ? "return" : "cancel";
    dispatch(
      cancelOrderById({
        orderId: orderToCancel.orderId,
        reason: cancelReason,
        action,
      })
    );
    setIsModalOpen(false);
    setOrderToCancel(null);
    setCancelReason("");
  };

  const openCancelModal = (order) => {
    setOrderToCancel(order);
    setIsModalOpen(true);
  };

  return (
    <div>
      {order.status === "Delivered" && !order.isReturned ? (
        <button
          className="text-sm text-red-600 mt-2 underline hover:text-red-700 transition"
          onClick={() => openCancelModal(order)}
        >
          Return Request
        </button>
      ) : (order.status === "Placed" || order.status === "Processing") &&
        !order.reason ? (
        <button
          className="text-sm text-red-600 mt-2 underline hover:text-red-700 transition"
          onClick={() => openCancelModal(order)}
        >
          Cancel Request
        </button>
      ) : (order.status === "Placed" || order.status === "Processing") &&
        order.reason ? (
        <p className="text-sm text-red-600 mt-2  hover:text-red-700 transition">
          Product Cancel Request Not Accepted Contact us for further info
        </p>
      ) : order.status === "Delivered" && order.reason && order.isReturned ? (
        <p className="text-sm text-red-600 mt-2  hover:text-red-700 transition">
          Product Return Request Not Accepted Contact us for further info
        </p>
      ) : null}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          ariaHideApp={false}
          className="modal"
        >
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto relative">
              <h2 className="text-2xl font-semibold text-red-600 mb-4 flex items-center">
                <FiAlertTriangle className="mr-2" />
                {orderToCancel.status === "Delivered"
                  ? "Confirm Return"
                  : "Confirm Cancellation"}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to{" "}
                {orderToCancel.status === "Delivered" ? "return" : "cancel"}{" "}
                this order? Please provide a reason.
              </p>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
                placeholder={`Enter reason for ${
                  orderToCancel.status === "Delivered"
                    ? "return"
                    : "cancellation"
                }`}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              ></textarea>

              <div className="mt-6 flex justify-between">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  onClick={handleCancelOrder}
                >
                  Confirm{" "}
                  {orderToCancel.status === "Delivered" ? "Return" : "Cancel"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ReturnOrCancel;
