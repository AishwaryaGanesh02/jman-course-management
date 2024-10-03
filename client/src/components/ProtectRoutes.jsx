import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const ProtectRoute = ({ element, allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [validCourseIds, setValidCourseIds] = useState([]);
  const [error, setError] = useState(null);

  const isAuthenticated = !!Cookies.get("token");
  const userRole = Cookies.get("role"); // Assume user role is stored in cookies

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
        setValidCourseIds(response.data); // Assume response contains an array of valid course IDs
      } catch (err) {
        setError(err); // Handle error
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchCourseIds();
    } else {
      setLoading(false); // Set loading to false if not authenticated
    }
  }, [isAuthenticated]);

  // If loading, you can return a loading spinner or null
  if (loading) {
    return <div>Loading...</div>; // Or your loading spinner
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // // Check role-based access
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/not-found" replace />;
  }

  // If there's an error (like 404 from the API), handle it
  if (error) {
    return <Navigate to="/not-found" replace />;
  }

  // Validate course ID if provided
  if (window.location.pathname.startsWith("/courseInfo/")) {
    const currentCourseId = parseInt(window.location.pathname.split("/").pop());
    console.log(currentCourseId, validCourseIds); // Get the course ID from the URL
    if (currentCourseId && !validCourseIds.includes(currentCourseId)) {
      return <Navigate to="/not-found" replace />;
    }
  }

  return element;
};

export default ProtectRoute;
