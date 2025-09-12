// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = sessionStorage.getItem("token"); // ✅ check if logged in
  return token ? children : <Navigate to="/login" replace />;
}
