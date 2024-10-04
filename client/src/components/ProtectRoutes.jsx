import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectRoute = ({ element, allowedRoles }) => {
  const [validCourseIds, setValidCourseIds] = useState([]);
  const [error, setError] = useState(null);
  const [tokenExpired, setTokenExpired] = useState(false);

  const isAuthenticated = !!Cookies.get("token");
  const userRole = Cookies.get("role");

  useEffect(() => {
    const fetchCourseIds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1200/api/courses/valid-ids",
          {
            headers: {
              authorization: `${Cookies.get("token")}`,
            },
          }
        );
        console.log("-------");
        setValidCourseIds(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          toast.error("Token expired. Please log in again.");
          setTimeout(() => {
            setTokenExpired(true);
          }, 3000);
        } else {
          setError(err);
        }
      }
    };

    if (isAuthenticated) {
      console.log("-------");
      fetchCourseIds();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (tokenExpired) {
    return <Navigate to="/" replace />;
  }

  if (error) {
    return <Navigate to="/not-found" replace />;
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
