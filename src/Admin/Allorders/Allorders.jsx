import React, { useEffect, useState } from "react";
import { getAllordersData } from "../../app/Slice/adminSlices/ordersSlices/ordersThunk";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import CancelOrReturn from "./CancelOrReturn/CancelOrReturn.jsx";

const UserOrders = () => {
  const dispatch = useDispatch();
  const { ordersDetails, isLoading, error, pagination } = useSelector( (state) => state.orders);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    dispatch(
      getAllordersData({
        page: currentPage,
        limit: ordersPerPage,
        status: selectedStatus,
      })
    );
  }, [dispatch, currentPage, selectedStatus]);

  const openDetailsModal = (order) => {
    setSelectedOrderDetails(order);
  };

  const closeDetailsModal = () => {
    setSelectedOrderDetails(null);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <div className="text-center py-20">Loading orders...</div>;
  }
  if (error) {
    return (
      <div className="pb-20 px-5 sm:ml-64">
        <h1 className="text-4xl font-bold text-center mb-10 text-indigo-800">
          All Order Details
        </h1>
        <div className="flex justify-end mb-5">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="All">All</option>
            <option value="Placed">Placed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Returned">Returned</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
        <div className="text-center py-20">No Orders Found</div>;
      </div>
    );
  }

  return (
    <div className="pb-20 px-5 sm:ml-64">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-800">
        All Order Details
      </h1>

      <div className="flex justify-end mb-5">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="All">All</option>
          <option value="Placed">Placed</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Returned">Returned</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead>
            <tr>
              {[
                "No",
                "Customer",
                "Order Date",
                "Total",
                "Payment Method",
                "Order Status",
                "Actions",
                "Details",
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
            {ordersDetails?.map((order, index) => (
              <tr
                key={order.orderDetails._id}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="py-4 px-6 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {order?.orderDetails.orderedUserName}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {new Date(order.orderDetails.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  ${order.orderDetails.total.toFixed(2)}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {order.orderDetails.payment_method}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {order.orderDetails.status}
                </td>
                <CancelOrReturn order={order} currentPage={currentPage} ordersPerPage={ordersPerPage} />
                <td className="py-4 px-6 border-b border-gray-200">
                  <button
                    onClick={() => openDetailsModal(order.orderDetails)}
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
            {[...Array(pagination.totalPages).keys()].map((number) => (
              <li key={number} className="px-2">
                <button
                  onClick={() => paginate(number + 1)}
                  className={`px-3 py-2 leading-tight border ${
                    currentPage === number + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700"
                  } rounded-md`}
                >
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedOrderDetails && (
        <Modal
          isOpen={!!selectedOrderDetails}
          onRequestClose={closeDetailsModal}
          ariaHideApp={false}
          className="relative p-4 sm:p-8 bg-white rounded-lg shadow-lg mx-auto mt-4 sm:mt-10 max-w-full sm:max-w-2xl max-h-[96vh] overflow-y-auto"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-700 border-b pb-3">
            Order Details
          </h2>

          <div className="space-y-4 text-sm sm:text-base">
            <p>
              <strong className="text-gray-600">Order ID:</strong>{" "}
              {selectedOrderDetails.orderId}
            </p>
            <p>
              <strong className="text-gray-600">Payment ID:</strong>{" "}
              {selectedOrderDetails.paymentId}
            </p>
            <p>
              <strong className="text-gray-600">Customer Name:</strong>{" "}
              {selectedOrderDetails.orderedUserName}
            </p>
            <p>
              <strong className="text-gray-600">Order Date:</strong>{" "}
              {new Date(selectedOrderDetails.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong className="text-gray-600">Total Amount:</strong> $
              {selectedOrderDetails.total.toFixed(2)}
            </p>
            <p>
              <strong className="text-gray-600">Payment Method:</strong>{" "}
              {selectedOrderDetails.payment_method}
            </p>

            <p>
              <strong className="text-gray-600">Order Status:</strong>{" "}
              {selectedOrderDetails.status}
            </p>

            <p>
              <strong className="text-gray-600">Shipping Address:</strong>{" "}
              {`${selectedOrderDetails.shippingAddress.line1}, ${selectedOrderDetails.shippingAddress.line2}, ${selectedOrderDetails.shippingAddress.city}, ${selectedOrderDetails.shippingAddress.state}, ${selectedOrderDetails.shippingAddress.country}, ${selectedOrderDetails.shippingAddress.postal_code}`}
            </p>
          </div>

          <h3 className="text-lg sm:text-lg font-semibold mt-6 mb-3 border-b pb-1">
            Items Ordered
          </h3>
          <ul>
            {selectedOrderDetails.products.map((item, index) => (
              <li
                key={item.productId._id || index}
                className="flex items-center mb-4"
              >
                <img
                  src={item.productId.image}
                  alt={item.productId.productName}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg mr-4"
                />
                <div>
                  <h5 className="text-sm sm:text-lg font-semibold text-gray-800">
                    {item.productId.productName}
                  </h5>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Qty: {item.quantity}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Price: ${item.productId.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <button
            onClick={closeDetailsModal}
            className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default UserOrders;
