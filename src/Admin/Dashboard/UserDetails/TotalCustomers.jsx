import React, { useEffect} from "react";
import { totalUsers } from "../../../app/Slice/adminSlices/dashBoardSlices/dashBoardThunk";
import { useDispatch, useSelector } from "react-redux";

const TotalCustomers = () => {
  const { totalUsersCount } = useSelector((state) => state.dashboard);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(totalUsers());
  }, []);
  return (
    <div className="flex w-72">
      <div className="flex w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
        <div className="p-3 relative">
          <div className="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 text-center text-white shadow-lg">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="pt-1 text-right">
            <p className="text-sm font-light capitalize">Users</p>
            <h4 className="text-2xl font-semibold tracking-tighter xl:text-2xl">
              {totalUsersCount}
            </h4>
          </div>
        </div>
        <hr className="opacity-50" />
        <div className="p-4">
          <p className="font-light">
            {/* <span className="text-sm font-bold text-green-600">+3% </span> */}
            Total Our Customers
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalCustomers;
