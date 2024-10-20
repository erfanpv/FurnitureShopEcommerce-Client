import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ordersDataByUser } from "../../app/Slice/userSlices/OrderSlice/ordersThunk";
import generateInvoice from "./invoice";
import Select from "react-select";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiRefreshCcw,
  FiDollarSign,
} from "react-icons/fi";
import ReturnOrCancel from "./ReturnOrCancel/ReturnOrCancel";

const orderStatusOptions = [
  { value: "Placed", label: "Placed", icon: <FiPackage /> },
  { value: "Processing", label: "Processing", icon: <FiPackage /> },
  { value: "Shipped", label: "Shipped", icon: <FiTruck /> },
  { value: "Delivered", label: "Delivered", icon: <FiCheckCircle /> },
  { value: "Cancelled", label: "Cancelled", icon: <FiXCircle /> },
  { value: "Returned", label: "Returned", icon: <FiRefreshCcw /> },
  { value: "Refunded", label: "Refunded", icon: <FiDollarSign /> },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    borderColor: state.isFocused ? "#6366F1" : "#E5E7EB",
    boxShadow: state.isFocused ? "0 0 5px rgba(99, 102, 241, 0.5)" : "none",
    "&:hover": { borderColor: "#6366F1" },
    borderRadius: "12px",
    padding: "8px",
    fontSize: "1rem",
  }),
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    backgroundColor: state.isFocused ? "#EFF6FF" : "white",
    color: state.isFocused ? "#1E3A8A" : "#4B5563",
    fontWeight: state.isSelected ? "600" : "400",
    padding: "10px 20px",
    "&:hover": { backgroundColor: "#DBEAFE", color: "#1E3A8A" },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "12px",
    marginTop: "0.5rem",
    border: "1px solid #E5E7EB",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#6B7280",
  }),
};

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderDetailsByUser, isLoading } = useSelector(
    (state) => state.ordersByUser
  );
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("id");
    dispatch(ordersDataByUser({ id }));
  }, [dispatch]);

  const filterOrders = (orders, status) => {
    if (!status) return orders;
    return orders.filter((order) => order.status === status.value);
  };

  const filteredOrders = filterOrders(orderDetailsByUser, selectedStatus);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!filteredOrders || filteredOrders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-6">
        <div className="mb-8 w-full sm:w-1/2 lg:w-1/3 mx-auto">
          <Select
            options={orderStatusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
            placeholder="Filter by status"
            isClearable
            formatOptionLabel={({ label, icon }) => (
              <div className="flex items-center">
                {icon}
                <span className="ml-2">{label}</span>
              </div>
            )}
            className="shadow-lg rounded-lg"
            styles={customStyles}
          />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-900 mb-4">
            No Orders Found
          </h1>
          <p className="text-gray-500">You have not placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-white min-h-screen lg:px-32">
      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-indigo-800 mb-6 lg:mb-6 text-center">
        Order Details
      </h1>

      <div className="mb-8 w-full sm:w-1/2 lg:w-1/3 mx-auto">
        <Select
          options={orderStatusOptions}
          value={selectedStatus}
          onChange={setSelectedStatus}
          placeholder="Filter by status"
          isClearable
          formatOptionLabel={({ label, icon }) => (
            <div className="flex items-center">
              {icon}
              <span className="ml-2">{label}</span>
            </div>
          )}
          className="shadow-lg rounded-lg"
          styles={customStyles}
        />
      </div>

      <div className="grid gap-4 lg:gap-8 grid-cols-1">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="p-4 bg-white shadow-xl rounded-lg border border-gray-300 hover:shadow-2xl transition"
          >
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm">
                <p className="text-sm lg:text-base font-medium text-gray-700">
                  <strong>Order ID:</strong> {order.orderId}
                </p>
                <p className="text-sm lg:text-base font-medium text-gray-700">
                  <strong>Payment ID:</strong> {order.paymentId}
                </p>
                <p className="text-sm lg:text-base font-medium text-gray-700">
                  <strong>Customer Name:</strong> {order.orderedUserName}
                </p>
                <p className="text-sm lg:text-base font-medium text-gray-700">
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm lg:text-base font-medium text-gray-700">
                  <strong className="text-gray-700">Order Email:</strong>{" "}
                  {order.orderUsermail}
                </p>
                <p className="text-sm lg:text-base font-medium text-gray-700">
                  <strong>Total Amount:</strong> ${order.total.toFixed(2)}
                </p>
                <p className="text-sm lg:text-base font-medium text-gray-700">
                  <strong className="text-gray-700">Payment Method:</strong>{" "}
                  {order.payment_method}
                </p>
                {order.status === "Returned" && order.isCancelled ? (
                  <p className="text-sm lg:text-base font-medium text-red-700">
                    <strong>Order Status:</strong> Return Request Sent
                  </p>
                ) : order.status === "Cancelled" && order.isCancelled ? (
                  <p className="text-sm lg:text-base font-medium text-red-700">
                    <strong>Order Status:</strong> Cancel Request Sent
                  </p>
                ) : (
                  <p className="text-sm lg:text-base font-medium text-gray-700">
                    <strong>Order Status:</strong> {order.status}
                  </p>
                )}

                <p className="text-sm lg:text-base font-medium text-gray-700">
                  <strong className="text-gray-700">Shipping Address:</strong>{" "}
                  {order.payment_method === "stripe"
                    ? `${order.shippingAddress.line1}${
                        order.shippingAddress.line2
                          ? ", " + order.shippingAddress.line2
                          : ""
                      }, ${order.shippingAddress.city}, ${
                        order.shippingAddress.state
                      }, ${order.shippingAddress.country}, ${
                        order.shippingAddress.postal_code
                      }`
                    : null}
                </p>
                <ReturnOrCancel order={order} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-indigo-900">
                  Items Ordered
                </h3>
                <ul>
                  {order.products.map((item, index) => (
                    <li key={item._id || index} className="mb-4 flex">
                      <img
                        src={item.productId.image}
                        alt={item.productId.productName}
                        className="w-16 h-16 rounded-lg"
                      />
                      <div className="ml-4">
                        <p className="text-indigo-800 font-semibold">
                          {item.productId.productName}
                        </p>
                        <p>Qty: {item.quantity}</p>
                        <p>Price: ${item.productId.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
                  onClick={() => generateInvoice(order)}
                >
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
