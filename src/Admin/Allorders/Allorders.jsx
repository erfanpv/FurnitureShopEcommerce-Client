import React, { useEffect, useState } from "react";
import { getAllordersData } from "../../app/Slice/adminSlices/ordersSlices/ordersThunk";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";

const UserOrders = () => {
  const dispatch = useDispatch();
  const { ordersDetails } = useSelector((state) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllordersData());
  }, [dispatch]);

  const openModal = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="pb-20 px-5 sm:ml-64">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-800">
        All Order Details
      </h1>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead>
            <tr>
              {[
                "Customer",
                "Order Date",
                "Total",
                "Items",
                "Billing Address",
                "Order Status",
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
            {ordersDetails.map((user) =>
              user.orderDetails.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="py-4 px-6 border-b border-gray-200">
                    {order.orderedUserName}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    <ul>
                      {order.products.map((item) => (
                        <li
                          key={item?.productId?._id}
                          className="flex items-center mb-4"
                        >
                          <img
                            src={item?.productId?.image}
                            alt={item?.productId?.productName}
                            className="w-16 h-16 object-cover rounded-lg mr-4"
                          />
                          <div>
                            <h5 className="text-lg font-semibold">
                              {item?.productId?.productName}
                            </h5>
                            <p className="text-sm text-gray-600">
                              Qty: {item?.quantity}
                            </p>
                            <p className="text-sm text-gray-600">
                              Price: ${item?.productId?.price.toFixed(2)}
                            </p>
                          </div>
                        </li>
                        
                        ))}
                    </ul>
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {`${order.shippingAddress.line1},${order.shippingAddress.line2}, ${order.shippingAddress.city}, ${order.shippingAddress.postal_code}`}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {order.status}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    <button
                      onClick={() => openModal(order)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Detailed View */}
      {selectedOrder && (
        <Modal
          isOpen={!!selectedOrder}
          onRequestClose={closeModal}
          ariaHideApp={false}
          className="relative p-8 bg-white rounded-lg shadow-lg mx-auto mt-10 max-w-2xl"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-700 border-b pb-3">
            Order Details
          </h2>
          <div className="space-y-4">
            <p>
              <strong className="text-gray-600">Order ID:</strong>{" "}
              {selectedOrder.orderId}
            </p>
            <p>
              <strong className="text-gray-600">Payment ID:</strong>{" "}
              {selectedOrder.paymentId}
            </p>
            <p>
              <strong className="text-gray-600">Customer Name:</strong>{" "}
              {selectedOrder.orderedUserName}
            </p>
            <p>
              <strong className="text-gray-600">Order Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong className="text-gray-600">Total Amount:</strong> $
              {selectedOrder.total.toFixed(2)}
            </p>
            <p>
              <strong className="text-gray-600">Payment Method:</strong>{" "}
              {selectedOrder.payment_method}
            </p>
            <p>
              <strong className="text-gray-600">Order Status:</strong>{" "}
              {selectedOrder.status}
            </p>
            <p>
              <strong className="text-gray-600">Shipping Address:</strong>{" "}
              {`${selectedOrder.shippingAddress.line1},${selectedOrder.shippingAddress.line2}, ${selectedOrder.shippingAddress.city}, ${selectedOrder.shippingAddress.state}, ${selectedOrder.shippingAddress.country}, ${selectedOrder.shippingAddress.postal_code}`}
            </p>
          </div>

          {/* List of Products */}
          <h3 className="text-lg font-semibold mt-6 mb-3 border-b pb-1">
            Items Ordered
          </h3>
          <ul>
            {selectedOrder.products.map((item) => (
              <li key={item.productId._id} className="flex items-center mb-4">
                <img
                  src={item.productId.image}
                  alt={item.productId.productName}
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div>
                  <h5 className="text-lg font-semibold text-gray-800">
                    {item.productId.productName}
                  </h5>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-600">
                    Price: ${item.productId.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

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

export default UserOrders;
