import React, { useEffect } from "react";
import { totalRevenueAmount } from "../../../app/Slice/adminSlices/dashBoardSlices/dashBoardThunk";
import { useDispatch, useSelector } from "react-redux";

const TotalRevenue = () => {
  const { totalSalesAmount } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(totalRevenueAmount());
  }, []);

  return (
    <div className="flex w-60">
      <div className="flex w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
        <div className="p-3 relative">
          <div className="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 text-center text-white shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-4 h-7 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="pt-1 text-right">
            <p className="text-sm font-light capitalize">Total Revenue</p>
            <h4 className="text-2xl font-semibold tracking-tighter xl:text-2xl">
              ${totalSalesAmount?.toFixed(2)}
            </h4>
          </div>
        </div>
        <hr className="opacity-50" />
        <div className="p-4">
          <p className="font-light">Total Revenues</p>
        </div>
      </div>
    </div>
  );
};

export default TotalRevenue;
