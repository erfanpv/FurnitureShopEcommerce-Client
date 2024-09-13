import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminProtectedRoute = () => {
  const admin = localStorage.getItem("email");

  return admin === "admin@gmail.com" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminProtectedRoute;
