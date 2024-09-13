import React from "react";
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ element }) => {
  if (localStorage.getItem("accesstoken")) {
    return element;
  }
  return <Navigate to={"/login"} />;
};

export default UserProtectedRoute;
