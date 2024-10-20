import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const WalletPaymentPage = ({ cartId, orderTotal }) => {

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerName || !customerEmail || !shippingAddress) {
      toast.error("Please fill in all the fields.");
      return;
    }

    // Dispatch the order action
    // dispatch(
    //   placeWalletOrder({
    //     customerName,
    //     customerEmail,
    //     shippingAddress,
    //     paymentMethod: "wallet",
    //   })
    // );

    toast.success("Order placed successfully!");
    navigate("/payment/success/payment");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Wallet Payment</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Customer Name
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Customer Email
          </label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Shipping Address
          </label>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your shipping address"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-md bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700"
        >
          Confirm Wallet Payment
        </button>
      </form>
    </div>
  );
};

export default WalletPaymentPage;
