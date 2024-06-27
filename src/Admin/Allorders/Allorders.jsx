import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductShimmer from "../../Components/ShimmerUI/ProductShimmer/ProductShimmer";

const UserOrders = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <ProductShimmer/>;

  return (
    <div className="  pb-20 px-5 sm:ml-64">
      <h1 className="text-4xl font-bold text-center mb-5 text-indigo-800">
        All Order Details
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Customer
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Order Date
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Total
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Items
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Billing Address
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Card Holder
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) =>
              user.orderData.map((order) => (
                <tr key={order.orderDate}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {user.fnName} {user.lastName}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <ul>
                      {order.cartItems.map((item) => (
                        <li key={item.id} className="mb-2">
                          <img
                            src={item.src}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg inline-block mr-2"
                          />
                          <div className="inline-block align-middle">
                            <h5 className="text-lg font-semibold">
                              {item.name}
                            </h5>
                            <p className="text-sm">Qty: {item.qty}</p>
                            <p className="text-sm">Price: ${item.price}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {order.billingAddress}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {order.cardHolder}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrders;
