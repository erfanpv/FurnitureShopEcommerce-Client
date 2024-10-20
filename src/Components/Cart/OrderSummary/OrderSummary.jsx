import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { stripePaymentIntegration } from "../../../app/Slice/userSlices/paymentSlice/paymentThunk";
import { getWalletData } from "../../../app/Slice/userSlices/walletSlices/walletThunk";
import { useNavigate } from "react-router-dom";
import WalletPaymentPage from "../../PaymentSections/WalleOrderPlaced/WalletOrderPlaced";

const OrderSummary = () => {
  const { cart: cartItems, cartId } = useSelector((state) => state.cart);
  const { walletData } = useSelector((state) => state.wallet);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false); 

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const estimatedTax = totalPrice * 0.1;
  const orderTotal = totalPrice + estimatedTax;

  const handlePlaceOrder = () => {
    if (orderTotal > 0) {
      if (paymentMethod === "stripe") {
        stripePaymentIntegration({ cartId, paymentMethod });
      } else if (paymentMethod === "wallet") {
        dispatch(getWalletData());

        if (walletData?.balance < orderTotal) {
          toast.error(
            "Insufficient wallet balance to complete your purchase. Please add funds to your wallet."
          );
        } else {
          setIsWalletModalOpen(true); 
        }
      }
    } else {
      toast.info("Your Cart is Empty");
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md">
      <h2 className="font-bold text-xl mb-4 text-gray-800">Order Summary</h2>

      <div className="flex justify-between mb-3 text-sm text-gray-700">
        <span>Items ({cartItems.length}):</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-3 text-sm text-gray-700">
        <span>Shipping & handling:</span>
        <span>$0.00</span>
      </div>
      <div className="flex justify-between mb-3 border-t border-gray-200 pt-3 text-sm text-gray-700">
        <span>Total before tax:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-3 text-sm text-gray-700">
        <span>Estimated tax (10%):</span>
        <span>${estimatedTax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-3 text-gray-900">
        <span>Order total:</span>
        <span>${orderTotal.toFixed(2)}</span>
      </div>

      <div className="mt-4">
        <label
          htmlFor="payment-method"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Payment Method:
        </label>
        <select
          id="payment-method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="block w-full border border-gray-300 rounded-md p-2"
        >
          <option value="stripe">Stripe</option>
          {/* <option value="wallet">Wallet</option> */}
        </select>
      </div>

      <button
        className="w-full py-3 rounded-md mt-4 bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 active:bg-indigo-800"
        onClick={handlePlaceOrder}
      >
        Place your order
      </button>

      {isWalletModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <WalletPaymentPage cartId={cartId} orderTotal={orderTotal} />
            <button
              className="w-full py-2 mt-4 bg-red-500 text-white rounded-md"
              onClick={() => setIsWalletModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
