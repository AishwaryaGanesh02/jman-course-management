import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectRoute = ({ element }) => {
  const isAuthenticated = !!Cookies.get("token");

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default ProtectRoute;
