import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ordersDataByUser } from "../../app/Slice/adminSlices/ordersSlices/ordersThunk";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetailsByUser, isLoading } = useSelector((state) => state.orders);
  
  useEffect(() => {
    dispatch(ordersDataByUser({ id }));
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!orderDetailsByUser || orderDetailsByUser.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-900 mb-4">No Orders Found</h1>
          <p className="text-gray-500">You have not placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-indigo-900 mb-8">Order Details</h1>
      <div className="grid gap-8">
        {orderDetailsByUser.map((order) => (
          <div
            key={order._id}
            className="p-6 bg-white shadow-lg rounded-lg border border-gray-300"
          >
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-lg font-medium text-gray-700">
                  <strong className="text-gray-600">Order ID:</strong> {order.orderId}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  <strong className="text-gray-600">Payment ID:</strong> {order.paymentId}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  <strong className="text-gray-600">Customer Name:</strong> {order.orderedUserName}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  <strong className="text-gray-600">Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  <strong className="text-gray-600">Order Email:</strong> {order.orderUsermail}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  <strong className="text-gray-600">Total Amount:</strong> ${order.total.toFixed(2)}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  <strong className="text-gray-600">Payment Method:</strong> {order.payment_method}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  <strong className="text-gray-600">Order Status:</strong> {order.status}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  <strong className="text-gray-600">Shipping Address:</strong>{" "}
                  {`${order.shippingAddress.line1}${order.shippingAddress.line2 ? ', ' + order.shippingAddress.line2 : ''}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.country}, ${order.shippingAddress.postal_code}`}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 border-b pb-2">Items Ordered</h3>
                <ul>
                  {order.products.map((item) => (
                    <li key={item.productId._id} className="flex items-center mb-6 border-b border-gray-200 pb-4">
                      <img
                        src={item.productId.image}
                        alt={item.productId.productName}
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <h5 className="text-lg font-semibold text-gray-800">{item.productId.productName}</h5>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        <p className="text-sm text-gray-600">Price: ${item.productId.price.toFixed(2)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
