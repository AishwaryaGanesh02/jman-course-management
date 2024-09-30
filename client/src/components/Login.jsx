import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(email, password);
      alert(`Logged in successfully! Token: ${response.data.token}`);
      // Store token in local storage or context
      localStorage.setItem("token", response.data.token);
      navigate("/"); // Redirect to homepage or desired route after login
    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div
      style={{
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="bg-textbg"
    >
      <div className="flex items-center justify-center">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-12 md:px-14 md:py-8">
            <span className="mb-1 text-5xl text-center font-bold">Login</span>
            <form className="mt-4 space-y-4" onSubmit={onSubmitForm}>
              <div className="py-0.5">
                <span className="mb-2 text-md">Email</span>
                <input
                  type="text"
                  className="block w-full mt-1.5 rounded-md box-border border-0 pl-2 bg-textbg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  name="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="py-0.5">
                <span className="mb-2 text-md">Password</span>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  className="block w-full mt-1.5 rounded-md box-border border-0 pl-2 bg-textbg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="flex justify-center">
                <button className="w-full bg-primary-100 text-white py-2 px-1 rounded-lg mb-2 hover:border-gray-300 mt-2">
                  Sign in
                </button>
              </div>
            </form>
            <div className="text-center">
              Don't have an account?{" "}
              <Link to="/SignUp" className="font-bold">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
