import React, { useEffect, useState } from "react";
import {
  FaWallet,
  FaPlusCircle,
  FaHistory,
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { getWalletData } from "../../../app/Slice/userSlices/walletSlices/walletThunk";
import { useDispatch, useSelector } from "react-redux";

const WalletPage = ({ userId }) => {
  const handleAddFunds = async () => {};

  const { walletData } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWalletData());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-600 mb-4">
          Wallet
        </h1>
        <p className="text-gray-600 text-xl max-w-3xl mx-auto">
          Manage your balance, view transaction history, and add funds to your
          wallet for seamless payments.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div className="bg-white shadow-xl rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center mb-6">
            <FaWallet className="text-green-500 text-5xl mr-4" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Current Balance
              </h2>
              <p className="text-gray-500">Available funds in your wallet</p>
            </div>
          </div>
          <p className="text-4xl font-semibold text-gray-800">
            ${walletData?.balance.toFixed(2)}
          </p>
          <button
            onClick={() => handleAddFunds()}
            className="mt-8 w-full bg-green-500 text-white py-3 rounded-lg flex justify-center items-center shadow-lg hover:bg-green-600 transition-colors duration-300"
          >
            <FaPlusCircle className="mr-3" /> Add Funds
          </button>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center mb-6">
            <FaHistory className="text-teal-500 text-5xl mr-4" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Recent Transactions
              </h2>
              <p className="text-gray-500">
                Overview of your latest transactions
              </p>
            </div>
          </div>
          <ul className="divide-y divide-gray-200">
            {walletData?.transactions.map((transaction, index) => (
              <li
                key={transaction._id || index}
                className="py-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  {transaction.walletUpdate === "credited" ? (
                    <FaArrowDown className="text-2xl mr-4 text-green-500" />
                  ) : (
                    <FaArrowUp className="text-2xl mr-4 text-red-500" />
                  )}
                  <div>
                    <p className="text-lg font-semibold text-gray-700">
                      {transaction.walletUpdate === "credited"
                        ? "Deposit"
                        : "Withdrawal"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-lg font-semibold ${
                      transaction.walletUpdate === "credited"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    ${transaction.total}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center mb-6">
          <FaMoneyBillWave className="text-green-500 text-4xl mr-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            Full Transaction History
          </h2>
        </div>
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-gray-700">Date</th>
              <th className="px-4 py-2 text-gray-700">Type</th>
              <th className="px-4 py-2 text-gray-700">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {walletData?.transactions.map((transaction, index) => (
              <tr key={transaction._ud || index}>
                <td className="px-4 py-2 text-gray-600">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-gray-600">
                  {transaction.walletUpdate === "credited"
                    ? "Deposit"
                    : "Withdrawal"}
                </td>
                <td
                  className={`px-4 py-2 ${
                    transaction.walletUpdate === "credited"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  ${transaction.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WalletPage;
