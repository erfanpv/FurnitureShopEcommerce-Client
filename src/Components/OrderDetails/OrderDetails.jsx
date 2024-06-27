import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setOrderData(response.data.orderData);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!orderData || orderData.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-900 mb-4">No Orders Found</h1>
          <p className="text-gray-500">Not placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 ">
      <h1 className="text-3xl font-bold mb-4 text-indigo-900">Order Details</h1>
      {orderData.map((order, index) => (
        <div key={index} className="mb-8 p-6 bg-white shadow-lg rounded-lg border-l-4 border-indigo-600">
          <div className="mb-4">
            <p><strong className="text-indigo-900">Email:</strong> {order.email}</p>
            <p><strong className="text-indigo-900">Card Holder:</strong> {order.cardHolder}</p>
            <p><strong className="text-indigo-900">Billing Address:</strong> {order.billingAddress}</p>
            <p><strong className="text-indigo-900">Total:</strong> ${order.total.toFixed(2)}</p>
            <p><strong className="text-indigo-900">Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-rose-600">Items</h2>
          <ul className="space-y-4">
            {order.cartItems.map(item => (
              <li key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <img src={item.src} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                <div>
                  <p className="font-bold text-lg text-indigo-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.type}</p>
                  <p className="text-gray-800">{item.description}</p>
                  <p><strong className="text-indigo-900">Price:</strong> ${item.price}</p>
                  <p><strong className="text-indigo-900">Quantity:</strong> {item.qty}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
