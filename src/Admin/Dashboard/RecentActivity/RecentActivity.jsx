import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecentActivity } from "../../../app/Slice/adminSlices/dashBoardSlices/dashBoardThunk";

const RecentActivity = () => {
  const { recentActivity } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecentActivity());
  }, [dispatch]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
      <h3 className="text-xl font-semibold text-gray-700 mb-6">
        Recent Activities
      </h3>
      <ul className="space-y-4">
        {recentActivity?.map((activity, index) => (
          <li key={`${activity._id}-${index}`} className="text-gray-600">
            {activity.action}{" "}
            <span className="text-gray-400">({activity.date})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
