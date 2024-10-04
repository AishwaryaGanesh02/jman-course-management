import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

const API_URL = "http://localhost:1200/api/courses/valid-ids";

const ProtectRoute = ({ element, allowedRoles }) => {
  const [validCourseIds, setValidCourseIds] = useState([]);
  const [error, setError] = useState(null);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!Cookies.get("token");
  const userRole = Cookies.get("role");

  useEffect(() => {
    const fetchCourseIds = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: { authorization: Cookies.get("token") },
        });
        setValidCourseIds(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          toast.error("Token expired. Please log in again.");
          setTimeout(() => setTokenExpired(true), 3000);
        } else {
          setError(err);
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchCourseIds();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const renderLoader = () => (
    <div style={loaderStyle}>
      <ClipLoader color="#00BFFF" loading={isLoading} size={50} />
    </div>
  );

  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  if (isLoading) return renderLoader();

  if (!isAuthenticated || tokenExpired || error) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/not-found" replace />;
  }

  if (window.location.pathname.startsWith("/courseInfo/")) {
    const currentCourseId = parseInt(window.location.pathname.split("/").pop());
    if (currentCourseId && !validCourseIds.includes(currentCourseId)) {
      return <Navigate to="/not-found" replace />;
    }
  }

  return (
    <>
      <ToastContainer />
      {element}
    </>
  );
};

export default ProtectRoute;
