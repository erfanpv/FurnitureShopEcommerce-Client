import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecentOrders } from "../../../app/Slice/adminSlices/dashBoardSlices/dashBoardThunk";
import { Link } from "react-router-dom";

const RecentOrders = () => {
  const { recentOrders } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecentOrders());
  }, []);

  return (
    <Link to={"/admin/allorders"}>
      <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">
          Recent Orders
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left table-auto">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="py-2 px-4">Payment_Method</th>
                <th className="py-2 px-4">Customer</th>
                <th className="py-2 px-4">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td className="py-4 px-4 font-medium text-gray-900">
                      {order.orderDetails.payment_method}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {order.orderDetails.orderedUserName}
                    </td>
                    <td className="py-4 px-4 text-green-500 font-semibold">
                      {order.orderDetails.total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Link>
  );
};

export default RecentOrders;
